module.exports = (db) =>
  db.model(
    'GachaHistory',
    db.Schema({
      email: String,
      date: String,
      count: { type: Number, default: 0 },
    })
  );