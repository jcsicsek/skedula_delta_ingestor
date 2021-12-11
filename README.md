# Skedula DeltaMath Ingestor

Generates Skedula grade CSVs from DeltaMath grade XLSXs

## Getting Started

### Installing

```
npm install
```

### Input files

Place the DeltaMath grade export XLSX into `/delta_input/input.xlsx`
Place Skedula roster template CSVs into `/period_templates`
`period_mappings.json` is a mapping from roster descriptions in DeltaMath to the Ingestor's filesystem

### Output Files

Within `skedula_output`, the program outputs one directory per period, with a separate Skedula-formatted CSV for each assignment within that period.


### Running the Ingestor
```
npm start
```


## Authors

Jeff Csicsek

github.com/jcsicsek
