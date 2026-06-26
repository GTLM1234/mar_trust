from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """Base class for SQLAlchemy models.

    Domain models will inherit from this class once the ER model is approved.
    """
