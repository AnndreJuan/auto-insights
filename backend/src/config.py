


class Settings:
    PROJETC_NAME: str = "Auto Insights"
    VERSION: str = "1.0.0"
    API_URL: str = "/api/v1"
    ENV: str = "DEV"
    
    CORS_ORIGINS: list = ["*"]


    DATABASE_URL: str = "sqlite:///app.db"


setttings = Settings()