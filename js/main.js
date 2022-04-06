let diceToRoll;
let faces;
let keepNum;
let keepType;
let dropNum;
let dropType;
let rerollNum;
let rerollType;
let modNum;
let modType;

let useRollCommand = false;

function setUseRollCommand() {
    useRollCommand = document.getElementById("useRollCommand").checked;

    if (useRollCommand) {
        document.getElementById("rollCommand").removeAttribute('disabled')
        document.getElementById("setup").classList.remove("border-focus")
        document.getElementById("rollCommand").classList.add("border-focus")
    } else {
        document.getElementById("rollCommand").setAttribute('disabled', 'disabled')
        document.getElementById("setup").classList.add("border-focus")
        document.getElementById("rollCommand").classList.remove("border-focus")
    }
}

function applyValues() {
    diceToRoll = (document.getElementById('diceToRoll').value >= 1) ? document.getElementById('diceToRoll').value : 1;

    faces = 'd'
    faces = faces.concat(document.getElementById('faces').value);
    
    keepNum = (document.getElementById('keepNum').value > 0) ? document.getElementById('keepNum').value : '';
    
    keepType = (keepNum != 0) ? document.getElementById('keepType').value : '';
    
    dropNum = (document.getElementById('dropNum').value > 0) ? document.getElementById('dropNum').value : '';
    
    dropType = (dropNum != 0) ? document.getElementById('dropType').value : '';
    
    rerollNum = (document.getElementById('rerollNum').value > 0) ? document.getElementById('rerollNum').value : '';
    
    rerollType = (rerollNum != 0) ? document.getElementById('rerollType').value : '';
    
    modNum = (document.getElementById('modNum').value > 0) ? document.getElementById('modNum').value : '';
    
    modType = (modNum != 0) ? document.getElementById('modType').value : '';

    return;
};

function rollTheDice() {
    document.getElementById('result').classList.remove("error");
    document.getElementById('result').classList.remove("result");

    if (!useRollCommand) {
        applyValues();

        document.getElementById('rollCommand').value = diceToRoll + faces + keepType + keepNum + dropType + dropNum + rerollType + rerollNum + modType + modNum;
    }
  
    let rollLine = breakRollString(document.getElementById('rollCommand').value);

    if (typeof rollLine == "string") {
        // an error occurred
        document.getElementById('result').classList.add("error");
        document.getElementById('result').innerHTML = rollLine;
    } else {
        // safe to roll, get array
        let result = rollDice(rollLine.diceToRoll, rollLine.faces, rollLine.kh, rollLine.kl, rollLine.dh, rollLine.dl, rollLine.ro, rollLine.ru);

        document.getElementById('result').classList.add("result");
        document.getElementById('result').innerHTML = formatResults(result, faces, modType, modNum);
    }

    return;
};
