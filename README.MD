# APIREST 

-   essa é uma APIRest que fiz usando axios e jwt, além de banco MySQL e Sequelize para manipular o banco.
-   Nela é possível adicionar novos jogos, ler, deletar e atualizar por exemplo. seguindo um CRUD (Create, Read, Update, Delete) completo. 

## Iniciando

-   Para iniciar é bem simples, primeiramente iremos rodar o comando: 
*       npm i
-   Com isso ele irá baixar todos os pacotes de dependências que estão no package.json, necessarios para que o projeto funcione 100%.

## Configure seu banco

-   Para configurar o seu banco, basta criar um novo schema chamado "apirest"
-   rode o comando no dentro do projeto no terminal: 
*       npm start
* Obs:
-   "dentro do novo schema, crie uma tabela chamada games e outra chamada users caso elas não sejam criadas ao você rodar npm start no console."

-   no diretorio database/database.js, altere as informação para as do seu banco, ex:
    const sequelize = require('sequelize');
    const connection = new sequelize('nomebanco', 'seuUsuario', 'suaSenha', {
        dialect: 'mysql',
        host: 'localhost',
        timezone: '-03:00'
    });

    module.exports = connection;

## Rode o projeto

-   Feito as configurações, basta rodar o comando.
*       npm start
-   Se tudo de certo, abra seu postman e faça os testes, lembando de sempre por o padrão JSON.
- Segue um exemplo:<br>
<img align="center" alt="postman" height="160" width="380" src="./img/postman.png"><br>

-   Usando Get, rotas: /users, /games, /game/:id (pega um jogo especifico pelo id)
-   Usando Post: /users, /games, /auth