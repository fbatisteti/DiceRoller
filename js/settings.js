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

let darkMode = false;

function setDarkMode() {
    darkMode = document.getElementById("darkMode").checked;

    if (darkMode) {
        document.documentElement.style.setProperty('--color1', '#A6A6F0');
        document.documentElement.style.setProperty('--color2', '#8B8BC6');
        document.documentElement.style.setProperty('--color3', '#6F6F9C');
        document.documentElement.style.setProperty('--color4', '#545471');
        document.documentElement.style.setProperty('--color5', '#383847');
        document.documentElement.style.setProperty('--color6', '#1D1D1D');
    } else {
        document.documentElement.style.setProperty('--color1', '#2A2164');
        document.documentElement.style.setProperty('--color2', '#4D467B');
        document.documentElement.style.setProperty('--color3', '#706B93');
        document.documentElement.style.setProperty('--color4', '#938FAA');
        document.documentElement.style.setProperty('--color5', '#B6B4C2');
        document.documentElement.style.setProperty('--color6', '#D9D9D9');
    };
};

