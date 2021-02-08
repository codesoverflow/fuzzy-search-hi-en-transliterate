const tr = require("transliteration").transliterate;


function transliterate(hindiText) {
  const englishText = tr("उमा लहरी भजन आरती संग्रह", {
    replace: { from: "hi", to: "en" },
  });
  return englishText
}

exports.transliterate = transliterate
