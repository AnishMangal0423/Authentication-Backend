const { UserRepository } = require("../repository");
const AppError = require("../utils/errors/AppError");
const { StatusCodes } = require("http-Status-Codes");
const userRepository = new UserRepository();
const bcrypt=require('bcrypt')
const {Auth}=require('../utils/common');
const ServerConfig = require("../config/Server-config");
const jwt=require('jsonwebtoken')


async function createUser(data) {
  try {
    console.log("inside services");

    const user = await userRepository.create(data);
    //   console.log(airplane)

    return user;
  } catch (error) {
    console.log("There is some error in user create service ");

    if (error.name == "SequelizeValidationError" || error.name== 'SequelizeUniqueConstraintError') {
      let explanation = [];
      // console.log(error);
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      // console.log(explanation);

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new User object ",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}


async function signin(data){

    try{

        console.log('inside signin fn');
    const user = await userRepository.getUserByEmail(data.email);

  

    if(!user){

        throw new AppError(
            "Not any User Founf for this email ",
            StatusCodes.NOT_FOUND
          );        
    }

   const passwordMatch=Auth.checkPassword(data.password , user.password)


     if(!passwordMatch){

        throw new AppError(
            "Incorrect Password",
            StatusCodes.BAD_REQUEST
          );    
     }
     console.log("tokenb")
  const token= Auth.createToken({id:user.id , email:user.email})
  console.log("tokena")
   return token;
}
 catch(error){

    console.log(error);
    throw new AppError('something went wrong cant assign token' , StatusCodes.INTERNAL_SERVER_ERROR);
 }

}




async function checkPassword(plainPassword , encryptedPassword){

    try {
        return bcrypt.compareSync(plainPassword , encryptedPassword)

    } catch (error) {
        
        throw error;
    }
}


async function createToken(input){

    try {
        
   return jwt.sign(input , ServerConfig.JWT_SECRET , {expiresId: ServerConfig.JWT_EXPIRY})
    } catch (error) {
        
    }
}
module.exports={

    createUser,
    signin
}