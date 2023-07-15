const express=require('express')
const router=express.Router();
const {Info}=require('../../controllers')
const airplane_routes=require('./airplane-routes');
const user_routes=require('./user-routes')
const{CheckAuth}=require('../../middlewares')



router.get('/info' ,CheckAuth.checkAuth, Info.info);
router.use('/airplanes' , airplane_routes);
router.use('/user' ,user_routes )


module.exports=router



