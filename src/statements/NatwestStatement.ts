import dayjs from "dayjs";
import { AbstractStatement } from "./AbstractStatement";

export class NatwestStatement extends AbstractStatement {
    getShoppingResults(
        csvResults: Record<PropertyKey, string>[]
    ): Record<string, string>[] {
        const targetShops = [
            "tesco stores",
            "morrisons",
            "asda",
            "sainsbury's",
        ];
        return csvResults.filter(line =>
            targetShops.some(shop =>
                line["Description"].toLowerCase().includes(shop)
            )
        );
    }

    getTargetMonthResults(month: number, csvResults: Record<string, string>[]) {
        const targetMonth = dayjs().set("month", month);

        return csvResults.filter(line => {
            const date = dayjs(line["Date"]);
            return month === date.get("month");
        });
    }

    sumValues(csvResults: Record<string, string>[]): number {
        return csvResults.reduce((acc, curr) => {
            return acc + Number(curr["Value"]);
        }, 0);
    }
}
