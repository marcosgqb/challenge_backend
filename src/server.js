import { REQUEST_TIMEOUT } from 'http-status';
import app from './app';
require('dotenv').config();

app.listen(process.env.NODE_PORT, () => {
  console.log(`listening on ${process.env.NODE_PORT}`);
});
