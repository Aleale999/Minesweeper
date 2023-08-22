Divine Minesweeper - or under my teacher's suggestion DivineSweeper

The title gives it away immediatly, this is an interpretation of Minesweeper.

Probably everyone has heard of this game, maybe you saw this while looking around your machine for a way to waste some (paid) time at work or just beat your friends' time in school, but if you haven't, here is a simple explaination of how the game works:
- The game starts with a grid of covered tiles. This is the mine field you have to clear, so be careful where you click.
- Once you clicked you may see a number appear on the cleared tile, this number indicates how many mines there are around this cell.
- The goal of the game, if it wasn't clear yet, is to click on every single empty cell, leaving only the mines covered.
- If you are successful then the game ends and you may pass to a more difficult level, with more tiles and more mines.
- If you click on a mine you lose.

This was my very first program I wrote. It is in no way efficient nor complete, I still need to implement a couple functions that are critical in minesweeper to make the game easier and more enjoyable, and also I need to change some settings to make it look better, so the user knows what he is looking at.

This game was the first project given to me (and also to every other student in the course) in the coding bootcamp I am currently enrolled in, GeneralAssembly.

The very weird (or you may say interesting if you want to be more polite) theme I chose is simply my experience with coding, it is all ups and downs. You start a program, get to the first wall, hit your head against it quite a few times until you finally realise how to solve the issue or find a way to work around the problem. So it came to me one day, this is like Dante's journey through hell, purgatory and heaven, because I am pretty sure the feeling he felt while witnessing God is the same I get when I finally see the program I typed working.

The way I worked on the logic behind program is simple:
I debated wether it was easier to work on a grid with 2 different counters (grid[i][j] to be clearer) or an array with one single counter, and of course I decided to go with the array because, and quoting a south african Mortal Kombat movie "I don't want peace, I want problems, always". This made it so much easier to work with in the beginning, with the choice of the difficulty and also the creation of the actual grid, because i just had to push every newly created item inside my grid array.
The difficulty function was simply to change the dimensions of my grid and the number of mines, and also change the background colours to follow the theme:

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

Then to generate the grid i simply used the dimensions set by the difficulty:

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

Of course I don't want the player to lose on the very first click, so i decided to create the mines immediatly after he clicked on the first cell, and also I don't want to generate a minefield where all the mines may end up in just one area of the grid, so I coded the program in a way so that if a mine was to be placed near another one, it cancels it and generates it somewhere else: 

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

Maybe the first big challenge was to check how many mines were all around each cell, of course controlling that the tiles i am clicking on arent near a border, and if they are only check the spots that are around that cell and not the ones on the other side of the grid, because i am working with an array so if i click on a cell at the right border the number immediatly after will bring right at the beginning of the next row, and same for the left borders checking the cells before it.

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

And inside the function to check if it is close to a border i actually needed to count the mines:

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

Every click the player makes, i also have to check that it is not a condition to win or lose, so to make sure of that I created a control inside the mine counter. This function checks that you havent clicked on a mine first, and if you did reveals every mine on the grid (themed mine, so i also had to check which difficulty was being played), and also checks that the victory condition, which is met only when there are no more clickable cells on the grid, so if the only places that weren't clicked on were mines:

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
        } else {
          for(let k = 0 ; k < gridDim ; k++){
            if(cellsMissing === 0){
              document.getElementById("difficulty").innerHTML = "You won! Congrats!"
              endScreen.classList.add("victory")
            }
          }
        }}
  }

And then after a finishing condition was met, wait for the player to choose a new difficulty setting to reset the grid and every other variable.