const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
var snake;

(function setup() {
  alert(
    "Welcome to Snaky!\nYou need internet for this game else your high score won't be saved!!"
  );

  if (!localStorage.getItem('username')) {
    var username = prompt('Please enter your name:');

    localStorage.setItem('username', username);

    alert(`${username}! Let's Play Snaky!!!`);
  }

  snake = new Snake();
  fruit = new Fruit();
  fruit.pickLocation();

  window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw();
    snake.update();
    snake.draw();

    if (snake.eat(fruit)) {
      fruit.pickLocation();
    }

    snake.checkCollision();
    document.querySelector('.score').innerText = snake.total;
  }, 250);
})();

window.addEventListener('keydown', (evt) => {
  const direction = evt.key;
  snake.changeDirection(direction);
});
