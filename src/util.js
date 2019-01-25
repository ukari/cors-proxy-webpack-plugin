import fs from 'fs';

let readAsync = path => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', function(err, contents) {
    if (!!err) {
      reject(err);
    } else {
      resolve(contents);
    }
  });
});

export {readAsync};
