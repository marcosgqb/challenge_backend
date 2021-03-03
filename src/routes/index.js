import personagensRoute from './PersonagensRoute';
import livrosRoute from './LivrosRoute';

export default app => {
  app.get('/', (req, res) => {
    res.send('Node API is running!');
  });

  app.use(livrosRoute);
  app.use(personagensRoute);
};
