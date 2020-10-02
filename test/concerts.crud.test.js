const Concert = require('../models/concerts.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

describe('Concert', () => {
	before(async () => {
		try {
			const fakeDB = new MongoMemoryServer();
			const uri = await fakeDB.getUri();
			mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
		}catch (err) {
			console.log(err);
		}
	});

	describe('Reading data', () => {
		before(async () => {
			const testOne = new Concert({
				performer: 'name-1',
				genre: 'rock-1',
				price: 25,
				day: 2,
				image: 'image-1'
			});
			await testOne.save();

			const testTwo = new Concert({
				performer: 'name-2',
				genre: 'rock-2',
				price: 35,
				day: 1,
				image: 'image-2'
			});
			await testTwo.save();
		});

		it('should return all the data with "find" method',async function () {
			const concerts = await Concert.find();
			const expectLength = 2;

			expect(concerts.length).to.be.equal(expectLength);
		});

		it('should return a proper document by "performer" with "findOne" method',async function () {
			const concert = await Concert.findOne({ performer: 'name-2' });
			const expectedDoc = 'name-2';
			expect(concert.performer).to.be.equal(expectedDoc);
		});

		after(async () => {
			await Concert.deleteMany();
		});
	});

	describe('Creating data', () => {
		it('should should insert new document with "insertOne" method', async function () {
			const concert = new Concert({
				performer: 'name-1',
				genre: 'rock-1',
				price: 25,
				day: 2,
				image: 'image-1'
			});
			await concert.save();
			expect(concert.isNew).to.be.false;
		});

		after(async () => {
			await Concert.deleteMany();
		});
	});

	describe('Updating data', () => {
		beforeEach(async () => {
			const testOne = new Concert({
				performer: 'name-1',
				genre: 'rock-1',
				price: 25,
				day: 2,
				image: 'image-1'
			});
			await testOne.save();

			const testTwo = new Concert({
				performer: 'name-2',
				genre: 'rock-2',
				price: 35,
				day: 1,
				image: 'image-2'
			});
			await testTwo.save();
		});
		afterEach(async () => {
			await Concert.deleteMany();
		});

		it('should properly update one document with "updateOne" method' ,async function () {
			await Concert.updateOne({ performer: 'name-2' }, { $set: { performer: '=name-2=' }});
			const updatedConcert = await Concert.findOne({ performer: '=name-2=' });
			expect(updatedConcert).to.not.be.null;
		});

		it('should properly update one document with "save" method',async function () {
			const concert = await Concert.findOne({ performer: 'name-2' });
			concert.performer = '=name-2=';
			await concert.save();
			expect(concert.isNew).to.be.false;
		});

		it('should properly update multiple documents with "updateMany" method',async function () {
			await Concert.updateMany({}, {$set: { performer: 'UpdateMany' }});
			const updConcert = await Concert.find();
			expect(updConcert[0].performer).to.be.equal('UpdateMany');
			expect(updConcert[1].performer).to.be.equal('UpdateMany');
		});
	});

	describe('Removing data', () => {
		beforeEach(async () => {
			const testOne = new Concert({
				performer: 'name-1',
				genre: 'rock-1',
				price: 25,
				day: 2,
				image: 'image-1'
			});
			await testOne.save();

			const testTwo = new Concert({
				performer: 'name-2',
				genre: 'rock-2',
				price: 35,
				day: 1,
				image: 'image-2'
			});
			await testTwo.save();
		});
		afterEach(async () => {
			await Concert.deleteMany();
		});

		it('should  properly remove one document with "deleteOne" method',async function () {
			await Concert.deleteOne({ performer: 'name-2' });
			const deletedConcert = await  Concert.findOne({ performer: 'name-2' });
			expect(deletedConcert).to.be.null;
		});

		it('should  properly remove one document with "remove" method',async function () {
			const concert = await Concert.findOne({ performer: 'name-2' });
			await concert.remove();
			const removedConcert = await Concert.findOne({ performer: 'name-2' });
			expect(removedConcert).to.be.null;
		});

		it('should  properly remove multiple documents with "deleteMany" method',async function () {
			await Concert.deleteMany();
			const deletedCon  = await Concert.find();
			expect(deletedCon.length).to.be.equal(0);
		});
	});

	after(async () => {
		mongoose.connection.close();
	});
});