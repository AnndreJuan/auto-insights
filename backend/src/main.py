import sys
import logging
from typing import Optional
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from config import settings

# config of the log
logging.basicConfig(
    stream=sys.stdout,
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Iniciando aplicação...")
    yield
    logger.info("Encerrando aplicação...")

app = FastAPI(
    title="auto-insights-backend",
    version="1.0.0",
    docs_url="/docs" if settings.ENV == "DEV" else None,
    redoc_url="/redoc" if settings.ENV == "DEV" else None,
    openapi_url="/openapi.json" if settings.ENV == "DEV" else None,
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    
    print(f"""
    ╔══════════════════════════════════════╗
    ║   {settings.PROJETC_NAME} v{settings.VERSION}        ║
    ║   Servidor iniciando...              ║
    ╚══════════════════════════════════════╝
    """)
    
    uvicorn.run(
        "main:app",
        port=8000,
        log_level="info"
    )