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
let body = document.querySelector("body")
let endScreen = document.getElementById("grid-container")

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
let endTimer = 0
let checker = [1, -1, width, -width , - width + 1, - width - 1 , width + 1, width - 1]
let alive = true

//Executions

// Generate a grid of the chosen dimensions and calculate the amount of mines necessary => the average of mines/block should be around 0.16 on normal diff,
// so for each mine i place i will need at least 6.25 blocks, so with a grid of 16*16 should have 40 mines? 


function startGame(event){

  timer = 0

  alive = true

  clearInterval(endTimer)

  if(grid.classList.contains("easy")){
    grid.classList.remove("easy")
  }
  if(grid.classList.contains("medium")){
    grid.classList.remove("medium")
  }
  if(grid.classList.contains("hard")){
    grid.classList.remove("hard")
  }
  
  endScreen.classList.remove("lost","victory")

  document.getElementById("time").innerHTML = timer

  // if(!clicked){
    difficulty = parseInt(event.target.value)
  
  
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
    event.target.classList.remove("hide")

    mineCounter(event.currentTarget)
    timePassed = setInterval(function () {
      timer++
      document.getElementById("time").innerHTML = timer
    },1000)
    
  } else {
    if(!event.currentTarget.classList.contains("clicked") && alive){
      event.currentTarget.classList.add("clicked")
      cellsMissing--
      mineCounter(event.currentTarget)
    }
  }
}


function checkDifficulty(difficulty){
  random = []
  width = 0
  //Function changes the width and the number of mines.
  switch(difficulty){
    case 1:
      width = 9
      mines = 10
      document.getElementById("difficulty").innerHTML = "Easy"
      grid.classList.add("easy")
      document.querySelector("body").style.backgroundImage = "linear-gradient(#8bd4cf ,#195ac7)"
      break;
    case 2:
      width = 16
      mines = 40
      document.getElementById("difficulty").innerHTML = "Normal"
      document.querySelector("body").style.backgroundImage = "linear-gradient(#d5e1a7,#e5acac)"
      grid.classList.add("medium")
      break;
    case 3:
      width = 22
      mines = 100
      document.getElementById("difficulty").innerHTML = "Hard"
      document.querySelector("body").style.backgroundImage = "linear-gradient(#bb9f0c ,#3b0505)"
      grid.classList.add("hard")
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
    gridPlace.classList.add("hide")
    gridPlace.style.width = `${100 / width}%`
    gridPlace.style.height = `${100 / width}%`
    grid.append(gridPlace)
    board.push(gridPlace)
  }
  click = document.querySelectorAll(".gridPlace")
}

function generateRandomMine(){
  for(let j = 0; j < mines; j++){ // This is to choose the cells for the mines, it removes all adjacent mines and it (most of the times) it makes it so that the first cell clicked wont have the mine
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


function mineCounter(currentTarget){
  board.forEach((cell,i) => {
    if(board[i] === currentTarget){
      cellMineCounter = 0
      checker = [1, -1, width, -width , - width + 1, - width - 1 , width + 1, width - 1]
      if(i % width === 0){
        checker.splice(1, 1)
        checker.splice(4, 1)
        checker.splice(5, 1)
      }
      if(i % width === width - 1){
        checker.splice(0, 1)
        checker.splice(3, 1)
        checker.splice(4, 1)
      }
      if(i <= width && i !== 0){
        checker.splice(3, 3)
      }
      if(i > gridDim - width && i !==gridDim - width){
        checker.splice(2, 1)
        checker.splice(5, 2)
      }
      if(i === 0){
        checker = [1 , width, width + 1]
      }
      if(i === width - 1){
        checker = [-1 , width, width - 1]
      }
      if(i === gridDim - width){
        checker = [1 , -width, -width + 1]
      }
      if(i === gridDim - 1){
        checker = [-1 , -width, -width - 1]
      }
      
      mineCounterChecker(i)
      }
      finisherChecker(i)
    })
  }

  
  function mineCounterChecker(i){
    cellMineCounter = 0
    for(let j = 0 ; j < checker.length ; j++){
      let cellAdjacent = board[i + checker[j]]
      if(cellAdjacent.classList.contains("mine")){
        cellMineCounter++
      }
    }
    if(!board[i].classList.contains("mine")){
      board[i].innerHTML = cellMineCounter
    }
  }

  function notWorking(k){
    for( let n = 0 ; n < 4 ; n++){
      if(!board[k].classList.contains("mine")){
        console.log(k)
        if(n === 0){
          if(!board[k].innerHTML && k !== width - 1) {board[k].classList.add("clicked")}
        }
        if(n === 1){
          k = k + width
          if(!board[k].innerHTML && k < gridDim - width) {board[k].classList.add("clicked")}
        }
        if(n === 2){
          k = k - 1
          if(!board[k].innerHTML && k !== gridDim - 1) {board[k].classList.add("clicked")}
        }
        if(n === 3){
          k = k - width
          if(!board[k].innerHTML && k > width - 1) {board[k].classList.add("clicked")}
        }
      }
    }
  }

  function finisherChecker(i){
    for(let j = 0 ; j < random.length ; j++)
        {if(i === random[j] && board[i].classList.contains("clicked")){
          alive = false
          board.forEach(cell => {
            if(cell.classList.contains("mine")){
              if(difficulty === 3){
                cell.classList.add("revealHardMine")
                document.getElementById("difficulty").innerHTML = "You lost! Cerberus caught you!"
                // cell.classList.remove("hideMine")
              }
              if(difficulty === 2){
                cell.classList.add("revealEasyMine")
                document.getElementById("difficulty").innerHTML = "You lost! An angel caught you!"
                // cell.classList.remove("hideMine")
              }
              if(difficulty === 1){
                cell.classList.add("revealEasyMine")
                document.getElementById("difficulty").innerHTML = "You lost! An angel caught you!"
                // cell.classList.remove("hideMine")
              }
            }
          })
          endScreen.classList.add("lost")
          // setTimeout(() =>defeatScreen(), "3000")
        } else {
          for(let k = 0 ; k < gridDim ; k++){
            if(cellsMissing === 0){
              document.getElementById("difficulty").innerHTML = "You won! Congrats!"
              endScreen.classList.add("victory")
              // endTimer = setTimeout(() => winScreen(),"3000")
            }
          }
        }}
  }
  
function defeatScreen(){
  startGame(click)
}

function winScreen(){
  startGame(click)
}


//Events

// Event listener that checks the diff button.
buttons.forEach(button => button.addEventListener('click', startGame))

