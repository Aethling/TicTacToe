var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	displayXorO: function(entry) {
		var letter = entry.charAt(0);
		var cell = document.getElementById(letter);
		if (entry.charAt(1) === "x") {
			cell.setAttribute("class", "X");
			cell.innerHTML = "X";
	  } else if (entry.charAt(1) === "o") {
			cell.setAttribute("class", "O");
			cell.innerHTML = "O";
	  } else {
	  		view.displayMessage("That is not an X or an O, moron.");
	  }

	},
};

var model = {
	storage: [{ locations: ["a", "b", "c"], hits: "" },
			  {	locations: ["d", "e", "f"], hits: "" },
			  { locations: ["g", "h", "i"], hits: "" },
			  { locations: ["a", "d", "g"], hits: "" },
			  { locations: ["b", "e", "h"], hits: "" },
			  { locations: ["c", "f", "i"], hits: "" },
			  { locations: ["a", "e", "i"], hits: "" },
			  { locations: ["c", "e", "g"], hits: "" }],

	storeHit: function(entry) {
		var letter = entry.charAt(0);
		var XorO = entry.charAt(1);
		if (/[a-i]/.test(letter)) {
			for (var i = 0; i < 8; i++) {
				var store = this.storage[i];
				var locations = store.locations;
				var index = locations.indexOf(letter);
				if (index >= 0) {
					store.hits += XorO;
					this.checkEnd();
				}
		}
		} else {
			view.displayMessage("That is not a valid letter, idiot.")
		}

	},

	checkEnd: function() {
		for (var i = 0; i < 8; i++) {
			var store = this.storage[i];
			var hits = store.hits;
			if (/xxx/gi.test(hits)) {
				view.displayMessage("X wins! Game Over.");
			} else if (/ooo/gi.test(hits)) {
				view.displayMessage("O wins! Game Over.");
			}
	}
}
}

function init() {
	var enterButton = document.getElementById("enterButton");
	enterButton.onclick = handleEnterButton;
	var guessInput = document.getElementById("inputLetter");
	guessInput.onkeypress = handleKeyPress;
}
// this handles the users input and gives it to storeHit and displayXorO
function handleEnterButton() {
		var entryInput = document.getElementById("inputLetter");
		var entry = inputLetter.value;
		model.storeHit(entry);
		view.displayXorO(entry);
		inputLetter.value = "";
}

function handleKeyPress(e) {
	var enterButton = document.getElementById("enterButton");
	if (e.keyCode === 13) {
		enterButton.click();
		return false;
	}
}
window.onload = init;




