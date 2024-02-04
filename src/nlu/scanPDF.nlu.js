const fs = require('fs');

const axios = require('axios');
require('dotenv/config')
const FormData = require('form-data');

const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['pt'], forceNER: true });
// Adds the utterances and intents for the NLP
manager.addDocument('pt', 'assassinato', 'greetings.criminal');
manager.addDocument('pt', 'homicidio', 'greetings.criminal');
manager.addDocument('pt', 'roubo', 'greetings.criminal');
manager.addDocument('pt', 'direito adquirido', 'greetings.trabalhista');
manager.addDocument('pt', 'hora extra', 'greetings.trabalhista');
manager.addDocument('pt', 'banco de horas', 'greetings.trabalhista');
manager.addDocument('pt', 'pegou fogo', 'greetings.ambientalista');
manager.addDocument('pt', 'está queimando', 'greetings.ambientalista');
manager.addDocument('pt', 'derrubaram uma arvore ilegalmente', 'greetings.ambientalista');

// Train also the NLG
manager.addAnswer('pt', 'greetings.criminal', 'furto seguido de roubo!');
manager.addAnswer('pt', 'greetings.criminal', 'homem foi assassinado no jardim primavera!');
manager.addAnswer('pt', 'greetings.trabalhista', 'não recebi meus diretos após a demissão!');
manager.addAnswer('pt', 'greetings.trabalhista', 'estou exausto e não consigo tirar uma folga com meu banco de horas!');
manager.addAnswer('pt', 'greetings.ambientalista', 'o desmatamento criminoso está derrubando boa parte da fauna local!');
manager.addAnswer('pt', 'greetings.ambientalista', 'uma fabrica de carvão ilegal é responsavel pela queimada local!');


/* INTEGRAÇÃO COM API DE EXTRAÇÃO DE TEXTO DE PDF E IMAGENS.. */

// após obter o resultado do pdf a ideia é passa na PLN para identificar o contéudo
// e com base nisso classificar os docs inicialmente como 3 tipos treinados. [processos criminais,  trabalhistas e ambientais] e assim salvar o arquivo categorizado no mongo

//infelizmente não vou conseguir conectar nessa porque é paga...
// aqui uma frévia do resultado dela

/* {
	"fullText": "d********************************************************************* **************************************",
	"inputId": "1530d8703-2732-4411-91d7-c22c236a559f",
	"message": "Output has been watermarked or redacted. This API request was processed with a free account. Visit https://pdfrest.com/pricing/ to upgrade your plan and receive outputs without watermarks or redactions."
} */

var data = new FormData();
data.append("full_text", "document")
data.append('file', fs.createReadStream('caminho/do/arquivo'));

var config = {
  method: 'post',
  maxBodyLength: Infinity, 
  url: 'https://api.pdfrest.com/extracted-text', 
  headers: { 
    'Api-Key': `${process.env.API_KEY}`, 
    ...data.getHeaders()
  },
  data : data 
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error); 
});

// Train and save the model.
(async () => {
    await manager.train();
    manager.save();
})();

