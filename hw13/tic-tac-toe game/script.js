let turns = 0;
let arr = ["", "", "", "", "", "", "", "", ""];
let restart = document.getElementById("restart");
const td = document.querySelectorAll("td");
const status_turns = document.getElementById("turns");
const combineToWin = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let flage = false;
let player1vsplayer2 = document.getElementById("player1vsplayer2");
let gameOn_Computer = document.getElementById("player1vscomputer");
player1vsplayer2.addEventListener("click", gameOn);
gameOn_Computer.addEventListener("click", gameOnComputer);
restart.addEventListener("click", restGame);


function gameOn() {
  player1vsplayer2.remove();
  gameOn_Computer.remove();
  document.getElementById("turns").innerHTML = "X's your turn";
  td.forEach((cell) => {
    cell.removeEventListener("click", gamePlay);
    cell.addEventListener("click", addClick);
  });
}
function addClick() {
  if (this.innerHTML != "" || flage) {
    return;
  } else {
    if (turns % 2 == 0) {
      this.innerHTML = "X";
      this.style.color = "red";
      arr[this.getAttribute("id")] = "X";
      status_turns.innerHTML = `O's your turn`;
      turns++;
    } else {
      this.innerHTML = "O";
      this.style.color = "greenyellow";
      arr[this.getAttribute("id")] = "O";
      status_turns.innerHTML = "X's your turn";
      turns++;
    }
  }
  checkWin();
}

function checkWin() {
  for (let i = 0; i < combineToWin.length; i++) {
    let option = combineToWin[i];
    let cell1 = option[0];
    let cell2 = option[1];
    let cell3 = option[2];
    if (
      td[cell1].innerHTML == "X" &&
      td[cell1].innerHTML == td[cell2].innerHTML &&
      td[cell2].innerHTML == td[cell3].innerHTML
    ) {
      td[cell1].style.backgroundColor = "purple";
      td[cell2].style.backgroundColor = "purple";
      td[cell3].style.backgroundColor = "purple";
      document.getElementById("the_winner").innerHTML =
        "The winner is: X";
      status_turns.innerHTML = "";
      return (flage = true);
    } else if (
      td[cell1].innerHTML == "O" &&
      td[cell1].innerHTML == td[cell2].innerHTML &&
      td[cell2].innerHTML == td[cell3].innerHTML
    ) {
      td[cell1].style.backgroundColor = "purple";
      td[cell2].style.backgroundColor = "purple";
      td[cell3].style.backgroundColor = "purple";
      document.getElementById("the_winner").innerHTML =
        "The winner is: O";
      status_turns.innerHTML = "";
      return (flage = true);
    }
  }
  if (!arr.includes("")) {
    status_turns.innerHTML = "";
    document.getElementById("the_winner").innerHTML = "Draw";
    return (flage = true);
  }
}
function restGame() {
  turns = 0;
  arr = ["", "", "", "", "", "", "", "", ""];
  status_turns.innerHTML = "";
  document.getElementById("the_winner").innerHTML = "";
  td.forEach((e) => {
    e.innerHTML = "";
    e.style.backgroundColor = "";
  });
  flage = false;
  document.body.appendChild(player1vsplayer2);
  document.body.appendChild(gameOn_Computer);
  td.forEach((cell) => {
    cell.removeEventListener("click",addClick);
    cell.removeEventListener("click", gamePlay);
  })
}



function computerPlayer() {
  let computer_player = Math.floor(Math.random() * 9);
  if (td[computer_player].innerHTML == "" && (!flage)) {
    td[computer_player].innerHTML = "O";
    td[computer_player].style.color = "greenyellow";
    arr[td[computer_player].getAttribute("id")] = "O";
    status_turns.innerHTML = "X's your turn";
  }
  else if ((!(flage))) {
    computerPlayer();
  }
  checkWin();
}

function gameOnComputer() {
  player1vsplayer2.remove();
  gameOn_Computer.remove();
  document.getElementById("turns").innerHTML = "X's your turn";
  td.forEach((cell) => {
    cell.removeEventListener("click",addClick)
    cell.addEventListener("click", gamePlay);
  });
}




function gamePlay() {
  if (this.innerHTML == "" && (!flage)) {
    this.innerHTML = "X";
    this.style.color = "red";
    arr[this.getAttribute("id")] = "X";
    status_turns.innerHTML = `Computer your turn`;
    setTimeout(computerPlayer, 500);
    checkWin();
  }
}



