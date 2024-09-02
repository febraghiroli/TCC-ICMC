# app/schemas.py
from pydantic import BaseModel

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class Authenticate(BaseModel):
    email: str
    password: str

class Item(BaseModel):
    user_email: str
    description: str
    s3_url: str
    product_name: str
    product_type: str
    price: str