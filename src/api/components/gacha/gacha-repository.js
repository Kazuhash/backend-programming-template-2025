const { Prizes, GachaHistory, GachaLog } = require('../../../models');

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

async function catatlog(email, prizeName) {
  return GachaLog.create({ email, prizeName });
}

async function Riwayat(email) {
  return GachaLog.find({ email }).sort({ date: -1 });
}

async function allhadiyah() {
  return Prizes.find({});
}

async function allwin() {
  return GachaLog.find({ prizeName: { $ne: 'Zonk' } });
}

module.exports = {
  cekkenangan,
  batasgacha,
  cekhadiah,
  ambilhadiyah,
  catatlog,
  Riwayat,
  allhadiyah,
  allwin,
};
