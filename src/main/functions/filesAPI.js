const { dialog } = require('electron');
const fs = require('fs');
const path = require('path');


const decodeDataURL = (dataURL) => {
    const matches = dataURL.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
        throw new Error('Invalid Data URL');
    }
    const base64Data = matches[2];
    return Buffer.from(base64Data, 'base64');
};

const saveImages = async (event, files, name) => {

    // Abrir una ventana de diálogo para seleccionar la ubicación de guardado
    const { filePaths } = await dialog.showOpenDialog({
        title: 'Guardar Imágenes',
        buttonLabel: 'Guardar',
        properties: ['openDirectory']
    });

    if (filePaths && filePaths.length > 0) {
        const savePath = filePaths[0];

        files.forEach((file, index) => {
            const buffer = decodeDataURL(file);
            const fileName = `${name}_${index}.png`;
            const filePath = path.join(savePath, fileName);

            // Guardar el archivo en la ubicación seleccionada
            fs.writeFileSync(filePath, buffer);
        });

        console.log(`Imágenes de ${name} guardadas exitosamente en ${savePath}`);
        return true
    } else {
        console.log('No se seleccionó ninguna ubicación para guardar.');
        return false
    }
};


const filesAPI = [
    {
        name: 'save-images',
        handler: saveImages
    }

]

export default filesAPI