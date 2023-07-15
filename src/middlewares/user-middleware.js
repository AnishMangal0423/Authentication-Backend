const { StatusCodes } = require("http-Status-Codes");
const AppError=require('../utils/errors/AppError')
const {Error_Res}=require('../utils/common');
const{user_Service}=require('../services')

async function checkAuth(req , res , next){

    try {
        
     const response=await  user_Service.isAuthenticated(req.headers['x-access-token']);

     if(response){

        req.user=response;
        next();
     }

    } catch (error) {
        
     return res
              .status(404)
              .json(error);

    }
}

module.exports={

    checkAuth
}