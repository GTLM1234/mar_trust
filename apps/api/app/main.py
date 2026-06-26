from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.config import get_settings


def create_app() -> FastAPI:
    """Create the FastAPI application.

    This composition root wires infrastructure concerns only. Business rules
    should live in services so routers stay thin and easy to test.
    """
    settings = get_settings()

    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        docs_url="/docs" if settings.is_local else None,
        redoc_url="/redoc" if settings.is_local else None,
    )

    # Keep CORS explicit per environment. Never allow "*" with credentials in
    # production because the frontend will send authenticated requests later.
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[settings.frontend_origin],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api_router, prefix=settings.api_v1_prefix)
    return app


app = create_app()
