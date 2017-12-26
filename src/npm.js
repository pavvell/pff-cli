class NPM {
  patch() {
    console.log('Update version...');

    return new Promise((resolve, reject) => {
      exec("npm version patch", function (error, stdout, stderr) {
        console.log(stdout);

        if (error !== null) {
          console.log('exec error: ' + error);
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  publish(repo) {
    console.log('Publish...');

    return new Promise((resolve, reject) => {
      exec(`npm publish --registry=http://${repo}/`, function (error, stdout, stderr) {

        if (error !== null) {
          console.log('exec error: ' + error);
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = new NPM();