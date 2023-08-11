// START

// Create grid
// Or make the player choose first and then generate them

// Add event listener for every click of the player on the grid, check if it is right or left click

// For each left click, check:
// 1. The click was not on a .mine cell => if yes, Losing condition
// 2. The amount of mines in the nearby cells => if the nearby cells had no mines then check every tile around them (recurse function for each cell with no .mine nearby,
//    stop only when every cell around the clicked area has at least 1 mine in the vicinity)
// 3. Add .clicked to every cell clicked or checked that has no .mine nearby. To show the player the tiles he has already checked
// 4. Count the number of .mine on each .clicked cell and display the number on screen

// For each right click:
// 1. Add .flag on the clicked tile => make the tile unavailable to be clicked?
// 2. Remove 1 mine from the mine counter in the header (stop at 0)


//WINNING
// No more tiles without .mine left, (check if every tile except .mine has .checked) => CSS selectors
// Display winning screen
// Reset the minefield and set a higher difficulty (if possible)

//LOSING
// Whenever a mine is clicked:
// Display losing screen.
// Reset the minefield and set a lower difficulty (if possible)
// Display every mine


// RESETTING THE MINEFIELD
// Call function that deletes all .mine from every tile
// Call function that deletes all .clicked and .flag
// Call function to create new random number

// Elements

let grid = document.getElementById("grid")
const btns = document.getElementById("difficulty-container")


// Variables

let width
let gridDim
let mines
const board = []

//Executions

// Generate a grid of the chosen dimensions and calculate the amount of mines necessary => the average of mines/block should be around 0.16 on normal diff,
// so for each mine i place i will need at least 6.25 blocks, so with a grid of 16*16 should have 40 mines? 


function checkDifficulty(){
  //Function changes the width and the number of mines.
}


function generateGrid(){

  for(let i = 0 ; i < gridDim ; i++){

    const gridPlace = document.createElement("DIV")
    gridPlace.classList.add("gridPlace")
    gridPlace.style.width = `${100 / width}%`
    gridPlace.style.height = `${100 / width}%`
    grid.append(gridPlace)
    board.push(gridPlace)
  }
}

//Events

// Event listener that checks the diff button.
btns.addEventListener("click",checkDifficulty)