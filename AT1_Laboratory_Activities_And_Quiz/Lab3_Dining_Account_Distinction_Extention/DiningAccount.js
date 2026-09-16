/*
  Program: DWU Dining Meal Booking
  File: DiningAccount.js
  Student Name: Nathaniel Posanai
  Student ID: 240160
  Description:
  Base dining account class demonstrating private fields,
  constructors, methods, validation and transaction history.
*/

class DiningAccount {
    #accountNumber;
    #balance;
    #transactions;

    constructor(accountNumber, openingBalance = 0) {
        if (!accountNumber || typeof accountNumber !== "string") {
            throw new Error("Account number must be a valid string.");
        }

        if (typeof openingBalance !== "number" || openingBalance < 0) {
            throw new Error("Opening balance must be a non-negative number.");
        }

        this.#accountNumber = accountNumber;
        this.#balance = openingBalance;
        this.#transactions = [];

        // Record opening balance as the first transaction.
        this.#transactions.push({
            type: "Deposit",
            amount: openingBalance,
            description: "Opening balance",
            dateTime: new Date(),
            balanceAfter: this.#balance
        });
    }

    getAccountNumber() {
        return this.#accountNumber;
    }

    getBalance() {
        return this.#balance;
    }

    getTransactions() {
        return [...this.#transactions];
    }

    deposit(amount, description = "Additional meal funds") {
        if (typeof amount !== "number" || amount <= 0) {
            console.log("Deposit rejected: amount must be greater than K0.00.");
            return false;
        }

        this.#balance += amount;

        this.#recordTransaction(
            "Deposit",
            amount,
            description
        );

        console.log(
            `Deposit successful: K${amount.toFixed(2)} added to ${this.#accountNumber}.`
        );

        return true;
    }

    payForMeal(amount, description = "Meal booking") {
        if (typeof amount !== "number" || amount <= 0) {
            console.log("Payment rejected: payment amount must be greater than K0.00.");
            return false;
        }

        if (amount > this.#balance) {
            console.log(
                `Payment rejected: insufficient funds. ` +
                `Available balance is K${this.#balance.toFixed(2)}.`
            );
            return false;
        }

        this.#balance -= amount;

        this.#recordTransaction(
            "Meal Payment",
            amount,
            description
        );

        console.log(
            `Payment successful: K${amount.toFixed(2)} paid from ${this.#accountNumber}.`
        );

        return true;
    }

    displayAccountSummary() {
        console.log("========================================");
        console.log("          DINING ACCOUNT");
        console.log("========================================");
        console.log(`Account Type: ${this.constructor.name}`);
        console.log(`Account Number: ${this.#accountNumber}`);
        console.log(`Balance: K${this.#balance.toFixed(2)}`);
        console.log("========================================");
    }

    displayTransactionHistory() {
        console.log("========================================");
        console.log("          TRANSACTION HISTORY");
        console.log("========================================");

        if (this.#transactions.length === 0) {
            console.log("No transactions recorded.");
            return;
        }

        this.#transactions.forEach((transaction, index) => {
            console.log(
                `${index + 1}. ${transaction.type} - K${transaction.amount.toFixed(2)}`
            );

            console.log(`   Description: ${transaction.description}`);
            console.log(
                `   Date and Time: ${transaction.dateTime.toLocaleString()}`
            );
            console.log(
                `   Balance: K${transaction.balanceAfter.toFixed(2)}`
            );
            console.log();
        });

        console.log(`Total Transactions: ${this.#transactions.length}`);
        console.log("========================================");
    }

    // Internal method used by this class and subclasses.
    #recordTransaction(type, amount, description) {
        this.#transactions.push({
            type: type,
            amount: amount,
            description: description,
            dateTime: new Date(),
            balanceAfter: this.#balance
        });
    }

    // Allows subclasses to update the balance.
    _setBalance(newBalance) {
        this.#balance = newBalance;
    }

    // Allows subclasses to add transactions while keeping
    // the actual transaction array private.
    _recordTransaction(type, amount, description) {
        this.#transactions.push({
            type: type,
            amount: amount,
            description: description,
            dateTime: new Date(),
            balanceAfter: this.#balance
        });
    }
}

module.exports = DiningAccount;