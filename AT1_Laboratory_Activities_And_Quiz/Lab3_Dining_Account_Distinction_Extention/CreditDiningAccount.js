/*
  Program: DWU Dining Meal Booking
  File: CreditDiningAccount.js
  Student Name: Nathaniel Posanai
  Student ID: 240160
  Description:
  Credit dining account that inherits from DiningAccount.
  The account can go below zero up to the approved credit limit.
*/

const DiningAccount = require("./DiningAccount");

class CreditDiningAccount extends DiningAccount {
    #creditLimit;

    constructor(accountNumber, openingBalance = 0, creditLimit = 0) {
        super(accountNumber, openingBalance);

        if (typeof creditLimit !== "number" || creditLimit < 0) {
            throw new Error("Credit limit must be a non-negative number.");
        }

        this.#creditLimit = creditLimit;
    }

    getCreditLimit() {
        return this.#creditLimit;
    }

    getAvailableCredit() {
        return this.getBalance() + this.#creditLimit;
    }

    payForMeal(amount, description = "Meal booking") {
        if (typeof amount !== "number" || amount <= 0) {
            console.log(
                "Payment rejected: payment amount must be greater than K0.00."
            );
            return false;
        }

        const availableAmount = this.getBalance() + this.#creditLimit;

        if (amount > availableAmount) {
            console.log("========================================");
            console.log("          PAYMENT REJECTED");
            console.log("========================================");
            console.log(`Requested Payment: K${amount.toFixed(2)}`);
            console.log(
                `Available Funds + Credit: K${availableAmount.toFixed(2)}`
            );
            console.log(
                `Credit Limit: K${this.#creditLimit.toFixed(2)}`
            );
            console.log(
                "Reason: Payment exceeds the approved credit limit."
            );
            console.log("========================================");

            return false;
        }

        const newBalance = this.getBalance() - amount;

        this._setBalance(newBalance);

        this._recordTransaction(
            "Meal Payment",
            amount,
            description
        );

        console.log(
            `Credit payment successful: K${amount.toFixed(2)} paid from ${this.getAccountNumber()}.`
        );

        console.log(
            `Remaining Balance: K${newBalance.toFixed(2)}`
        );

        return true;
    }

    displayAccountSummary() {
        console.log("========================================");
        console.log("        CREDIT DINING ACCOUNT");
        console.log("========================================");
        console.log(`Account Type: ${this.constructor.name}`);
        console.log(`Account Number: ${this.getAccountNumber()}`);
        console.log(`Balance: K${this.getBalance().toFixed(2)}`);
        console.log(`Credit Limit: K${this.#creditLimit.toFixed(2)}`);
        console.log(
            `Available Amount: K${this.getAvailableCredit().toFixed(2)}`
        );
        console.log("========================================");
    }
}

module.exports = CreditDiningAccount;