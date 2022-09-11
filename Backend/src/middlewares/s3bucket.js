const AWS = require('aws-sdk');
const s3 = new AWS.S3(
    {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
);

const uploadFile = (archivo ,image) => {
    const foto = Buffer.from(image, 'base64');
    const parametrosPutObject = {
        Bucket: 'semi-proyecto1-g11-s22022',
        Key: archivo,
        Body: foto
    }
    return s3.putObject(parametrosPutObject).promise();
    
};

// Bucket
const uploadBucket = (foto, ext) => {
    const date = new Date();
    const output = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    const nombre = `${output}.${ext}`;
    uploadFile(nombre, foto);
    return nombre;
}


module.exports = uploadBucket;