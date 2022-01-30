let budget = 100;
let rows = 0;
let allocations = [];
let allocationTotal = 0;

// Heavily unoptimized code, but hey, it works!

function toNum(string) {
	// Wow, so tiny. Should this even be in a function?
	return string*1;
}

function switchToTool() {
	budget = document.getElementById("budgetSetter").value;
	
	if(budget > 0) {
		document.getElementById("intro").style.display = "none";
		document.getElementById("tool").style.display = "block";
		document.getElementById("budget").innerHTML = budget;
		document.getElementById("allocated").innerHTML = 0;
		document.getElementById("remaining").innerHTML = budget;
		document.getElementById("allocatedPercentage").innerHTML = 0;
		document.getElementById("remainingPercentage").innerHTML = 100;
	}
	else {
		alert("Hey, you didn't put anything!");
	}
}

function changeAllocation() {
	let r = allocations.length;
	let limiter = budget;
	for(let i = 0; i < r; i++) {
		const a = toNum(document.getElementById(i).value);
		if(a < 0) {
			allocations[i] = 0;
		}
		else {
			if(a - allocations[i] + allocationTotal <= budget) {
				allocations[i] = a;
			}
			else {
				document.getElementById(i).value = allocations[i];
			}
		}
		limiter = limiter - allocations[i];
	}
	for(let i = 0; i < r; i++) {
		let k = allocations[i] + limiter;
		document.getElementById(i).max = k;
	}
	document.getElementById("remaining").innerHTML = limiter.toFixed(2);
	document.getElementById("remainingPercentage").innerHTML = (100 - (limiter * 100) / budget).toFixed(2);
	allocationTotal = budget - limiter;
	document.getElementById("allocated").innerHTML = allocationTotal.toFixed(2);
	document.getElementById("allocatedPercentage").innerHTML = ((allocationTotal * 100) / budget).toFixed(2);
}

function addRow() {
	const t = rows; // this may be unneccesary
	
	const r = document.createElement("tr")
	
	const c1 = document.createElement("td");
	const inputBox = document.createElement("input");
	inputBox.value = "New Category " + (t + 1);
	c1.appendChild(inputBox);
	r.appendChild(c1);
	
	const c2 = document.createElement("td");
	c2.style.padding = "0 50px";
	
	const inp = document.createElement("input");
	inp.type = "number";
	inp.min = 0;
	inp.value = "0";
	allocations[t] = 0;
	inp.id = t;
	let g = budget - allocationTotal;
	inp.max = g;
	inp.style.width = "100px";
	c2.appendChild(inp);
	
	r.appendChild(c2);
	
	const table = document.getElementById("main");
	table.appendChild(r);
	
	document.getElementById(t).addEventListener("input", function () {changeAllocation();}); // I don't understand this.
	
	rows++;
}

function deleteRow() {
	if(rows) {
		allocationTotal -= allocations[rows - 1];
		allocations.pop();
		document.getElementById("allocated").innerHTML = allocationTotal.toFixed(2);
		document.getElementById("allocatedPercentage").innerHTML = ((allocationTotal * 100) / budget).toFixed(2);
		document.getElementById("remaining").innerHTML = (budget - allocationTotal).toFixed(2);
		document.getElementById("remainingPercentage").innerHTML = (100 - (allocationTotal * 100) / budget).toFixed(2);
		
		const r = document.getElementsByTagName("tr");
		r[r.length-1].remove();
		rows--;
	}
	else {
		alert("You can't delete any more rows!")
	}
}

