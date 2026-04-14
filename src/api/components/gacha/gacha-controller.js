const gachaService = require('./gacha-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function gachakikir(request, response, next) {
  try {
    const { email } = request.body;

    if (!email) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'no email no gacha');
    }

    const result = await gachaService.gachayu(email);

    if (result.error === 'jangan maruk,besok coba lagih') {
      throw errorResponder(
        errorTypes.FORBIDDEN,
        'Stop! Kamu udah gacha 5 kali hari ini. Istirahat dan sentuh rumput.'
      );
    }

    if (result.won) {
      return response.status(200).json({
        message: 'kongratz menank yea!',
        prize: result.prizeName,
      });
    }

    return response.status(200).json({
      message: 'Wakwaw Zonk!,kecian kmu',
      detail: result.message,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  gachakikir,
};
