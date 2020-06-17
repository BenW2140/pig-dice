function Game() {
  this.players = [];
  this.currentId = 0;
}

Game.prototype.addToGame = function(numberOfPlayers) {
  for (let i = 0; i < numberOfPlayers; i++) {
    let player = new Player();
    player.id = this.assignId();
    this.players.push(player);
  }
}

Game.prototype.assignId = function() {
  this.currentId++;
  return this.currentId;
}

function Player() {
  this.score = 0;
  this.currentTotal = 0;
}

Player.prototype.addToCurrentTotal = function(rolledNumber) {
  return this.currentTotal += rolledNumber;
}

Player.prototype.addToScore = function() {
  return this.score += this.currentTotal;
}

Player.prototype.resetCurrentTotal = function() {
  return this.currentTotal = 0;
}

const randomInt = function() {
  const min = 1;
  const max = 6;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const displayPlayers = function(game) {
  let htmlForPlayer = "";
  game.players.forEach(function(player) {
    htmlForPlayer += "<div id=player" + player.id + "><h3>Player" + player.id + "'s Score:</h3><h4><span id=score" + player.id + "></span></h4><h4>Current Total:</h4><h5><span id=total" + player.id + "></span></h5></div>";
  });
  $(".container").html(htmlForPlayer);
}

$(document).ready(function() {
  let newGame = Game();
  $("#new-game").submit(function(event) {
    event.preventDefault();
    const players = parseInt($("input#number-of-players").val());
    newGame.addToGame(players);
    $("#new-game").hide();
    displayPlayers(newGame);
  });
  // $("#score1").text(player1.score);
  // $("#score2").text(player2.score);
  // $("#roll").click(function(event) {
  //   event.preventDefault();
  //   const result = randomInt();
  //   $("#result").text(result);
  //   if (result === 1) {
  //     currentPlayer.resetCurrentTotal();
  //     if (currentPlayer === player1) {
  //       currentPlayer = player2;
  //     } else {
  //       currentPlayer = player1;
  //     }
  //   } else {
  //     currentPlayer.addToCurrentTotal(result);
  //   }
  //   $("#total1").text(player1.currentTotal);
  //   $("#total2").text(player2.currentTotal);
  // });
  // $("#hold").click(function(event) {
  //   event.preventDefault();
  //   currentPlayer.addToScore();
  //   currentPlayer.resetCurrentTotal();
  //   if (currentPlayer === player1) {
  //     currentPlayer = player2;
  //   } else {
  //     currentPlayer = player1;
  //   }
  //   $("#score1").text(player1.score);
  //   $("#score2").text(player2.score);
  //   $("#total1").text(player1.currentTotal);
  //   $("#total2").text(player2.currentTotal);
  // });
});