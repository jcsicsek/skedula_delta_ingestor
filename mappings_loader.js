const fs = require('fs');
const _ = require('lodash');

class MappingsLoader {
  constructor(options) {
    this.options = options;
  }
  load() {
    this.periods = JSON.parse(fs.readFileSync('./period_mappings.json'));
  }
}

module.exports = MappingsLoader;
