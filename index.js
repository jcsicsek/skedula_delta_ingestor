const DeltaParser = require('./delta_parser');
const MappingsLoader = require('./mappings_loader');

const mappings = new MappingsLoader();

mappings.load();

const parser = new DeltaParser({
  periods: mappings.periods,
});

console.log(parser.parse());
