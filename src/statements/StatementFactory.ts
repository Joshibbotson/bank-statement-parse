// factory class for statements

import { Statements } from "./enum/Statements.enum";

class StatementFactory {
    constructor() {}

    getShoppingResults(
        formattedCsvData: Record<PropertyKey, string>,
        statementType: Statements
    ) {
        if (!formattedCsvData) {
            throw new Error("no formatted data");
        }
        const shoppingResults = this.factory(formattedCsvData, statementType);
    }

    private factory(
        formattedCsvData: Record<PropertyKey, string>,
        statementType: Statements
    ) {
        switch (statementType) {
            case Statements.NATWEST:
        }
    }
}
