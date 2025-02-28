const userModel = require("../schema/admin.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiResponse = require("../utilities/apiResponse.js"); // Ensure correct class name


const registerController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // ✅ Validate required fields
    if (!userName || !email || !password) {
      return res
        .status(400)
        .send(new apiResponse(400, "Please fill all fields"));
    }

    const User = await userModel.findOne({ email });
    if (User) {
      return res.send(new apiResponse(402, "user already exist"));
    }

    bcrypt.hash(password, 10, function async(err, hash) {
      if (err) {
        console.error(err);
        return;
      }
      const newUser = userModel.create({
        userName,
        email,
        password: hash,
      });
      if (!newUser) {
        return res.send(new apiResponse(500, "error in creating newUser"));
      }
      res.send(new apiResponse(200,"user created successfully ", newUser));
    });
  } catch (error) {
    console.error("Error occurred in register controller:", error);
    return res.status(500).send(new apiResponse(500, "Internal Server Error"));
  }

};

const loginController = async (req,res)=>{

  const {email , password}=req.body;
  if(!email || !password){
    return res.status(500).send(new apiResponse(500, "please enter all the credentials"));

  }

  const user =await userModel.findOne({email});
  if(!user){
    return res.status(500).send(new apiResponse(500, "user with this email does not exist"));
  }
 const checkingPassword = await bcrypt.compare(password, user.password);
 if(!checkingPassword){
  return res.status(500).send(new apiResponse(500, "password does not match"));
 }
  const token =jwt.sign({user:user._id}, process.env.JWT_SECRET);

  if(!token){
    return res.status(500).send(new apiResponse(500, "error while generating token"));
  }
  res.cookie("awtToken",token, {
    httpOnly: true, // Prevents client-side access via JavaScript
    secure: true, // Ensures the cookie is only sent over HTTPS (remove in development if not using HTTPS)
    sameSite: "Strict", // Controls cross-site behavior
    maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (1 day in this case)
  })
  res.send(new apiResponse(200, "user logged in successfully", {token}));
}
const logoutController =async (req,res)=>{
    req.cookies('awtToken', " ");
    return res.send(new apiResponse(200,"user logout successfully"))


}

// ✅ Correct export syntax
module.exports = { registerController ,loginController,logoutController };
