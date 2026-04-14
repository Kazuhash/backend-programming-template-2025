const gachaRepository = require('./gacha-repository');

async function gachayu(email) {
  const today = new Date().toISOString().split('T')[0];

  const kenangan = await gachaRepository.cekkenangan(email, today);
  if (kenangan && kenangan.count >= 5) {
    return { error: 'jangan maruk,besok coba lagih' };
  }
  await gachaRepository.batasgacha(email, today);

  const hadiahyangada = await gachaRepository.cekhadiah();
  if (hadiahyangada.length === 0) {
    return { won: false, message: 'Hadiah udah ludes semua hari ini, kasian!' };
  }

  const rollin = Math.random();
  let dpthadiah = null;

  const targeto = hadiahyangada.find((prize) => rollin <= prize.mungkinkah);

  if (targeto) {
    // eslint-disable-next-line no-underscore-dangle
    const ambil = await gachaRepository.ambilhadiyah(targeto._id);
    if (ambil) {
      dpthadiah = ambil;
    }
  }

  if (dpthadiah) {
    return { won: true, prizeName: dpthadiah.name };
  }

  return { won: false, message: 'Ampun deh zonk! Coba lagi besok.' };
}

module.exports = {
  gachayu,
};
