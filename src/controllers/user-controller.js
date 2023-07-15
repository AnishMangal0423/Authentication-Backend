const { user_Service } = require("../services");
const { Error_Res, Correct_Res } = require("../utils/common");
const correct_res = require("../utils/common/correct_response");

/***
 * Post - : /signup
 * req-body {email :'aa@gmail.com , password : '1234'}
 */

async function MakeUser(req, res) {
  try {
    console.log("inside controller");

    const user = await user_Service.createUser({
      email: req.body.email,
      password: req.body.password,
    });

    Correct_Res.data = user;

    return res.json({
      Correct_Res,
    });
  } catch (error) {
    // console.log("hiiii  " + error);

    Error_Res.message = " Something went wrong .. ";
    // Error_Res.message=

    Error_Res.Error.description = error.message;

    return res.status(error.statuscode).json({
      Error_Res,
    });
  }
}


module.exports={

    MakeUser
}