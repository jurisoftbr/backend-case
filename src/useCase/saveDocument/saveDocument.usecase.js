const multer = require('multer');
const path = require('path');
const { saveDocumentRepository } = require("../../repository/saveDocument.repository");

// Obtém o caminho absoluto para o diretório 'storage'
const storagePath = path.resolve(__dirname, '../../../storage/');

// Função para configurar o multer
const configureMulter = () => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, storagePath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileName = file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop();
      cb(null, fileName);

      req.generatedFileName = fileName;
    }
  });
};

const upload = multer({ storage: configureMulter() });

const saveDocumentUseCase = async (req, res) => {
  try {
  
    upload.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message, status: 400 });
      }

      const { document_name } = req.body;
      const generatedFileName = req.generatedFileName; 
   
      const saveDocs = await saveDocumentRepository(document_name, generatedFileName,'NLU define');

      if (saveDocs) {
        return res.status(saveDocs.status).json(saveDocs);
      }
    });
  } catch (error) {
    console.error('Error in saveDocumentUseCase:', error);
    return res.status(500).json({ message: 'Error to process the request', status: 500 });
  }
};

module.exports = { saveDocumentUseCase };
