import os
from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Environment
    env: str = "development"

    # Server
    host: str = "0.0.0.0"
    port: int = 7860

    # Model
    model_path: str = "models/best.pt"
    confidence_threshold: float = 0.5

    # CORS
    cors_origins: str = "*"

    @property
    def cors_origins_list(self) -> list[str]:
        if self.cors_origins == "*":
            return ["*"]
        return [origin.strip() for origin in self.cors_origins.split(",")]

    @property
    def is_production(self) -> bool:
        return self.env == "production"

    class Config:
        env_file = ".env.local"
        env_file_encoding = "utf-8"
        extra = "ignore"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
