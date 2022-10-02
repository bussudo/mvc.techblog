// Create Blog
// function from createBlog.handlebars

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

// I think i need code here to add timestamp and create field for which user created this

// Edit Blog
// function from dashboard.handlebars,
// let editBtn = document.getElementById("edit-blog");

// editBtn.addEventListener("click", async function () {
//   let title = document.getElementById("titleblog").value;
//   let contents = document.getElementById("contentblog").value;
//   let response = await fetch("/api/blogs", {
//     method: "PUT",
//     body: JSON.stringify({ title, contents }),
//     headers: { "Content-Type": "application/json" },
//   });
//   if (response.ok) {
//     document.location.replace("/dashboard");
//   } else alert("Please try again");
// });

// Update Blog
// let updBtn = document.getElementById("update-blog");

// updBtn.addEventListener("click", async function () {
//   let title = document.getElementById("titleBlog").value;
//   let contents = document.getElementById("contentBlog").value;
//   let response = await fetch("/api/blogs", {
//     method: "PuT",
//     body: JSON.stringify({ title, contents }),
//     headers: { "Content-Type": "application/json" },
//   });
//   if (response.ok) {
//     document.location.replace("/dashboard");
//   } else alert("Please try again");
// });

// Delete Blog
// let deleteBtn = document.getElementById("delete-blog").value;

// let id = deleteBtn.addEventListener("click", async function () {
//   let response = await fetch(`/api/blogs/${id}`, {
//     method: "DELETE",
//   });
//   if (response.ok) {
//     document.location.replace("/dashboard");
//   } else alert("Please try again");
// });
