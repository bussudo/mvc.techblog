function getEmail() {
  let clkE = document.getElementById("search-Ninput");
  fetch(`/searchEmail/${clkE.value}`)
    .then((response) => {
      return response.json();
    })
    .then((emailData) => {
      console.log(emailData);
    });
}
// search by email
let emailBtn = document.getElementById("searchEBtn");
emailBtn.addEventListener("click", function async(e) {
  e.preventDefault();
  getEmail();
});

// function getName() {
//   let clkN = document.getElementById("search-Ninput");
//   fetch(`/searchName/${clkN.value}`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((nameData) => {
//       console.log(nameData);
//     });
// }
// // search by name
// let nameBtn = document.getElementById("searchNBtn");
// nameBtn.addEventListener("click", function async(e) {
//   e.preventDefault();
//   getName();
// });
