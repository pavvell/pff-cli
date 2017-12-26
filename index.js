let inquirer = require('inquirer');
let git = require('simple-git')();
let commander = require('commander');
let exec = require('child_process').exec;
let CLI = require('clui');
let Spinner = CLI.Spinner;


let actionList = [
  {name: 'Publish updates (patch)', value: 'publishPatch'}
];

let actions = {
  publishPatch
};

async function publishPatch() {
  await askCommitMessageAndCommit();
  await patchNpmVersion();
  await justPush();
  await publish();

  console.log('done');
}

function patchNpmVersion() {
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

function publish() {
  console.log('Publish...');

  return new Promise((resolve, reject) => {
    exec("npm publish", function (error, stdout, stderr) {

      if (error !== null) {
        console.log('exec error: ' + error);
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

function justPush() {
  return new Promise(resolve => {
    git
      .push('origin', 'master')
      .exec(() => {
        status.stop();
        resolve();
      });
  });
}

function askCommitMessageAndCommit() {
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
      let commitMessage = answers.commitMessage;

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
  actions[actionName]();
}

askAction();