# Use uma imagem base do Node.js para compilar o React
FROM node:14-alpine as build

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências do React
RUN npm install

# Copie o restante dos arquivos
COPY . .

# Crie a build de produção
RUN npm run build

# Usa a imagem do Nginx para servir a build
FROM nginx:alpine

# Copie o arquivo de configuração customizado do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie os arquivos de build do React para o Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponha a porta 80 para o Nginx
EXPOSE 80

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
