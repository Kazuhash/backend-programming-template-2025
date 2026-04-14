const { Prizes, GachaHistory } = require('../../../models');

async function cekkenangan(email, date) {
  return GachaHistory.findOne({ email, date });
}

async function batasgacha(email, date) {
  return GachaHistory.findOneAndUpdate(
    { email, date },
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  );
}

async function cekhadiah() {
  return Prizes.find({ $expr: { $lt: ['$winners', '$quota'] } });
}

async function ambilhadiyah(prizeId) {
  return Prizes.findOneAndUpdate(
    { _id: prizeId, $expr: { $lt: ['$winners', '$quota'] } },
    { $inc: { winners: 1 } },
    { new: true }
  );
}

module.exports = {
  cekkenangan,
  batasgacha,
  cekhadiah,
  ambilhadiyah,
};
