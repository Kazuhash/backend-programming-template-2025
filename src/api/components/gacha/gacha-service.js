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
    await gachaRepository.catatlog(email, dpthadiah.name);
    return { won: true, prizeName: dpthadiah.name };
  }

  await gachaRepository.catatlog(email, 'Zonk');
  return { won: false, message: 'zonk! besok lagi yea.' };
}

async function histories(email) {
  const history = await gachaRepository.Riwayat(email);
  return history.map((h) => ({
    waktu: h.date,
    hadiah: h.prizeName === 'Zonk' ? 'Tidak dapat hadiah (Zonk)' : h.prizeName,
  }));
}

async function sisa() {
  const prizes = await gachaRepository.allhadiyah();
  return prizes.map((p) => ({
    hadiah: p.name,
    sisa_kuota: p.quota - p.winners,
  }));
}

function sensor(text) {
  return text
    .split('')
    .map((char) => {
      if (char === ' ' || char === '@' || char === '.') return char;
      return Math.random() > 0.5 ? '*' : char;
    })
    .join('');
}

async function winner() {
  const winners = await gachaRepository.allwin();
  const result = {};

  winners.forEach((w) => {
    if (!result[w.prizeName]) result[w.prizeName] = [];
    const maskedName = sensor(w.email.split('@')[0]);
    result[w.prizeName].push(maskedName);
  });

  return result;
}

module.exports = {
  gachayu,
  histories,
  sisa,
  winner,
};
