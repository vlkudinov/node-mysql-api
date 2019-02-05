import aws from 'aws-sdk';
import config from '../../config/s3';

export const upload = (image, id) => {
  const MAX_FILE_SIZE = 102400;
  const s3 = new aws.S3(config);

  const s3Params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: String(id),
    Body: image.data,
    ACL: 'public-read',
    ContentType: image.mimetype
  };

  if (image.data.length > MAX_FILE_SIZE) {
    throw new Error('Picture file size too big. Limit: 100kb');
  }

  return s3
    .putObject(s3Params)
    .promise()
    .then(() => ({
      link: `https://s3.amazonaws.com/countries.images.store/${id}`
    }))
    .catch(err => {
      throw err;
    });
};

export const remove = (id = 0) => {
  const s3 = new aws.S3(config);
  const s3Params = {
    Bucket: 'countries.images.store',
    Key: String(id)
  };
  return s3.deleteObject(s3Params).promise();
};
