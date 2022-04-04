    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

// Took the part above somewhere I can't find anymore... it's for ressizing everything

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

function formatResults(resultArray) {
    let html = ''

    resultArray.forEach(result => {
        html = html.concat(`<b>${result}</b>, `);
    });

    return html.slice(0, -2);
}

function rollTheDice() {
    document.getElementById('result').classList.remove("error");
    document.getElementById('result').classList.remove("result");
    applyValues();

    document.getElementById('rollCommand').value = diceToRoll + faces + keepType + keepNum + dropType + dropNum + rerollType + rerollNum + modType + modNum;
  
    let rollLine = breakRollString(document.getElementById('rollCommand').value);

    if (typeof rollLine == "string") {
        // an error occurred
        document.getElementById('result').classList.add("error");
        document.getElementById('result').innerHTML = rollLine;
    } else {
        // safe to roll, get array
        let resultArray = rollDice(rollLine.diceToRoll, rollLine.faces, rollLine.kh, rollLine.kl, rollLine.dh, rollLine.dl, rollLine.ro, rollLine.ru, rollLine.mod);

        document.getElementById('result').classList.add("result");
        document.getElementById('result').innerHTML = formatResults(resultArray);
    }

    return;
};

