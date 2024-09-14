import { CsvParser } from "./CsvParser";
import dayjs from "dayjs";
const csvParser = new CsvParser();

// would be cool if we could normalize all csv data possibly
// through a factory function?

async function getParsedCsvFile() {
    const formattedCsv = await csvParser.parseCsv(
        "./bank-statements/natwest-statement.csv"
    );
    const filteredCsv = getShoppingResults(formattedCsv);
    const lastMonth = dayjs()
        .set("month", dayjs().month() - 1)
        .month();
    const targetMonthResults = getTargetMonthResults(lastMonth, filteredCsv);

    const value = sumValues(targetMonthResults);
    console.log("total spent:", `£${value}`);
    // console.log(filteredCsv);
}

// straight up we can probably use a reduce here but may get a bit complex.
// hard code using multiple methods first.
function getShoppingResults(
    csvResults: Record<string, string>[]
): Record<string, string>[] {
    const targetShops = ["tesco stores", "morrisons", "asda", "sainsbury's"];
    return csvResults.filter(line =>
        targetShops.some(shop =>
            line["Description"].toLowerCase().includes(shop)
        )
    );
}

function getTargetMonthResults(
    month: number,
    csvResults: Record<string, string>[]
) {
    return csvResults.filter(line => {
        const date = dayjs(line["Date"]);
        return month === date.get("month");
    });
}

function sumValues(csvResults: Record<string, string>[]): number {
    return csvResults.reduce((acc, curr) => {
        return acc + Number(curr["Value"]);
    }, 0);
}

getParsedCsvFile();
