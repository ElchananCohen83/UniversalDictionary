let csvData = []; // Store CSV data globally

function processCSV() {
    const input = document.getElementById('csvFile');
    const tableBody = document.getElementById('tableBody');

    // Clear any existing table data
    tableBody.innerHTML = '';
    
    const file = input.files[0];
    // const file = require("fs");

    // fs.writeFile("message.txt", "Hello Node", (err) => {
    //   if (err) throw err;
    //   console.log("The file has been saved!");
    // });
    
    // fs.readFile("category.csv", "utf8", (err, data) => {
    //   if (err) throw err;
    //   console.log(data);
    // });


    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const contents = e.target.result;
            const lines = contents.split('\n');
            csvData = []; // Clear existing data

            for (const line of lines) {
                console.log(line);
                const values = line.split(',');
                console.log(values);

                // Ensure there are two columns in each row
                if (values.length === 2) {
                    csvData.push(values);
                    const newRow = document.createElement('tr');
                    const cell1 = document.createElement('td');
                    const cell2 = document.createElement('td');

                    cell1.textContent = values[0];
                    cell2.textContent = values[1];

                    newRow.appendChild(cell1);
                    newRow.appendChild(cell2);
                    tableBody.appendChild(newRow);
                }
            }
        };

        reader.readAsText(file);
    }
}

function searchAndDisplay() {
    const searchTerm = document.getElementById('searchWord').value.trim().toLowerCase();
    const tableBody = document.getElementById('tableBody');

    if (searchTerm === '') {
        return;
    }

    const results = [];
    for (let i = 0; i < csvData.length; i++) {
        const row = csvData[i];

        for (let j = 0; j < row.length; j++) {
            const cellValue = row[j].toLowerCase();

            // Check if the search term matches the whole cell value or is part of it
            if (cellValue.includes(searchTerm)) {
                // Collect the matched word and the following 10 words
                const startIndex = Math.max(0, i);
                const endIndex = Math.min(csvData.length, i + 11);
                results.push(...csvData.slice(startIndex, endIndex));

                // Display the results in the table
                tableBody.innerHTML = '';
                for (const result of results) {
                    const newRow = document.createElement('tr');
                    const cell1 = document.createElement('td');
                    const cell2 = document.createElement('td');

                    cell1.textContent = result[0];
                    cell2.textContent = result[1];

                    newRow.appendChild(cell1);
                    newRow.appendChild(cell2);
                    tableBody.appendChild(newRow);
                }

                return; // Stop searching once the first match is found
            }
        }
    }

    // If no match is found, clear the table
    tableBody.innerHTML = '';
}
