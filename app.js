let transactions = JSON.parse(localStorage.getItem("transactions")) || []

function addTransaction(){

let item = document.getElementById("item").value
let qty = parseInt(document.getElementById("quantity").value)
let cost = parseFloat(document.getElementById("cost").value)
let price = parseFloat(document.getElementById("price").value)
let type = document.getElementById("type").value

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
}

function render(){

let log = document.getElementById("log")
log.innerHTML = ""

let purchases = 0
let sales = 0

transactions.forEach(t=>{

let row = `
<tr>
<td>${t.date}</td>
<td>${t.item}</td>
<td>${t.qty}</td>
<td>${t.cost}</td>
<td>${t.price}</td>
<td>${t.type}</td>
</tr>
`

log.innerHTML += row

if(t.type === "purchase"){
purchases += t.cost * t.qty
}

if(t.type === "sale"){
sales += t.price * t.qty
}

})

document.getElementById("totalPurchases").innerText = purchases
document.getElementById("totalSales").innerText = sales
document.getElementById("profit").innerText = sales - purchases
}

render()
