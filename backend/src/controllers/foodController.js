import multer from "multer";
import { upload_video } from "../APIs/storage.api.js";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import foodModel from "../model/food.model.js";
import foodPartner from "../model/foodPartnerMode.js";

const upload = multer();

async function createfood(req, res) {
  console.log("Body:", req.file);
  console.log("UUID:-"+uuidv4());
   console.log("FoodPartner at save:", req.foodpartner);

  const video=await upload_video(req.file.buffer,uuidv4());

  const data=await foodModel.create({
    name:video.name,
    video:video.url,
    desc:req.body.desc,
    foodPartner:req.foodpartner.id
  })
  res.status(200).json({
    message:"Uploaded Sucessfully",
    data:data
  })
}
async function getfood(req,res) {
  const data=await foodModel.find({});
  res.json({
    data:data
  })
}

async function getfoodPartnerProfile(req,res) {
  const id=req.params.id;
  const food=await foodModel.findOne({_id:id});
  const foodPartner_id=food.foodPartner;
  const foodPartnerVideo=await foodModel.find({foodPartner:foodPartner_id})
  console.log(foodPartnerVideo)
  const foodPartnerProfile=await foodPartner.findOne({_id:foodPartner_id})
  res.status(201).json({
    message:"profile fetched sucessfully",
    food:food,
    profile:foodPartnerProfile,
    foodPartnerVideos:foodPartnerVideo
  })
}
export { createfood, upload ,getfood,getfoodPartnerProfile};
