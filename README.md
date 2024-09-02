# Projeto de Trabalho de Conclusão de Curso

Este repositório contém um projeto frontend e um backend acerca de uma plataforma de e-commerce.

Esta plataforma será utilizada para a gravação de laboratórios explicando como funciona uma nuvem local, com LocalStack, e uma nuvem publica, como a AWS.

## O que é necessário antes de inicializar o frontend e o backend?

Node.JS instalado, caso não queira rodar com DOCKER
Python 3.+ instalado, caso não queira rodar com DOCKER
Docker, para rodar o FRONTEND, BACKEND e LOCALSTACK.
AWS CLI, para poder interagir com o LOCALSTACK.

## Comandos Importantes

Para inicializar o projeto FRONTEND, digitar no terminal: **npm start**

Para inicializar o projeto BACKEND, digitar no terminal: **uvicorn app.main:app --reload**

No projeto de FRONTEND, há um DOCKER-COMPOSE.YML (para o localstack) . Digitar no terminal: **docker-compose up**

Após feito isso, digitar no terminal **aws configure**. Preencher com:
test
test
us-east-1
json

## Avisos Importantes

A aplicação ainda não está 100% dockerizada. 

Esta aplicação usará, até então, localmente (com LocalStack):
* EC2, para simular as máquinas utilizadas na nuvem.  
* AWS S3, para guardar as imagens dos produtos.
* AWS Lambda, para rodar rotinas assíncronas conforme um Schedule configurado.
* RDS (se possível).
