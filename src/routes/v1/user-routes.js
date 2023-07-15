const {makeUser}=require('../../controllers');
// const {ModelNumber}=require('../../middlewares');
const express=require('express');


const router=express.Router();


router.post('/' ,  makeUser.MakeUser);



module.exports=router;