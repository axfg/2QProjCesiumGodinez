let principal = 0;
let intRate = 0;
let periods = 0;
let complex = false;

function update(p,r,t,type) {
	let a = 1;
	if(type == false) {
		a = a * ((100 + r*t)/100);
	}
	else {
		for(let i = 0; i < t; i++) {
			/*
			Why multiply everything by 10?
			Well, if we used the simplest form of the equation, the result would be multiplied by 10 for every loop.
			I don't know why.
			*/
			a = (1000 + 10*r) * a / 1000;
		}
	}
	a *= p;
	document.getElementById("newBal").innerHTML = a.toFixed(2);
	document.getElementById("addInt").innerHTML = (a - p).toFixed(2);
}

/*
Feel free to comment on the inconsistency of the implementation of inputs.
I know it's hard to read. I was lazy.
*/

function chooseSimple() {
	document.getElementById("simple").style.backgroundColor = "cyan";
	document.getElementById("simple").style.fontWeight = "bold";
	document.getElementById("complex").style.backgroundColor = "";
	document.getElementById("complex").style.fontWeight = "";
	complex = false;
	update(principal, intRate, periods, complex);
}

function chooseComplex() {
	document.getElementById("complex").style.backgroundColor = "cyan";
	document.getElementById("complex").style.fontWeight = "bold";
	document.getElementById("simple").style.backgroundColor = "";
	document.getElementById("simple").style.fontWeight = "";
	complex = true;
	update(principal, intRate, periods, complex);
}

document.getElementById("principal").addEventListener("input", function() { principal = document.getElementById("principal").value; update(principal, intRate, periods, complex);})
document.getElementById("intRate").addEventListener("input", function() { intRate = document.getElementById("intRate").value; update(principal, intRate, periods, complex);})
document.getElementById("periods").addEventListener("input", function() { periods = document.getElementById("periods").value; update(principal, intRate, periods, complex);})

document.getElementById("newBal").innerHTML = 0;
document.getElementById("addInt").innerHTML = 0;