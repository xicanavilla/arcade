// Enemies our player must avoid
const Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/enemy-bug.png';
  this.speed = speed;
  this.step = 101;
  this.boundary = this.step * 5;
  this.resetPos = -this.step;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(this.x < this.boundary) {
      //move forward
      //increment x by speed * dt
      this.x += this.speed * dt;
    }
    else {
      this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Hero {
  constructor() {
    this.step = 101;
    this.jump = 83;
    this.startX = this.step * 2;
    this.startY = (this.jump * 5) - 15;
    this.x = this.startX;
    this.y = this.startY;
    this.sprite = 'images/char-boy.png';
    this.victory = false;
  }

  //draw hero sprite on x and y coordinates
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  //updates position of the player according to input
  handleInput(input) {
    switch(input) {
      case 'left':
        if (this.x > 0){
          this.x -= this.step;
        }
        break;
      case 'up':
        if (this.y > 0) {
            this.y -= this.jump;
        }
        break;
      case 'right':
        if (this.x < this.step * 4) {
            this.x += this.step;
        }
        break;
      case 'down':
        if (this.y < this.jump * 4) {
            this.y += this.jump;
        }
        break;
    }
  }

  update() {
    //check collision
    for(let enemy of allEnemies) {
      //check if player and enemy collide
      if (this.y === enemy.y && (enemy.x + enemy.step/1.45 > this.x && enemy.x < this.x + this.step/1.45)) {
        this.reset();
      }
    }
    //check win here
    if(this.y === -15) {
      this.victory = true;
    }
  }

  //reset hero to start location
  reset() {
    this.x = this.startX;
    this.y = this.startY;
  }

}

//initialize a new Hero object
const player = new Hero();
const allEnemies = [
  new Enemy(this.resetPos, 68, 200),
  new Enemy(this.resetPos, 151, 325),
  new Enemy(this.resetPos, 234, 300)
];

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
