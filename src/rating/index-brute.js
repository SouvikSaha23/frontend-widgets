const starIds = ["1", "2", "3", "4", "5"];

function handleStarClick(id) {
  starIds.forEach((starId) => {
    const star = document.getElementById(starId);
    if (starId <= id) {
      star.innerHTML = "&starf;";
      star.classList.add("active");
    } else {
      star.innerHTML = "&star;";
      star.classList.remove("active");
    }
  });

  document.getElementById("rating").textContent = id;
}

starIds.forEach((starId) => {
  const star = document.getElementById(starId);
  star.addEventListener("click", () => handleStarClick(starId));
});
