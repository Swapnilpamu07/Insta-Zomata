import jwt from "jsonwebtoken";

function setfoodpartner(user) {
  const payload = {
      id:user._id,
     restaurantName: user.restaurantName,
     ownerName: user.ownerName,
     businessEmail: user.businessEmail,
     phoneNo: user.phoneNo
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
}
function getfoodpartner(token) {
  const user=jwt.verify(token,process.env.JWT_SECRET);
  return user;
}

export { setfoodpartner, getfoodpartner };
