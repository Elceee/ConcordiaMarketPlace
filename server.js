let express = require("express");
let app = express();
let reloadMagic = require("./reload-magic.js");
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
  dbo = db.db("To be determined"); //Let's choose a name to add here.
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

app.post("/sell-item", upload.single("image"), (req, res) => {
  let name = req.body.itemName;
  let file = req.file;
  let imagePath = "/uploads/" + file.filename;
  let categories = req.body.categories;
  let description = req.body.description;
  let seller = req.body.username;
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

app.get("/delete-all", (req, res) => {
  console.log("deleting all of the posts!");
  dbo.collection("posts").deleteMany({});
});

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
