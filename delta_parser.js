const xlsx = require('node-xlsx');
const _ = require('lodash');

class DeltaParser {
	constructor(options) {
		this.worksheets = xlsx.parse('./delta_input/input.xlsx');
    this.periods = options.periods;
	}
	parse() {
		const studentsRaw = this.worksheets[0].data;
    const headers = studentsRaw.shift();
    const students = _.map(studentsRaw, student => {
      return _.zipObject(headers, student);
    });
    const periodGrades = _.transform(this.periods, (result, value, key) => {
      const periodStudents = _.filter(students, { Period: value });
      result[key] = periodStudents;
      return result;
    })
    return periodGrades;
	}
}

module.exports = DeltaParser;
