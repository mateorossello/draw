function fixQuantity(input) {
    if (input.value === "") return;

    if (!/^\d+$/.test(input.value)) {
        input.value = input.value.replace(/\D/g, "");
        return;
    }

    if (parseInt(input.value) <= 0) {
        input.value = "1";
    }
}

function draw() {
    const textArea = document.getElementById("names");
    let quantityInput = document.getElementById("quantity");
    let quantity = parseInt(quantityInput.value);
    const winners = document.getElementById("winners");
    
    const names = textArea.value.split("\n").map(n => n.trim()).filter(n => n !== "");

    if (names.length == 0) {
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
    
    const selected = [];
    
    for (let i = 0; i < quantity; i++) {
        const randomIndex = Math.floor(Math.random() * names.length);
        selected.push(names[randomIndex]);
        names.splice(randomIndex, 1)
    }
    
    if (selected.length == 1) {
        winners.textContent = `The winner is ${selected[0]}`;
    } else {
        const lastWinner = selected.pop();
        winners.textContent = `The winners are ${selected.join(", ")} and ${lastWinner}`;
    }

    winners.style.display = "block";
}

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
