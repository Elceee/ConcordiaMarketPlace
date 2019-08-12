let express = require("express");
let app = express();
let reloadMagic = require("./reload-magic.js");
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
app.use("/uploads", express.static("uploads"));
let dbo = undefined;
let url = "To be determined"; //We have to add something here.
reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  if (err) {
    console.log(err);
  }
  dbo = db.db("To be determined"); //Let's choose a name to add here.
});

//Signup endpoint

app.post("/signup", upload.none(), (req, res) => {
  let usernameEntered = req.body.username;
  let pwd = req.body.password;
  dbo
    .collection("users")
    .findOne({ username: usernameEntered }, (err, user) => {
      ///handles error
      if (err) {
        console.log("an error occured");
        res.send(JSON.stringify({ success: false, msg: "error" }));
        return;
      }
      ///handles user existing
      if (user !== null) {
        console.log("this user already exists");
        res.send(JSON.stringify({ success: false, msg: "user-exists" }));
        return;
      }
      ///success case - the user doesn't exists yet, we insert into collection
      if (user === null) {
        console.log("username available");
        dbo
          .collection("users")
          .insertOne({ username: usernameEntered, password: pwd });
        res.send(JSON.stringify({ success: true }));
        return;
      }
      res.send(JSON.stringify({ success: false }));
    });
});

//// login endpoint
app.post("login", upload.none(), (req, res) => {
  let usernameEntered = req.body.username;
  let pwd = req.body.password;
  dbo
    .collection("users")
    .findOne({ username: usernameEntered }, (err, user) => {
      if (err) {
        res.send(JSON.stringify({ success: false }));
        return;
      }
      ///user doesn't exist
      if (user === null) {
        res.send(JSON.stringify({ success: false, msg: "invalid-user" }));
        return;
      }
      if (user.password === pwd) {
        ////password matches
        let sessionId = generateID();
        dbo
          .collection("sessions")
          .insertOne({ username: usernameEntered, sessionId: sessionId });
        res.send(JSON.stringify({ success: true }));
        return;
      }
      res.send(JSON.stringify({ success: false }));
    });
});

// all-itmes endpoint. "items" is my provisional collection name
app.get("/all-items", (req, res) => {
  console.log("request to /all-items endpoint");
  dbo
    .collection("items")
    .find({})
    .toArray((err, items) => {
      if (err) {
        console.log("ERROR", err);
        res.send(JSON.stringify({ success: false }));
        return;
      }
      console.log("items: ", items);
      res.send(JSON.stringify(items));
    });
});

// Your endpoints go before this line

//to create our cookie
let generateID = () => {
  return "" + Math.floor(Math.random() * 100000);
};

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
