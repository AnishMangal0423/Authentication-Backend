const {info}= require('./Info-controller.js')
const express=require('express');


module.exports={

    Info:require('./Info-controller.js'),
    makeAirplane:require('./airplane_controller.js'),
    makeUser:require('./user-controller.js')

}