let express = require("express");
let app = express();
let reloadMagic = require("./reload-magic.js");
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let cookieParser = require("cookie-parser");
app.use(cookieParser());
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
app.use("/uploads", express.static("uploads"));
let dbo = undefined;
let url =
  "mongodb+srv://alibay:decode@cluster0-qnbgf.mongodb.net/test?retryWrites=true&w=majority"; //We have to add something here.
reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  if (err) {
    console.log(err);
  }
  dbo = db.db("alibay"); //Let's choose a name to add here.
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
app.post("/login", upload.none(), (req, res) => {
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
        res.cookie("sid", sessionId);
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

//get item by Id endpoint
app.post("/get-item-by-id", upload.none(), (req, res) => {
  console.log("request to /get-item-by-id");
  let itemId = req.body.itemId;
  dbo.collection("items").findOne({ _id: ObjectID(itemId) }, (err, item) => {
    if (err) {
      console.log("ERROR", err);
      res.send(JSON.stringify({ success: false }));
      return;
    }
    console.log("item: ", item);
    res.send(JSON.stringify({ success: true, item: item }));
  });
});

app.post("/add-to-cart", upload.none(), async (req, res) => {
  console.log("request to /add-to-cart endpoint");
  let itemId = req.body.itemId;
  console.log("item: ", JSON.stringify(itemId));
  let buyer = await findUsernameByCookie(req.cookies.sid);
  console.log("buyer: ", buyer);
  let buyerCart = await findUserCartByName(buyer);
  console.log("buyerCart", buyerCart);
  let cartItem = `cart.${itemId}`;
  console.log("cartItem", cartItem);
  if (buyerCart === null || !buyerCart[itemId]) {
    dbo
      .collection("users")
      .updateOne(
        { username: buyer },
        { $set: { [cartItem]: { quantity: 1 } } },
        (err, update) => {
          if (err) {
            console.log("ERROR: ", err);
            res.send(JSON.stringify({ success: false }));
            return;
          }
          res.send(JSON.stringify({ success: true }));
        }
      );
  } else {
    let quant = `cart.${itemId}.quanity`;
    dbo
      .collection("users")
      .updateOne(
        { username: buyer },
        { $inc: { [quant]: 1 } },
        (err, update) => {
          if (err) {
            console.log("ERROR: ", err);
            res.send(JSON.stringify({ success: false }));
            return;
          }
          res.send(JSON.stringify({ success: true }));
        }
      );
  }
});

app.post("/sell-item", upload.single("image"), (req, res) => {
  let seller = findUsernameBycookie(req.cookies.sid);
  let name = req.body.itemName;
  let file = req.file;
  let imagePath = "/uploads/" + file.filename;
  let categories = req.body.categories;
  let description = req.body.description;
  let price = req.body.price;
  let stock = req.body.stock;
  dbo.collection("items").insertOne(
    {
      name,
      imagePath,
      categories,
      description,
      seller,
      price,
      stock
    },
    (err, item) => {
      if (err) {
        console.log("ERROR", err);
        res.send(JSON.stringify({ success: false }));
        return;
      }
      console.log("item: ", item);
      res.send(JSON.stringify({ success: true }));
    }
  );
});

// Your endpoints go before this line

let generateID = () => {
  return "" + Math.floor(Math.random() * 1000000000);
};

let findUsernameByCookie = async cookie => {
  let userObject = await dbo
    .collection("sessions")
    .findOne({ sessionId: cookie }, { user: 1 });
  console.log("userObject", userObject);
  return userObject.username;
};

let findUserCartByName = async username => {
  let userCart = await dbo
    .collection("users")
    .findOne({ username: username }, { cart: 1 });
  return userCart;
};

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});

//Cart Object: {itemId: {quantity: 3}}
