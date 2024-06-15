document.getElementById("payInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        var calculateButton = document.getElementById("calculateBtn");
        if (!calculateButton.disabled) {
            calculateTakeHome();
        }
    }
});

function calculateTakeHome() {
    const payInput = document.getElementById("payInput");
    const fixedPay = parseFloat(payInput.value.replace(/[^0-9.]/g, ''));
    const grossPay = fixedPay / (1 + 0.06005 + 0.02405);
    const professionalTax = 2500;
    const standardDeduction = 50000;
    const basicPay = grossPay / 2;
    const epf = basicPay * 0.12;
    const taxableIncome = grossPay - (professionalTax + standardDeduction);
    const incomeTax = calculateIncomeTax(taxableIncome);
    const annualTakeHome = grossPay - (professionalTax + epf + incomeTax);
    const monthlyTakeHome = annualTakeHome / 12;
    const formattedMonthlyTakeHome = new Intl.NumberFormat('en-IN', {maximumFractionDigits: 0}).format(monthlyTakeHome);
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Take-Home Salary: <span style="color: #007bff; font-weight: bold;">₹${formattedMonthlyTakeHome}</span>`;
    resultDiv.style.display = 'block';
}

function calculateIncomeTax(income) {
    let tax;

    if (income <= 300000) {
        tax = 0;
    } else if (income <= 600000) {
        tax = 0.05 * (income - 300000);
    } else if (income <= 900000) {
        tax = (0.10 * (income - 600000)) + 15000;
    } else if (income <= 1200000) {
        tax = (0.15 * (income - 900000)) + 45000;
    } else if (income <= 1500000) {
        tax = (0.20 * (income - 1200000)) + 90000;
    } else {
        tax = (0.30 * (income - 1500000)) + 150000;
    }

    const educationCess = 0.04 * tax;
    tax += educationCess;

    return tax;
}

function formatInputAsRupees(inputElement) {
    let value = parseFloat(inputElement.value.replace(/[^0-9.]/g, ''));
    if (isNaN(value)) {
        inputElement.value = '';
        return;
    }

    inputElement.value = new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 0
    }).format(value);
}

function checkInputs() {
    var payInputValue = document.getElementById("payInput").value;

    // Enable the button only if the input has value
    document.getElementById("calculateBtn").disabled = !payInputValue;
}
