

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

function firstClicked(event){ // Function makes the user pick a cell and then generates the mines, to avoid a click on the mine on the first click
  //First click
  click.forEach(cell => cell.addEventListener("click", cellClick))
  event.currentTarget.classList.add("clicked")
  //Then generate mines
  generateRandomMine()
}


function mineCounter(currentTarget){ // function to count each mine around a clicked cell. This also checks that the cell isnt near a border or a corner
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

  // function notWorking(k){
  //   for( let n = 0 ; n < 4 ; n++){
  //     if(!board[k].classList.contains("mine")){
  //       console.log(k)
  //       if(n === 0){
  //         if(!board[k].innerHTML && k !== width - 1) {board[k].classList.add("clicked")}
  //       }
  //       if(n === 1){
  //         k = k + width
  //         if(!board[k].innerHTML && k < gridDim - width) {board[k].classList.add("clicked")}
  //       }
  //       if(n === 2){
  //         k = k - 1
  //         if(!board[k].innerHTML && k !== gridDim - 1) {board[k].classList.add("clicked")}
  //       }
  //       if(n === 3){
  //         k = k - width
  //         if(!board[k].innerHTML && k > width - 1) {board[k].classList.add("clicked")}
  //       }
  //     }
  //   }
  // }

  function finisherChecker(i){ // This function checks that the game is not over, and if it is then checks the condition met
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

