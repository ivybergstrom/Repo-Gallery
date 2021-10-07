const fans = document.querySelector(".fans");
const fish = document.querySelector(".fish");
const pets = document.querySelector(".pets");

fans.addEventListener("mouseover", function () {
  fans.innerText = "123 million";
});
fish.addEventListener("mouseover", function () {
  fish.innerText = "50 fish";
});
pets.addEventListener("mouseover", function () {
  pets.innerText = "0 pets";
});
