const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btnHighLow = document.getElementById("btnHighLow");
const tbl = document.getElementById("tblNumbers");
const sortLabel = document.getElementById("sortLabel");
const sortOption = document.getElementById("sortOption");

let total = 0;
let numbersArr = [];

function insertNumber() {
    const txtNumber = document.getElementById("txtNum").value;
    let num;
    let regex = /^[0-9]+$/; // regular expression for checking valid positive number values.

    if (txtNumber.match(regex)) {
        num = parseInt(txtNumber);
        numbersArr.push(num);

        // Log the array contents after each number insertion
        console.log(numbersArr);
        console.log(`Array Length: ${numbersArr.length}`);
        
        document.getElementById("txtNum").value = "";
        iterateNumbers();
    } else {
        alert("Please input a positive number");
        document.getElementById("txtNum").value = "";
    }
}

btn1.addEventListener("click", insertNumber);

document.getElementById("txtNum").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        insertNumber();
    }
});

btn2.addEventListener("click", () => {
    document.getElementById("txtNum").value = "";
});

btn3.addEventListener("click", () => {
    numbersArr = [];
    total = 0;

    // Reset the table and hide all the extra buttons
    while (tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }

    // Hide the extra buttons when cleared
    btn4.style.display = "none";
    btnHighLow.style.display = "none";
    sortLabel.style.display = "none"; // Hide "Sort by" label
    sortOption.style.display = "none"; // Hide the dropdown as well
});

btn4.addEventListener("click", () => {
    const trTotal = document.createElement("tr");
    const tdTotalLabel = document.createElement("td");
    const tdTotalValue = document.createElement("td");

    trTotal.style.height = "30px";

    tdTotalLabel.style.fontWeight = "bold";
    tdTotalLabel.innerHTML = "TOTAL";

    tdTotalValue.style.textDecoration = "underline";
    tdTotalValue.innerHTML = total;

    trTotal.appendChild(tdTotalLabel);
    trTotal.appendChild(tdTotalValue);
    tbl.appendChild(trTotal);

    // Log the total value
    console.log(total);
    console.log(`Total: ${total}`);
});

function deleteNumber(i) {
    numbersArr.splice(i, 1);
    iterateNumbers();
}

function editNumber(i) {
    const editTxt = prompt("Enter new number: ", numbersArr[i]);
    const regex = /^[0-9]+$/; // regular expression for checking valid positive number values.

    if (editTxt == null || editTxt == "") {
        alert("You did not input a new value!");
    } else {
        if (editTxt.match(regex)) {
            numbersArr[i] = parseInt(editTxt);
            iterateNumbers();
        } else {
            alert("You did not input a valid number!");
        }
    }
}

function iterateNumbers() {
    // Reset all trs
    while (tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }

    if (numbersArr.length > 0) {
        total = 0;

        // Loop for iterating numbers from the array in a table
        numbersArr.forEach((num, i) => {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const btnDelete = document.createElement("button");
            const btnEdit = document.createElement("button");

            td1.style.width = "70px";
            td1.innerHTML = num;

            td2.style.width = "70px";
            td2.innerHTML = num % 2 === 0 ? "EVEN" : "ODD";
            td2.style.color = num % 2 === 0 ? "green" : "blue";

            btnDelete.setAttribute("onclick", `deleteNumber(${i})`);
            btnDelete.innerHTML = "Remove";

            btnEdit.setAttribute("onclick", `editNumber(${i})`);
            btnEdit.innerHTML = "Edit";

            td3.appendChild(btnDelete);
            td4.appendChild(btnEdit);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            tbl.appendChild(tr);

            total += num;

            // Log each number and updated total
            console.log(num);
            console.log(`Total: ${total}`);
        });

        // Show buttons only when numbers exist
        btn4.style.display = "inline";
        btnHighLow.style.display = "inline";
        btn3.style.display = "inline"; // Ensure the Clear Items button is visible
        sortLabel.style.display = "inline"; // Show "Sort by" label
        sortOption.style.display = "inline"; // Show the dropdown
    } else {
        total = 0;
        // Hide buttons when no numbers exist
        btn4.style.display = "none";
        btnHighLow.style.display = "none";
        btn3.style.display = "none"; // Hide Clear Items button
        sortLabel.style.display = "none"; // Hide "Sort by" label
        sortOption.style.display = "none"; // Hide the dropdown
    }
}

// Sort numbers (ascending or descending)
function sortNumbers() {
    const sortOptionValue = sortOption.value;
    if (sortOptionValue === "asc") {
        numbersArr.sort((a, b) => a - b);
    } else if (sortOptionValue === "desc") {
        numbersArr.sort((a, b) => b - a);
    }
    iterateNumbers();
}

// Get Highest to Lowest Values and Sort
btnHighLow.addEventListener("click", () => {
    if (numbersArr.length > 0) {
        // Sort the numbers in descending order (Highest to Lowest)
        const sortedNumbers = [...numbersArr].sort((a, b) => b - a); // Sort in descending order
        const highest = sortedNumbers[0];
        const lowest = sortedNumbers[sortedNumbers.length - 1];

        // Create two rows for displaying the Highest and Lowest values
        const trHighest = document.createElement("tr");
        const tdHighestLabel = document.createElement("td");
        const tdHighestValue = document.createElement("td");

        trHighest.style.height = "30px";

        tdHighestLabel.style.fontWeight = "bold";
        tdHighestLabel.innerHTML = "Highest";

        tdHighestValue.innerHTML = ` ${highest}`; // Update the format

        trHighest.appendChild(tdHighestLabel);
        trHighest.appendChild(tdHighestValue);
        tbl.appendChild(trHighest);

        const trLowest = document.createElement("tr");
        const tdLowestLabel = document.createElement("td");
        const tdLowestValue = document.createElement("td");

        trLowest.style.height = "30px";

        tdLowestLabel.style.fontWeight = "bold";
        tdLowestLabel.innerHTML = "Lowest";

        tdLowestValue.innerHTML = ` ${lowest}`; // Update the format

        trLowest.appendChild(tdLowestLabel);
        trLowest.appendChild(tdLowestValue);
        tbl.appendChild(trLowest);
    } else {
        alert("No numbers to find highest or lowest.");
    }
});
