const cellElements = document.querySelectorAll('[data-cell]'); //this is how to get data attribute
const board = document.querySelector('.board');
const xClass = 'x';
const circleClass = 'circle';
const winningMessageText = document.querySelector('.winner');
const restartButton = document.querySelector('.restart');
const resultScreen = document.querySelector('.result-screen');
const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

let circleTurn;

startGame();

//restart game
restartButton.addEventListener('click', startGame);

function startGame(){
    circleTurn = false;
    cellElements.forEach(cell =>{

        //remove all class to restart game
        cell.classList.remove(xClass);
        cell.classList.remove(circleClass);
        cell.removeEventListener('click', handleClick);


        cell.addEventListener('click', handleClick, {once: true}) //once the event is invoked it won't fire again
    });

    setBoardHoverClass();
    resultScreen.classList.remove('show');
}



function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? circleClass : xClass; //if circleTurn is true return circleClass, otherwise return xClass

    //place mark
    placeMark(cell, currentClass);


    //check for win
    if(checkWin(currentClass)){
        endGame(false);
    } else if(isDraw()){
        endGame(true);
    } else{
        //switch turns
        switchTurns();
        setBoardHoverClass();
    }

}

function isDraw(){
    //descturcturing 'cellElements' to use 'every' method
    return [...cellElements].every(cell =>{
        return cell.classList.contains(xClass) || cell.classList.contains(circleClass);
    })
}

//fuction to place marks
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

//fuction to switch turns
function switchTurns(){
    circleTurn = !circleTurn;
}

//to set hover effects
function setBoardHoverClass(){
    board.classList.remove(xClass);
    board.classList.remove(circleClass);

    if (circleTurn){
        board.classList.add(circleClass);
    }else{
        board.classList.add(xClass);
    }
}

//function to check for win
function checkWin(currentClass){
    return winningCombinations.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

//check for draw
function endGame(draw){
    if (draw){
        winningMessageText.innerText = 'Draw match!';
    } else{
        winningMessageText.innerText = `${circleTurn ? "O" : "X"} wins!`
    }
    resultScreen.classList.add('show');
}


