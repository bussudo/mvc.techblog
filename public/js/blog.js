const fNameEl = $("#profile-fName"); //document.getElementById("profile-fName");
const lNameEl = $("#profile-lName"); //document.getElementById("profile-lName");
const emailEl = $("#profile-email");
const buttonEl = $("#profile-buttons");
const editIcon = $("#edit-profile");
const imageEl = $("#profile-pic");
const uploadBtns = $("#upload-btns");
const createEl = $("#create-post");

let uploadEl = $("#image-upload");
let firstName, lastName, email, originalImg, newImg;

const enableEdit = () => {
  $(".profile-input").each(function (i) {
    const input = $(this);
    input.prop("disabled", false);
    input.toggleClass("form-control-plaintext");
    input.toggleClass("form-control");
  });
  buttonEl.prop("hidden", false);
  editIcon.prop("hidden", true);
};

const disableEdit = () => {
  $(".profile-input").each(function (i) {
    const input = $(this);
    input.prop("disabled", true);
    input.toggleClass("form-control-plaintext");
    input.toggleClass("form-control");
  });
  buttonEl.prop("hidden", true);
  editIcon.prop("hidden", false);
};

const profileEditHandler = async (event) => {
  event.preventDefault();
  console.log("event", event);
  fName = fNameEl.val().trim();
  lName = lNameEl.val().trim();
  email = emailEl.val().trim();
  const id = window.location.pathname.split("/")[2];
  console.log(id);
  const response = await fetch(`/api/users/${id}`, {
    method: "PUT",
    body: JSON.stringify({ fName, lName, email }),
    headers: { "Content-Type": "application/json" },
  });

  disableEdit();
};

const enableEditHandler = async (event) => {
  event.preventDefault();
  console.log("event", event);
  fName = fNameEl.val().trim();
  lName = lNameEl.val().trim();
  email = emailEl.val().trim();

  enableEdit();
};

const cancelEditHandler = async (event) => {
  event.preventDefault();
  fNameEl.val(fName);
  lNameEl.val(lName);
  emailEl.val(email);

  disableEdit();
};

const previewProfileImage = () => {
  //ensure a file was selected
  const uploader = uploadEl.get()[0];
  if (uploader.files && uploader.files[0]) {
    originalImg = imageEl.attr("src");
    const imageFile = uploader.files[0];
    const type = imageFile.type.split("/")[1];
    let reader = new FileReader();
    reader.onload = function (e) {
      //set the image data as source
      imageEl.attr("src", e.target.result);
      newImg = { data: e.target.result, type };
      console.log("newImg", newImg);
    };
    reader.readAsDataURL(imageFile);
    uploadBtns.prop("hidden", false);
  }
};

const profilePicHandler = async (event) => {
  event.preventDefault();
  const action = event.target.textContent;
  uploadBtns.prop("hidden", true);
  console.log("action", action);
  if (action === "Cancel") {
    console.log("originalImg", originalImg);
    imageEl.attr("src", originalImg);
    uploadBtns.prop("hidden", true);
    uploadEl.replaceWith(uploadEl.val("").clone());
    uploadEl = $("#image-upload").on("change", () => previewProfileImage());
    return;
  }
  const id = window.location.pathname.split("/")[2];
  const response = await fetch(`/api/users/image/${id}`, {
    method: "POST",
    body: JSON.stringify({ newImg }),
    headers: { "Content-Type": "application/json" },
  });
};

const hoverIn = (event) => {
  const target = $(event.target);
  console.log(target.data());
  // console.log("hover");
  const profileId = Number(window.location.pathname.split("/")[2]);
  const userId = Number(target.data("loggedIn"));
  console.log("profileId", profileId, "userId", userId);
  if (profileId === userId) {
    imageEl.addClass("prof-hover");
  }
};

const hoverOut = (event) => {
  imageEl.removeClass("prof-hover");
};

const createPostHandler = async (event) => {};

uploadBtns.on("click", profilePicHandler);
imageEl.on("click", () => uploadEl.click());
uploadEl.on("change", () => previewProfileImage());

$("#blog-form").on("submit", profileEditHandler);
editIcon.on("click", enableEditHandler);
$("#cancel-blog").on("click", cancelEditHandler);
$("#create-post").on("click", createPostHandler);

imageEl.hover(hoverIn, hoverOut);
