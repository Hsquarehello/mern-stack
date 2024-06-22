const fs = require('fs').promises;

const removeFile = async (path) => {
   let fileExists;
   try {
     await fs.access(path)
     fileExists = true;
   } catch (e) {
     fileExists = false;
   }
   if(fileExists) {
     fs.unlink(path)
   }
}

module.exports = removeFile;