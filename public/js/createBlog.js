// Create Blog
// function from createBlog.handlebars

// const { User } = require("../../models");

// const router = require("../../controllers");
// const { Blog } = require("../../models");

let submitBtn = document.getElementById("create-blog");

submitBtn.addEventListener("click", async function () {
  let title = document.getElementById("titleBlog").value;
  let contents = document.getElementById("contentBlog").value;
  let response = await fetch("/api/blogs", {
    method: "POST",
    body: JSON.stringify({ title, contents }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else alert("Please try again");
});

const timeStamp = new Date().toLocaleTimeString();
// const blogAuthor = `${firstName} ${lastName}`;

// console.log(timeStamp);
// console.log(blogAuthor);
