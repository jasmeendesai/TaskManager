const UserModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { SECRET_KEY } = process.env;


const hashPassWord = async (password) => {
    try {
        const saltRounds = 10;
        const hasspassword = await bcrypt.hash(password, saltRounds);
        return hasspassword;

    } catch (error) {
        res.status(500).send({ status: false, message: "hashpassword error" })
    }
}

const comparePassword = async (password, hashpassword) => {
    return bcrypt.compare(password, hashpassword);
};

//Route 1 : Register User - No Login required
const register = async (req, res) => {
  try {
    // const data = req.body
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ status: false, message: "Enter the required fields" });
    }


    //duplicate email validation
    const emailExist = await UserModel.findOne({ email: email });
    if (emailExist) {
      return res
        .status(400)
        .send({ status: false, message: "Email is already is registered" });
    }

    //password validation
    if (password.length < 5 || password.length > 15) {
      return res
        .status(400)
        .send({ status: false, message: "Enter the valid password" });
    }
    //encrypt password
    req.body.password = await hashPassWord(req.body.password);

    const createUser = await UserModel.create(req.body);

    const token = jwt.sign(
      { userId: createUser._id, exp: 7560606060 },
      SECRET_KEY
    );
    return res.status(201).send({
      status: true,
      message: "Registration completed Successfully",
      token: token,
      data: createUser,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//Route 2 : User login function - No login required

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ status: false, message: "Enter the user Credential" });
    }


    //password validation
    if (password.length < 5 || password.length > 15) {
      return res
        .status(400)
        .send({ status: false, message: "Enter the valid password" });
    }
    //find user using emailId
    const user = await UserModel.findOne({ email: email });
    if(!user) {
      return res
      .status(400)
      .send({ status: false, message: "Enter the valid user credentials" }); 
     }

    const passwordStatus = await comparePassword(password, user.password)

    if(!passwordStatus) {
        return res
        .status(400)
        .send({ status: false, message: "Enter the valid user credentials" }); 
    }
    const token = jwt.sign(
        { userId: user._id, exp: 7560606060 },
        SECRET_KEY
      );
      return res
      .status(200)
      .send({ status: true, message: "User loggedin successfully" , userId : user._id, token: token}); 
    
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};


module.exports = { register, login };