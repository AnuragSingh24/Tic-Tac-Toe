const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//let's create a function to initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    //UI pr empty bhi karna padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //green color removed
        //activate the default properties
        box.classList = `box box${index + 1}`;


    })

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();


function swapTurn() {
    if (currentPlayer == "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer} `;

}


function checkGameOver() {

    let answer = "";
    winningPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] != "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {


            //check if winner is x or o
            if (gameGrid[position[0]] === "X") {
                answer = "X";
            }
            else {
                answer = "O";
            }

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
            //now we know X/O is a winner;
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    });

    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;

    }

    //when there is tie

    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box != "")
            fillCount++;

    });
    //board is filled  , game is tie;

    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");

    }


}

function handleClick(index) {
    if (gameGrid[index] == "") {
        boxes[index].innerText = currentPlayer; //it changes in the ui 
        //gameGrid[index] = currentPlayer  //it changes the array of varaible that we ddeclare above
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko
        swapTurn();
        //koi jeet to ni gaya
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {

        handleClick(index);
    })

});


newGameBtn.addEventListener("click", initGame);