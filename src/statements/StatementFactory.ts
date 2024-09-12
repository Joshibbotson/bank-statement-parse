import { AbstractStatement } from "./AbstractStatement";
import { Statements } from "./enum/Statements.enum";
import { NatwestStatement } from "./NatwestStatement";

/**
 * so this should
 */
class StatementFactory {
    constructor() {}

    getShoppingResults(
        formattedCsvData: Record<PropertyKey, string>[],
        statementType: Statements
    ) {
        if (!formattedCsvData) {
            throw new Error("no formatted data");
        }
        const shoppingResults = this.factory(formattedCsvData, statementType);
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
