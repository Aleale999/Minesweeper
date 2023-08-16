// START

// Create grid DONE
// Make the player choose first and then generate .mine

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
let buttons = document.querySelectorAll(".button")
let minesLeft = document.getElementById("mines-left")
let difficulty

// Variables

let width
let gridDim = 0
let mines
let board = []
let random
let clicked
let firstClick
let timer = 0
let timePassed
let click
let cellsMissing
let cellMineCounter = 0

//Executions

// Generate a grid of the chosen dimensions and calculate the amount of mines necessary => the average of mines/block should be around 0.16 on normal diff,
// so for each mine i place i will need at least 6.25 blocks, so with a grid of 16*16 should have 40 mines? 


function startGame(event){

  timer = 0
  
  document.getElementById("time").innerHTML = timer

  if(!clicked){
    difficulty = parseInt(event.target.value)
  }

  clearInterval(timePassed)

  checkDifficulty(difficulty)

  generateGrid()
  
  click.forEach((cell) => {
    cell.addEventListener("click", cellClick)
  })
}

function cellClick(event){
  if(!clicked){
    firstClicked(event)
    clicked = true
    cellsMissing--
    mineCounter()
    timePassed = setInterval(function () {
      timer++
      document.getElementById("time").innerHTML = timer
    },1000)
    
  } else {
    if(!event.currentTarget.classList.contains("clicked")){
      event.currentTarget.classList.add("clicked")
      cellsMissing--
      mineCounter()
    }
    if(event.target.classList.contains("mine")){
      defeatScreen()    
    } else if(cellsMissing === 0){
      winScreen()
    }
  }
}


function checkDifficulty(difficulty){
  random = []
  //Function changes the width and the number of mines.
  switch(difficulty){
    case 1:
      width = 9
      mines = 10
      document.getElementById("difficulty").innerHTML = "Easy"
      break;
    case 2:
      width = 16
      mines = 40
      document.getElementById("difficulty").innerHTML = "Normal"
      break;
    case 3:
      width = 22
      mines = 100
      document.getElementById("difficulty").innerHTML = "Hard"
      break;
  }
  gridDim = width**2
  cellsMissing = gridDim - mines
}
      
function generateGrid(){
  document.querySelectorAll(".gridPlace").forEach(cell => cell.remove());
  board = []
  clicked = false
  for(let i = 0 ; i < gridDim ; i++){
    const gridPlace = document.createElement("DIV")
    gridPlace.classList.add("gridPlace")
    gridPlace.style.width = `${100 / width}%`
    gridPlace.style.height = `${100 / width}%`
    grid.append(gridPlace)
    board.push(gridPlace)
  }
  click = document.querySelectorAll(".gridPlace")
}

function generateRandomMine(){
  for(let j = 0; j < mines; j++){
    random.push(Math.floor(Math.random()*gridDim))
    for(let i = 0 ; i < random.length - 1 ; i++){
      if(random[j] === random[i] || random[j] === random[i] - 1 || random[j] === random[i] + 1 || random[j] === random[i] - width || random[j] === random[i] + width || board[random[j]].classList.contains("clicked")){
        random.pop()
        j = j - 1
      }
    }
  }
  random.forEach(num => board[num].classList.add("mine"))
  minesLeft.innerHTML = mines
}
  
function firstClicked(event){
  //First click
  click.forEach(cell => cell.addEventListener("click", cellClick))
  event.currentTarget.classList.add("clicked")
  //Then generate mines
  generateRandomMine()
 
}

function mineCounter(){
  board.forEach((cell,i) => {
    cellMineCounter = 0
    if(cell.classList.contains("clicked")){
      if(i%width !== 0){
        if(board[i - 1].classList.contains("mine"))
        {
          cellMineCounter++
          
        }
      }
      if(i%(width) !== width - 1){
        if(board[i + 1]?.classList.contains("mine"))
        {
          cellMineCounter++
          
        }
      }
      if(i > width - 1){
        if(board[i - width].classList.contains("mine")){
          cellMineCounter++
          
        }
        if(i%width !== 0){
          if(board[i - width - 1].classList.contains("mine")){
            cellMineCounter++
            
          }
        }
        if(i%(width) !== width - 1){
          if(board[i - width + 1].classList.contains("mine")){
            cellMineCounter++
            
          }
        }
      }
      if(i < gridDim - width){
        if(board[i + width].classList.contains("mine")){
          cellMineCounter++
          
        }
        if(i%width !== 0){
          if(board[i + width - 1].classList.contains("mine")){
            cellMineCounter++
            
          }
        }
        if(i%(width) !== width - 1){
          if(board[i + width + 1]?.classList.contains("mine")){
            cellMineCounter++
          }
          
        }
      }
    }
    if(cellMineCounter !== 0){
      board[i].innerHTML = cellMineCounter
    }
  })
}

function defeatScreen(){
  difficulty--
  startGame()
}

function winScreen(){
  difficulty++
  startGame()
}
  

//Events
  
// Event listener that checks the diff button.
buttons.forEach(button => button.addEventListener('click', startGame))

