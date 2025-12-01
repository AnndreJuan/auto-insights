import json
import logging
from contextlib import contextmanager
from typing import Any, Optional

from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.types import TypeDecorator, Text

from ..config import settings

logger = logging.getLogger(__name__)

class JSONField(TypeDecorator):
    impl = Text
    cache_ok = True

    def process_bind_param(self, value: Optional[Any], dialect) -> Optional[str]:
        if value is None:
            return None
        return json.dumps(value)
    
    def process_result_value(self, value: Optional[str], dialect) -> Optional[Any]:
        if value is None:
            return None     
        return json.loads(value)
 
DATABASE_URL = settings.DATABASE_URL

connect_args = {}
if "sqlite" in DATABASE_URL:
    connect_args = {"check_same_thread": False}

engine = create_engine(
    DATABASE_URL,
    echo=False,
    connect_args=connect_args,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(
    bind=engine, 
    autocommit=False,
    autoflush=False
)

Base = declarative_base()
metadata_obj = MetaData()

@contextmanager
def get_session():
    db = SessionLocal()
    try:
        yield db
        db.commit()
    except Exception as e:
        db.rollback()
        logger.error(f"Database error: {e}")
        raise
    finally:
        db.close() 

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()