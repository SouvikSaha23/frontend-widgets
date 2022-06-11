function main() {
  const imageBasePath = "./resources/";
  const imageSrcList = [
    "Chhota_Bheem_image.png",
    "Doraemon.webp",
    "Jerry.webp",
    "Shinchan.png",
    "Tom.webp"
  ];

  let currentIndex = 2;

  const imgElement = document.getElementById("app-brute").children[1];

  document.getElementById("before-brute").addEventListener("click", (ev) => {
    ev.stopPropagation();
    currentIndex =
      (currentIndex - 1 + imageSrcList.length) % imageSrcList.length;
    imgElement.src = imageBasePath + imageSrcList[currentIndex];
    imgElement.onload = () => {
      renderDots(currentIndex);
    };
  });

  document.getElementById("after-brute").addEventListener("click", (ev) => {
    ev.stopPropagation();
    currentIndex = (currentIndex + 1) % imageSrcList.length;
    imgElement.src = imageBasePath + imageSrcList[currentIndex];
    imgElement.onload = () => {
      renderDots(currentIndex);
    };
  });
}

main();

const renderDots = (currentIndex) => {
  const dotsContainer = document.getElementById("dots-brute");
  const dotsCount = dotsContainer.childElementCount;
  for (let i = 0; i < dotsCount; i++) {
    if (i === currentIndex) {
      dotsContainer.children[i].classList.add("active-dot");
    } else {
      dotsContainer.children[i].classList.remove("active-dot");
    }
  }
};
