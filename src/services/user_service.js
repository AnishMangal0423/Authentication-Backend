const { UserRepository } = require("../repository");
const AppError = require("../utils/errors/AppError");
const { StatusCodes } = require("http-Status-Codes");
const userRepository = new UserRepository();




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

module.exports={

    createUser
}