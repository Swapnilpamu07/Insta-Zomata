import mongoo from "mongoose";

function connect() {
  mongoo.connect(process.env.MONGOO_URL)
    .then(()=>{
      console.log("Mongoo Connected");
    })
    .catch((e) => {
      console.log(e);
    });
}
export default connect;
