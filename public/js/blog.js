let submitBtn = document.getElementById("create-blog");
submitBtn.addEventListener("click", async function () {
  let title = document.getElementById("titleBlog").value;
  let contents = document.getElementById("contentBlog").value;
  let response = await fetch("/api/blogs", {
    method: 'POST',
    body: 
  )}
