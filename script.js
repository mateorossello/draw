// Auxiliary Functions

function fixQuantity(input) {
  input.value = input.value.replace(/\D/g, "");

  if (input.value !== "" && parseInt(input.value) <= 0) input.value = "1";
}

function updateParticipantCount() {
  const textArea = document.getElementById("names");
  const count = document.getElementById("participant-count");

  const names = textArea.value
    .split("\n")
    .map((n) => n.trim())
    .filter((n) => n.length > 0);

  count.textContent = `Participants: ${names.length}`;
}

function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

// Button Functions

function draw() {
  const textArea = document.getElementById("names");
  const quantityInput = document.getElementById("quantity");
  const quantity = parseInt(quantityInput.value);
  const winners = document.getElementById("winners");

  const names = textArea.value
    .split("\n")
    .map((n) => n.trim())
    .filter((n) => n.length > 0);

  if (names.length === 0) {
    showError("There are no participants");
    return;
  }

  if (isNaN(quantity) || quantity <= 0) {
    quantityInput.value = "";
    showError("There are no prizes");
    return;
  }

  if (quantity > names.length) {
    showError("There are more prizes than participants");
    return;
  }

  const shuffled = shuffleArray(names);
  const selected = shuffled.slice(0, quantity);

  if (selected.length === 1) {
    winners.textContent = `The winner is ${selected[0]}`;
  } else {
    const lastWinner = selected.pop();
    winners.textContent = `The winners are ${selected.join(", ")} and ${lastWinner}`;
  }

  winners.style.display = "block";
}

function clearAll() {
  document.getElementById("names").value = "";
  document.getElementById("participant-count").textContent = "Participants: 0";
  document.getElementById("quantity").value = "";
  document.getElementById("winners").style.display = "none";
}

// Toast Notification

function showError(message) {
  const container = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Event Listeners

document.getElementById("quantity").addEventListener("input", function () {
  fixQuantity(this);
});

document
  .getElementById("names")
  .addEventListener("input", updateParticipantCount);

document.getElementById("btn-draw").addEventListener("click", draw);
document.getElementById("btn-clear").addEventListener("click", clearAll);
