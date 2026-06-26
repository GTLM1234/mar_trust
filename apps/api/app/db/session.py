from collections.abc import Generator

from sqlalchemy import Engine, create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import NullPool

from app.core.config import get_settings

_engine: Engine | None = None
_session_factory: sessionmaker[Session] | None = None


def get_engine() -> Engine:
    """Create the SQLAlchemy engine lazily.

    Supabase exposes direct and pooled connection strings. For Render, the
    transaction pooler is the safest default because it works in IPv4-oriented
    hosting environments. Transaction pooling should not keep app-side pooled
    connections, so `NullPool` is used when DATABASE_POOL_MODE=transaction.
    """
    global _engine

    if _engine is not None:
        return _engine

    settings = get_settings()

    if not settings.database_url:
        raise RuntimeError("DATABASE_URL is required to initialize the database")

    engine_options: dict[str, object] = {
        "future": True,
        "pool_pre_ping": True,
    }

    if settings.database_pool_mode == "transaction":
        # Supabase transaction pooler does not support long-lived prepared
        # statement state. NullPool avoids holding connections between requests.
        engine_options["poolclass"] = NullPool
        engine_options["connect_args"] = {"prepare_threshold": None}

    _engine = create_engine(settings.database_url, **engine_options)
    return _engine


def get_session_factory() -> sessionmaker[Session]:
    """Return one configured session factory for the application lifecycle."""
    global _session_factory

    if _session_factory is None:
        _session_factory = sessionmaker(
            autocommit=False,
            autoflush=False,
            bind=get_engine(),
        )

    return _session_factory


def get_db_session() -> Generator[Session, None, None]:
    """FastAPI dependency for database access.

    Repositories receive a Session from this dependency. This keeps routers thin
    and prevents SQLAlchemy details from leaking into presentation code.
    """
    session = get_session_factory()()

    try:
        yield session
    finally:
        session.close()
