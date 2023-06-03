function generateRows() {
  const plotSize = document.getElementById("plot-size").value;
  const [rows, cols] = plotSize.split("x");

  let grid = "";

  for (let i = 1; i <= rows; i++) {
    grid += "<tr>";

    for (let j = 1; j <= cols; j++) {
      const id = (i - 1) * cols + j;
      grid += `<td>
        <div class="square" id="${id}" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
      </td>`;
    }
    grid += "</tr>";
  }
  return grid;
}

function generateGardenGrid() {
  const gardenContainer = document.querySelector(".garden-container");
  const gardenGrid = document.createElement("table");
  gardenGrid.innerHTML = generateRows();
  gardenContainer.innerHTML = "";
  gardenContainer.appendChild(gardenGrid);

  // Add drag event listeners to produce items
  const produceItems = document.querySelectorAll(".draggable-images img");
  produceItems.forEach((item) => {
    item.addEventListener("dragstart", dragStart);
  });

  // Add dragover and drop event listeners to squares
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.addEventListener("dragover", dragOver);
    square.addEventListener("drop", drop);
  });
}

document
  .getElementById("plot-size")
  .addEventListener("input", generateGardenGrid);

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id);
  event.target.classList.add("dragging");
}

function dragEnd(event) {
  event.target.classList.remove("dragging");
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const dataHash = "#" + data;

  const clonedImage = document.getElementById(data).cloneNode(true);
  event.target.appendChild(clonedImage);

  const produceItem = getProduceItem(data);
  if (produceItem) {
    console.log(produceItem.information());
    $("#information").append(produceItem.information());
  } else {
    console.log("fail");
  }
  // Remove the dragged image from the draggable images container
  document.getElementById(data).style.display = "none";
}

function getProduceItem(item) {
  const produceItems = {
    basil: basil,
    beetroot: beetroot,
    cabbage: cabbage,
    carrot: carrot,
    lavender: lavender,
    peas: peas,
    pepper: pepper,
    radish: radish,
    rosemary: rosemary,
    tomato: tomato,
  };

  return produceItems[item];
}

function Produce(item, sunshine, spacing, seedDepth, germination, harvest) {
  this.item = item;
  this.sunshine = sunshine;
  this.spacing = spacing;
  this.seedDepth = seedDepth;
  this.germination = germination;
  this.harvest = harvest;
}

Produce.prototype.information = function () {
  return `
    <li>
      <h2>${this.item}</h2>
    </li>
    <li>Sun Required: ${this.sunshine}</li>
    <li>Spacing: ${this.spacing}</li>
    <li>Seed Depth: ${this.seedDepth}</li>
    <li>Germination: ${this.germination}</li>
    <li>Harvest: ${this.harvest}</li><br>
  `;
};

// Create produce items
var basil = new Produce(
  "Basil",
  "full-sunshine",
  "1 inch apart",
  "1/4 inch",
  "7-14 days",
  "24 days from seed"
);

var beetroot = new Produce(
  "Beetroot",
  "full-sunshine",
  "1 inch apart",
  "1/2 inch",
  "5-10 days",
  "65 days from seed"
);

var cabbage = new Produce(
  "Cabbage",
  "full-sunshine",
  "18 inches apart",
  "3/4 inch",
  "12-14 days",
  "58 days from seed"
);

var carrot = new Produce(
  "Carrot",
  "full-sunshine",
  "2 inches apart",
  "1/4 carrot inches",
  "14-21 days",
  "55 days from seed"
);

var lavender = new Produce(
  "Lavender",
  "full-sunshine",
  "2 feet apart",
  "1/4 inches",
  "21-35 days",
  "57 days from seed"
);

var peas = new Produce(
  "Sugar Snap Peas",
  "full-sunshine",
  "2-3 inches",
  "1 inch",
  "7-10 days",
  "62 days from seed"
);

var pepper = new Produce(
  "Red Bell Pepper",
  "full-sunshine",
  "1 inch",
  "1/4 inch",
  "10-21 days",
  "76 days from transplant"
);

var radish = new Produce(
  "Radish",
  "full-sunshine",
  "1 inch",
  "1/2 inch",
  "5-7 days",
  "50-60 days from seed"
);

var rosemary = new Produce(
  "Rosemary",
  "full-sunshine",
  "2 inches apart",
  "5-10 days",
  "66 days from seed"
);

var tomato = new Produce(
  "Tomato",
  "full-sunshine",
  "3 feet apart",
  "1/4 inch",
  "7-14 days",
  "80 days from seed"
);

var gardenItems = [carrot, tomato, lavender];

Produce.prototype.information = function () {
  return (
    "<li> <h2>" +
    this.item +
    "</h2> </li> <li>Sun Required: " +
    this.sunshine +
    "</li> <li>Spacing: " +
    this.spacing +
    "</li> <li>Seed Depth: " +
    this.seedDepth +
    "</li> <li>Germination: " +
    this.germination +
    "</li> <li>Harvest: " +
    this.harvest +
    "</li><br>"
  );
};
