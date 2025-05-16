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

// ==============================
// 🎊 Fonctionnalités
// ==============================

function print(commande) {
	const div = document.createElement("div");
	div.innerHTML = commande.display();
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
}

// ==============================
// 🧲 Événements
// ==============================

btn.addEventListener("click", (e) => {
	e.preventDefault();
	error.innerHTML = '';
	if (nom.value && price.value && quantity.value){
		tabCommande.push(new commande(nom.value, price.value, quantity.value));
		print(tabCommande[tabCommande.length-1]);
		changeTot();
	}
	else {
		error.innerHTML = `commande incomplète`;
	}
	resetValue();
})
