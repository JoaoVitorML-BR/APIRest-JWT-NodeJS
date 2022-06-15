const jwt = require("jsonwebtoken");
const jwtSecret = "SaToppa@*k*ajgfkjaskflsldjkls";

function auth(req, res, next){
    const authToken = req.headers['authorization'];
    console.log(authToken)
    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];

        jwt.verify(token, jwtSecret, (err, data) => {
            if(err){
                res.status(401);
                res.json({err: "token invalido."});
            }else{
                req.token = token;
                req.loggeduser = {id: data.id, email: data.email};
                next();
            }
        });
    }else{
        res.status(401);
        res.json({err: "token invalido."});
    };
};

module.exports = auth;