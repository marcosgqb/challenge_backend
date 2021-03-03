import mongoose from 'mongoose';

const urlConnection = {
  dev: 'mongodb://localhost:27017/node-api-test',
  test: 'mongodb://mongo:27017/node-api-test',
  prd: 'mongodb://mongo:27017/node-api'
};

const env = process.env.NODE_ENV || 'prd';

export default {
  connect() {
    mongoose.connect(
      urlConnection[env],
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      err => {
        if (err) console.error(err);
        else console.log('mongodb connected.');
      }
    );
  }
};
