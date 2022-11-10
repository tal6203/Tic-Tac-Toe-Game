
const game_data = {
  turns : 0,
  arr:  ["", "", "", "", "", "", "", "", ""],
  flag: false,
}


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


let player1vsplayer2 = document.getElementById("player1vsplayer2");
let gameWith_Computer = document.getElementById("player1vscomputer");
player1vsplayer2.addEventListener("click", game1vs1);
gameWith_Computer.addEventListener("click", gameWithComputer);
restart.addEventListener("click", restGame);




function game1vs1() {
  player1vsplayer2.remove();
  gameWith_Computer.remove();
  document.getElementById("turns").innerHTML = "X's your turn";
  td.forEach((cell) => {
    cell.removeEventListener("click", gamePlay);
    cell.addEventListener("click", addClick);
  });
}
function addClick() {
  if (this.innerHTML != "" || game_data.flag) {
    return;
  } else {
    if (game_data.turns % 2 == 0) {
      this.innerHTML = "X";
      this.style.color = "red";
      game_data.arr[this.getAttribute("id")] = "X";
      status_turns.innerHTML = `O's your turn`;
      game_data.turns++;
      checkWin("X");
    } else {
      this.innerHTML = "O";
      this.style.color = "greenyellow";
      game_data.arr[this.getAttribute("id")] = "O";
      status_turns.innerHTML = "X's your turn";
      game_data.turns++;
      checkWin("O");
    }
  }
}

function checkWin(currentPlayer) {
  for (let i = 0; i < combineToWin.length; i++) {
    let option = combineToWin[i];
    let cell1 = option[0];
    let cell2 = option[1];
    let cell3 = option[2];
    if (
      td[cell1].innerHTML == currentPlayer &&
      td[cell1].innerHTML == td[cell2].innerHTML &&
      td[cell2].innerHTML == td[cell3].innerHTML
    ) {
      td[cell1].style.backgroundColor = "purple";
      td[cell2].style.backgroundColor = "purple";
      td[cell3].style.backgroundColor = "purple";
      document.getElementById("the_winner").innerHTML =
        `The winner is: ${currentPlayer}`;
      status_turns.innerHTML = "";
      return game_data.flag = true;
    } 
  }
  if (!game_data.arr.includes("")) {
    status_turns.innerHTML = "";
    document.getElementById("the_winner").innerHTML = "Draw";
    return game_data.flag = true;
  }
}
function restGame() {
  game_data.turns = 0;
  game_data.flag = false;
  game_data.arr = ["", "", "", "", "", "", "", "", ""];
  status_turns.innerHTML = "";
  document.getElementById("the_winner").innerHTML = "";
  td.forEach((e) => {
    e.innerHTML = "";
    e.style.backgroundColor = "";
  });
  document.body.appendChild(player1vsplayer2);
  document.body.appendChild(gameWith_Computer);
  td.forEach((cell) => {
    cell.removeEventListener("click",addClick);
    cell.removeEventListener("click", gamePlay);
  })
}

function gameWithComputer() {
  player1vsplayer2.remove();
  gameWith_Computer.remove();
  document.getElementById("turns").innerHTML = "X's your turn";
  td.forEach((cell) => {
    cell.removeEventListener("click",addClick)
    cell.addEventListener("click", gamePlay);
  });
}

function computerPlayerLocation() {
  let computer_player = Math.floor(Math.random() * 9);
  while ((!game_data.flag) && game_data.turns % 2 != 0) {
    if(td[computer_player].innerHTML != ""){
      computer_player = Math.floor(Math.random() * 9);
      continue;
    }
    game_data.turns++;
    td[computer_player].innerHTML = "O";
    td[computer_player].style.color = "greenyellow";
    game_data.arr[td[computer_player].getAttribute("id")] = "O";
    status_turns.innerHTML = "X's your turn";
    checkWin("O");
  }
}


function gamePlay() {
  if (this.innerHTML == "" && (!game_data.flag)) {
    this.innerHTML = "X";
    this.style.color = "red";
    game_data.turns++;
    game_data.arr[this.getAttribute("id")] = "X";
    status_turns.innerHTML = `Computer your turn`;
    setTimeout(computerPlayerLocation, 500);
    checkWin("X");
  }
}

