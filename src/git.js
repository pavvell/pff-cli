let git = require('simple-git')();

class Git {
  commit(message) {
    return new Promise(resolve => {
      git
        .add('./*')
        .commit(message)
        .exec(() => resolve());
    });
  }

  justPush() {
    return new Promise(resolve => {
      git
        .push('origin', 'master')
        .exec(() => resolve());
    });
  }
}

module.exports = new Git();