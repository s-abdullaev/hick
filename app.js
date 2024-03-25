let times = [];
let start;

let buttonCounts = [2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
let currentIndex = 0;

window.onload = function () {
    document.getElementById('start').addEventListener('click', function () {
        this.disabled = true;
        createButtons(2);
    });
}

function createButtons(num) {
    let container = document.getElementById('container');
    container.innerHTML = '';
    let table = document.createElement('table');
    let row, cell;
    let buttons = [];
    for (let i = 0; i < num; i++) {
        let button = document.createElement('button');
        button.className = 'btn_number';
        button.innerText = 'Button ' + (i + 1);
        button.addEventListener('click', stopTimer);
        buttons.push(button);
    }
    buttons = shuffle(buttons);
    for (let i = 0; i < buttons.length; i++) {
        if (i % 10 === 0) {
            row = document.createElement('tr');
            table.appendChild(row);
        }
        cell = document.createElement('td');
        cell.appendChild(buttons[i]);
        row.appendChild(cell);
    }
    container.appendChild(table);
    let randomButton = buttons[Math.floor(Math.random() * buttons.length)].innerText;
    document.getElementById('question').innerText = 'Click ' + randomButton;
    startTimer();
}

function startTimer() {
    start = new Date();
}

function stopTimer(e) {
    let clickedButton = e.target.innerText;
    let askedButton = document.getElementById('question').innerText.replace('Click','').trim();
    if (clickedButton === askedButton) {
        let end = new Date();
        let time = end - start;
        times.push({numButtons: buttonCounts[currentIndex], timeSpent: time});
        currentIndex++;
        if (currentIndex < buttonCounts.length) {
            createButtons(buttonCounts[currentIndex]);
            document.getElementById('numberOfButtons').innerText = 'Number of buttons: ' + buttonCounts[currentIndex];
        } else {
            downloadCSV();
        }
    } else {
        alert('You clicked the wrong button. Please try again.');
    }
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function downloadCSV() {
    let csvContent = "data:text/csv;charset=utf-8,Number of Buttons,Time in Milliseconds\n" + times.map(t => `${t.numButtons},${t.timeSpent}`).join("\n");
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "times.csv");
    link.innerText = "Download CSV";
    document.body.appendChild(link);

    let resultTable = document.createElement('table');
    let headerRow = document.createElement('tr');
    let numHeader = document.createElement('th');
    numHeader.innerText = 'Number of Buttons';
    let timeHeader = document.createElement('th');
    timeHeader.innerText = 'Time in Milliseconds';
    headerRow.appendChild(numHeader);
    headerRow.appendChild(timeHeader);
    resultTable.appendChild(headerRow);

    for (let i = 0; i < times.length; i++) {
        let row = document.createElement('tr');
        let numCell = document.createElement('td');
        numCell.innerText = times[i].numButtons;
        let timeCell = document.createElement('td');
        timeCell.innerText = times[i].timeSpent;
        row.appendChild(numCell);
        row.appendChild(timeCell);
        resultTable.appendChild(row);
    }

    document.body.appendChild(resultTable);
}