module.exports = {
  existsSync: function() { return false; },
  readFileSync: function() { return ''; },
  writeFileSync: function() {},
  promises: {
    readFile: async function() { return ''; },
    writeFile: async function() {}
  }
};