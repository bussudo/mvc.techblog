// Edit Blog
// function from dashboard.handlebars,
let editBtn = document.getElementById("edit-blog");

editBtn.addEventListener("click", async function (event) {
  let title = document.getElementById("titleEdit").value;
  let contents = document.getElementById("contentEdit").value;
  let id = this.classList.value;

  let response = await fetch(`/api/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, contents }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else alert("Please try again");
});

// Delete Blog

let deleteBtn = document.getElementById("delete-blog");
deleteBtn.addEventListener("click", async function (event) {
  let id = this.classList.value;
  console.log(id);
  let response = await fetch(`/api/blogs/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else alert("Please try again");
});
