function numOnly (text) {
    return parseInt((text[0] == '-') ? ('-' + text.replace(/\D/g, "") ) : text.replace(/\D/g, ""));
};

function breakRollString(roll = '') {
    roll = roll.toLowerCase();

    let aux = ['kh', 'kl', 'dh', 'dl', 'ro', 'ru'];

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
    };

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
            };
        
            for (let i = 0; i < aux.length; i++) {
                if (aux[i] < 0) {return 'An error has occurred: One or more negative values found on keep, discard and/or re-roll';};
            };
        
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
    };

    return output;
};

function rollDice(diceToRoll, faces, kh, kl, dh, dl, ro, ru) {
    // set values
    (diceToRoll == '') ? diceToRoll = 1 : diceToRoll = diceToRoll;
    (faces == '') ? faces = 20 : faces = faces;
    (kh == '') ? kh = 0 : kh = kh;
    (kl == '') ? kl = 0 : kl = kl;
    (dh == '') ? dh = 0 : dh = dh;
    (dl == '') ? dl = 0 : dl = dl;
    (ro == '') ? ro = faces : ro = ro;
    (ru == '') ? ru = 0 : ru = ru;

    // Roll the dice
    let allResults = {
        originalRolls: [],
        rerolls: [],
        keeps: [],
        drops: [],
        finalRolls:[]
    };

    for (let i = 0; i < diceToRoll; i++) {
        allResults.originalRolls.push(Math.floor(Math.random() * faces)+1);
        allResults.finalRolls[i] = allResults.originalRolls[i];
        allResults.rerolls[i] = 0;
        allResults.keeps[i] = 0;
        allResults.drops[i] = 0;
    };

    // Re-roll overs and unders
    for (let i = 0; i < allResults.finalRolls.length; i++) {
        if (allResults.finalRolls[i] > ro) {
            allResults.finalRolls[i] = Math.floor(Math.random() * faces)+1;
            allResults.rerolls[i] = 1;
            i--;
        };
    };

    for (let i = 0; i < allResults.finalRolls.length; i++) {
        if (allResults.finalRolls[i] < ru) {
            allResults.finalRolls[i] = Math.floor(Math.random() * faces)+1;
            allResults.rerolls[i] = 1;
            i--;
        };
    };

    /* Keeps and drops

        This part can be troublesome when a command is issued with both keeps or drops, i.e. 5d20kh2kl2. This can only happen when the command line is used */
    let keep = kh - kl;
    let drop = dh - dl;
    let aux = [];

    // Keeps
    if (keep != 0) {
        aux = [...allResults.finalRolls];
        aux = aux.sort(function(a, b){return a - b});
        aux = (keep > 0) ? aux.slice(aux.length - keep) : aux.slice(0, Math.abs(keep));

        for (let i = 0; i < aux.length; i++) {
            let pos = getKeepIndex(allResults.finalRolls, allResults.keeps, aux[i]);
            allResults.keeps[pos] = 1;
        };
    };

    // Drops
    if (drop != 0) {
        aux = [...allResults.finalRolls];
        aux = aux.sort(function(a, b){return a - b});
        aux = (drop > 0) ? aux.slice(aux.length - drop) : aux.slice(0, Math.abs(drop));

        for (let i = 0; i < aux.length; i++) {
            let pos = getDropIndex(allResults.finalRolls, allResults.drops, aux[i]);
            allResults.drops[pos] = 1;
        };
    };

    return allResults;
};

function getKeepIndex(searchArray, keepAray, num) {
    for (let pos = searchArray.length - 1; pos >= 0; pos--) {
        if (searchArray[pos] == num && keepAray[pos] == 0) return pos;
    };
};

function getDropIndex(searchArray, dropAray, num) {
    for (let pos = 0; pos < searchArray.length; pos++) {
        if (searchArray[pos] == num && dropAray[pos] == 0) return pos;
    };
};
