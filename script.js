function draw()
{
    const textArea = document.getElementById("names");
    const quantity = document.getElementById("quantity");
    const winners = document.getElementById("winners");
    
    const names = textArea.value.split("\n").map(n => n.trim()).filter(n => n !== "");

    if (names.length == 0)
    {
        winners.textContent = "There are no participants";
        winners.style.display = "block";
        return;
    }

    if (quantity.value <= 0)
    {
        winners.textContent = "There are no prizes";
        winners.style.display = "block";
        return;
    }

    if (quantity.value > names.length)
    {
        winners.textContent = "There are more prizes than participants";
        winners.style.display = "block";
        return;
    }
    
    const selected = [];

    for (let i = 0; i < quantity.value; i++)
    {
        const randomIndex = Math.floor(Math.random() * names.length);
        selected.push(names[randomIndex]);
        names.splice(randomIndex, 1)
    }
    
    if (selected.length == 1)
    {
        winners.textContent = `The winner is ${selected[0]}`;
    } else {
        const lastWinner = selected.pop();
        winners.textContent = `The winners are: ${selected.join(", ")} and ${lastWinner}`;
    }

    winners.style.display = "block";
}
