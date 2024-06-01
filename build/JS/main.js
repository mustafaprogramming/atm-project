#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from 'chalk';
let myBalance = 10000;
let myPin = 12345;
let resume = "yes";
console.log(chalk.blue(`\n\n\t     _-^+-^+‾    ◦◦◦◦◦◦       ◦◦◦ ◎ ◉ ◯ ◉ ◎ ◦◦◦       ◦◦◦◦◦◦    ‾+^-+^-_`));
console.log(chalk.blue(`\t  <==!~~ ☆*: .｡. o(≧ ${chalk.greenBright.bold(` Welcome To Mustafa's  -  ATM Machine `)} ≦)o .｡.:*☆ ~~!==>`));
console.log(chalk.blue(`\t     ‾-∨+-∨+_    ◦◦◦◦◦◦       ◦◦◦ ◎ ◉ ◯ ◉ ◎ ◦◦◦       ◦◦◦◦◦◦     _+∨-+∨-‾\n\n`));
let pinAnswer = await inquirer.prompt([
    {
        type: "number",
        name: "pin",
        message: chalk.rgb(252, 144, 3)("Enter your PIN (12345): ")
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.rgb(98, 252, 3).bold("\n\t\tCorrect PIN: Successful Login!\n"));
    do {
        let operationAnswer = await inquirer.prompt([
            {
                type: "list",
                name: "operation",
                message: chalk.rgb(252, 144, 3)("Select an operation: "),
                choices: [chalk.rgb(255, 220, 64)("Withdraw Amount"), chalk.rgb(255, 220, 64)("Check Balance"), chalk.rgb(255, 220, 64)("Exit")]
            }
        ]);
        if (operationAnswer.operation === chalk.rgb(255, 220, 64)("Withdraw Amount")) {
            let withdrawlmethod = await inquirer.prompt([
                {
                    type: "list",
                    name: "method",
                    message: chalk.rgb(252, 144, 3)("Choose Withdrawal Method: "),
                    choices: [chalk.greenBright.bold("Fast Cash"), chalk.yellowBright.bold("Enter Amount")]
                }
            ]);
            if (withdrawlmethod.method === chalk.greenBright.bold("Fast Cash")) {
                let amount = await inquirer.prompt([
                    {
                        type: "list",
                        name: "amount",
                        message: chalk.rgb(252, 144, 3)("Select Fast Cash Amount: "),
                        choices: ["500", "1000", "3000", "5000", "10000", "15000"]
                    }
                ]);
                if (amount.amount > myBalance) {
                    console.log(chalk.redBright.bold.strikethrough.underline.overline(`\n======================================================`));
                    console.log(chalk.redBright.bold.underline.italic("\n\t\tINSUFFICIENT BALANCE\t\t\n"));
                    console.log(chalk.redBright.bold.strikethrough.underline.overline(`======================================================\n`));
                }
                else if (amount.amount === 0 || amount.amount <= 0 || Number.isNaN(amount.amount)) {
                    console.log(chalk.redBright.bold.underline.italic("\n\t\t\nPlease Enter A Correct Amount\t\t\n"));
                }
                else {
                    myBalance -= amount.amount;
                    console.log(chalk.rgb(247, 204, 10).bold(`\n\t\t$${chalk.greenBright.bold(amount.amount)} Withdrew Successfully!\n`));
                    console.log(chalk.rgb(252, 144, 3)(`\nYour Remaining Balance is: $${chalk.greenBright(myBalance)}\n`));
                }
            }
            else if (withdrawlmethod.method === chalk.yellowBright.bold("Enter Amount")) {
                let amountans = await inquirer.prompt([
                    {
                        type: "number",
                        name: "amount",
                        message: chalk.rgb(252, 144, 3)("Enter Amount to Withdraw: "),
                    }
                ]);
                if (amountans.amount > myBalance) {
                    console.log(chalk.redBright.bold.strikethrough(`\n==============================================`));
                    console.log(chalk.redBright.bold.underline.italic("\n\t\tINSUFFICIENT BALANCE\t\t\n"));
                    console.log(console.log(chalk.redBright.bold.strikethrough(`==============================================\n`)));
                }
                else if (amountans.amount === 0 || amountans.amount < 1 || Number.isNaN(amountans.amount)) {
                    console.log(chalk.redBright.bold.underline.italic("\n\t\tPlease Enter A Correct Amount\t\t\n"));
                }
                else {
                    myBalance -= amountans.amount;
                    console.log(chalk.rgb(247, 204, 10).bold(`\n\t\t$${chalk.greenBright.bold(amountans.amount)} Withdrew Successfully!\n`));
                    console.log(chalk.rgb(252, 144, 3)(`\nYour Remaining Balance is: $${chalk.greenBright(myBalance)}\n`));
                }
            }
        }
        else if (operationAnswer.operation === chalk.rgb(255, 220, 64)("Check Balance")) {
            console.log(chalk.rgb(252, 144, 3)(`\nYour Account Balance is: $${chalk.greenBright.bold(myBalance)}\n`));
        }
        else if (operationAnswer.operation === chalk.rgb(255, 220, 64)("Exit")) {
            resume = "NO";
        }
        ;
    } while (resume !== "NO");
}
else {
    console.log(chalk.redBright.bold(`\n==============================================`));
    console.log(chalk.redBright.bold(`\n\t\tINCORRECT PIN\t\t\n`));
    console.log(chalk.redBright.bold(`==============================================\n`));
}
