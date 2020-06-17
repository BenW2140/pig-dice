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
  $("#die-roll").click(function(event) {
    event.preventDefault();
    const result = randomInt();
    $("#result").text(result);
  });
});