const path = require('path');
const packageConfig = require('../../config/packageConfig.js');

// relay compiler

let includePaths = ['src/**'];
const excludePaths = ['**/__generated__/**'];
const moduleName = packageConfig.sharedComponentModule;
if (moduleName) {
  includePaths = includePaths.concat(`node_modules/${moduleName}/src/**`);
}
const extensions = ['js', 'jsx', 'ts', 'tsx'];

module.exports = [
  '--src',
  path.resolve('.'),

  '--extensions',
  extensions,

  '--include',
  includePaths,

  '--exclude',
  excludePaths,

  '--schema',
  'schema.json',

  '--language',
  'typescript',

  '--artifactDirectory',
  'src/__generated__',

  // FIXME: relay fork persist queries flag, remove when no projects use the fork
  process.env.PERSIST_QUERIES === 'true' ? '--persist' : '',

  // relay v2+ persist queries flag
  process.env.PERSIST_QUERIES === 'true' ? '--persist-output' : '',
  process.env.PERSIST_QUERIES === 'true' ? './complete.queryMap.json' : '',
].reduce((acc, item) => acc.concat(item), []);
