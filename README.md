# Case para Desenvolvedor Backend: API de Gerenciamento de Documentos Jurídicos

## Olá, Desenvolvedor(a) que irá avaliar o teste!

## Como inicializar o projeto: 
- comece rodando o `npm i` para baixar todas as dependências
- depois de rodar o comando acima agora você irá precisar se conectar a algum mongoDB seja local ou lá no Atlas da web...
- Deixei um arquivo .env de exmplo para ajudar você
- logo após isso você provavelmente vai querer ver as rotas
- Para isso basta rodar o comando `npm run dev` que o server irá subir na porta que escolheu
- Abra o navegador e cole: [`http://localhost:4000/api-docs`] e você conseguirá ver todas as rotas do swagger
- Depois de tudo conectado e rodando de acordo com o banco, é só fazer suas requisições na aplicação e verificar o que precisar.

## Pontos importantes observados: 
- O desafio é bem legal porém fazer o trabalho de extração de dados de forma perfeita demanda bem mais tempo e então a opção de usar serviços externos é boa porém normalmente com uma qualidade boa são pagos esses endpoints.. 

- A ideia que tive foi, usar o serviço de terceiro dentro da PLN para extrair o texto e usar o texto no modelo que treinei com 3 classificações inicialmente. 

- Depois do meu modelo analisar a informação extraída do PDF ou Documento no geral... ela o classifica como criminal, trabalhista ou ambientalista. Escolhi de forma aleatória os tipos de processos...

- E então salvo no banco de dados o documento e já salvo sua categoria dinâmica com base no texto do documento e na rota de buscar por nome, categoria ou data é muito fácil achar os documentos por categoria.

- Essa parte como falei não implementei porquê o endpoint usado é pago...

- cache, temos redis como solução rápida e prática para agilizar consultas

- serviços de notificação temos desde um Kafka até serviços externos também 

- meu foco foi em fazer o principal, a questão de autenticação de usuário e outras coisas eu não julguei tão importante de momento e estou a disposição para discurtirmos sobre posteriormente.