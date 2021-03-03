import axios from 'axios';
import { compareSync } from 'bcrypt';
import imageToBase64 from 'image-to-base64';
import { sendBadRequest, sendInternalError } from '../helpers/HttpHelper';

async function findBooks(booksURLs) {
  return (await Promise.all(
    booksURLs
      .map(async url => await axios.get(url))
  )).map(result => result.data)
    .map(result => {
      delete result.url;
      delete result.characters;
      delete result.povCharacters;
      return result;
    });
}

export default {
  async getCapaDeUmLivro(req, res) {
    try {
      const ids = req.params.ids
        .split(',')
        .map(id => `https://www.anapioficeandfire.com/api/books/${id}`);

      const isbns = (await findBooks(ids))
        .map(book => book.isbn.replace('-', ''));
        

      const result = [];
      for (const isbn of isbns) {
        const data = await imageToBase64(`http://covers.openlibrary.org/b/isbn/${isbn}-S.jpg`);
        result.push(data);
      }

      res.json(result);
    } catch (err) {
      sendInternalError(res, err);
    }
  },
};
