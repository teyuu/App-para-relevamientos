require('dotenv').config();
const cloudinary = require('cloudinary').v2



cloudinary.config({ 
    cloud_name: 'dzcc7gnji', 
    api_key: '173669996517784', 
    api_secret: 'J22WSINMyU-hwEazawbzBJ6Le5I' 
  });

  module.exports = { cloudinary }