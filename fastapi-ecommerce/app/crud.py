# app/crud.py
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from . import models, schemas

# Criação do contexto de hashing com bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)  # Hash seguro da senha
    db_user = models.User(name=user.name, email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

# ITEM
def create_item(db: Session, item: schemas.Item, user_id: int):
   # Cria um novo item
    db_item = models.Item(
        user_id=user_id,
        product_name=item.product_name,
        product_type=item.product_type,
        price=item.price,
        description=item.description,
        s3_url=item.s3_url
    )

    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item