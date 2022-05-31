const { request, response } = require("express");
const expressModule = require("express");
const app = expressModule();
app.use(expressModule.json());
const Joi = require("joi");

const cors = require("cors");
app.use(cors());
app.options("/getimages", cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const mongoose = require("mongoose");
const signup_collection = require("./monogDB/signup");
const signup_model = signup_collection.signup_model;

const project_collection = require("./monogDB/project");
const proj_model = project_collection.proj_model;
///////COnennecting to database
mongoose
  .connect(
    "mongodb+srv://Popeyeee:Lordqwe1234.@cluster0.ssl2b.mongodb.net/Edx?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then((res) => {
    console.log("Connection Successfull to db");
  })
  .catch((err) => {
    console.log(err);
  });

var all_data = [];
var p_data = [];
const fileModule = require("fs");

app.get("/", (request, response) => {
  proj_model.find().then((proj) => {
    console.log("Success");
    result = JSON.stringify(proj);
    proj = JSON.parse(result);
    result = proj;
    response.send(result);
  });
});

app.put("/getimages", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let img = req.body.img;
  // console.log(img);
  var imge = fileModule.readFileSync(img, {
    encoding: "base64",
  });
  res.send("data:image/png;base64," + imge);
});

app.post("/login", (req, res) => {
  // console.log("Login called" + req.body.email + "   " + req.body.password);
  var _email = req.body.email;
  var _password = req.body.password;
  signup_model
    .findOne({ email: _email, password: _password })
    .then((result) => {
      // console.log("result isssssss");
      // console.log(result);
      if (result) res.send("Successfull");
      else res.send("Username or password is incorrect");
    });
});

app.post("/signup", (req, res) => {
  // console.log("Post method called");
  const error = validate_signup(req.body);
  if (error) {
    //  console.log(error);
    res.send("Error occured" + error);
    return;
  }
  let temp = req.body;
  //console.log(temp);

  var signup_obj = new signup_model(temp);

  signup_obj
    .save()
    .then(() => {
      //   console.log("sucessfully added new project");
      response.send("sucessfully added new project");
    })
    .catch((err) => {
      //   console.log(err);
      response.send(err);
    });

  //response.send(add_proj);
  /*
  fileModule.readFile("signup.json", (error, filecontent) => {
    if (error) {
      console.log(error);
      return;
    }

    const arr = JSON.parse(filecontent);

    arr.push(req.body);
    let jsonStr = JSON.stringify(arr);

    fileModule.writeFile("signup.json", jsonStr, () => {
      console.log("end");
    });
  });
  */
  res.send("Sign Up successful");
});
app.listen(3000 || process.env.PORT, () => {
  console.log("Server started ! Listining at port 3000");
});
function validate_signup(params) {
  var strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  const schema = Joi.object({
    full_name: Joi.string().min(3).max(50).required(),
    public_name: Joi.string().required().min(3).max(30),
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(strongRegex)
      .message(
        "Password must contain 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
      ),
    country: Joi.string().required(),
  });
  const result = schema.validate(params);
  return result.error;
}
