class Ratings {
  constructor(containerId = "", numOfStars = 5) {
    this.containerId = containerId;
    this.numOfStars = numOfStars;

    this.spanId = this.containerId + "-info";
    this.starIds = [];
    for (let i = 1; i <= this.numOfStars; i++) {
      this.starIds.push(i);
    }
  }

  render() {
    this.renderInfo();
    this.renderStars();
  }

  renderInfo() {
    const infoElement = document.createElement("h2");
    infoElement.innerHTML = `Current rating: <span id="${this.spanId}">0</span>`;
    document.getElementById(this.containerId).appendChild(infoElement);
  }

  renderStars() {
    const ul = document.createElement("ul");
    ul.classList.add("stars");
    document.getElementById(this.containerId).appendChild(ul);

    this.starIds.forEach((starId) => {
      const li = document.createElement("li");
      const liId = this.getStarElementId(starId);
      li.id = liId;
      li.innerHTML = "&star;";
      ul.appendChild(li);

      li.addEventListener("click", () => this.handleStarClick(starId));
    });
  }

  handleStarClick(clickedStarId) {
    this.starIds.forEach((starId) => {
      const star = document.getElementById(this.getStarElementId(starId));
      if (starId <= clickedStarId) {
        star.innerHTML = "&starf;";
        star.classList.add("active");
      } else {
        star.innerHTML = "&star;";
        star.classList.remove("active");
      }
    });

    document.getElementById(
      this.spanId
    ).textContent = `${clickedStarId}/${this.numOfStars}`;
  }

  getStarElementId(starId) {
    return `${this.containerId}_${starId}`;
  }
}

function main() {
  const hasRun = document
    .getElementById("app-reusable")
    .children[0].hasChildNodes();
  if (hasRun) {
    return;
  }

  const ratings1 = new Ratings("reusable-ratings-1");
  const ratings2 = new Ratings("reusable-ratings-2", 7);
  const ratings3 = new Ratings("reusable-ratings-3", 10);

  ratings1.render();
  ratings2.render();
  ratings3.render();
}

main();
