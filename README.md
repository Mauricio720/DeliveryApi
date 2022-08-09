# Instalação do projeto

## Descrição do projeto
Esse projeto foi desenvolvido cpm o objetivo de treinar e estudar o Node com o typescript e ao mesmo tempo estudar o React com typescript e usar no front-end. O projeto Frontend dessa api se encontra nesse endereço https://github.com/Mauricio720/DeliveryFront, basta seguir as instruções e instalar se desejar.

## Agora instale os pacotes necessários
Os pacotes do node foram utilizado globalmente no desenvolvimento desse projeto, por essa razão,  você precisa instalar o ambiente node utilizando os comandos abaixo:

npm install -g typescript
npm install -g ts-node
npm install -g nodemon
npm install -D tslib @types/node

Após isso use o comando npm start para instalar o restante das dependencias.


## Configuração do banco de dados
Primeiro abra o arquivo .env e coloque as informações do banco de dados local ou do servidor de sua preferência. Após colocar as informações do seu banco de dados mysql
faça o passo abaixo

## Migration e seeders
Esse projeto tem as migrations e as seeders necessárias para já criar o projeto no banco de dados de sua preferência]. Use os comandos abaixo:

npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

Agora só usar o comando npm start e rodar a api.
