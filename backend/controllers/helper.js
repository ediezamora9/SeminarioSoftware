const path = require('path');
const fs = require('fs');

const clearImage = imagePath => {
  if(imagePath != '') {
    imagePath = path.join(__dirname, '..', imagePath);
    fs.unlink(imagePath, e => console.log(e));
  }
};

module.exports = { clearImage }
