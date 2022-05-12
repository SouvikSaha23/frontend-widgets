class Ratings {
  constructor(containerId, numOfStars) {
    this.containerId = containerId;
    this.numOfStars = numOfStars;
  }

  render() {
    this.renderInfo();
    // renderStars();
  }

  renderInfo() {
    const infoElement = document.createElement("h2");
    const spanId = this.containerId + "-info";
    infoElement.innerHTML = `Current rating: <span id="${spanId}">0</span>`;
    document.getElementById(this.containerId).appendChild(infoElement);
  }
}

const ratings1 = new Ratings("reusable-ratings-1", 5);
const ratings2 = new Ratings("reusable-ratings-2", 7);
const ratings3 = new Ratings("reusable-ratings-3", 10);

ratings1.render();
ratings2.render();
ratings3.render();
