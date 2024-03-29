requirejs(
	['app/app'],

	function (App) {
		var app, p1angle, p1velocity, p2angle, p2velocity;

		app = new App();
		app.createScene();

		// player 1
		p1angle = document.getElementById('player_1_angle');
		p1velocity = document.getElementById('player_1_velocity');

		// player 2
		p2angle = document.getElementById('player_2_angle');
		p2velocity = document.getElementById('player_2_velocity');

		p1angle.addEventListener("keydown", function (event) {
			if (event.keyCode === 13) {
				app.clearTimeouts();
				window.showPlayerField('player_1', 'velocity');
			}
		});

		p1velocity.addEventListener("keydown", function (event) {
			if (event.keyCode === 13) {
				window.hidePlayerField('player_1', 'angle');
				window.hidePlayerField('player_1', 'velocity');
				var parameters = window.readAngleAndVelocity('player_1');
				window.clearFields('player_1');
				app.throwBanana(parseInt(parameters.velocity), parseInt(parameters.angle), 1);
			}
		});

		p2angle.addEventListener("keydown", function (event) {
			if (event.keyCode === 13) {
				app.clearTimeouts();
				window.showPlayerField('player_2', 'velocity');
			}
		});

		p2velocity.addEventListener("keydown", function (event) {
			if (event.keyCode === 13) {
				window.hidePlayerField('player_2', 'angle');
				window.hidePlayerField('player_2', 'velocity');
				var parameters = window.readAngleAndVelocity('player_2');
				window.clearFields('player_2');
				app.throwBanana(parseInt(parameters.velocity), parseInt(parameters.angle), 2);
			}
		});

		p1angle.style.display = 'block';
		p1angle.previousElementSibling.style.display = 'block';
		p1angle.focus();

		p2angle.style.display = 'none';
		p2angle.previousElementSibling.style.display = 'none';
		p2velocity.style.display = 'none';
		p2velocity.previousElementSibling.style.display = 'none';

		window.hidePlayerField = function (player, field) {
			var el = document.getElementById(player + '_' + field);
			el.style.display = "none";
			el.previousElementSibling.style.display = "none";
		}

		window.showPlayerField = function (player, field) {
			var el = document.getElementById(player + '_' + field);
			el.style.display = "block";
			el.previousElementSibling.style.display = "block";
			el.focus();
		}

		window.readAngleAndVelocity = function (player) {
			return {
				angle: document.getElementById(player + '_angle').value,
				velocity: document.getElementById(player + '_velocity').value
			};
		}

		window.clearFields = function (player) {
			document.getElementById(player + '_angle').value = '';
			document.getElementById(player + '_velocity').value = '';
		}
	}
);