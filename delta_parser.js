const xlsx = require('node-xlsx');
const _ = require('lodash');

const gradesByAssignment = (periodData, assignmentNames) => {
  const result = {};
  _.each(assignmentNames, (assignmentName, assignmentIndex) => {
    result[assignmentName] = _.map(periodData, student => {
      return {
        firstName: student['First'],
        lastName: student['Last'],
        grade: student[assignmentName],
      }
    });
  });
  return result;
}

class DeltaParser {
	constructor(options) {
		this.worksheets = xlsx.parse('./delta_input/input.xlsx');
    this.periods = options.periods;
	}
	parse() {
		const studentsRaw = this.worksheets[0].data;
    this.headers = studentsRaw.shift();
    const students = _.map(studentsRaw, student => {
      return _.zipObject(this.headers, student);
    });

    const gradesByPeriod = _.transform(this.periods, (result, value, key) => {
      const periodStudents = _.filter(students, { Period: value });
      result[key] = periodStudents;
      return result;
    });

    const assignmentsList = this.headers.slice(3);
    this.periodAssignmentGrades  = _.transform(this.periods, (result, deltaPeriodName, skedulaPeriodName) => {
      result[skedulaPeriodName] = gradesByAssignment(gradesByPeriod[skedulaPeriodName], assignmentsList);
      return result;
    });

	}
  getGrades() {
    return this.periodAssignmentGrades;
  }

}
module.exports = DeltaParser;
