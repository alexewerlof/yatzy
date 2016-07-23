/* rules from: http://www.playonlinedicegames.com/yatzy */

// All possible die values
const POSSIBLE_VALS = [1, 2, 3, 4, 5, 6];

// This pattern seems to happen a lot in this algorithm so
// this factory gets a function and asks it the score for every cell
// It should return a number (0 if no score)
function sumDiceFn(fn) {
  return dice => dice.reduce((sum, die) => fn(die) + sum, 0);
}

function includesAll(dice, values) {
  return values.every(val => dice.includes(val));
}

function numberCounter(dieValue) {
  return function (dice) {
    return dice.reduce(
      (sum, die) => die === dieValue ? dieValue + sum : sum,
      0
    );
  };
}

function count (dice, value) {
  return dice.reduce(
    (sum, die) => die === value ? sum + 1 : sum,
    0
  );
}

function countAll (dice) {
  return {
    1: count(dice, 1),
    2: count(dice, 2),
    3: count(dice, 3),
    4: count(dice, 4),
    5: count(dice, 5),
    6: count(dice, 6)
  };
}

// Returns an array with the die that are exactly repeated n times
function countExactlyRep (dice, n) {
  var ret = [];
  var stats = countAll(dice);
  return Object.getOwnPropertyNames(stats).filter(die => stats[die] === n);
}

// Returns an object with all die that are repeated as keys and repetition number as values
function keepCountAtLeast (dice, min) {
  var stats = countAll(dice);
  POSSIBLE_VALS.forEach(k => stats[k] < min ? delete stats[k] : null);
  return stats;
}

// Ones:	Dice with number one:	Total of ones rolled
exports.ones = numberCounter(1);

// Twos:	Dice with number two:	Total of twos rolled
exports.twos = numberCounter(2);

// Threes:	Dice with number three:	Total of threes rolled
exports.threes = numberCounter(3);

// Fours:	Dice with number four:	Total of fours rolled
exports.fours = numberCounter(4);

// Fives:	Dice with number five:	Total of fives rolled
exports.fives = numberCounter(5);

// Sixes:	Dice with number six:	Total of sixes rolled
exports.sixes = numberCounter(6);

// One Pair: Two dice showing the same number:	Sum of those two dice
exports.onePair = function (dice) {
  var pair = countExactlyRep(dice, 2);
  if (pair.length > 0) {
    // There can be 1 or 2 pairs. Return the maximum possible score
    pair.sort();
    pair.reverse();
    return pair[0] * 2;
  } else {
    return 0;
  }
}

// Two Pairs: Two pairs of dice showing same number:	Sum of dice in those two pairs
exports.twoPairs = function (dice) {
  var numbers = countExactlyRep(dice, 2);
  if (numbers.length === 2) {
    return numbers[0] * 2 + numbers[1] * 2;
  } else {
    return 0;
  }
}

// Three of a kind:	At least three dice showing the same number:	Sum of those three dice
exports.threeOfAKind = function (dice) {
  var stats = countAll(dice);
  // find an n with at least 3 repetitions
  var n3 = POSSIBLE_VALS.find(n => stats[n] >= 3);
  return typeof n3 !== 'undefined' ? n3 * 3 : 0;
}

// Four of a kind:	At least four dice showing the same number:	Sum of those four dice
exports.fourOfAKind = function (dice) {
  var stats = countAll(dice);
  var n4 = POSSIBLE_VALS.find(n => stats[n] >= 4);
  return typeof n4 !== 'undefined' ? n4 * stats[n4] : 0;
}

// Small straight:	1-2-3-4-5 combination:	15
exports.smallStraight = function (dice) {
  return includesAll(dice, [1, 2, 3, 4, 5]) ? 15 : 0;
}

// Large straight:	2-3-4-5-6 combination:	20
exports.largeStraight = function (dice) {
  return includesAll(dice, [2, 3, 4, 5, 6]) ? 20 : 0;
}

// House:	A three-of-a-kind and a pair:	Sum of all the dice
exports.house = function (dice) {
  var stats = countAll(dice);
  var n2 = countExactlyRep(dice, 2);
  var n3 = countExactlyRep(dice, 3);
  return n2.length === 1 && n3.length === 1? n2 * 2 + n3 * 3 : 0;
}

// Chance:	Any combination:	Sum of all dice
exports.chance = sumDiceFn (die => die);

// Yatzy:	All five dice showing the same number: 50
exports.yatzy = function (dice) {
  return count(dice, dice[0]) === 5 ? 50 : 0;
}
