//THIS PROGRAM HERE, HANDLES THE USER DEPOSITE, IF THE USER ENTERS THE INVALID OR NON-NUMERIC VALUE THEN THE PROGRAM WILL REPEAT TILL THE USER ENTERS A VALID NUMBER AS INPUT.

const prompt = require("prompt-sync")(); //PROMPT MOUDLE REQURING FOR USER INPUT


// GLOBAL VARIABLES DEFINED FOR THE USE LATER IN THE CODE
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

// DEPOSITE FUNCTION, CONTINUE ASKIG USER FOR A DEPOSITE, AND THE NUMBER OF LINES THEY WANT TO BET ON

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
            console.log("Invalid number of lines, enter number between 1-3");
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

// THIS PROGRAM HERE, TRANSPOSES THE VALUES OF THE VARIABLES DEFINED ABOVE IN A MATRIX FORM

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

// THIS PROGRAM PRINTS THE VALUES IN A ROWS FORM

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

//

 const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet = SYMBOLS_VALUES[symbols[0]];
        }
    }

    return winnings;
 }

 // THE GAME PROGARM ITSELF, ASKS THE USER IF THEY STILL WANT TO PLAY OR QUIT

 const game = () => {
    let balance = deposite();

    while (true) {
        console.log("Your have a balance of $" + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transPose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You won, $" + winnings.toString());

        if (balance <= 0) {
            console.log("You ran out of funds!");
            break;
        }

        const playAgain = prompt("Do you want to continue? (y/n)") 
        
        if (playAgain != "y") break;
    }
 }

 game();