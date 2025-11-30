import json
import logging
from contextlib import contextmanager
from sqlalchemy import create_engine, MetaData, types
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from typing import Any, Optional
from sqlalchemy.sql.type_api import _T
from ..config import setttings


class JSONFiel(types.TypeDecorator):
    impl = types.Text
    cache_ok = True

    def process_bind_param(self, value: Optional[_T], dialect) -> Any:
        return json.dumps(value)
    
    def process_result_value(self, value: Optional[_T], dialect) -> Any:
        return json.loads(value) if value else None


DATABASE_URL = setttings.database_url

engine = create_engine(
    DATABASE_URL,
    echo=False,
    connect_arg={"check_same_thread": False} if "sqlite" in DATABASE_URL else {},
)

SessionLocal = sessionmaker(bind=engine, autocommiut=False, autoflush=False)
Base = declarative_base()
metada_obj = MetaData()


@contextmanager
def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()