document.getElementById('sign-btn').addEventListener('click', function () {

	const userInput = document.getElementById('user-input');
	const userValue = userInput.value;

	const passInput = document.getElementById('user-password');
	const passValue = passInput.value;

	if (userValue == "admin" && passValue == "admin123") {

		window.location.assign("home.html")
	}
	else {
		alert('failed')
		return;
	}
})