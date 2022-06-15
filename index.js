const express = require("express");
const app = express();
const connection = require("./database/database");
const Users = require('./database/models/Users');
const Games = require("./database/models/Games"); 
const cors = require("cors");
const jwt = require("jsonwebtoken");
const auth = require('./middlewares/adminAuth');

const jwtSecret = "SaToppa@*k*ajgfkjaskflsldjkls";


app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
 
connection.authenticate().catch(err => console.log(err));
// route that game list. OK
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// router getting users. OK
app.get('/users', auth, (req, res) => {
   Users.findAll()
   .then(users => res.json(users))
   .catch(e => {
      res.sendStatus(404)
      console.log("Usuário não encontrado.")
   })
});

// router to create a user. OK
app.post('/users', auth, (req, res)=>{
   let {name, email, password} = req.body;
 
   if(name == undefined || email == undefined || password == undefined){
      res.sendStatus(400);
   }
   else{
      Users.create({
         name : name,
         email : email,
         password : password
      })
      .then(()=> res.sendStatus(200));
   }
});
 

// router getting games. OK
app.get('/games', auth, (req, res)=>{
   Games.findAll()
      .then(games => res.json(games))
         .catch(err => {
            res.sendStatus(500);
            console.log(err);
   })
});
 
// router to getting a game with your id. OK
app.get('/game/:id', auth, (req, res)=>{
 
   if(isNaN(req.params.id)){
      res.sendStatus(400);
   }
   else{
      let {id} = req.params;
      Games.findOne({where : {id : id}})
      .then(game => {
         if(game == null){
            res.sendStatus(404);
         }
         else{
            res.json(game);
         }
      })
      .catch(err => {
         console.log(err)
         res.sendStatus(500)
      });
 
   }
 
});
 
// router to create a game. OK
app.post('/game', auth, (req, res)=>{
   let {title, year, price} = req.body;
 
   if(title == undefined || year == undefined || price == undefined){
      res.sendStatus(400);
   }
   else{
      Games.create({
         title : title,
         year : year,
         price : price
      })
      .then(()=> res.sendStatus(200));
   }
});
 
// router to update a game with your id. OK
app.put('/game/:id', auth, (req, res)=>{
   let {title, year, price} = req.body;
   
   if(isNaN(req.params.id)){
      res.sendStatus(400);
   }
   else{
      let { id } = req.params;
      
      Games.findOne({where : {id : id}})
      .then((game)=> {
         if(game == null){
            res.sendStatus(404);
         }
         else{
            if(title != undefined){
               Games.update({title : title} ,{where : {id : id}});
            }
            if(year != undefined){
               Games.update({year : year} ,{where : {id : id}});
            }
            if(price != undefined){
               Games.update({price : price} ,{where : {id : id}});
            }
            
          res.sendStatus(200);
         }
      })
      .catch(err => {
         console.log(err);
         res.sendStatus(500);
      })
   }
});
 
// router to delete a game with your id. OK
app.delete('/game/:id', auth, (req, res)=>{
   if(isNaN(req.params.id)){
      res.sendStatus(400);
   }
   else{
      let { id } = req.params;
      
      Games.findOne({where : {id : id}})
      .then((game)=> {
         if(game == null){
            res.sendStatus(404);
         }
         else{
            Games.destroy({where : {id : id}})
            res.sendStatus(200);
         }
      })
      .catch(err => {
         console.log(err);
         res.sendStatus(500);
      });
   }
});

// authentication of email and password
app.post('/auth', auth, (req, res) => {
   var users = {email, password} = req.body;
   console.log(users)

   if(users.email != undefined){
      Users.findOne({where: {email : email, password: password}})
      .then(user => {
         console.log(user)
         if(user != undefined){
            if(user.password == password){

               jwt.sign({id: user.id, email: user.email}, jwtSecret, {expiresIn: "72h"}, (err, token) => {
                  if(err){
                     res.status(400);
                     res.json({err: "falha interna, entre em contato com o seu ADM"});
                  }else{
                     res.status(200);
                     res.json({token: token});
                  }
               });
            }else{
               res.status(401);
               res.json("Credenciais invalidas!");
            }
         }else{
            res.status(404);
            res.json({e: "Email não encontrado."})
         }
         }).catch(e => console.log(e, "Deu merda..."))
   }else{
      res.status(400);
      res.json({e: "email ou senha invalido"});
   }
});
 
app.listen(4567, () => {
    console.log("Conectado ao servidor: http://localhost:4567");
});

module.exports = jwtSecret;