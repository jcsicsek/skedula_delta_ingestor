const xlsx = require('node-xlsx');
const _ = require('lodash');

class DeltaParser {
	constructor(options) {
		this.worksheets = xlsx.parse('./delta_input/input.xlsx');
    this.periods = options.periods;
	}
	parse() {
		const gradesWorksheet = this.worksheets[0];
    return gradesWorksheet.data[1];
	}
}

module.exports = DeltaParser;
