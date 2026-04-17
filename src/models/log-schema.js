module.exports = (db) =>
  db.model(
    'GachaLog',
    db.Schema(
      {
        email: String,
        prizeName: { type: String, default: 'Zonk' },
        date: { type: Date, default: Date.now },
      },
      { collection: 'gachalogs' }
    )
  );
