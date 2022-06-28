# APIREST

- essa é uma APIRest que fiz usando axios e jwt, além de banco MySQL e Sequelize para manipular o banco.
- Nela é possível adicionar novos jogos, ler, deletar e atualizar por exemplo. seguindo um CRUD (Create, Read, Update, Delete) completo.
<hr>

## Iniciando

- Para iniciar é bem simples, primeiramente iremos rodar o comando:

*       npm i

- Com isso ele irá baixar todos os pacotes de dependências que estão no package.json, necessarios para que o projeto funcione 100%.
<hr>

## Configure seu banco

- Para configurar o seu banco, basta criar um novo schema chamado "apirest"
- rode o comando no dentro do projeto no terminal:

*       npm start
* Obs:

- "dentro do novo schema, crie uma tabela chamada games e outra chamada users caso elas não sejam criadas ao você rodar npm start no console."

- no diretorio database/database.js, altere as informação para as do seu banco, ex:
  const sequelize = require('sequelize');
  const connection = new sequelize('nomebanco', 'seuUsuario', 'suaSenha', {
  dialect: 'mysql',
  host: 'localhost',
  timezone: '-03:00'
  });

  module.exports = connection;
  <hr>

## Edpoints

### POST /users
- Esse endpoint é responsavél por criar um usuário através da rota http://localhost:4567/users com o method POST dentro do POSTMAN.
- Vale ressaltar que eu removi a permição auth dentro da index.js na rota de criar e visualizar os usuários devido a se tiver você não conseguir criar, nem ver os usuários no começo, após criar seu usuário você pode retornar com o "auth" bloqueando quem não tenha login de visualizar as rotas.

<img align="center" alt="createuser" height="160" width="380" src="./img/createuser.png"><br>
<img align="center" alt="removeauth" height="160" width="380" src="./img/removeauth.png"><br>

- Após ter criado o usuário e logado através da rota http://localhost:4567/auth (para authenticar que você está logado e tem as permissões) ele irá gerar um token, você irá copiar e colar dentro de authorization no POSTMAN para conseguir editar/deletar/criar games.

<img align="center" alt="authpostmantoken" height="160" width="380" src="./img/authpostmantoken.png"><br>

- você irá conseguir criar os games através da index.html, porém antés você precisará alterar o seu token, e ai sim, criar/editar/deletar os games no seu navegador.

<img align="center" alt="authtokenindex" height="160" width="380" src="./img/authtokenindex.png"><br>

### parametros
- name: nome do usuário que irá ser cadastrado
- email: email do usuário que irá ser cadastrado
- password: senha do usuário que irá ser cadastrado
Exemplo:
```
{
    "name": "joaovt",
    "email": "teste@gmail.com.br",
    "password": 1234
}
```
#### Respostas
##### Ok! > Status 200
- Caso esse seja a resposta retornada, significa que ocorreu tudo certo e que o usuário foi cadastrado no banco.
##### nome, e-mail ou senha incorreto! > 400
- Caso esse erro ocorra, significa que algum dos pârametros foi passado errado
<hr>


### Get /games
- Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados.
#### Parametros
- Nenhum 
#### Respostas
##### Ok! > Status 200
- Caso esse seja a resposta retornada, significa que ocorreu tudo certo e você recebrá a listagem de game do banco.
Exemplo de resposta:
```
[
    {
        "id": 1,
        "title": "GTA V",
        "year": 2013,
        "price": "35",
        "createdAt": "2022-06-23T18:48:27.000Z",
        "updatedAt": "2022-06-23T18:48:27.000Z"
    },
    {
        "id": 2,
        "title": "The witcher 3",
        "year": 2015,
        "price": "40",
        "createdAt": "2022-06-23T18:57:43.000Z",
        "updatedAt": "2022-06-23T18:57:43.000Z"
    },
    {
        "id": 3,
        "title": "The Crew 2",
        "year": 2015,
        "price": "200",
        "createdAt": "2022-06-25T00:05:50.000Z",
        "updatedAt": "2022-06-27T19:53:30.000Z"
    }
]
```
##### Falha na autenticação! > status 401
- Casso essa seja a resposta retornada, significa que ocorreu alguma falha durante o processo de autenticação da requisição, motivo: Token errado.
Exemplo de resposta:
```
{
    "err": "token invalido."
}
```
<hr>

### Get /game/:id
- Esse endpoint é responsável por retornar a listagem de um game especifico através do id.
#### Parametros
- Id do game na rota: 
Exemplo:
-   http://localhost:4567/game/2 
#### Respostas
##### Ok! > Status 200
- Caso esse seja a resposta retornada, significa que ocorreu tudo certo e você recebrá a listagem do game daquele ID.
Exemplo de resposta:
```
[
    {
        "id": 2,
        "title": "The witcher 3",
        "year": 2015,
        "price": "40",
        "createdAt": "2022-06-23T18:57:43.000Z",
        "updatedAt": "2022-06-23T18:57:43.000Z"
    }
]
```
##### Falha na autenticação! > status 400
- Casso essa seja a resposta retornada, significa que o jogo não foi encontrado.
Exemplo de resposta:
```
Not Found
```
<hr>

### GET /users
- Esse endpoint é responsável por retornar todos os usuários cadastrados
#### Parametros
- Nenhum
#### Respostas
##### Ok! > Status 200
- Caso esse seja a resposta retornada, significa que ocorreu tudo certo e você recebrá todos os usuários cadastrados.
Exemplo de resposta:

```
[
    {
        "id": 1,
        "name": "joaovt",
        "email": "teste@gmail.com",
        "password": 1234,
        "createdAt": "2022-06-23T18:22:39.000Z",
        "updatedAt": "2022-06-23T18:22:39.000Z"
    }
]
```
##### Falha na autenticação! > status 404
- Casso essa seja a resposta retornada, significa que não existe nenhum usuário cadastrado no banco.
```
[]
```

<hr>

### POST /auth
- Esse endpoint é responsável por fazer o processo de login.
#### Parametros
- email: E-mail do usuário cadastrado no sistema 
- password: Senha do usuário cadastrado no sistema.
Exemplo:

```
{
    "email": "teste@gmail.com",
    "password": 1234
}
```
#### Respostas
##### Ok! > Status 200
- Caso esse seja a resposta retornada, significa que ocorreu tudo certo e você recebrá o token JWT para acessar endpoints protegidos na API.
Exemplo de resposta:

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0ZUBnbWFpbC5jb20iLCJpYXQiOjE2NTY0MTQ5NjcsImV4cCI6MTY1NjgxMDk2N30.RCjoPvbdi23Gj8IEgjnusEDP2pHOiPyMwA66LvDDtV4"
}
```
##### Falha na autenticação! > status 401
- Casso essa seja a resposta retornada, significa que ocorreu alguma falha durante o processo de autenticação da requisição, Motivo: E-mail ou senha incorretos.
Exemplo de resposta:
```
{
    e: 'Email não encontrado.' 
}
```

<hr>

### POST /game
- Esse endpoint é responsável por criar um novo game.
#### Parametros
- title: Titulo do jogo que irá cadastrar
- year: ano do jogo que irá cadastrar
- price: preço do jogo que irá cadastrar 
Exemplo:

```
{
    "title": "Red Dead 2",
    "year": "2019",
    "price": "199.90"
}
```
#### Respostas
##### Ok! > Status 200
- Caso esse seja a resposta retornada, significa que ocorreu tudo certo e que o game foi cadastrado com sucesso.
Exemplo de resposta:

```
Ok
```
##### Falha na interna! > status 400
- Casso essa seja a resposta retornada, significa que algo deu errado, geralmente o erro está nos pâramtros passado.
Exemplo de resposta:
```
Bad Request
```

<hr>

### PUT /game/:id
- Esse endpoint é responsável por atualizar um game.
#### Parametros
- title: Titulo novo do game
- year: ano do game
- price: preço novo do game
Exemplo:
- http://localhost:4567/game/2

```
{
    "title": "Red Dead 2",
    "year": "2019",
    "price": 199.90
}
```
#### Respostas
##### Ok! > Status 200
- Caso esse seja a resposta retornada, significa que ocorreu tudo certo e que o game foi atualizado com sucesso.
Exemplo de resposta:

```
Ok
```
##### Falha na interna! > status 400
- Casso essa seja a resposta retornada, significa que algo deu errado, geralmente o erro está nos pâramtros passado
Exemplo de resposta:
```
Bad Request
```

<hr>

## Rode o projeto

- Feito as configurações, basta rodar o comando.

*       npm start

- Se tudo de certo, abra seu postman e faça os testes, lembando de sempre por o padrão JSON.
- Segue um exemplo:<br>
  <img align="center" alt="postman" height="160" width="380" src="./img/postman.png"><br>
