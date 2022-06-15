function auth(req, res, next){
    const authToken = req.headers['autorization'];
    console.log(authToken);
    next();
}

module.exports = auth;