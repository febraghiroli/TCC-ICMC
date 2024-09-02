# app/main.py
from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware  # Importe o middleware de CORS
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite que todas as origens façam solicitações (pode ser restrito)
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (POST, GET, OPTIONS, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

# Dependency de sessão de banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email já registrado")
    return crud.create_user(db=db, user=user)

@app.post("/login")
def login_for_access_token(auth: schemas.Authenticate, db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, email=auth.email, password=auth.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"message": "Login bem-sucedido!", "user_id": user.id}

@app.post("/item")
def announce_item(item: schemas.Item, db: Session = Depends(get_db)):
    # Verifica se o user_id existe
    print(f'O item e: {item}')
    user = crud.get_user_by_email(db, email=item.user_email)

    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    return crud.create_item(db, item=item, user_id=user.id)

@app.get("/items", response_model=dict)
def get_products(
    page: int = Query(1, ge=1), 
    limit: int = Query(10, ge=1), 
    db: Session = Depends(get_db)
) -> dict:
    # Calcular o índice de início e fim para a paginação
    start = (page - 1) * limit
    end = start + limit

    # Buscar produtos do banco de dados usando o modelo `Item`
    total_items = db.query(models.Item).count()
    items = db.query(models.Item).offset(start).limit(limit).all()

    # Calcular o número total de páginas
    total_pages = (total_items + limit - 1) // limit

    # Estrutura de resposta com itens e total de páginas
    return {
        "items": [item for item in items],
        "totalPages": total_pages
    }
