let inquirer = require('inquirer');
let git = require('simple-git')();
let clear = require('clear');
let commander = require('commander');
var sys = require('sys');
var exec = require('child_process').exec;
var CLI = require('clui');
var Spinner = CLI.Spinner;

let actionList = [
  {name: 'Publish updates (patch)', value: 'publishPatch'}
];

let actions = {
  publishPatch
};

async function publishPatch() {
  await askCommitMessage();

  console.log('done');
}

function askCommitMessage() {
  return new Promise(resolve => {
    let questions = [
      {
        type: 'input',
        name: 'commitMessage',
        message: 'Type in commit message:',
        default: null,
        validate: function( value ) {
          if (value && value.length) {
            return true;
          } else {
            return 'Please enter a commit message.';
          }
        }
      },
    ];

    inquirer.prompt(questions).then(answers => {
      let status = new Spinner('Committing...');
      let commitMessage = answers.commitMessage;

      status.start();

      console.log('answers', answers);

      git
        .add('./*')
        .commit(commitMessage)
        .push('origin', 'master')
        .exec(function(){
          status.stop();
          resolve();
        });
    });
  });
}

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
  console.log('run ', actionName);
  actions[actionName]();
}

askAction();