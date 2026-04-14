module.exports = (db) =>
  db.model(
    'Prizes',
    db.Schema({
      name: String,
      quota: Number,
      winners: { type: Number, default: 0 },
      probability: Number,
    })
  );