const mongoose = require('mongoose');

module.exports = async () => {
  try {
    const uri = process.env.MONGO_URI ?? 'mongodb://localhost:27017/messaging';

    await mongoose.connect(uri);
    console.log('mongodb connected');
  }
  catch (error0) {
    console.log(error0.message);
  }
}
