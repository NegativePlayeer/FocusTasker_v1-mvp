from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True)
    username = Column(String, unique=True)
    first_name = Column(String)
    surname = Column(String)
    hashed_password = Column(String)
    role = Column(String)
    is_active = Column(Boolean, default=False)
    tasks = relationship('Task', back_populates='owner')
