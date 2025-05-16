// ==============================
// 🌱 Sélection des éléments
// ==============================

const btn = document.querySelector("button");
const nom = document.querySelector(".nom");
const price = document.querySelector(".price");
const quantity = document.querySelector(".quantity");
const error = document.querySelector(".error");
const list = document.querySelector(".list");
const total = document.querySelector(".total");

// ==============================
// 🌍 Variables globales
// ==============================

const tabCommande = [];

class commande {
	constructor(name, price, quantity) {
		this.name = name;
		this.price = price;
		this.quantity = quantity;
		this.tot = this.totalPrice();
	}
	totalPrice() {
		return(parseFloat(this.price * this.quantity));
	}
	display() {
		return(`${this.quantity}x ${this.name} - Total ${this.tot.toFixed(2)}€`);
	}
}

let timeout;

// ==============================
// 🎊 Fonctionnalités
// ==============================

function print(commande, index) {
	const div = document.createElement("div");
	div.innerHTML = `${commande.display()} <button data-index="${index}" class="delete">❌</button>`;
	list.append(div);
}

function changeTot() {
	let tmp = 0;
	tabCommande.forEach((commande) => {
		tmp += commande.tot;
	});
	total.innerHTML = `Total: ${tmp.toFixed(2)}€`;
}

function resetValue() {
	nom.value = "";
	price.value = "";
	quantity.value = "";
	nom.select();
}

function printAll() {
	list.innerHTML = '';
	let i = 0;
	tabCommande.forEach((commande) => {
		print(commande, i++);
	});
}

function printEmpty() {
	list.innerHTML = "<div>(☞ﾟヮﾟ)☞ le panier est vide ☜(ﾟヮﾟ☜)</div>"
}

// ==============================
// 🧲 Événements
// ==============================

printEmpty();

btn.addEventListener("click", (e) => {
	e.preventDefault();
    clearTimeout(timeout);
	error.innerHTML = '';
	if (nom.value && price.value && quantity.value){
		if(tabCommande.length == 0){
			list.innerHTML="";
		}
		tabCommande.push(new commande(nom.value, price.value, quantity.value));
		console.log(tabCommande)
		print(tabCommande[tabCommande.length-1], tabCommande.length-1);
		changeTot();
	}
	else {
		error.innerHTML = `commande incomplète`;
    	timeout = setTimeout(`error.innerHTML = ""`, 3000);
	}
	resetValue();
})

list.addEventListener("click", (e) => {
	e.preventDefault();
	if (e.target.matches("button.delete")) {
		let index = e.target.dataset.index;
		tabCommande.splice(index, 1);
		printAll();
		changeTot();
		if (tabCommande.length == 0 ){
			printEmpty()
		}
	}
})
