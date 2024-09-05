import fs from "fs";
import readline from "readline";
import { NatwestStatement } from "./types/NatwestStatement";

export class CsvParser {
    private firstLine = true;

    public parseCsv(path: string): Promise<Record<string, string>[]> {
        return new Promise((resolve, reject) => {
            let headers: NatwestStatement[] = [];
            const formattedCsv: Record<string, string>[] = [];
            const readStream = fs.createReadStream(path);
            const rl = readline.createInterface({
                input: readStream,
                crlfDelay: Infinity,
            });

            rl.on("line", line => {
                if (this.firstLine) {
                    headers = this.splitLine(
                        line
                    ) as unknown as NatwestStatement[];
                    this.firstLine = false;
                }
                const splitLine = this.splitLine(line);
                const keyedValue: Partial<NatwestStatement> = {};
                for (let i = 0; i < headers.length; i++) {
                    const header = headers[
                        i
                    ] as unknown as keyof NatwestStatement;
                    const value = splitLine[i];

                    if (header === "Date") {
                        keyedValue[header] = new Date(value);
                    } else if (header === "Value" || header === "Balance") {
                        keyedValue[header] = parseFloat(value);
                    } else {
                        keyedValue[header] = value;
                    }
                }
                formattedCsv.push(keyedValue);
            });
            rl.on("close", () => {
                console.log("CSV formatted");
                resolve(formattedCsv);
            });

            rl.on("error", err => {
                reject(err);
            });
        });
    }

    private splitLine(line: string): string[] {
        let inQuotes = false;
        let word: string[] = [];
        const splitArr = [];
        for (const char of line) {
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === "," && !inQuotes) {
                splitArr.push(word.join(""));
                word = [];
            } else {
                word.push(char);
            }
        }
        splitArr.push(word.join(""));
        return splitArr;
    }
}
