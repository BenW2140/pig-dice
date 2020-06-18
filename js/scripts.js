function Game() {
  this.players = [],
  this.currentId = 0
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

const displayPlayers = function(game) {
  let htmlForPlayer = "";
  game.players.forEach(function(player) {
    htmlForPlayer += "<div id=player" + player.id + "><h3>Player" + player.id + "'s Score:</h3><h4><span id=score" + player.id + "></span></h4><h4>Current Total:</h4><h5><span id=total" + player.id + "></span></h5></div>";
  });
  $("#game").html(htmlForPlayer);
  for (let i = 1; i <= game.players.length; i++) {
    $("#score" + i).text("0");
    $("#total" + i).text("0");
  }
}

const rollTheDice = function(game, currentPlayer) {
    const result = randomInt();
    $("#result").show();
    $("#result").text(result);
    if (result === 1) {
      game.players[currentPlayer].resetCurrentTotal();
      game.players.forEach(function(player) {
        $("#total" + player.id).text(player.currentTotal);
      });
      if (currentPlayer === game.players.length - 1) {
        currentPlayer = 0;
      } else {
        currentPlayer++;
      }
    } else {
      game.players[currentPlayer].addToCurrentTotal(result);
      game.players.forEach(function(player) {
        $("#total" + player.id).text(player.currentTotal);
      });
    }
  return currentPlayer;
}

const holdScore = function(game, currentPlayer) {
  game.players[currentPlayer].addToScore();
  game.players[currentPlayer].resetCurrentTotal();
  game.players.forEach(function(player) {
    $("#score" + player.id).text(player.score);
    $("#total" + player.id).text(player.currentTotal);
  });
  if (currentPlayer === game.players.length - 1) {
    currentPlayer = 0;
  } else {
    currentPlayer++;
  }
  return currentPlayer;
}

const restartGame = function(game, currentPlayer) {
  game.players.forEach(function(player) {
    $("#player" + player.id).remove();
  });
  currentPlayer = 0;
  $("#new-game").show();
  $("#result").hide();
  $("#roll").hide();
  $("#hold").hide();
  $("#restart").hide();
  return currentPlayer;
}

$(document).ready(function() {
  $("#new-game").submit(function(event) {
    event.preventDefault();
    let newGame = new Game();
    const players = parseInt($("input#number-of-players").val());
    newGame.addToGame(players);
    let currentPlayer = 0;
    $("input#number-of-players").val("");
    if (players < 2 || players > 10) {
      $("#game").show();
      $("#game").text("Either not enough players or too many players!");
    } else {
      $("#new-game").hide();
      displayPlayers(newGame);
      $("#game").show();
      $("#roll").show();
      $("#hold").show();
      $("#restart").show();
    }
    $("#roll").click(function() {
      currentPlayer = rollTheDice(newGame, currentPlayer);
    });
    $("#hold").click(function() {
      currentPlayer = holdScore(newGame, currentPlayer);
    });
    $("#restart").click(function() {
      currentPlayer = restartGame(newGame, currentPlayer);
    });
  });
});