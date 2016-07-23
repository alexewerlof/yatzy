var rules = require('./rules.js');

var upperSection = [
  rules.ones,
  rules.twos,
  rules.threes,
  rules.fours,
  rules.fives,
  rules.sixes
];

var lowerSection = [
  rules.onePair,
  rules.twoPairs,
  rules.threeOfAKind,
  rules.fourOfAKind,
  rules.smallStraight,
  rules.largeStraight,
  rules.house,
  rules.chance,
  rules.yatzy
];

// Players can make 50 points bonus if they score a total of 63 or more in upper section.
exports.upperBonus = function (dice) {
  if (exports.upperSum(dice) >= 63) ? 50 : 0;
}

exports.upperSum = function (dice) {
  return upperSection.reduce(
    (sum, ruleFn) => sum + ruleFn(dice),
    0
  );
}
