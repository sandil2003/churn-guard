import os
from pydantic_settings import BaseSettings

"""This will centralize the database connections(passwords and urls)"""

class Settings(BaseSettings):
    PROJECT_NAME: str = "ChurnGuard API"
    VERSION: str = "1.0.0"
    
    # MySQL Database Connection String
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "mysql+pymysql://root:password@localhost:3306/churn_db"
    )
    
    # Path to the XGBoost model saved by your ml_pipeline
    MODEL_PATH: str = "app/static/xgboost_churn_model.json"

settings = Settings()