import { CsvParser } from "./CsvParser";

const csvParser = new CsvParser();

async function getParsedCsvFile() {
    const formattedCsv = await csvParser.parseCsv(
        "./bank-statements/natwest-statement.csv"
    );
    console.log(formattedCsv);
    formattedCsv.filter((line) => line.)
}

getParsedCsvFile();
