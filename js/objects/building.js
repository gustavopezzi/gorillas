define(
	['objects/shape'],

	function (Shape) {
		function Building(context, canvasHeight) {
			this.context = context;
			this.canvas = document.getElementById('canvas');
			this.width = 37 + Math.floor(Math.random() * 70);
			this.baseHeight = 80;
			this.baseLine = 335;
			this.spacing = 1;
			this.windowHeight = 7;
			this.windowWidth = 4;
			this.buildingColors = ['rgb(173, 170, 173)', 'rgb(0, 170, 173)', 'rgb(173, 0, 0)'];
			this.buildingColor = null;
			this.windows = [];
			this.colissions = [];
		}

		Building.prototype.positionAtX = function () {
			return this.x;
		};

		Building.prototype.positionAtY = function () {
			return this.canvas.height - this.height;
		};

		Building.prototype.endPosition = function () {
			return this.positionAtX() + this.width + this.spacing;
		};

		Building.prototype.middlePosition = function () {
			return this.positionAtX() + (this.endPosition() - this.positionAtX()) / 2;
		};

		Building.prototype.create = function (x, y) {
			this.x = x;
			this.y = y;
			this.buildingColor = this.buildingColor || this.buildingColors[Math.floor(Math.random() * (3 - 0) + 0)];
			this.context.fillStyle = this.buildingColor;
			this.height = this.baseHeight + y;
			this.context.fillRect(this.positionAtX(), this.baseLine - this.height, this.width, this.height);
			this.createWindows(this.positionAtX(), this.positionAtY());
		};

		Building.prototype.reCreate = function () {
			this.create(this.x, this.y);
		};

		Building.prototype.createWindows = function (x, y) {
			var rows, windowsPerFloor, currentDistance, totalHeight, results, w, winLength, winRef, i;

			if (this.windows.length > 0) {
				winRef = this.windows;
				for (i = 0, winLength = winRef.length; i < winLength; i++) {
					w = winRef[i];
					this.createWindow(w[0], w[1], w[2]);
				}
				return;
			}

			rows = Math.round(this.width + this.windowWidth);
			windowsPerFloor = Math.floor(this.width / this.windowWidth + this.windowHeight);

			for (var row = 3; row < Math.floor(this.width - 11 + this.windowWidth); row += 11) {
				for (var column = 3; column < Math.floor(this.height - 15); column += 15) {
					this.color = (Math.floor(Math.random() * 5) > 0) ? 'rgb(255, 255, 82)' : 'rgb(82, 85, 82)';
					this.createWindow(x + 1 + row, Math.floor((this.baseLine - this.height) + 1 + column), this.color);
					this.windows.push([x + 1 + row, Math.floor((this.baseLine - this.height) + 1 + column), this.color]);
				}
			}
		};

		Building.prototype.createWindow = function (x, y, color) {
			this.context.fillStyle = color;
			this.context.fillRect(x, y, this.windowWidth, this.windowHeight);
		};

		Building.prototype.checkColission = function (x, y) {
			if (this.positionAtY() - 25 <= y && (x > this.x && x < this.x + this.width + 10)) {
				this.colissions.push([x - 20, y]);
				this.createColission(x - 20, y);
				return true;
			}
			return false;
		};

		Building.prototype.createColission = function (x, y) {
			var width = 25;
			var height = 15;
			this.context.fillStyle = 'rgb(0, 0, 160)';
			var shape = new Shape(this.context);
			shape.ellipse(x, y, width, height);
		};

		Building.prototype.reCreateColissions = function () {
			if (this.colissions.length > 0) {
				for (var i = 0; i < this.colissions.length; i++) {
					var colission = this.colissions[i];
					this.createColission(colission[0], colission[1]);
				}
			}
		};

		return Building;
	}
);