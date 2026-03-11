let transactions = JSON.parse(localStorage.getItem("transactions")) || []

function addTransaction() {
    let item = document.getElementById("item").value
    let qty = parseInt(document.getElementById("quantity").value)
    let cost = parseFloat(document.getElementById("cost").value)
    let price = parseFloat(document.getElementById("price").value)
    let type = document.getElementById("type").value

    if (!item || !qty || !cost || !price) return alert("Please fill all fields!")

    let transaction = {
        date: new Date().toLocaleDateString(),
        item,
        qty,
        cost,
        price,
        type
    }

    transactions.push(transaction)
    localStorage.setItem("transactions", JSON.stringify(transactions))
    render()
    document.querySelector(".form").reset()
}

function render() {
    let log = document.getElementById("log")
    log.innerHTML = ""

    let purchases = 0
    let sales = 0

    transactions.forEach(t => {
        let row = document.createElement("tr")
        row.innerHTML = `
            <td>${t.date}</td>
            <td>${t.item}</td>
            <td>${t.qty}</td>
            <td>${t.cost.toFixed(2)}</td>
            <td>${t.price.toFixed(2)}</td>
            <td>${t.type}</td>
        `
        row.classList.add("fade-in")
        log.appendChild(row)

        if (t.type === "purchase") purchases += t.cost * t.qty
        if (t.type === "sale") sales += t.price * t.qty
    })

    document.getElementById("totalPurchases").innerText = purchases.toFixed(2)
    document.getElementById("totalSales").innerText = sales.toFixed(2)
    document.getElementById("profit").innerText = (sales - purchases).toFixed(2)
}

// Initial render
render()
