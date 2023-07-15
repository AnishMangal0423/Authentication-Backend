const express=require('express')
const router=express.Router();
const airplane_routes=require('./airplane-routes');
const user_routes=require('./user-routes')


// router.get('/info' , Info);
router.use('/airplanes' , airplane_routes);
router.use('/signup' ,user_routes )


module.exports=router



