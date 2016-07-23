var expect = require('chai').expect;
var yatzy = require('../rules.js');

describe('Rules', function() {

  describe('#ones()', function() {
    it('returns sum of all ones', function() {
      expect(yatzy.ones([1, 2, 3, 4, 5])).to.be.equal(1);
      expect(yatzy.ones([1, 1, 2, 2, 2])).to.be.equal(2);
      expect(yatzy.ones([1, 1, 1, 1, 1])).to.be.equal(5);
    });
    it('returns 0 if not found', function (){
      expect(yatzy.ones([2, 2, 2, 2, 2])).to.be.equal(0);
    });
  });

  describe('#twos()', function() {
    it('returns sum of all twos', function() {
      expect(yatzy.twos([2, 2, 2, 2, 2])).to.be.equal(10);
      expect(yatzy.twos([1, 2, 3, 4, 5])).to.be.equal(2);
      expect(yatzy.twos([1, 1, 2, 2, 2])).to.be.equal(6);
    });
    it('returns 0 if not found', function (){
      expect(yatzy.twos([1, 1, 1, 1, 1])).to.be.equal(0);
    });
  });

  describe('#threes()', function() {
    it('returns sum of all threes', function() {
      expect(yatzy.threes([3, 3, 3, 3, 3])).to.be.equal(3 * 5);
      expect(yatzy.threes([1, 1, 1, 1, 3])).to.be.equal(3);
    });
    it('returns 0 if not found', function (){
      expect(yatzy.threes([1, 1, 1, 1, 1])).to.be.equal(0);
    });
  });

  describe('#fours()', function() {
    it('returns sum of all fours', function() {
      expect(yatzy.fours([4, 4, 4, 4, 4])).to.be.equal(4 * 5);
      expect(yatzy.fours([1, 1, 1, 1, 4])).to.be.equal(4);
    });
    it('returns 0 if not found', function (){
      expect(yatzy.fours([1, 1, 1, 1, 1])).to.be.equal(0);
    });
  });

  describe('#fives()', function() {
    it('returns sum of all fives', function() {
      expect(yatzy.fives([5, 5, 5, 5, 5])).to.be.equal(5 * 5);
      expect(yatzy.fives([1, 1, 1, 1, 5])).to.be.equal(5);
    });
    it('returns 0 if not found', function (){
      expect(yatzy.fives([1, 1, 1, 1, 1])).to.be.equal(0);
    });
  });

  describe('#sixes()', function() {
    it('returns sum of all sixes', function() {
      expect(yatzy.sixes([6, 6, 6, 6, 6])).to.be.equal(6 * 5);
      expect(yatzy.sixes([1, 1, 1, 1, 6])).to.be.equal(6);
    });
    it('returns 0 if not found', function (){
      expect(yatzy.sixes([1, 1, 1, 1, 1])).to.be.equal(0);
    });
  });

  describe('#onePair()', function() {
    it('returns sum of the pair', function() {
      expect(yatzy.onePair([6, 6, 2, 3, 4])).to.be.equal(6 * 2);
      expect(yatzy.onePair([1, 1, 2, 3, 4])).to.be.equal(2);
    });
    it('for more than two similar dices, the score is 0', function () {
      expect(yatzy.onePair([2, 2, 2, 3, 4])).to.be.equal(0);
      expect(yatzy.onePair([2, 2, 2, 2, 4])).to.be.equal(0);
      expect(yatzy.onePair([2, 2, 2, 2, 2])).to.be.equal(0);
    });
    it('if there are 2 pairs, returns the maximum possible score', function () {
      expect(yatzy.onePair([2, 2, 5, 3, 3])).to.be.equal(6);
      expect(yatzy.onePair([3, 3, 5, 2, 2])).to.be.equal(6);
    });
    it('ignores a second pair if it is repeated actually 3 times', function () {
      expect(yatzy.onePair([2, 2, 3, 3, 3])).to.be.equal(4);

      expect(yatzy.onePair([2, 2, 3, 3, 3])).to.be.equal(4);
    });
    it('returns 0 if there are no pairs', function () {
      expect(yatzy.onePair([1, 2, 3, 4, 5])).to.be.equal(0);
    });
  });

  describe('#twoPairs()', function() {
    it('returns sum of the pairs', function() {
      expect(yatzy.twoPairs([6, 6, 2, 2, 4])).to.be.equal(12 + 4);
      expect(yatzy.twoPairs([1, 1, 2, 2, 4])).to.be.equal(2 + 4);
    });
    it('ignores if one of the pairs is actually repeated 3 times', function() {
      expect(yatzy.twoPairs([6, 6, 2, 2, 2])).to.be.equal(0);
      expect(yatzy.twoPairs([1, 1, 1, 2, 2])).to.be.equal(0);
    });
    it('0 if there are not exactly two pairs', function() {
      expect(yatzy.twoPairs([1, 2, 3, 4, 5])).to.be.equal(0);
      expect(yatzy.twoPairs([2, 3, 4, 5, 6])).to.be.equal(0);
      expect(yatzy.twoPairs([1, 1, 2, 3, 4])).to.be.equal(0);
    });
  });

  describe('#threeOfAKind', function () {
    it('returns the sum of the value that is repeated 3 times', function() {
      expect(yatzy.threeOfAKind([1, 1, 1, 2, 2])).to.be.equal(3);
      expect(yatzy.threeOfAKind([2, 2, 2, 3, 3])).to.be.equal(6);
      expect(yatzy.threeOfAKind([1, 1, 1, 1, 2])).to.be.equal(3);
      expect(yatzy.threeOfAKind([2, 2, 2, 2, 2])).to.be.equal(6);
    });
    it('returns 0 when no value is repeated 3 times', function() {
      expect(yatzy.threeOfAKind([2, 2, 3, 4, 5])).to.be.equal(0);
      expect(yatzy.threeOfAKind([3, 2, 2, 3, 5])).to.be.equal(0);
    });
  });

  describe('#fourOfAKind', function () {
    it('returns the sum of the value that is repeated 4 times', function() {
      expect(yatzy.fourOfAKind([1, 1, 1, 1, 2])).to.be.equal(1 * 4);
      expect(yatzy.fourOfAKind([2, 3, 3, 3, 3])).to.be.equal(3 * 4);
      expect(yatzy.fourOfAKind([5, 1, 5, 5, 5])).to.be.equal(5 * 4);
    });
    it('returns the sum of the value even when they are repeated 5 times', function() {
      expect(yatzy.fourOfAKind([1, 1, 1, 1, 1])).to.be.equal(1 * 5);
      expect(yatzy.fourOfAKind([2, 2, 2, 2, 2])).to.be.equal(2 * 5);
      expect(yatzy.fourOfAKind([6, 6, 6, 6, 6])).to.be.equal(6 * 5);
    });
    it('returns 0 when no value is repeated at least 4 times', function() {
      expect(yatzy.fourOfAKind([2, 2, 3, 4, 5])).to.be.equal(0);
      expect(yatzy.fourOfAKind([3, 2, 2, 2, 5])).to.be.equal(0);
      expect(yatzy.fourOfAKind([3, 3, 1, 3, 1])).to.be.equal(0);
    });
  });

  describe('#smallStraight()', function () {
    it('returns 15 when it happens', function () {
      expect(yatzy.smallStraight([1, 2, 3, 4, 5])).to.be.equal(15);
      expect(yatzy.smallStraight([2, 1, 3, 4, 5])).to.be.equal(15);
      expect(yatzy.smallStraight([5, 4, 3, 2, 1])).to.be.equal(15);
    });
    it('returns 0 when it does not happen', function () {
      expect(yatzy.smallStraight([6, 4, 3, 2, 1])).to.be.equal(0);
    });
  });

  describe('#largeStraight()', function () {
    it('returns 20 when it happens', function () {
      expect(yatzy.largeStraight([2, 3, 4, 5, 6])).to.be.equal(20);
      expect(yatzy.largeStraight([2, 6, 3, 4, 5])).to.be.equal(20);
      expect(yatzy.largeStraight([6, 5, 4, 3, 2])).to.be.equal(20);
    });
    it('returns 0 when it does not happen', function () {
      expect(yatzy.largeStraight([5, 4, 3, 2, 1])).to.be.equal(0);
    });
  });

  describe('#house()', function () {
    it('returns the sum of the all dice if it is a house', function () {
      expect(yatzy.house([1, 1, 1, 2, 2])).to.be.equal(2 * 2 + 1 * 3);
      expect(yatzy.house([2, 2, 3, 3, 3])).to.be.equal(2 * 2 + 3 * 3);
      expect(yatzy.house([4, 5, 5, 4, 5])).to.be.equal(4 * 2 + 5 * 3);
    });
    it('returns 0 when it is not a house', function () {
      expect(yatzy.house([1, 1, 1, 1, 1])).to.be.equal(0);
      expect(yatzy.house([1, 1, 2, 2, 3])).to.be.equal(0);
    });
  });

  describe('#chance()', function () {
    it('returns the sum of all dice', function () {
      expect(yatzy.chance([1, 1, 1, 1, 1])).to.be.equal(5);
      expect(yatzy.chance([1, 2, 3, 4, 5])).to.be.equal(15);
      expect(yatzy.chance([6, 6, 6, 6, 6])).to.be.equal(30);
    });
  });

  describe('#yatzy()', function () {
    it('returns 50 if all of them are the same', function () {
      expect(yatzy.yatzy([1, 1, 1, 1, 1])).to.be.equal(50);
      expect(yatzy.yatzy([2, 2, 2, 2, 2])).to.be.equal(50);
      expect(yatzy.yatzy([3, 3, 3, 3, 3])).to.be.equal(50);
      expect(yatzy.yatzy([4, 4, 4, 4, 4])).to.be.equal(50);
      expect(yatzy.yatzy([5, 5, 5, 5, 5])).to.be.equal(50);
      expect(yatzy.yatzy([6, 6, 6, 6, 6])).to.be.equal(50);
    });

    it('returns 0 if any number of them do not match the rest', function () {
      expect(yatzy.yatzy([1, 2, 1, 1, 1])).to.be.equal(0);
      expect(yatzy.yatzy([1, 1, 2, 1, 1])).to.be.equal(0);
      expect(yatzy.yatzy([1, 1, 1, 2, 1])).to.be.equal(0);
      expect(yatzy.yatzy([1, 1, 1, 1, 2])).to.be.equal(0);
      expect(yatzy.yatzy([2, 2, 3, 2, 2])).to.be.equal(0);
    });
  });
});
