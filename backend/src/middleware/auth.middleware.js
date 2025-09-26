import { get } from "http";
import { getUser } from "../services/userServices.js"
import { getfoodpartner } from "../services/foodPartnerServices.js";
import foodPartner from "../model/foodPartnerMode.js";
async function foodpartnermiddleware(req,res,next){
    const token=req.cookies.foodPartnertoken;
    if(!token) return res.send("Pls Singup")
    const user=await getfoodpartner(token)
    if (!user) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.foodpartner=user;
    next();
}
async function userAuthMiddleware(req,res,next) {
    const token=req.cookies.Usertoken;
    console.log(token)
    if(!token) return res.send("Pls Login");
    const user=await getUser(token);
    if (!user) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.User=user;
    next();
}
export {foodpartnermiddleware,userAuthMiddleware}