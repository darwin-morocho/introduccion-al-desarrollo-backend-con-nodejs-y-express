const info = text => {
  console.log('INFO:', text);
  return text;
};

const error = text => {
  console.log('ERROR:', text);
  return text;
};

module.exports.info = info;
module.exports.error = error;

// module.exports = { info, error };
