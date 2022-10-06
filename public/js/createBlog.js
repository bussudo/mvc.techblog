// Create Blog

let submitBtn = document.getElementById("create-blog");

submitBtn.addEventListener("click", async function () {
  let title = document.getElementById("titleBlog").value;
  let contents = document.getElementById("contentBlog").value;
  let dateCreated = document.getElementById("dateCreated").value;
  let response = await fetch("/api/blogs", {
    method: "POST",
    body: JSON.stringify({ title, contents }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else alert("Please try again");
});

const dateCreated = new Date().toLocaleDateString();
// const blogAuthor = `${firstName} ${lastName}`;

console.log(dateCreated);
// console.log(blogAuthor);
