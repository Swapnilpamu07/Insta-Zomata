import express from 'express'
import { foodpartnermiddleware,userAuthMiddleware} from '../middleware/auth.middleware.js';
import { createfood,upload,getfood,getfoodPartnerProfile} from '../controllers/foodController.js';
import multer from 'multer'
const router=express.Router();

router.post('/',foodpartnermiddleware,upload.single("video"),createfood)
router.get('/getfood',userAuthMiddleware,getfood);
router.get('/:id',getfoodPartnerProfile);
export default router;