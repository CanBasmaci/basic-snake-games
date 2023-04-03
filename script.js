var blockSize = 25;
var total_row = 17; //toplam row sayısı
var total_col = 17; //toplam column sayısı
var board;
var context;

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

// Toplam satır ve sütun sayısını
var speedX = 0; // Dikey koordinatında yılanın hızı.
var speedY = 0; // Yatay koordinatında yılanın hızı.

var snakeBody = [];

var foodX;
var foodY;

var gameOver = false;

window.onload = function () {
	// Pano yüksekliği ve genişliği
	board = document.getElementById("board");
	board.height = total_row * blockSize;
	board.width = total_col * blockSize;
	context = board.getContext("2d");

	placeFood();
	document.addEventListener("keyup", changeDirection); //for movements
	// Yılan hızı
	setInterval(update, 1000 / 10);
}

function update() {
	if (gameOver) {
		return;
	}

	// Arkaplan rengi
	context.fillStyle = "black";
	context.fillRect(0, 0, board.width, board.height);

	// Mamasının rengi
	context.fillStyle = "white";
	context.fillRect(foodX, foodY, blockSize, blockSize);

	if (snakeX == foodX && snakeY == foodY) {
		snakeBody.push([foodX, foodY]);
		placeFood();
	}

	// yılan gövdesi büyümesi
	for (let i = snakeBody.length - 1; i > 0; i--) {
		// yılanın önceki kısmını mevcut kısma kaydedecek
		snakeBody[i] = snakeBody[i - 1];
	}
	if (snakeBody.length) {
		snakeBody[0] = [snakeX, snakeY];
	}

	context.fillStyle = "white";
	snakeX += speedX * blockSize; //Yılan konumunun dikey koordinatında güncellenme
	snakeY += speedY * blockSize; //Yılan konumunun yatay koordinatında güncelleme
	context.fillRect(snakeX, snakeY, blockSize, blockSize);
	for (let i = 0; i < snakeBody.length; i++) {
		context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
	}

	if (snakeX < 0
		|| snakeX > total_col * blockSize
		|| snakeY < 0
		|| snakeY > total_row * blockSize) {
		
		// beceremezsen duvara çarparsan çıkan uyarı
		gameOver = true;
		alert("Aga olmadı, yapamıyon yani git yat");
	}

	for (let i = 0; i < snakeBody.length; i++) {
		if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
			
			// Kendini yerse
			gameOver = true;
			alert("Aga olmadı, yapamıyon yani git yat");
		}
	}
}

// Yılan hareketini ekliyoruz --> addEventListener
function changeDirection(e) {
	if (e.code == "ArrowUp" && speedY != 1) {
		// yukarı oka basarsak
		// terse gitmemesi için
		speedX = 0;
		speedY = -1;
	}
	else if (e.code == "ArrowDown" && speedY != -1) {
		//aşağı ok basarsak
		speedX = 0;
		speedY = 1;
	}
	else if (e.code == "ArrowLeft" && speedX != 1) {
		//sol ok basarsak
		speedX = -1;
		speedY = 0;
	}
	else if (e.code == "ArrowRight" && speedX != -1) {
		//sağ ok basarsak
		speedX = 1;
		speedY = 0;
	}
}

// rasgele mama konumu
function placeFood() {

	// dikey konum
	foodX = Math.floor(Math.random() * total_col) * blockSize;
	
	// yatay konum
	foodY = Math.floor(Math.random() * total_row) * blockSize;
}

