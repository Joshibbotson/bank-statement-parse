import { CsvParser } from "./CsvParse";

const csvParser = new CsvParser();

csvParser.parseCsv("./bank-statements/natwest-statement.csv");
