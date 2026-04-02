from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

"""
    In relationship() you have to write a name of the class: class NAME(Base)
    And for back_populates it is name of the field in a table
"""

class Task(Base):
    __tablename__ = 'tasks'
    #A name of the foreign key is the name of the __tablename__
    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey('users.id'))
    title = Column(String)
    description = Column(String)
    priority = Column(Integer)
    is_completed = Column(Boolean, default=False)
    owner = relationship('User', back_populates='tasks')
    subtasks = relationship('Subtask', back_populates='parent_task', cascade='all, delete-orphan')

class Subtask(Base):
    __tablename__ = 'subtasks'

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey('tasks.id'))
    title = Column(String)
    is_completed = Column(Boolean, default=False)
    parent_task = relationship('Task', back_populates='subtasks')
