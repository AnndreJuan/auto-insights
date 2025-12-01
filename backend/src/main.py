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
    docs_url=None if settings.env else "/docs",
    redoc_url=None if settings.env else "/redoc",
    openapi_url=None if settings.env else "/openapi.json",
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
    ║   {settings.APP_NAME} v{settings.VERSION}        ║
    ║   Servidor iniciando...              ║
    ╚══════════════════════════════════════╝
    """)
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        log_level="info"
    )