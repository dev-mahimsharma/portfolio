const apiResponse = require("./apiResponse");

const isLoggedIn = (req, res,next) => {
    const token = req.cookies.awtToken;

    if (!token) {
        return res.json(new apiResponse(400, "Token does not exist"));
    }

    // verify a token symmetric - synchronous
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if(!decodedToken){
    return res.send(new apiResponse(400,"failed in creating token"))}

    req.user =decodedToken;
    // If token exists, proceed further
    res.send(new apiResponse(200, "Token value exists", { decodedToken }));
    next();
};

module.exports = isLoggedIn;