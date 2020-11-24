/*
  An S3 uploader with some useful default settings for Zooniverse static files.
  Accepts an S3 path, relative to zooniverse-static, as its only argument.
  Usage example: node upload.js pandora.zooniverse.org
*/
const Uploader = require('s3-batch-upload').default;

const args = process.argv.slice(2);
const remotePath = args[args.length - 1];

async function uploadBuild() {
  const uploader = new Uploader({
    bucket: 'zooniverse-static',
    localPath: './dist',
    remotePath,
    concurrency: '200',
    cacheControl: {
      '**/index.html': 'no-cache, must-revalidate',
      '**/*.*': 'public, max-age=604800, immutable'
    },
    accessControlLevel: 'public-read'
  })

  const files = await uploader.upload()
  console.log('Uploaded to S3')
  console.log(files.join('\n'))
}

uploadBuild();
