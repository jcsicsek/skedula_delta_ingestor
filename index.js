const DeltaParser = require('./delta_parser');
const MappingsLoader = require('./mappings_loader');
const SkedulaGenerator = require('./skedula_generator');

const mappings = new MappingsLoader();

mappings.load();

const parser = new DeltaParser({
  periods: mappings.periods,
});

const deltaData = parser.parse();
const generator = new SkedulaGenerator({
  periods: mappings.periods,
});

const skedulaData = generator.generate();
console.log(skedulaData);

