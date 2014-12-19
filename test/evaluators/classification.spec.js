'use strict';

var assert = require('assert'),
    expect = require('expect.js'),
    Q = require('q'),
    mout = require('mout'),
    classification = require('../../lib/evaluators/classification');

var testSet = [
    [[0, 0, 0], '0'],
    [[0, 0, 1], '1'],
    [[0, 1, 0], '2'],
    [[0, 1, 1], '3'],
    [[1, 0, 0], '0'],
    [[1, 0, 1], '1'],
    [[1, 1, 0], '2'],
    [[1, 1, 1], '3']
];

describe('Classification Evaluator', function(){
    describe('with bad classifier', function () {
        var clf;

        beforeEach(function () {
            clf = {
                predictSync: function(state){
                    return '0';
                }
            };
        });

        it ('should report accuracy/fscore/precision/recall for entire dataset', function(){
            var report = classification.evaluate(testSet, clf);

            expect(report).to.be.ok();
            expect(report.accuracy).to.be(0.25);
            expect(report.fscore).to.be(0);
            expect(report.precision).to.be(0);
            expect(report.recall).to.be(0);

        });

        it ('should report accuracy/fscore/precision/recall for each class', function(){
            var report = classification.evaluate(testSet, clf);
            expect(report.class).to.be.ok();
            mout.object.forOwn(report.class, function (classReport, label) {
                expect(classReport).to.have.property('fscore');
                expect(classReport).to.have.property('precision');
                expect(classReport).to.have.property('recall');
            });
        });

    });

    describe ('with perfect classifier', function(){
        var clf;
        beforeEach(function () {
            clf = {
                predictSync: function(state){
                    return [['0', '1'], ['2', '3']][state[1]][state[2]];
                }
            };
        });
        it ('should report perfect accuracy/fscore/precision/recall for entire dataset', function(){
            var report =  classification.evaluate(testSet, clf);
            expect(report).to.be.ok();
            expect(report.accuracy).to.be(1);
            expect(report.fscore).to.be(1);
            expect(report.precision).to.be(1);
            expect(report.recall).to.be(1);

        });

        it ('should report accuracy/fscore/precision/recall for each class', function(){
            var report =  classification.evaluate(testSet, clf);
            expect(report.class).to.be.ok();
            mout.object.forOwn(report.class, function (classReport) {
                expect(classReport.fscore).to.be(1);
                expect(classReport.precision).to.be(1);
                expect(classReport.recall).to.be(1);
            });
        });

    });
});
