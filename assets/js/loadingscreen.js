var enter = function() {
	var door = document.querySelector('#jamb');
	var newdoor = door.cloneNode(true);
	document.querySelector('#door').classList.add('open');
	document.querySelector('#jamb').classList.add('spread');
	setTimeout(function() {
			door.remove();
			document.body.appendChild(newdoor);
	}, 500)
}
