# app/models.py
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)  # Relacionamento com a tabela `users`
    product_name = Column(String, index=True, nullable=False)
    product_type = Column(String, index=True, nullable=False)
    price = Column(String, nullable=False)
    description = Column(String, nullable=False)
    s3_url = Column(String, nullable=False)

    # Relacionamento com o modelo `User`
    user = relationship("User")