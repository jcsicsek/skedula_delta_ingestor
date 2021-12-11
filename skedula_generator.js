const _ = require('lodash');
const csvLoadSync = require('csv-load-sync');

class SkedulaGenerator {
  constructor(options) {
    this.periods = options.periods;
    this.periodCSVs = _.transform(this.periods, (result, value, key) =>{
      result[key] = csvLoadSync.load(`./period_templates/${key}.csv`);
    });
  }

  generate(periodDeltaGrades) {

    return this.periodCSVs;
  }
}

module.exports = SkedulaGenerator;
