const keyApi = {
  1: process.env.API_KEY_1,
  2: process.env.API_KEY_2,
  3: process.env.API_KEY_3,
  4: process.env.API_KEY_4,
  5: process.env.API_KEY_5,
  6: process.env.API_KEY_6,
  7: process.env.API_KEY_7,
  8: process.env.API_KEY_8,
  9: process.env.API_KEY_9,
  10: process.env.API_KEY_10,
  11: process.env.API_KEY_11,
  12: process.env.API_KEY_12,
  13: process.env.API_KEY_13,
  14: process.env.API_KEY_14,
  15: process.env.API_KEY_15,
  16: process.env.API_KEY_16,
  17: process.env.API_KEY_17,
  18: process.env.API_KEY_18,
}

function randomKey(min, max) { 
  const random =  Math.floor(Math.random() * (max - min + 1) + min);
  console.log("key n°"+random)
  return keyApi[random];
}

module.exports = randomKey;