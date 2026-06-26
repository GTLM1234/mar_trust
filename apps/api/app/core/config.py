from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables.

    Secrets belong only on the backend. Any value that starts with VITE_ is
    public by design and must never contain database URLs or private keys.
    """

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "MarTrust API"
    app_version: str = "0.1.0"
    api_v1_prefix: str = "/api/v1"
    environment: str = Field(default="local", alias="APP_ENV")
    frontend_origin: str = Field(
        default="http://localhost:5173",
        alias="FRONTEND_ORIGIN",
    )
    database_url: str | None = Field(default=None, alias="DATABASE_URL")
    jwt_secret_key: str | None = Field(default=None, alias="JWT_SECRET_KEY")
    access_token_expire_minutes: int = Field(
        default=30,
        alias="ACCESS_TOKEN_EXPIRE_MINUTES",
    )
    refresh_token_expire_days: int = Field(
        default=7,
        alias="REFRESH_TOKEN_EXPIRE_DAYS",
    )

    @property
    def is_local(self) -> bool:
        return self.environment.lower() in {"local", "development", "dev"}


@lru_cache
def get_settings() -> Settings:
    """Cache settings so dependency injection remains cheap and predictable."""
    return Settings()
