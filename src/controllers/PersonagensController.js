import axios from 'axios';
import { sendBadRequest, sendInternalError } from '../helpers/HttpHelper';

async function findAllegiances(allegianceURLs) {
  return (await Promise.all(
    allegianceURLs
      .map(async url => await axios.get(url))
  )).map(result => result.data.name);
}

async function findSpouse(spouseURL) {
  const { data } = await axios.get(spouseURL);
  return data.name;
}
async function findFather(fatherURL) {
  const { data } = await axios.get(fatherURL);
  return data.name;
}

async function findMother(motherURL) {
  const { data } = await axios.get(motherURL);
  return data.name;
}

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

async function findPovBooks(povBookURLs) {
  return (await Promise.all(
    povBookURLs
      .map(async url => await axios.get(url))
  )).map(result => result.data)
    .map(result => {
      delete result.url;
      delete result.characters;
      delete result.povCharacters;
      return result;
    });
}

async function findCharacters(charactersURLs) {
  const items = (await Promise.all(
    charactersURLs
      .map(async url => await axios.get(url))
  )).map(result => result.data)
    .map(result => {
      delete result.url;
      return result;
    });
  
  for (const item of items) {
    item.allegiances = await findAllegiances(item.allegiances);
    item.books = await findBooks(item.books);
    item.povBooks = await findPovBooks(item.povBooks);
    if (!!item.spouse) item.spouse = await findSpouse(item.spouse);
    if (!!item.father) item.father = await findFather(item.father);
    if (!!item.mother) item.mother = await findMother(item.mother);
    
  }

  return items;
}

export default {
  async getPrincipaisPersonagens(req, res) {
    try {
      const { data } = await axios.get('https://anapioficeandfire.com/api/books/');

      const result = [];

      (await Promise.all(
        data
          .filter(item => item.povCharacters.length > 0) // filtra apenas os que possuem povCharacters
          .map(item => item.povCharacters)
          .flat()
          .map(async povCharURL => await axios.get(povCharURL))
      )).map(result => result.data)
        .forEach(povChar => {
          if (!result.map(item => item.name).includes(povChar.name)) {
            delete povChar.url;
            result.push(povChar);
          }
        });

      for (const item of result) {
        item.allegiances = await findAllegiances(item.allegiances);
        item.books = await findBooks(item.books);
        item.povBooks = await findPovBooks(item.povBooks);
        if (!!item.spouse) item.spouse = await findSpouse(item.spouse);
        if (!!item.father) item.father = await findFather(item.father);
        if (!!item.mother) item.mother = await findMother(item.mother);
      }

      res.json(result);
    } catch (err) {
      console.log(err);
      sendInternalError(res, err);
    }
  },

  async getDetalheDeUmPersonagem(req, res) {
    try {
      const ids = req.params.ids
        .split(',')
        .map(id => `https://www.anapioficeandfire.com/api/characters/${id}`);

      const chars = await findCharacters(ids);

      res.json(chars);
    } catch (err) {
      sendInternalError(res, err);
    }
  },

  async getLivrosDeUmPersonagem(req, res) {
    try {
      const { data } = await axios.get(`https://www.anapioficeandfire.com/api/characters/${req.params.id}`);

      const books = await findBooks(data.books);
      const povBooks = await findBooks(data.povBooks);

      res.json(books.concat(povBooks));
    } catch (err) {
      sendInternalError(res, err);
    }
  },
};
