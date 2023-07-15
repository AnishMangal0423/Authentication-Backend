const {  makeUser}=require('../../controllers');
// const {ModelNumber}=require('../../middlewares');
const express=require('express');


const router=express.Router();


router.post('/signup' ,  makeUser.MakeUser);
router.post('/signin' ,makeUser.signin)



module.exports=router;