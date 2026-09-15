class DiningAccount{
    #accountNumber;
    #balance;
    #transactions;

    constructor(accountNumber, openingBalance = 0){
        if (accountNumber || accountNumber.trim() == ""){
            throw new Error("Account number cannot be empty");
        }

        if (openingBalance < 0){
            throw new Error("Opening balance cannot be negative");
        }

        this.#accountNumber = accountNumber;
        this.#balance = openingBalance;
        this.#transactions = [];

        // Record the opening balance as a transaction
        if (openingBalance > 0){
            this.#transactions.push({
                type: "Opening Balance",
                amount: openingBalance,
                description: "Opening account balance",
                balance: this.#balance
            });
        }
    }

    deposit(amount, description = "Deposit"){
        if (amount <= 0){
            throw new Error("Deposit amount must be positive or greater than zero");
        }

        this.#balance += amount;

        this.#transactions.push({
            type: "Deposit",
            amount: amount,
            description: description,
            balance: this.#balance
        });

        return this.#balance;
    }

    payForMeal(amount, description = "Meal Payment"){
        if (amount <= 0){
            throw new Error("Payment amount must be positive or greater than zero");
        }

        if (amount > this.#balance){
            return false; // Insufficient funds
        }

        this.#balance -= amount;

        this.#transactions.push({
            type: "Meal Payment",
            amount: amount,
            description: description,
            balance: this.#balance
        });

        return true; // Payment successful
    }

    getBalance(){
        return this.#balance;
    }

    getAccountNumber(){
        return this.#accountNumber;
    }

    getTransactions(){
        return [...this.#transactions]; // Return a copy of the transactions array
    }

    displayAccountSummary(){
        console.log(`Account Number: ${this.#accountNumber}`);
        console.log('Account Type: Standard Dining Account');
        console.log(`Current Balance: $${this.#balance.toFixed(2)}`);
    }
}

module.exports = DiningAccount;