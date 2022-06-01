function mainAutomatic() {
  const imageBasePath = "./resources/";
  const imageSrcList = [
    "Chhota_Bheem_image.png",
    "Doraemon.webp",
    "Jerry.webp",
    "Shinchan.png",
    "Tom.webp"
  ];

  let currentIndex = 2;
  let intervalId = null;

  const appDivElement = document.getElementById("app-automatic");
  const imgElement = appDivElement.children[1];

  const renderPreviousImage = () => {
    currentIndex =
      (currentIndex - 1 + imageSrcList.length) % imageSrcList.length;
    imgElement.src = imageBasePath + imageSrcList[currentIndex];
  };

  const renderNextImage = () => {
    currentIndex = (currentIndex + 1) % imageSrcList.length;
    imgElement.src = imageBasePath + imageSrcList[currentIndex];
  };

  const startSlideShow = () => {
    if (!intervalId) {
      intervalId = setInterval(renderNextImage, 2000);
    }
  };

  const pauseSlideShow = () => {
    clearInterval(intervalId);
    intervalId = null;
  };

  document
    .getElementById("before-automatic")
    .addEventListener("click", (ev) => {
      ev.stopPropagation();
      renderPreviousImage();
    });

  document.getElementById("after-automatic").addEventListener("click", (ev) => {
    ev.stopPropagation();
    renderNextImage();
  });

  appDivElement.addEventListener("mouseenter", (ev) => {
    ev.stopPropagation();
    pauseSlideShow();
  });

  appDivElement.addEventListener("mouseleave", (ev) => {
    ev.stopPropagation();
    startSlideShow();
  });

  startSlideShow();
}

mainAutomatic();
