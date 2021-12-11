const _ = require('lodash');
const csvLoadSync = require('csv-load-sync');
const fs = require('fs');

const objectToCSV = (data) => {
  const headerArray = _.keys(data[0]);
  return [
    headerArray,
    ...data.map(item => [
      item.LastName,
      item.FirstName,
      item.ID,
      item.Course,
      item.Section,
      item.Grade,
    ])
  ]
    .map(e => e.join(",")) 
    .join("\n");
};


const transformAssignment = (skedulaTemplate, deltaAssignmentGrades) => {
  const templateSorted = _.sortBy(skedulaTemplate, 'LastName');
  const deltaGradesSorted = _.sortBy(deltaAssignmentGrades, 'Last');
  return _.map(templateSorted, (student, index) => {
    const studentWithGrade = _.clone(student);
    studentWithGrade['Grade'] = deltaGradesSorted[index].grade;
    return studentWithGrade;
  });
};

class SkedulaGenerator {
  constructor(options) {
    this.periods = options.periods;
    this.periodTemplates = _.transform(this.periods, (result, value, key) =>{
      result[key] = csvLoadSync.load(`./period_templates/${key}.csv`);
    });
  }

  generate(periodDeltaGrades) {
    this.skedulaGrades = _.transform(periodDeltaGrades, (result, assignments, period) => {
      result[period] = _.transform(assignments, (assignmentResult, assignment, assignmentName) => {
        assignmentResult[assignmentName] = transformAssignment(this.periodTemplates[period], assignment);
        return assignmentResult
      });
      return result;
    })
  }

  writeFiles() {
    _.each(_.keys(this.periods), (period) => {
      _.each(this.skedulaGrades[period], (grades, assignmentName) => {
        const gradesCSV = objectToCSV(this.skedulaGrades[period][assignmentName]);
        fs.writeFileSync(`./skedula_output/${period}/${assignmentName}.csv`, gradesCSV);
      });
    })
  }
}

module.exports = SkedulaGenerator;

