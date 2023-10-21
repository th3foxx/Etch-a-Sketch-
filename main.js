const container = document.querySelector("div");
const gridContainer = document.createElement("div");
gridContainer.classList.add("grid-container");
container.appendChild(gridContainer);

const footer = document.createElement("div");
footer.classList.add("footer");
container.appendChild(footer);
const footerText = document.createElement("h3");
footerText.textContent = "Made with ❤ by Th3_Fox";
footer.appendChild(footerText);

const slider = document.querySelector("#slider");
const colorPicker = document.querySelector("#colorPicker");

const btns = document.querySelectorAll(".btn");
let isRgb = false;
let isColorPickerActive = false;

function getRandomRgb() {
    randomByte = () => Math.floor(Math.random() * 256);
    const randomRgbColor = `rgb(${randomByte()}, ${randomByte()}, ${randomByte()})`;
    return randomRgbColor;
}

function createGrid(size) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < size; i++) {
        const gridRow = document.createElement("div");
        gridRow.classList.add("grid-row");
        fragment.appendChild(gridRow);

        for (let j = 0; j < size; j++) {
            const item = document.createElement("div");
            item.classList.add("item");
            gridRow.appendChild(item);

            item.addEventListener("mouseover", () => {
                if (isRgb) {
                    item.style.backgroundColor = getRandomRgb();
                } else if (isColorPickerActive) {
                    item.style.backgroundColor = colorPicker.value;
                } else {
                    item.style.backgroundColor = "black";
                }
            });
        }
    }

    gridContainer.innerHTML = '';
    gridContainer.appendChild(fragment);
}

slider.addEventListener("input", () => {
    gridSize = slider.value;
    document.querySelector("#range").textContent = `${gridSize}x${gridSize}`;
    createGrid(gridSize);
});

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const button = btn.id;
        switch (button) {
            case "reset":
                isRgb = false;
                isColorPickerActive = false;
                clearGrid();
                break;
            case "rgb":
                isRgb = true;
                isColorPickerActive = false;
                break;
            case "color":
                isRgb = false;
                isColorPickerActive = true;
                break;
            case "black":
                isRgb = false;
                isColorPickerActive = false;
                break;
        }
    });
});

function clearGrid() {
    const gridItems = document.querySelectorAll(".item");
    gridItems.forEach(item => {
        item.style.backgroundColor = "";
    });
}

createGrid(2);
