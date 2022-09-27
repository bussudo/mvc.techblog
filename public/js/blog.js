const buttonEl = $("#blog-buttons");
// const editIcon = $("#edit-profile");
// const imageEl = $("#profile-pic");
const uploadBtns = $("#upload-btns");
const createEl = $("#create-blog");

let uploadEl = $("#blog-upload");
let title, contents;

const enableEdit = () => {
  $(".blog-input").each(function (i) {
    const input = $(this);
    input.prop("disabled", false);
    input.toggleClass("form-control-plaintext");
    input.toggleClass("form-control");
  });
  buttonEl.prop("hidden", false);
  editIcon.prop("hidden", true);
};

const disableEdit = () => {
  $(".blog-input").each(function (i) {
    const input = $(this);
    input.prop("disabled", true);
    input.toggleClass("form-control-plaintext");
    input.toggleClass("form-control");
  });
  buttonEl.prop("hidden", true);
  editIcon.prop("hidden", false);
};

const blogEditHandler = async (event) => {
  event.preventDefault();
  console.log("event", event);
  title = title.val().trim();
  contents = contents.val().trim();
  // fName = fNameEl.val().trim();
  // lName = lNameEl.val().trim();
  // email = emailEl.val().trim();
  const id = window.location.pathname.split("/")[2];
  console.log(id);
  const response = await fetch(`/api/blog/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, contents }),
    headers: { "Content-Type": "application/json" },
  });

  disableEdit();
};

const enableEditHandler = async (event) => {
  event.preventDefault();
  console.log("event", event);
  title = titleEl.val().trim();
  contents = contentsEl.val().trim();

  enableEdit();
};

const cancelEditHandler = async (event) => {
  event.preventDefault();
  titleEl.val(title);
  contentsEl.val(contents);

  disableEdit();
};

// const previewProfileImage = () => {
//   //ensure a file was selected
//   const uploader = uploadEl.get()[0];
//   if (uploader.files && uploader.files[0]) {
//     originalImg = imageEl.attr("src");
//     const imageFile = uploader.files[0];
//     const type = imageFile.type.split("/")[1];
//     let reader = new FileReader();
//     reader.onload = function (e) {
//       //set the image data as source
//       imageEl.attr("src", e.target.result);
//       newImg = { data: e.target.result, type };
//       console.log("newImg", newImg);
//     };
//     reader.readAsDataURL(imageFile);
//     uploadBtns.prop("hidden", false);
//   }
// };

// const profilePicHandler = async (event) => {
//   event.preventDefault();
//   const action = event.target.textContent;
//   uploadBtns.prop("hidden", true);
//   console.log("action", action);
//   if (action === "Cancel") {
//     console.log("originalImg", originalImg);
//     imageEl.attr("src", originalImg);
//     uploadBtns.prop("hidden", true);
//     uploadEl.replaceWith(uploadEl.val("").clone());
//     uploadEl = $("#image-upload").on("change", () => previewProfileImage());
//     return;
//   }
//   const id = window.location.pathname.split("/")[2];
//   const response = await fetch(`/api/users/image/${id}`, {
//     method: "POST",
//     body: JSON.stringify({ newImg }),
//     headers: { "Content-Type": "application/json" },
//   });
// };

// const hoverIn = (event) => {
//   const target = $(event.target);
//   console.log(target.data());
//   // console.log("hover");
//   const profileId = Number(window.location.pathname.split("/")[2]);
//   const userId = Number(target.data("loggedIn"));
//   console.log("profileId", profileId, "userId", userId);
//   if (profileId === userId) {
//     imageEl.addClass("prof-hover");
//   }
// };

// const hoverOut = (event) => {
//   imageEl.removeClass("prof-hover");
// };

const createBlogHandler = async (event) => {};

uploadBtns.on("click", blogHandler);
blogEl.on("click", () => uploadEl.click());
uploadEl.on("change", () => previewBlog());

$("#blog-form").on("submit", blogEditHandler);
editIcon.on("click", enableEditHandler);
$("#cancel-blog").on("click", cancelEditHandler);
$("#create-blog").on("click", createBlogHandler);

// imageEl.hover(hoverIn, hoverOut);
