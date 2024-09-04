import fs from "fs";
import readline from "readline";

export class CsvParser {
    public parseCsv(path: string) {
        const readStream = fs.createReadStream(path);

        const rl = readline.createInterface({
            input: readStream,
            crlfDelay: Infinity,
        });

        rl.on("line", line => {
            const splitLine = this.splitLine(line);
            console.log("newLine", splitLine);
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
