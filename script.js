//THIS PROGRAM HERE, HANDLES THE USER DEPOSITE, IF THE USER ENTERS THE INVALID OR NON-NUMERIC VALUE THEN THE PROGRAM WILL REPEAT TILL THE USER ENTERS A VALID NUMBER AS INPUT.

const prompt = require("prompt-sync")();


const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOLS_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

const deposite = () => {
    while (true) {
        const depositeAmount = prompt("Enter the amount you want to deposite: ");
        const numberDepositeAmount = parseFloat(depositeAmount);

        if (isNaN(numberDepositeAmount) || numberDepositeAmount <= 0) {
            console.log("Invalid deposite amount, try again!");
        } else {
            return numberDepositeAmount;
        }
    }
}

 //THIS PROGRAM HERE, HANDLES THE NUMBER OF LINE USER WANT TO BET, IF THE USER ENTERS THE INVALID OR NON-NUMERIC VALUE THEN THE PROGRAM WILL REPEAT TILL THE USER ENTERS A VALID A NUMBER BETWEEN 1 - 3.

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("Enter the number of line you want to bet(1-3): ");
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, enter number between 1 -3");
        } else {
            return numberOfLines;
        }
    }
}

//THIS PROGRAM HERE, HANDLES THE VALUE OF THE BALANCE THE USER ENTERED, USE IT TO DETERMINE THE AMOUNT THE USER HAVE TO PLACE PER LINE.

const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet, try again");
        } else {
            return numberBet;
        }
    }
}

// THIS PROGRAM HERE WILL RANDOMLY SELECT THE VALUE OF THE VARIABLES DECLEARED ABOVE, AND DISPLAY THEM IN AN ARREY.

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
            for (let j = 0; j < ROWS; j++) {
                const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                const selectedSymbol = reelSymbols[randomIndex];
                reels[i].push(selectedSymbol);
                reelSymbols.splice(randomIndex, 1);
            }
        }

    return reels;
}

// THIS PROGRAM HERE WILL

const transPose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }

    return rows;
}

//

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of rows.entries()) {
            rowString += symbol
            if (i  rows.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

let balance = deposite();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
const reels = spin();
const rows = transPose(reels);
console.log(rows);

