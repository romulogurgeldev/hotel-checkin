# Etapa 1: Build da aplicação
FROM node:18 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install --legacy-peer-deps

# Copia o código-fonte
COPY . .

# Compila o projeto Angular para produção
RUN npm run build -- --configuration production

# Etapa 2: Servir a aplicação
FROM nginx:alpine

# Copia o arquivo de configuração personalizado do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos compilados para o diretório do Nginx
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]