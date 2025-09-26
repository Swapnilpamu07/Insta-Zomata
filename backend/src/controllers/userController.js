import User from "../model/userModel.js";
import foodPartner from "../model/foodPartnerMode.js";
import bcrypt, { hash } from "bcryptjs";
import cookieParser from "cookie-parser";
import { setUser, getUser } from "../services/userServices.js";
import { setfoodpartner, getfoodpartner } from "../services/foodPartnerServices.js";
async function Usersignup(req, res) {
  console.log("Hello");
  if (!req.body) res.status(400).send("No data");
  const { firstName, lastName, email, password } = req.body;
  const ifUserExist = await User.findOne({
    email: email,
  });
  console.log(ifUserExist);
  if (ifUserExist) {
    res.status(400).send("User Email Already Exist");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedpass = await bcrypt.hash(password, salt);
  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedpass,
  });
  const token = await setUser(user);
  res.cookie("Usertoken", token);
  res.end();
}

async function Userlogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email,
  });
  if (!user) return res.status(400).send("No user Exist ");
  const hashedpass = await bcrypt.compare(password, user.password); // true
  if (!hashedpass) {
    return res.status(400).send("Wrong Password");
  }
  const token = await setUser(user);
   res.cookie("Usertoken", token);
  res.send({ messgae: "User Logeed IN Sucessfully" });
}

async function Userlogout(req, res) {
  res.clearCookie("Usertoken");
  res.status(200).send({
    message: "User Logout Sucessfully",
  });
}

async function FoodPartnersignup(req, res) {
  console.log(req.body)
  if (!req.body) return res.status(400).send({ message: "No data" });
  const { restaurantName, ownerName, businessEmail,phoneNo,businessAdd,password } = req.body;
  const ifUserExist = await foodPartner.findOne({ businessEmail });
  if (ifUserExist)
    return res.status(400).send({ message: "User Already Exist" });
  const salt = await bcrypt.genSalt(10);
  const hashedpass = await bcrypt.hash(password, salt);
  const user = await foodPartner.create({
    restaurantName,
    ownerName,
    businessEmail,
    phoneNo,
    businessAdd,
    password: hashedpass,
  });
  const token = await setfoodpartner(user);
  res.cookie("foodPartnertoken", token);
  res.status(201).send({ message: "User registered sucessfully" });
}

async function FoodPartnerlogin(req, res) {
  console.log(req.body)
  if (!req.body) return res.status(400).send({ message: "No data" });
  const { email, password } = req.body;
  const user = await foodPartner.findOne({businessEmail:email});
  if (!user) return res.status(401).send({ message: "NO user found" });
  const hashedpass = await bcrypt.compare(password, user.password); // true
  if (!hashedpass)
    return res.status(400).send({ message: "Wrong email or password" });
  const token = await setfoodpartner(user);
  res.cookie("foodPartnertoken", token);
  
    res.status(201).send({ message: "User loggedIn" });
}

async function foodPartnerlogout(req, res) {
  res.clearCookie("foodPartnertoken");
  res.status(200).send({
    message: "User Logout Sucessfully",
  });
}
export {
  Usersignup,
  Userlogin,
  Userlogout,
  FoodPartnerlogin,
  FoodPartnersignup,
  foodPartnerlogout,
};
