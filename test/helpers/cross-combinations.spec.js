'use strict';

var helpers = require('../../lib/helpers');
var expect = require('expect.js');

describe('#cross-combinations', function(){

    it('should work', function () {
        var combs = helpers.crossCombinations([
            [0,1],
            [0,1],
            []
        ]);
        expect(combs).to.be.an('array');
        expect(combs).to.eql([
            [0,0, null],
            [1,0, null],
            [0,1, null],
            [1,1, null]
        ]);
    });

});