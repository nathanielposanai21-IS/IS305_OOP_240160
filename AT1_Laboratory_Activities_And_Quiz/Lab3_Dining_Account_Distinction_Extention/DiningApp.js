/*
  Program: DWU Dining Meal Booking
  Student Name: Nathaniel Posanai
  Student ID: 240160
  Date: 17 July 2026
  Description:
  Lab 3 Part 2 demonstrating inheritance, polymorphism,
  credit accounts, student account assignment, meal booking
  payment, transaction history and simulated overloading.
*/

const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");

const Student = require("./Student");
const MealBooking = require("./MealBooking");
const DiningAccount = require("./DiningAccount");
const RewardsDiningAccount = require("./RewardsDiningAccount");
const CreditDiningAccount = require("./CreditDiningAccount");

const rl = readline.createInterface({
    input,
    output
});

async function main() {
    console.log("========================================");
    console.log("       DWU DINING MEAL BOOKING");
    console.log("             LAB 3 PART 2");
    console.log("========================================");
    console.log();

    // ==================================================
    // TASK 1 & TASK 6
    // Constructor and method variations
    // ==================================================

    console.log("========================================");
    console.log("      CONSTRUCTOR/METHOD VARIATIONS");
    console.log("========================================");

    const variationAccount1 = new DiningAccount("DA001");

    const variationAccount2 = new DiningAccount(
        "DA002",
        500
    );

    console.log(
        `DA001 balance: K${variationAccount1.getBalance().toFixed(2)}`
    );

    console.log(
        `DA002 balance: K${variationAccount2.getBalance().toFixed(2)}`
    );

    variationAccount1.deposit(100);

    variationAccount2.deposit(
        100,
        "Additional meal funds"
    );

    console.log(
        `DA001 balance after deposit: K${variationAccount1.getBalance().toFixed(2)}`
    );

    console.log(
        `DA002 balance after deposit: K${variationAccount2.getBalance().toFixed(2)}`
    );

    console.log();

    // ==================================================
    // TASK 1
    // Credit Dining Account Demonstration
    // ==================================================

    console.log("========================================");
    console.log("      CREDIT ACCOUNT DEMONSTRATION");
    console.log("========================================");

    const creditAccount = new CreditDiningAccount(
        "CA001",
        1000,
        500
    );

    creditAccount.displayAccountSummary();

    console.log("Attempting K1,500.00 payment...");

    creditAccount.payForMeal(
        1500,
        "Catering payment"
    );

    console.log(
        `Resulting Balance: K${creditAccount.getBalance().toFixed(2)}`
    );

    console.log();

    console.log("Attempting another K1.00 payment...");

    creditAccount.payForMeal(
        1,
        "Additional catering payment"
    );

    console.log(
        `Balance After Rejected Payment: K${creditAccount.getBalance().toFixed(2)}`
    );

    console.log();

    // ==================================================
    // TASK 2
    // POLYMORPHISM
    // ==================================================

    console.log("========================================");
    console.log("       POLYMORPHIC ACCOUNT PROCESSING");
    console.log("========================================");

    const standardAccount = new DiningAccount(
        "DA003",
        100
    );

    const rewardsAccount = new RewardsDiningAccount(
        "RA001",
        100,
        0.025
    );

    const polymorphicCreditAccount = new CreditDiningAccount(
        "CA002",
        100,
        500
    );

    const diningAccounts = [
        standardAccount,
        rewardsAccount,
        polymorphicCreditAccount
    ];

    for (const account of diningAccounts) {
        account.displayAccountSummary();
        console.log();
    }

    // Same method call, different specialised behaviour.
    console.log("Calling payForMeal() polymorphically:");

    for (const account of diningAccounts) {
        console.log();
        console.log(
            `Processing K40.00 payment for ${account.getAccountNumber()}`
        );

        account.payForMeal(
            40,
            "Polymorphic meal payment"
        );
    }

    console.log();

    // ==================================================
    // TASK 3
    // CONNECT ACCOUNT TO STUDENT
    // ==================================================

    console.log("========================================");
    console.log("        STUDENT ACCOUNT ASSIGNMENT");
    console.log("========================================");

    const student = new Student(
        "DWU2026001",
        "Maria",
        "Kila"
    );

    const studentDiningAccount = new RewardsDiningAccount(
        "RA002",
        100,
        0.025
    );

    student.assignDiningAccount(
        studentDiningAccount
    );

    student.displayStudentDetails();

    console.log();

    // ==================================================
    // TASK 4
    // MEAL BOOKING PAYMENT
    // ==================================================

    console.log("========================================");
    console.log("        MEAL BOOKING PAYMENT");
    console.log("========================================");

    const booking = new MealBooking(
        student.getStudentID(),
        student.getFullName(),
        "2026-09-16",
        "Dinner",
        2,
        "No special requirements"
    );

    booking.displayBooking();

    console.log();
    console.log("Processing booking payment...");

    booking.processPayment(
        student.getDiningAccount()
    );

    console.log();

    booking.displayBooking();

    console.log();

    // ==================================================
    // TASK 5
    // TRANSACTION HISTORY
    // ==================================================

    console.log("========================================");
    console.log("        ACCOUNT TRANSACTION HISTORY");
    console.log("========================================");

    student.getDiningAccount().displayTransactionHistory();

    // ==================================================
    // TASK 4
    // DUPLICATE PAYMENT TEST
    // ==================================================

    console.log("========================================");
    console.log("        DUPLICATE PAYMENT TEST");
    console.log("========================================");

    console.log(
        "Attempting to process the same booking again..."
    );

    booking.processPayment(
        student.getDiningAccount()
    );

    console.log();

    // ==================================================
    // REQUIRED TESTS
    // ==================================================

    console.log("========================================");
    console.log("             REQUIRED TESTS");
    console.log("========================================");

    // ------------------------------------------
    // Test 1: Standard account payment
    // ------------------------------------------

    console.log();
    console.log("Test 1: Standard account payment");

    const testStandard = new DiningAccount(
        "TEST-DA01",
        100
    );

    const standardResult = testStandard.payForMeal(
        50,
        "Standard test payment"
    );

    console.log(
        `Expected: Payment succeeds`
    );

    console.log(
        `Actual: ${standardResult ? "Payment succeeded" : "Payment rejected"}`
    );

    // ------------------------------------------
    // Test 2: Insufficient standard balance
    // ------------------------------------------

    console.log();
    console.log("Test 2: Insufficient standard balance");

    const insufficientAccount = new DiningAccount(
        "TEST-DA02",
        50
    );

    const beforeBalance = insufficientAccount.getBalance();

    const insufficientResult =
        insufficientAccount.payForMeal(
            100,
            "Insufficient balance test"
        );

    const afterBalance = insufficientAccount.getBalance();

    console.log(
        `Expected: Payment rejected and balance unchanged`
    );

    console.log(
        `Actual: ${
            !insufficientResult && beforeBalance === afterBalance
                ? "PASS"
                : "FAIL"
        }`
    );

    // ------------------------------------------
    // Test 3: Rewards calculation
    // ------------------------------------------

    console.log();
    console.log("Test 3: Rewards calculation");

    const testRewards = new RewardsDiningAccount(
        "TEST-RA01",
        100,
        0.025
    );

    testRewards.payForMeal(
        40,
        "Rewards test payment"
    );

    const expectedReward = 40 * 0.025;

    console.log(
        `Expected Reward: K${expectedReward.toFixed(2)}`
    );

    console.log(
        `Actual Reward: K${testRewards.getRewardBalance().toFixed(2)}`
    );

    console.log(
        testRewards.getRewardBalance() === expectedReward
            ? "Result: PASS"
            : "Result: FAIL"
    );

    // ------------------------------------------
    // Test 4: Credit account within limit
    // ------------------------------------------

    console.log();
    console.log("Test 4: Credit account within limit");

    const testCredit = new CreditDiningAccount(
        "TEST-CA01",
        1000,
        500
    );

    const creditResult = testCredit.payForMeal(
        1500,
        "Credit limit test"
    );

    console.log(
        `Expected Balance: K-500.00`
    );

    console.log(
        `Actual Balance: K${testCredit.getBalance().toFixed(2)}`
    );

    console.log(
        creditResult && testCredit.getBalance() === -500
            ? "Result: PASS"
            : "Result: FAIL"
    );

    // ------------------------------------------
    // Test 5: Credit limit exceeded
    // ------------------------------------------

    console.log();
    console.log("Test 5: Credit limit exceeded");

    const exceededCredit = new CreditDiningAccount(
        "TEST-CA02",
        1000,
        500
    );

    const exceededResult =
        exceededCredit.payForMeal(
            1501,
            "Credit exceeded test"
        );

    console.log(
        `Expected: Payment rejected`
    );

    console.log(
        `Actual: ${
            !exceededResult
                ? "Payment rejected"
                : "Payment succeeded"
        }`
    );

    console.log(
        !exceededResult &&
        exceededCredit.getBalance() === 1000
            ? "Result: PASS"
            : "Result: FAIL"
    );

    // ------------------------------------------
    // Test 6: Polymorphic account processing
    // ------------------------------------------

    console.log();
    console.log("Test 6: Polymorphic account processing");

    const polymorphicTestAccounts = [
        new DiningAccount("POLY-DA", 100),
        new RewardsDiningAccount("POLY-RA", 100, 0.025),
        new CreditDiningAccount("POLY-CA", 100, 500)
    ];

    for (const account of polymorphicTestAccounts) {
        account.payForMeal(
            20,
            "Polymorphism test"
        );
    }

    console.log(
        "Result: PASS - same payForMeal() method was called on all account types."
    );

    // ------------------------------------------
    // Test 7: Booking payment
    // ------------------------------------------

    console.log();
    console.log("Test 7: Booking payment");

    const bookingAccount = new DiningAccount(
        "BOOK-DA",
        100
    );

    const paymentBooking = new MealBooking(
        "DWU2026002",
        "John Peter",
        "2026-09-17",
        "Lunch",
        2,
        ""
    );

    const bookingPaymentResult =
        paymentBooking.processPayment(
            bookingAccount
        );

    console.log(
        `Expected: Booking confirmed`
    );

    console.log(
        `Actual: ${paymentBooking.getStatus()}`
    );

    console.log(
        bookingPaymentResult &&
        paymentBooking.getStatus() === "Confirmed"
            ? "Result: PASS"
            : "Result: FAIL"
    );

    // ------------------------------------------
    // Test 8: Duplicate payment
    // ------------------------------------------

    console.log();
    console.log("Test 8: Duplicate payment");

    const balanceBeforeDuplicate =
        bookingAccount.getBalance();

    const duplicateResult =
        paymentBooking.processPayment(
            bookingAccount
        );

    const balanceAfterDuplicate =
        bookingAccount.getBalance();

    console.log(
        `Expected: Duplicate payment rejected`
    );

    console.log(
        `Actual: ${
            !duplicateResult
                ? "Duplicate rejected"
                : "Duplicate accepted"
        }`
    );

    console.log(
        !duplicateResult &&
        balanceBeforeDuplicate === balanceAfterDuplicate
            ? "Result: PASS"
            : "Result: FAIL"
    );

    // ==================================================
    // FINAL ACCOUNT SUMMARY
    // ==================================================

    console.log();
    console.log("========================================");
    console.log("          FINAL STUDENT ACCOUNT");
    console.log("========================================");

    console.log(`Student: ${student.getFullName()}`);
    console.log(`Student ID: ${student.getStudentID()}`);
    console.log(
        `Account Type: ${student.getDiningAccount().constructor.name}`
    );
    console.log(
        `Account Number: ${student.getDiningAccount().getAccountNumber()}`
    );
    console.log(
        `Balance: K${student.getDiningAccount().getBalance().toFixed(2)}`
    );

    if (
        student.getDiningAccount() instanceof RewardsDiningAccount
    ) {
        console.log(
            `Rewards Earned: K${student.getDiningAccount().getRewardBalance().toFixed(2)}`
        );
    }

    console.log("========================================");

    console.log();
    console.log("Program completed successfully.");

    rl.close();
}

main().catch((error) => {
    console.error();
    console.error("Program Error:", error.message);
    rl.close();
});