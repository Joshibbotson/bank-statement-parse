import dayjs from "dayjs";
import { CsvParser } from "../CsvParser";

export abstract class AbstractStatement<CsvType> {
    private readonly csvParser: CsvParser = new CsvParser();

    /** Probs need to redo this method, it's pretty hard coded right now
     * should accept a month and or in general a target set of strings
     */
    async getParsedCsvFile(path: string) {
        const formattedCsv = await this.csvParser.parseCsv(path);
        const filteredCsv = this.getShoppingResults();
        const lastMonth = dayjs()
            .set("month", dayjs().month() - 1)
            .month();
        const targetMonthResults = this.getTargetMonthResults(
            lastMonth,
            filteredCsv
        );

        const value = this.sumValues(targetMonthResults);
        console.log("total spent:", `£${value}`);
    }
    abstract getShoppingResults(): CsvType[];

    abstract getTargetMonthResults(
        month: number,
        csvData: CsvType[]
    ): CsvType[];

    abstract sumValues(csvData: CsvType[]): number;
}
