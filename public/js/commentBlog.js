// Read Other Blogs

let saveCommentBtn = document.getElementById("comment-blog");

saveCommentBtn.addEventListener("click", async function (event) {
  let title = document.getElementById("titleComment").value;
  let contents = document.getElementById("contentComment").value;
  let dateCreated = document.getElementById("dateCreated").value;
  let id = this.classList.value;

  let response = await fetch(`/api/comment/${id}`, {
    method: "POST",
    body: JSON.stringify({ Comment }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/comment");
  } else alert("Please try again");
});
