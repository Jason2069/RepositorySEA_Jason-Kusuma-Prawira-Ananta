let balance = localStorage.getItem("balance") || 500000;

function formatCurrency(amount) {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

function updateBalanceDisplay() {
  const balanceValue = document.getElementById("balance-value");
  const formattedBalance = formatCurrency(balance);
  balanceValue.textContent = formattedBalance;
}

function topUp(amount) {
  if (amount > 0) {
    balance += amount;
    updateBalanceDisplay();
    console.log(`Successfully topped up ${amount}. New balance: ${balance}`);
  } else {
    console.log("Invalid amount. Please enter a positive number.");
  }
}

function topUpBalance() {
  const topUpAmountInput = document.getElementById("top-up-amount");
  const amount = parseInt(topUpAmountInput.value);

  if (isNaN(amount) || amount <= 0) {
    console.log("Invalid amount. Please enter a valid positive number.");
    return;
  }

  topUpAmountInput.value = ""; // Clear the input field after reading the value
  topUp(amount);
}


function deductBalance(amount) {
  if (amount > 0) {
    balance -= amount;
    updateBalanceDisplay();
    console.log(`Successfully deducted ${amount}. New balance: ${balance}`);
  } else {
    console.log("Invalid amount. Please enter a positive number.");
  }
}

function displayAfterTransactionBalance(amount) {
  const afterTransactionBalance = document.getElementById(
    "after-transaction-balance"
  );
  const formattedBalance = formatCurrency(balance - amount);
  afterTransactionBalance.textContent = formattedBalance;
}

// Menyimpan nilai saldo ke local storage setelah setiap transaksi
function saveBalanceToLocalStorage() {
  localStorage.setItem("balance", balance);
}

// Mengosongkan local storage dan mengatur ulang balance ke 500000
function resetLocalStorage() {
  localStorage.removeItem("balance");
  balance = 500000;
  updateBalanceDisplay();
}

updateBalanceDisplay();

// Mendaftarkan event listener untuk menyimpan saldo ke local storage saat halaman ditutup atau ditinggalkan
window.addEventListener("beforeunload", saveBalanceToLocalStorage);

// Tambahkan tombol Reset
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetLocalStorage);
