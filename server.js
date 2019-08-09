let express = require("express");
let app = express();
let reloadMagic = require("./reload-magic.js");

reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets

// Your endpoints go after this line
app.post("/testing", res => {
  console.log("this is a test");
  res.send(JSON.stringify({ success: "none" }));
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
