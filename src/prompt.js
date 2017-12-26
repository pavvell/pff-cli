let inquirer = require('inquirer');

class Prompt {
  ask(question) {
    return new Promise(resolve => {
      let questions = [
        {
          type: 'input',
          name: 'question',
          message: question,
          default: null,
          validate: function( value ) {
            if (value && value.length) {
              return true;
            } else {
              return 'Please type in a value.';
            }
          }
        },
      ];

      inquirer.prompt(questions).then(answers => {
        resolve(answers.question);
      });
    });
  }
}

module.exports = new Prompt();