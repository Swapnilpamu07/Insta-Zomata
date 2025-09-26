import express from 'express';
import {foodpartnermiddleware} from '../middleware/auth.middleware.js'
import { Usersignup,Userlogin,Userlogout,foodPartnerlogout,FoodPartnerlogin,FoodPartnersignup } from '../controllers/userController.js';
const router=express.Router();

router.get('/',foodpartnermiddleware,(req,res)=>{
    res.send("hello")
})

// User Auth
router.post('/user/signup',Usersignup);
router.post('/user/login',Userlogin);
router.get('/user/logout',Userlogout);

//Food Partner Auth
router.post('/foodPartner/signup',FoodPartnersignup);
router.post('/foodPartner/login',FoodPartnerlogin);
router.get('/foodPartner/logout',foodPartnerlogout);

export default router;