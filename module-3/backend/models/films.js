const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema({
  	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	releaseDate: {
		type: Date
	},
	rating: {
		type: String
	},
	noOfSeatsBooked: {
		type: Number,
		required: true
	},
	usersBooked: [
		{type: mongoose.Schema.Types.ObjectId, ref: "User"}
	],
	runtime: {
		type: Number,
		required: true
	}
}
);

module.exports = mongoose.model("Films", filmSchema);