const expect = require('chai').expect;
const Concert = require('../models/concerts.model');
const mongoose = require('mongoose');

describe('Concert', () => {

	it('should throw an Error if any of args wasn\'t provided', function () {
		const con = new Concert({});

		con.validate(err => {
			expect(err.errors).to.exist;
		})
	});

	it('should throw an Error if args have wrong type', function () {
		const cases = [{}, []];
		for (let performer of cases) {
			for (let genre of cases) {
				for (let price of cases) {
					for (let day of cases) {
						for (let image of cases) {
							const con = new Concert({ performer, genre, price, day, image });

							con.validate(err => {
								expect(err.errors).to.exist;
							});
						}
					}
				}
			}
		}
	});

	it('should not throw an Error with proper args', function () {
		const caseString = ['test-1', 'test-2', 'test-3', 'test-4'];
		const caseNumber = [25, 30, 35, 50];
		for (let performer of caseString) {
			for (let genre of caseString) {
				for (let price of caseNumber) {
					for (let day of caseNumber) {
						for (let image of caseString) {
							const con = new Concert({ performer, genre, price, day, image });

							con.validate(err => {
								expect(err).to.not.exist;
							});
						}
					}
				}
			}
		}
	});
});