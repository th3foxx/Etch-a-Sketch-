/* The code is creating variables and selecting elements from the DOM using JavaScript. */
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

/**
 * The getRandomRgb function generates a random RGB color in the format "rgb(r, g, b)".
 * @returns a randomly generated RGB color in the format "rgb(r, g, b)".
 */
function getRandomRgb() {
    randomByte = () => Math.floor(Math.random() * 256);
    const randomRgbColor = `rgb(${randomByte()}, ${randomByte()}, ${randomByte()})`;
    return randomRgbColor;
}

/**
 * The function creates a grid of div elements with a specified size and adds event listeners to change
 * the background color of each div when the mouse is over it.
 * @param size - The `size` parameter represents the number of rows and columns in the grid. It
 * determines the size of the grid.
 */
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

/* The code is adding an event listener to the `slider` element. When the input value of the slider
changes, the event listener function is triggered. */
slider.addEventListener("input", () => {
    gridSize = slider.value;
    document.querySelector("#range").textContent = `${gridSize}x${gridSize}`;
    createGrid(gridSize);
});

/* The code is adding event listeners to each button in the `btns` NodeList. When a button is clicked,
the event listener function is triggered. Inside the function, it checks the `id` of the clicked
button using `btn.id`. Based on the `id`, it performs different actions: */
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

/**
 * The clearGrid function clears the background color of all elements with the class "item" in the
 * grid.
 */
function clearGrid() {
    const gridItems = document.querySelectorAll(".item");
    gridItems.forEach(item => {
        item.style.backgroundColor = "";
    });
}

createGrid(2);
