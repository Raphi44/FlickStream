const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  //_id: { type: Number, required: true, unique: true },
  Name: String,
  Email: String,
  City: String,
});

const movieSchema = new mongoose.Schema({
  _id: { type: String, required: true, unique: true },
  Name: String,
  Genres: Array,
  Image: String,
  Premiered: Date,
});

const subscriptionSchema =new mongoose.Schema({

  MemberId :{ type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  Movies: [
    {
      movieId: { type: String, ref: 'Movie', required: true },
      date: { type: Date, required: true }
    }
  ]
})

const Member = mongoose.model("Member", memberSchema);
const Movie = mongoose.model("Movie", movieSchema);
const Subscriptions= mongoose.model("Subscriptions",subscriptionSchema);

module.exports = { Member, Movie ,Subscriptions};
