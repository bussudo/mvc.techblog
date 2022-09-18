function getName() {
  let clkN = document.getElementById("search-Ninput");
  fetch(`/searchName/${clkN.value}`)
    .then((response) => {
      return response.json();
    })
    .then((nameData) => {
      console.log(nameData);
    });
}
// search by name
let nameBtn = document.getElementById("searchNBtn");
nameBtn.addEventListener("click", function async(e) {
  e.preventDefault();
  getName();
});
