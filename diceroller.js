function numOnly (text) {
    return (text[0] == '-') ? ('-' + text.replace(/\D/g, "") ) : text.replace(/\D/g, "") 
}

function breakRollString(roll = '') {
    roll = roll.toLowerCase();

    let aux = ['kh', 'kl', 'dh', 'dl', 'ro', 'ru']

    let output = {
        diceToRoll: '',
        faces: '',
        kh: '',
        kl: '',
        dh: '',
        dl: '',
        ro: '',
        ru: '',
        mod: ''
    }

    // Checking if roll command is valid
        // Command wil be valid if it contains 'd'
    if (!roll.includes('d')) {return 'An error has occurred: No dice found';};
 
    // Checking how many dice to roll
        // Can't be negative or zero
        // Omission will be treated as 1
    let diceTotal = 1;
    if (roll.indexOf('d') != 0) {
        diceTotal = roll.slice(0, roll.indexOf('d'));
    };
   
    if (diceTotal <= 0) {return 'An error has occurred: Negative number of dice';};

    output.diceToRoll = (diceTotal > 1) ? diceTotal : 1;

    // Checking number of faces
        // Must be declared
        // Can't be negative or zero
    let rollAfterD = roll.slice(roll.indexOf('d') + 1);
    if (isNaN(rollAfterD[0]) || rollAfterD[0] == 0) {return 'An error has occurred: Dice faces is not a number';};

    output.faces = (rollAfterD.search(/\D/) == -1) ? rollAfterD : rollAfterD.slice(0, rollAfterD.search(/\D/));

    // Checking for additionals
    if (rollAfterD.search(/\D/) != -1) {
        let adds = rollAfterD.slice(rollAfterD.search(/\D/));

        // if only additional is the modifier, skip this validation
        if (adds[0] != '+' && adds[0] != '-') {
            for (let i = 0; i < aux.length; i++) {
                aux[i] = adds.slice(adds.indexOf(aux[i]) + 2);
                aux[i] = (aux[i].search(/\D/) == -1) ? aux[i] : aux[i].slice(0, aux[i].search(/\D/));
            }
        
            for (let i = 0; i < aux.length; i++) {
                if (aux[i] < 0) {return 'An error has occurred: One or more negative values found on keep, discard and/or re-roll';};
            }
        
            output.kh = aux[0];
            output.kl = aux[1];
            output.dh = aux[2];
            output.dl = aux[3];
            output.ro = aux[4];
            output.ru = aux[5];
    
            if ((numOnly(output.kh) + numOnly(output.kl) + numOnly(output.dh) + numOnly(output.dl)) > output.diceToRoll
            || (numOnly(output.ro) > output.faces)
            || (numOnly(output.ru) < 0))
            {return 'An error has occurred: Amount to keep, discard and/or re-roll over number of dice';};
        }

        let modinc = 0;
        let moddec = 0;
        if (adds.indexOf('+') != -1) {
            modinc = adds.slice(adds.indexOf('+'));
        };
        if (adds.indexOf('-') != -1) {
            moddec = adds.slice(adds.indexOf('-'));
        };

        if (!Number.isInteger(Number(modinc)) || !Number.isInteger(Number(moddec))) {return 'An error has occurred: Modifier is not an integer';};

        output.mod = modinc - moddec;
    } 

    return output;
}

function rollDice(diceToRoll, faces, kh, kl, dh, dl, ro, ru, mod) {
    // set values
    (diceToRoll == '') ? diceToRoll = 1 : diceToRoll = diceToRoll;
    (faces == '') ? faces = 20 : faces = faces;
    (kh == '') ? kh = 0 : kh = kh;
    (kl == '') ? kl = 0 : kl = kl;
    (dh == '') ? dh = 0 : dh = dh;
    (dl == '') ? dl = 0 : dl = dl;
    (ro == '') ? ro = faces : ro = ro;
    (ru == '') ? ru = 0 : ru = ru;
    (mod == '') ? mod = 0 : mod = mod;

    // Roll the dice
    let rollResults = []

    for (let i = 0; i < diceToRoll; i++) {
        rollResults.push(Math.floor(Math.random() * faces)+1);
    }

    // Re-roll overs and unders
    for (let i = 0; i < rollResults.length; i++) {
        if (rollResults[i] > ro) {
            rollResults[i] = Math.floor(Math.random() * faces)+1;
            i--
        }
    }
    for (let i = 0; i < rollResults.length; i++) {
        if (rollResults[i] < ru) {
            rollResults[i] = Math.floor(Math.random() * faces)+1;
            i--
        }
    }

    // Keeps and drops
    let high = kh - dh;
    let low = kl - dl;
    let aux = [];

    if (high > 0) {
        // keep high
        aux = rollResults.sort(function(a, b){return b - a});
        rollResults = aux.slice(0, high);
    } else {
        // drop high
        aux = rollResults.sort(function(a, b){return b - a});
        rollResults = aux.slice(Math.abs(high));
    }

    if (low > 0) {
        // keep low
        aux = rollResults.sort(function(a, b){return a - b});
        rollResults = aux.slice(0, low);
    } else {
        // drop low
        aux = rollResults.sort(function(a, b){return a - b});
        rollResults = aux.slice(Math.abs(low));
    }

    // Add modifiers
    for (let i = 0; i < rollResults.length; i++) {
        rollResults[i] += mod;
    }

    return rollResults.sort(function(a, b){return a - b});
}

