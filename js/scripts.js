function Game() {
  this.players = []
}

Game.prototype.addToGame = function(player) {
  return this.players.push(player);
}

function Player() {
  this.score = 0,
  this.currentTotal = 0
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

$(document).ready(function() {
  let player1 = new Player();
  let player2 = new Player();
  let currentPlayer = player1;
  $("#score1").text(player1.score);
  $("#score2").text(player2.score);
  $("#roll").click(function(event) {
    event.preventDefault();
    const result = randomInt();
    $("#result").text(result);
    if (result === 1) {
      currentPlayer.resetCurrentTotal();
      if (currentPlayer === player1) {
        currentPlayer = player2;
      } else {
        currentPlayer = player1;
      }
    } else {
      currentPlayer.addToCurrentTotal(result);
    }
    $("#total1").text(player1.currentTotal);
    $("#total2").text(player2.currentTotal);
  });
  $("#hold").click(function(event) {
    event.preventDefault();
    currentPlayer.addToScore();
    currentPlayer.resetCurrentTotal();
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
    $("#score1").text(player1.score);
    $("#score2").text(player2.score);
    $("#total1").text(player1.currentTotal);
    $("#total2").text(player2.currentTotal);
  });
});