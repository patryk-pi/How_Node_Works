const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file 🐶');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file 🤨');
      resolve('success');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro('dog-img.txt', res.body.message);
    console.log('Random dog image saved to file');
  } catch (err) {
    console.log(err);
    throw err;
  }

  return '2: READY 🐶';
};

// console.log('1: Will get dog pics');
// getDogPic().then((x) => {
//   console.log(x);
//   console.log('3: Done getting pics!');
// });

(async () => {
  try {
    console.log('1: Will get dog pics');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting pics!');
  } catch (err) {
    console.log(err);
  }
})();

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);

//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((data) => {
//     console.log(data.body.message);
//     return writeFilePro('dog-img.txt', data.body.message);

//     // fs.writeFile('dog-img.txt', data.body.message, (err) => {
//     //   if (err) return console.log(err);
//     //   console.log('Dog image saved to file');
//     // });
//   })
//   .then(() => {
//     console.log('Dog image saved to file with a Promise!');
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   if (err) return console.log(err);

//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((data) => {
//       console.log(data.body.message);
//       fs.writeFile('dog-img.txt', data.body.message, (err) => {
//         if (err) return console.log(err);
//         console.log('Dog image saved to file');
//       });
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// });
