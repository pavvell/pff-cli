let npm = require('../npm');
let prompt = require('../prompt');
let git = require('../git');
let settings = require('../settings');

async function askCommitMessageAndCommit() {
 let message = await prompt.ask('Type-in commit message:');
 git.commit(message);
}

module.exports = async function publishPatch() {
  await askCommitMessageAndCommit();
  await npm.patch();
  await git.justPush();
  await npm.publish(settings.get().privateRepo);

  console.log('Done');
};