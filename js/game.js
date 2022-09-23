const height = 600;
const width = 800;
const topMax = height - 100;
const leftMax = width - 100;

let gameOver = false;

const randomPlace = (max) => {
  return Math.round(Math.random() * (max / 100)) * 100;
};

const body = document.querySelector("body");
const heroDiv = document.querySelector(".hero");
heroDiv.style.top = "500px";
heroDiv.style.left = "100px";

const ghostDiv = document.querySelector(".ghost");
ghostDiv.style.top = "200px";
ghostDiv.style.left = "600px";

const treasure = document.querySelector(".treasure");
treasure.style.top = `${randomPlace(topMax)}px`;
treasure.style.left = `${randomPlace(leftMax)}px`;

let listener = window.addEventListener("keydown", (e) => {
  if (!gameOver) {
    if (e.key === "ArrowUp") {
      hero.moveUp;
    }
    if (e.key === "ArrowDown") {
      hero.moveDown;
    }
    if (e.key === "ArrowLeft") {
      hero.moveLeft;
    }
    if (e.key === "ArrowRight") {
      hero.moveRight;
    }
    if (e.key === "Escape") {
      endGame();
    }
  }
});

class character {
  constructor(speed, coordinates, div) {
    this.coordinates = coordinates;
    this.div = div;
    this.speed = speed;
  }

  get moveLeft() {
    return this.move([
      [-100, 0],
      [-this.speed, 0],
    ]);
  }
  get moveRight() {
    return this.move([
      [100, 0],
      [this.speed, 0],
    ]);
  }
  get moveUp() {
    return this.move([
      [0, -100],
      [0, -this.speed],
    ]);
  }
  get moveDown() {
    return this.move([
      [0, 100],
      [0, this.speed],
    ]);
  }

  move(mode) {
    if (
      this.coordinates[0] % 100 === 0 &&
      this.coordinates[1] % 100 === 0 &&
      this.coordinates[0] + mode[0][0] <= leftMax &&
      this.coordinates[0] + mode[0][0] >= 0 &&
      this.coordinates[1] + mode[0][1] <= topMax &&
      this.coordinates[1] + mode[0][1] >= 0
    ) {
      let newX = this.coordinates[0] + mode[0][0];
      let newY = this.coordinates[1] + mode[0][1];

      let movement = setInterval(() => {
        this.div.style.left = `${(this.coordinates[0] += mode[1][0])}px`;
        this.div.style.top = `${(this.coordinates[1] += mode[1][1])}px`;

        if (this.coordinates[0] == newX && this.coordinates[1] == newY) {
          if (
            heroDiv.style.top === treasure.style.top &&
            heroDiv.style.left === treasure.style.left
          ) {
            body.style.backgroundColor = "green";
            endGame();
          }
          if (
            heroDiv.style.top === ghostDiv.style.top &&
            heroDiv.style.left === ghostDiv.style.left
          ) {
            body.style.backgroundColor = "red";
            endGame();
          }

          clearInterval(movement);
        }
      }, 10/this.speed);
    }

    return this.coordinates;
  }
}

const hero = new character(1, [100, 500], heroDiv);
const ghost = new character(2, [600, 200], ghostDiv);

let count = 0;
let playGame = setInterval(game, 800);

function game() {
  if (count % 100 == 0) {
    console.log(count / 100);
  }
  count++;

  ghostMovement();
}

function ghostMovement() {
  const moveY = () => {
    ghostDiv.style.top > heroDiv.style.top ? ghost.moveUp : ghost.moveDown;
  };
  const moveX = () => {
    ghostDiv.style.left > heroDiv.style.left ? ghost.moveLeft : ghost.moveRight;
  };

  if (ghostDiv.style.top !== heroDiv.style.top) {
    moveY();
    
  }
  if (ghostDiv.style.left !== heroDiv.style.left) {
    moveX();
  }
}

function endGame() {
  gameOver = true;
  clearInterval(playGame);
}
