const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora adipisci corrupti, inventore molestiae culpa vero repudiandae eligendi neque facere nihil facilis! Magnam eaque cumque laudantium labore. Nulla eligendi eos. Alias rerum ducimus, cupiditate exercitationem quisquam tempora! Rem totam laboriosam maxime nihil praesentium nam delectus tenetur, culpa ut illum pariatur incidunt unde ipsa obcaecati exercitationem, officiis id. Modi magnam quos repudiandae amet, necessitatibus debitis error dicta voluptatibus inventore, nobis beatae adipisci accusamus voluptatum vel maiores.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const posts = [];


app.get("/", function (req, res) {
  res.render("home", {
    pageDefaultTitle: "Home",
    pageDefaultContent: homeStartingContent,
    pageContent: posts
  });
});

app.get("/about", function (req, res) {
  res.render("about", {
    pageTitle: "About",
    pageContent: aboutContent
  });
});
app.get("/contact", function (req, res) {
  res.render("contact", {
    pageTitle: "Contact",
    pageContent: contactContent
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.composeTitle,
    content: req.body.composeContent
  };
  posts.push(post);
  res.redirect("/");
});

// postTitle is not receiving titles with a space,
// if title : "Dipankar Dutta" -> posTitle : Dipankar
// Need to fix this. current idea : use a id
app.get("/posts/:postTitle", function (req, res) {
  const requestedTitle = _.capitalize(_.lowerCase(req.params.postTitle));
  // console.log("in server -> " + req.params.postTitle);
  // console.log("in server -> " + requestedTitle);
  let found = false;
  posts.forEach(post => {
    const currTitle = _.capitalize(_.lowerCase(post.title));
    if (currTitle === requestedTitle) {
      res.render("post", {
        post: post
      });
      found = true;
    }
  })
  if (!found) res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
