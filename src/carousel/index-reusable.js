const IMAGE_BASE_PATH = "./resources/";

class BaseCarousel {
  constructor(appContainerId, imageSrcList, activeIndex = 0) {
    this.imageSrcList = imageSrcList;
    this.currentIndex = activeIndex;
    this.appContainer = document.getElementById(appContainerId);
  }

  setCurrentIndex(index) {
    this.currentIndex = index;
  }

  render() {
    this.imageId = this.guid();
    this.dotsId = this.guid();
    this.renderImage();
    this.renderControlButtons();
    this.renderDots();
  }

  renderImage() {
    const imageElement = document.createElement("img");
    imageElement.id = this.imageId;
    imageElement.src = IMAGE_BASE_PATH + this.imageSrcList[this.currentIndex];
    imageElement.classList.add("carousel-image");
    imageElement.onload = () => this.updateDots();
    this.appContainer.appendChild(imageElement);
  }

  renderControlButtons() {
    const leftControlButton = document.createElement("div");
    leftControlButton.classList.add("before");
    leftControlButton.innerHTML = "&lt";
    this.addClickHandler(
      leftControlButton,
      (x) => (x - 1 + this.imageSrcList.length) % this.imageSrcList.length
    );

    const rightControlButton = document.createElement("div");
    rightControlButton.classList.add("after");
    rightControlButton.innerHTML = "&gt";
    this.addClickHandler(
      rightControlButton,
      (x) => (x + 1) % this.imageSrcList.length
    );

    this.appContainer.appendChild(leftControlButton);
    this.appContainer.appendChild(rightControlButton);
  }

  renderDots() {
    const dotsContainer = document.createElement("div");
    dotsContainer.id = this.dotsId;
    dotsContainer.classList.add("dots");
    for (let i = 0; i < this.imageSrcList.length; i++) {
      const dot = document.createElement("span");
      dot.innerHTML = "&#x2022";
      if (i === this.currentIndex) {
        dot.classList.add("active-dot");
      }
      dotsContainer.appendChild(dot);
    }
    this.appContainer.appendChild(dotsContainer);
  }

  addClickHandler(element, reducer) {
    element.addEventListener("click", () => {
      this.setCurrentIndex(reducer(this.currentIndex));
      this.updateImage();
    });
  }

  updateDots() {
    const dotsContainer = document.getElementById(this.dotsId);
    if (!dotsContainer) {
      return;
    }
    for (let i = 0; i < dotsContainer.childElementCount; i++) {
      if (i === this.currentIndex) {
        dotsContainer.children[i].classList.add("active-dot");
      } else {
        dotsContainer.children[i].classList.remove("active-dot");
      }
    }
  }

  updateImage() {
    const imageElement = document.getElementById(this.imageId);
    imageElement.src = IMAGE_BASE_PATH + this.imageSrcList[this.currentIndex];
  }

  guid() {
    return Math.random()
      .toString(16)
      .slice(2 - 5);
  }
}

class CarouselSlideshow extends BaseCarousel {
  constructor(appContainerId, imageSrcList, activeIndex = 0) {
    super(appContainerId, imageSrcList, (activeIndex = 0));
    this.intervalId = null;
  }

  startSlideShow() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.setCurrentIndex(
          (this.currentIndex + 1) % this.imageSrcList.length
        );
        this.updateImage();
      }, 2000);
    }
  }

  pauseSlideShow() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  addSlideShowHandlers() {
    this.appContainer.addEventListener("mouseenter", (ev) => {
      this.pauseSlideShow();
    });

    this.appContainer.addEventListener("mouseleave", (ev) => {
      this.startSlideShow();
    });
  }

  start() {
    this.render();
    this.addSlideShowHandlers();
    this.startSlideShow();
  }
}

function main() {
  if (window.isCarouselMainCalled) {
    return;
  }
  window.isCarouselMainCalled = true;

  const carousel1 = new BaseCarousel(
    "app-reusable-1",
    [
      "Chhota_Bheem_image.png",
      "Doraemon.webp",
      "Jerry.webp",
      "Shinchan.png",
      "Tom.webp"
    ],
    2
  );

  const carousel2 = new CarouselSlideshow("app-reusable-2", [
    "Chhota_Bheem_image.png",
    "Jerry.webp",
    "Tom.webp"
  ]);

  carousel1.render();
  carousel2.start();
}

main();
