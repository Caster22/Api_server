const Testimonial = require('../models/testimonials.model');
const sanitize = require('mongo-sanitize');



exports.getAll = async (req, res) => {
	try {
		res.json(await Testimonial.find());
	}
	catch(err) {
		res.status(500).json({ message: err });
	}
};

exports.getById = async (req, res) => {
	try {
		const tes = await Testimonial.findById(req.params.id);
		if (!tes) res.status(404).json({ message: 'Not found' });
		else res.json(tes);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getRandom = async (req, res) => {
	try {
		const count = await Testimonial.countDocuments();
		const rand = Math.floor(Math.random() * count);
		const tes = await Testimonial.findOne().skip(rand);
		if (!tes) res.status(404).json({ message: 'Not found' });
		else res.json(tes);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.postNew = async (req, res) => {
	//const { author, text } = req.body;
	const cleanAuth = sanitize(req.body.author);
	const cleanText = sanitize(req.body.text);

	try {
		const newTestimonial = new Testimonial({ author: cleanAuth, text: cleanText });
		await newTestimonial.save();
		res.json({ message: 'OK' });
	} catch(err) {
		res.status(500).json({ message: err });
	}
};

exports.updateById = async (req, res) => {
	const { author, text } = req.body;

	try {
		const tes = await(Testimonial.findById(req.params.id));
		if (tes) {
			await Testimonial.updateOne({ _id: req.params.id }, { $set: { author: author, text: text } });
			res.json({ message: tes });
		} else {
			res.status(404).json({ message: 'Not found' });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.removeById = async (req, res) => {
	try {
		const tes = await(Testimonial.findById(req.params.id));
		if (tes) {
			await Testimonial.deleteOne({ _id: req.params.id});
			res.json({ message: tes });
		} else {
			res.status(404).json({ message: 'Not found' });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};