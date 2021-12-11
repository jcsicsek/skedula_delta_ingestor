const DeltaParser = require('./delta_parser');
const MappingsLoader = require('./mappings_loader');
const SkedulaGenerator = require('./skedula_generator');

const mappings = new MappingsLoader();

mappings.load();

const parser = new DeltaParser({
  periods: mappings.periods,
});

parser.parse();
const deltaData = parser.getGrades();
const generator = new SkedulaGenerator({
  periods: mappings.periods,
});
generator.generate(deltaData);
generator.writeFiles();

