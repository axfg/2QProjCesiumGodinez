let rows = 0;
let allocations = [];
let allocationTotal = 0;

// Did I just copy code from the previous webpage and modify it for this webpage? Yes, I did!

function toNum(string) {
	// Wow, so tiny. Should this even be in a function?
	// I didn't even bother to delete this last comment, but I took the time to write this comment?
	return string*1;
}

function changeAllocation() {
	// This should be called updateAllocation().
	let v = allocations.length;
	let t = 0;
	for(let i = 0; i < v; i++) {
		const a = toNum(document.getElementById("i" + i).value);
		if((a < 0) || (a == NaN)) {
			a = 0;
		}
		else {
		}
		allocations[i] = a;
		t += allocations[i];
	}
	for(let i = 0; i < v; i++) {
		document.getElementById("s" + i).innerHTML = ((allocations[i] / t) * 100).toFixed(2);
		document.getElementById("i" + i).value = allocations[i];
	}
	document.getElementById("total").innerHTML = t;
}

function addRow() {
	const r = document.createElement("tr");
	
	const c1 = document.createElement("td");
	const inputBox = document.createElement("input");
	inputBox.value = "New Category " + (rows + 1);
	c1.appendChild(inputBox);
	r.appendChild(c1);
	
	const c2 = document.createElement("td");
	c2.style.padding = "0 50px";
	
	const inp = document.createElement("input");
	inp.type = "number";
	inp.min = 0;
	inp.value = "0";
	allocations[rows] = 0;
	inp.id = "i" + rows;
	inp.style.width = "100px";
	c2.appendChild(inp);
	
	r.appendChild(c2);
	
	const c3 = document.createElement("td");
	
	const output = document.createElement("span")
	output.innerHTML = 0;
	output.id = "s" + rows;
	c3.appendChild(output);
	
	r.appendChild(c3);
	
	const table = document.getElementById("main");
	table.appendChild(r);
	
	document.getElementById("i"+rows).addEventListener("input", function () {changeAllocation();}); // I don't understand this.
	
	rows++;
}

function deleteRow() {
	if(rows) {
		allocationTotal -= allocations[rows - 1];
		allocations.pop();
		
		rows--;
		changeAllocation();
		
		const r = document.getElementsByTagName("tr");
		r[r.length-1].remove();
	}
	else {
		alert("You can't delete any more rows!")
	}
}

document.getElementById("total").innerHTML = 0;