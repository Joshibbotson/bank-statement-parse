import { Statements } from "./enum/Statements.enum";
import { NatwestStatement } from "./natwest-statement/NatwestStatement";

export class StatementFactory {
    getShoppingResults(
        formattedCsvData: Record<PropertyKey, string>[],
        statementType: Statements
    ) {
        if (!formattedCsvData) {
            throw new Error("no formatted data");
        }
        const statement = this.factory(formattedCsvData, statementType);
        return statement.getShoppingResults();
    }

    private factory(
        formattedCsvData: Record<PropertyKey, string>[],
        statementType: Statements
    ) {
        switch (statementType) {
            case Statements.NATWEST:
                return new NatwestStatement(formattedCsvData);
        }
    }
}
