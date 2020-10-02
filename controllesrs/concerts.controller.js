const Concert = require('../models/concerts.model');

exports.getAll = async (req, res) => {
	try {
		res.json(await Concert.find());
	}
	catch(err) {
		res.status(500).json({ message: err });
	}
};

exports.getById = async (req, res) => {
	try {
		const con = await Concert.findById(req.params.id);
		if (!con) res.status(404).json({ message: 'Not found' });
		else res.json(con);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getByPerformer = async (req, res) => {
	try {
		const performerInput = req.params.performer;
		const [ firstName, lastName ] = performerInput.split('-'); // name in link should be written as John-Doe when looking for John Doe
		const performer = firstName + ' ' + lastName;

		const con = await Concert.find({ performer: performer });
		if (!con) res.status(404).json({ message: 'Not found' });
		else res.json(con);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getByGenre = async (req, res) => {
	try {
		const con = await Concert.find({ genre: req.params.genre });
		if (!con) res.status(404).json({ message: 'Not found' });
		else res.json(con);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getByPriceRange = async (req, res) => {
	try {
		const con = await  Concert.find({ price: { $gt: req.params.price_min, $lt: req.params.price_max } });
		if (!con) res.status(404).json({ message: 'Not found' });
		else res.json(con);
	}catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getByDay = async (req, res) => {
	try {
		const con = await Concert.find({ day: req.params.day });
		if (!con) res.status(404).json({ message: 'Not found' });
		else res.json(con);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.postNew = async (req, res) => {
	const { performer, genre, price, day, image } = req.body;

	try {
		const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
		await newConcert.save();
		res.json({ message: 'OK' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.removeById = async (req, res) => {
	try {
		const con = await(Concert.findById(req.params.id));
		if (con) {
			await con.deleteOne({ _id: req.params.id});
			res.json({ message: con });
		} else {
			res.status(404).json({ message: 'Not found' });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.updateById = async (req, res) => {
	const { performer, genre, price, day, image } = req.body;

	try {
		const con = await(Concert.findById(req.params.id));
		if (con) {
			await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image } });
			res.json({ message: con });
		} else {
			res.status(404).json({ message: 'Not found' });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};