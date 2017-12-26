let inquirer = require('inquirer');

let publishPatch = require('./src/actions/publish');

let actionList = [
  { name: 'Publish updates (patch)', value: 'publishPatch' }
];

let actions = {
  publishPatch: publishPatch
};

function askAction() {
  inquirer.prompt(
    [
      {
        type: 'checkbox',
        name: 'cmdSelector',
        message: 'What you want to do:',
        choices: actionList,
        default: [actionList[0]]
      }
    ]
    ).then(function( answers ) {
      execAction(answers.cmdSelector[0]);
    }
  );
}

function execAction(actionName) {
  actions[actionName]();
}

askAction();