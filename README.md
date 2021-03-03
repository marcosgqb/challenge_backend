 - CHALLENGE -

Criar uma API em NodeJS que:

    Obtenha a informação completa dos principais personagens (povCharacters) das Crônicas do Gelo e Fogo.
    Obtenha a capa de um ou mais livros.
    Obtenha o detalhe de um ou mais personagens.
    Obtenha todos os livros relacionados a um personagem.

Requisitos:
    Não será permitido inserir informações com URL. Deve-se inserir todas as informações possíveis.
    A capa do livro deverá ser apresentada no formato base64.
    Crie um repositório no Github para inserir o seu código.
    
    Envie o link do repositório e quaisquer outras informações necessárias para rh@mobixtec.com
    Caso você não entre em contato conosco pelo nosso processo seletivo, envie o desafio para nós via rh@mobixtec.com e nos informe em quanto tempo você conseguiu realizá-lo (sugestão: use https://clockify.me/ ou similares para registrar seu tempo).

Extras
    Implementar testes unitários usando Jest
    
    *Implementar autenticação OAuth 2.0
    
    Inserir projeto num container docker
    Deixar API online para acesso instantâneo
    
    *Se até aqui você se divertiu muito, insira na imagem do livro o nome dos seus personagens principais no formato de marca d'água
    *Se você não ficou satisfeito com o desafio, insira também o link da Amazon para que possamos comprar os livros :-D

Informações
 API -> https://anapioficeandfire.com/api/books/
 Capas -> https://openlibrary.org/dev/docs/api/covers


----------------------------------------------------------------

Testes manuais na API

 - Realizar o comando para rodar a API localmente
    > npm install        //Instalar todas dependencias
    > npm run dev        // Comando detalhado no package.json -> script

 - Requisitos   
    > node v14.15.5
    > Váriaveis de ambiente (.env)
          NODE_PORT = 8080
          NODE_ENV = dev

 - Rodar no browser

    - '/personagens'  
        > Obtenha a informação completa dos principais personagens (povCharacters) das Crônicas do Gelo e Fogo.

        Retorno:
            Informações completas sem URL de todos os principais personagens de todos os livros, sem distinções de livro. 

    - '/personagens/:ids' -> Exemplo: ../personagens/1,2,3
        > Obtenha o detalhe de um ou mais personagens.

        Retorno:
            Informações completas sem URL dos personagens com 1,2,3 na referência da  externa.
        
    - '/personagens/:id/livros' -> Exemplo: ../personagens/148/livros
        > Obtenha todos os livros relacionados a um personagem.

        Retorno: 
            Todos os livros relacionados ao ID (148) do personagem relacionado.

    - '/livros/:ids' -> Exemplo: ../livros/1,2,3
        > Obtenha a capa de um ou mais livros

        Retorno: 
            Lista dos livros convertidos para base64 na ordem inscrita na URL, por escolha "S" ou "small" no link da capa. 
        