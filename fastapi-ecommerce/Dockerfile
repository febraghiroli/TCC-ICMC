# Use uma imagem base leve do Alpine Linux com Python 3.9
FROM python:3.9-alpine

# Instale as dependências do sistema necessárias
RUN apk add --no-cache gcc musl-dev libffi-dev postgresql-dev

# Define o diretório de trabalho dentro do contêiner
# WORKDIR /app

# Copie o arquivo de dependências para o contêiner
COPY requirements.txt .

# Instale as dependências do Python
RUN pip install --no-cache-dir -r requirements.txt

# Copie o código da aplicação
COPY . .

# Exponha a porta que o FastAPI usará
EXPOSE 8000

# Comando para iniciar o FastAPI
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
