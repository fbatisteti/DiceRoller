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
        document.getElementById("rollCommand").removeAttribute('disabled');

        let fields = document.getElementsByName("setup");
        fields.forEach(field => {
            field.setAttribute('disabled', 'disabled');
        });
    } else {
        document.getElementById("rollCommand").setAttribute('disabled', 'disabled');

        let fields = document.getElementsByName("setup");
        fields.forEach(field => {
            field.removeAttribute('disabled');
        });
    };
};

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
    };
  
    let rollLine = breakRollString(document.getElementById('rollCommand').value);

    if (typeof rollLine == "string") {
        // an error occurred
        document.getElementById('result').classList.add("error");
        document.getElementById('result').innerHTML = rollLine;
    } else {
        // safe to roll, get array
        let result = rollDice(rollLine.diceToRoll, rollLine.faces, rollLine.kh, rollLine.kl, rollLine.dh, rollLine.dl, rollLine.ro, rollLine.ru);

        setDiceTowerHeight();

        document.getElementById('result').innerHTML = formatResults(result, faces, modType, modNum);
    };

    return;
};

// responsiveness functions
function toggleDetail(string) {
    alert(document.getElementById(string).innerHTML);
};

function handleRessize() {
    let width = window.innerWidth;

    // reset to default
    if (width >= 768) {
        document.getElementById('setupScreen').classList.value = 'col d-block';
        document.getElementById('historyScreen').classList.value = 'col-3 d-none d-md-block';
        document.getElementById('settingsScreen').classList.value = 'col-3 d-none d-md-block';
        callRoller();
    };

    setDiceTowerHeight();
    setHistoryHeight();
};

function removeOrder(div) {
    div.classList.remove("order-1");
    div.classList.remove("order-2");
    div.classList.remove("order-3");
    div.classList.remove("hidden");
};

    // 0 1 - Roller Icon - Text
    // 2 3 - History Icon - Text
    // 4 5 - Settings Icon - Text

function callRoller() {
    let header = document.getElementById("titleBlock").children;

    for (let i = 0; i < header.length; i++) removeOrder(header[i]);

    header[0].classList.add('hidden');
    header[1].classList.add('order-2');
    header[2].classList.add('order-1');
    header[3].classList.add('hidden');
    header[4].classList.add('order-3');
    header[5].classList.add('hidden');

    document.getElementById('setupScreen').classList.value = 'col d-block';
    document.getElementById('historyScreen').classList.value = 'col-3 d-none d-md-block';
    document.getElementById('settingsScreen').classList.value = 'col-3 d-none d-md-block';
};

function callSettings() {
    let header = document.getElementById("titleBlock").children;

    for (let i = 0; i < header.length; i++) removeOrder(header[i]);

    header[0].classList.add('order-3');
    header[1].classList.add('hidden');
    header[2].classList.add('order-1');
    header[3].classList.add('hidden');
    header[4].classList.add('hidden');
    header[5].classList.add('order-2');

    document.getElementById('setupScreen').classList.value = 'col-3 d-none d-md-block';
    document.getElementById('historyScreen').classList.value = 'col-3 d-none d-md-block';
    document.getElementById('settingsScreen').classList.value = 'col d-block';
};

function callHistory() {
    let header = document.getElementById("titleBlock").children;

    for (let i = 0; i < header.length; i++) removeOrder(header[i]);

    header[0].classList.add('order-1');
    header[1].classList.add('hidden');
    header[2].classList.add('hidden');
    header[3].classList.add('order-2');
    header[4].classList.add('order-3');
    header[5].classList.add('hidden');

    document.getElementById('setupScreen').classList.value = 'col-3 d-none d-md-block';
    document.getElementById('historyScreen').classList.value = 'col d-block';
    document.getElementById('settingsScreen').classList.value = 'col-3 d-none d-md-block';
};

// Below is to redefine the maximum height for the dice tower
    // I'm making use of parts of the old code I found online for the responsive layout (before using Bootstrap)
window.addEventListener('resize', () => handleRessize());

function setDiceTowerHeight() {
    let viewport = window.innerHeight * 0.01;
    let offset = 0;

    offset = document.getElementById("setupBlock").offsetHeight + document.getElementById("titleBlock").offsetHeight + 100;

    document.documentElement.style.setProperty('--vhDiceTower', `${viewport}px`);
    document.documentElement.style.setProperty('--offsetDiceTower', `${offset}px`);
};

function setHistoryHeight() {
    let viewport = window.innerHeight * 0.01;
    let offset = 0;

    offset = document.getElementById("historyHeader").offsetHeight + document.getElementById("titleBlock").offsetHeight + 50;

    document.documentElement.style.setProperty('--vhHistory', `${viewport}px`);
    document.documentElement.style.setProperty('--offsetHistory', `${offset}px`);
};
