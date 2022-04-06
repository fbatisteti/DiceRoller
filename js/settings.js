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

let showAllRolls = true;
let showDropped = false;
let showRerolled = false;
let highlightCritical = false;
let highlightCriticalHigh = false;
let highlightCriticalLow = false;
let keepDrop = false;

function setShowAllRolls() {
    showAllRolls = document.getElementById("showAllRolls").checked;

    if (showAllRolls) {
        document.getElementById("showAllRollsHelp").classList.add("text1");
        document.getElementById("showAllRollsSwitch").classList.add("hidden");
    } else {
        document.getElementById("showAllRollsHelp").classList.remove("text1");
        document.getElementById("showAllRollsSwitch").classList.remove("hidden");
    };
};

function setShowDropped() {
    showDropped = document.getElementById("showDropped").checked;

    if (showDropped) {
        document.getElementById("showDroppedHelp").classList.add("text1");
    } else {
        document.getElementById("showDroppedHelp").classList.remove("text1");
    };
};

function setShowRerolled() {
    showRerolled = document.getElementById("showRerolled").checked;

    if (showRerolled) {
        document.getElementById("showRerolledHelp").classList.add("text1");
    } else {
        document.getElementById("showRerolledHelp").classList.remove("text1");
    };
};

function setHighlightCritical() {
    highlightCritical = document.getElementById("highlightCritical").checked;

    if (highlightCritical) {
        document.getElementById("highlightCriticalHelp").classList.add("text1");
        document.getElementById("highlightCriticalSwitch").classList.remove("hidden");
    } else {
        document.getElementById("highlightCriticalHelp").classList.remove("text1");
        document.getElementById("highlightCriticalSwitch").classList.add("hidden");
    };
};

function setHighlightCriticalHigh() {
    highlightCriticalHigh = document.getElementById("highlightCriticalHigh").checked;

    if (highlightCriticalHigh) {
        document.getElementById("highlightCriticalHighHelp").classList.add("text1");
    } else {
        document.getElementById("highlightCriticalHighHelp").classList.remove("text1");
    };
};

function setHighlightCriticalLow() {
    highlightCriticalLow = document.getElementById("highlightCriticalLow").checked;

    if (highlightCriticalLow) {
        document.getElementById("highlightCriticalLowHelp").classList.add("text1");
    } else {
        document.getElementById("highlightCriticalLowHelp").classList.remove("text1");
    };
};

function setKeepDrop() {
    keepDrop = document.getElementById("keepDrop").checked;

    if (keepDrop) {
        document.getElementById("keepDropHelp").classList.add("text1");
        document.getElementById("keepDropSwitch").classList.remove("hidden");
        document.getElementById("dropMenu").classList.remove("hidden");
    } else {
        document.getElementById("keepDropHelp").classList.remove("text1");
        document.getElementById("keepDropSwitch").classList.add("hidden");
        document.getElementById("dropMenu").classList.add("hidden");
        dropNum = 0;
    };
};