let Preferences = require("preferences");

class Settings {
  constructor() {
    this._settings = new Preferences('piano-ff-cli', {
  //  privateRepo: '172.31.22.9:4873' // npm default is registry.npmjs.org
      privateRepo: 'registry.npmjs.org' // npm default is registry.npmjs.org
    });
  }

  get() {
    return this._settings;
  }
}

module.exports = new Settings();
