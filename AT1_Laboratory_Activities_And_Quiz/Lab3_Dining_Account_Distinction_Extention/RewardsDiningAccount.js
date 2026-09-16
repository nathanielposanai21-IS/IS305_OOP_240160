/*
  Program: DWU Dining Meal Booking
  File: RewardsDiningAccount.js
  Student Name: Nathaniel Posanai
  Student ID: 240160
  Description:
  Rewards dining account that inherits from DiningAccount.
  Successful meal payments earn rewards at 2.5% of the payment.
*/

const DiningAccount = require("./DiningAccount");

class RewardsDiningAccount extends DiningAccount {
    #rewardBalance;
    #rewardRate;

    constructor(accountNumber, openingBalance = 0, rewardRate = 0.025) {
        super(accountNumber, openingBalance);

        if (typeof rewardRate !== "number" || rewardRate < 0) {
            throw new Error("Reward rate must be a non-negative number.");
        }

        this.#rewardRate = rewardRate;
        this.#rewardBalance = 0;
    }

    payForMeal(amount, description = "Meal booking") {
        if (typeof amount !== "number" || amount <= 0) {
            console.log("Payment rejected: payment amount must be greater than K0.00.");
            return false;
        }

        if (amount > this.getBalance()) {
            console.log(
                `Payment rejected: insufficient funds. ` +
                `Available balance is K${this.getBalance().toFixed(2)}.`
            );
            return false;
        }

        const newBalance = this.getBalance() - amount;

        this._setBalance(newBalance);

        this._recordTransaction(
            "Meal Payment",
            amount,
            description
        );

        const reward = amount * this.#rewardRate;

        this.#rewardBalance += reward;

        console.log(
            `Payment successful: K${amount.toFixed(2)} paid from ${this.getAccountNumber()}.`
        );

        console.log(
            `Reward earned: K${reward.toFixed(2)}`
        );

        return true;
    }

    getRewardBalance() {
        return this.#rewardBalance;
    }

    getRewardRate() {
        return this.#rewardRate;
    }

    displayAccountSummary() {
        console.log("========================================");
        console.log("       REWARDS DINING ACCOUNT");
        console.log("========================================");
        console.log(`Account Type: ${this.constructor.name}`);
        console.log(`Account Number: ${this.getAccountNumber()}`);
        console.log(`Balance: K${this.getBalance().toFixed(2)}`);
        console.log(
            `Reward Rate: ${(this.#rewardRate * 100).toFixed(1)}%`
        );
        console.log(
            `Rewards Earned: K${this.#rewardBalance.toFixed(2)}`
        );
        console.log("========================================");
    }
}

module.exports = RewardsDiningAccount;