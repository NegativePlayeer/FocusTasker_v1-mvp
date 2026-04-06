from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_API_KEY: str
    DEBUG_MODE: bool = False
    ANTHROPIC_KEY: str

    model_config = SettingsConfigDict(env_file='.env')

settings = Settings()