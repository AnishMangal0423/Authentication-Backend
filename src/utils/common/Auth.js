
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {Server_config}=require('../../config')

// find why i am using non-async fns-
function checkPassword(plainPassword , encryptedPassword){

    try {
        return bcrypt.compareSync(plainPassword , encryptedPassword)

    } catch (error) {
        
        throw error;
    }
}


 function createToken(input){

    try {
        console.log(Server_config.JWT_EXPIRY)

        return jwt.sign(input , Server_config.JWT_SECRET , {expiresIn: "1h"})

         
    } catch (error) {
        
        throw error;
    } 
} 

module.exports={

    checkPassword,
    createToken
}