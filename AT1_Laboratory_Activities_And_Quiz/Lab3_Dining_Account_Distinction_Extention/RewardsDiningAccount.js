const DiningAccount = require("./DiningAccount");

class RewardsDiningAccount extends DiningAccount {
    #rewardRate;

    constructor(accountNumber, openingBalance, rewardRate) {

        // Constructor chaining
        super(accountNumber, openingBalance);

        // Validate reward rate
        if (rewardRate < 0 || rewardRate > 100) {
            throw new Error(
                "Reward rate must be between 0% and 100%."
            );
        }

        this.#rewardRate = rewardRate;
    }

    calculateReward() {
        return this.getBalance() * this.#rewardRate / 100;
    }

    applyReward() {
        const reward = this.calculateReward();

        if (reward > 0) {
            this.deposit(reward, "Rewards earned");
        }

        return reward;
    }

    getRewardRate() {
        return this.#rewardRate;
    }

    displayAccountSummary() {
        console.log(`Account Number: ${this.getAccountNumber()}`);
        console.log("Account Type: Rewards Dining Account");
        console.log(
            `Current Balance: K${this.getBalance().toFixed(2)}`
        );
        console.log(`Reward Rate: ${this.#rewardRate}%`);
    }
}

module.exports = RewardsDiningAccount;