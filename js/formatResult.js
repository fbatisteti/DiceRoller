function formatResults(result, faces, modType, modNum) {
    let html = '';
    let total = 0;

    for (let i = 0; i < result.finalRolls.length; i++) {
        let critical = checkCritical(result.finalRolls[i], faces);
        let reroll = checkReroll(result.originalRolls[i], result.finalRolls[i]);
        let dropped = checkKeepDrop(result.keeps[i], result.drops[i]);

        html = html.concat(`
            <div class="dice-result position-relative ${critical} ${dropped}">
            ${result.finalRolls[i]}
                ${reroll}
            </div>
        `);

        total = (dropped == '') ? (total + result.finalRolls[i]) : total;
    };

    if (modNum != '') {
        total = (modType == "+") ? (total + parseInt(modNum)) : (total - parseInt(modNum));
    }

    html = html.concat(`
        <hr>
        <div class="dice-result total center">
            ${total}
        </div>
    `);
    
    return html;
};

function checkCritical(roll, faces) {
    faces = faces.slice(1); // remove the "d"
    
    if (highlightCritical) {
        if (modType == '+') {
            if (roll == faces && highlightCriticalHigh) return "criticalHigh";
            if (roll == 1 && highlightCriticalLow) return "criticalLow";
        } else {
            if (roll == faces && highlightCriticalHigh) return "criticalHigh";
            if (roll == 1 && highlightCriticalLow) return "criticalLow";
        };
    };

    return "";
};

function checkReroll(roll, original) {
    let html = '';

    if ((showRerolled || showAllRolls) && (roll != original)) {
        html = html.concat(`
            <span class="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-secondary">
                ${roll}
            </span>
        `);
    };

    return html;
};

function checkKeepDrop(rollkeep, rolldrop) {
    let html = '';

    if (keepNum != 0) {
        if (!keepDrop) {
            if (rollkeep == 0) {
                html = html.concat(`dropped`);
            };
        } else {
            // considering keep before drop... leaving this part as thi to be easy to modify if needed
            if (this.keep == 0 && this.drop == 0) {
                // drop
                html = html.concat(`dropped`);
            };
    
            if (this.keep == 1 && this.drop == 1) {
                // drop
                html = html.concat(`dropped`);
            };
    
            if (this.keep == 0 && this.drop == 1) {
                // drop
                html = html.concat(`dropped`);
            };
    
            if (this.keep == 1 && this.drop == 0) {
                // keep
            };
        };
    }

    return html;
};