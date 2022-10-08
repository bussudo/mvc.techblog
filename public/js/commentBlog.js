// Read Other Blogs

let saveCommentBtn = document.getElementById("comment-blog");

saveCommentBtn.addEventListener("click", async function (event) {
  // let title = document.getElementById("titleComment").value;
  let comment = document.getElementById("contentComment").value;
  // let dateCreated = document.getElementById("dateCreated").value;
  let blog_id = document.getElementById("blogInfo").getAttribute("data-id");
  console.log("This is the COMMENT: ", comment);
  console.log("This is BLOG_ID: ", blog_id);

  let response = await fetch(`/api/comments/${blog_id}`, {
    method: "POST",
    body: JSON.stringify({ comment }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace(`/comment/Blog/${blog_id}`);
  } else {
    alert("Please try again");
  }
});
