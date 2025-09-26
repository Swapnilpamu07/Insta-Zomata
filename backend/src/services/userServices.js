import jwt from "jsonwebtoken";

function setUser(user) {
  const payload = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
}
function getUser(token) {
  const user=jwt.verify(token,process.env.JWT_SECRET);
  return user;
}

export { setUser, getUser };
