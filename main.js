const map_container = document.getElementById("map_container");

let playerX = 0;
let playerY = 0;

let count = 5;

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  console.log(e);
  switch (e.key) {
    case "ArrowUp":
    case "w":
    case "W":
      moveUp();

      break;
    case "ArrowDown":
    case "s":
    case "S":
      moveDown();

      break;
    case "ArrowLeft":
    case "a":
    case "A":
      moveLeft();

      break;
    case "ArrowRight":
    case "d":
    case "D":
      moveRight();

      break;
    default:
      break;
  }
});

function getPlayerPosition() {
  const playerPosition = document.querySelector(".entity-player");

  const player = playerPosition.id.split("/");

  playerX = Number(player[0].split("x")[1]);
  playerY = Number(player[1].split("y")[1]);

  return { playerX, playerY, playerPosition };
}

function makeBoardGame() {
  for (let i = 0; i < tileMap01.mapGrid.length; i++) {
    for (let j = 0; j < tileMap01.mapGrid[i].length; j++) {
      const mapElement = document.createElement("div");
      mapElement.classList.add("element");

      mapElement.setAttribute("id", `x${i}/y${j}`);

      if (tileMap01.mapGrid[i][j].includes(" ")) {
        mapElement.classList.add("tile-space");
      } else if (tileMap01.mapGrid[i][j].includes("W")) {
        mapElement.classList.add("tile-wall");
      } else if (tileMap01.mapGrid[i][j].includes("B")) {
        mapElement.classList.add("entity-block");
      } else if (tileMap01.mapGrid[i][j].includes("P")) {
        mapElement.classList.add("entity-player");
      } else if (tileMap01.mapGrid[i][j].includes("G")) {
        mapElement.classList.add("tile-goal");
      }

      map_container.appendChild(mapElement);
    }
  }
}

function moveUp() {
  const player = getPlayerPosition();
  const elementUP = document.getElementById(`x${playerX - 1}/y${playerY}`);

  if (elementUP.classList.contains("tile-space")) {
    elementUP.classList.add("entity-player");
    elementUP.classList.remove("tile-space");

    player.playerPosition.classList.remove("entity-player");
    player.playerPosition.classList.add("tile-space");

    getPlayerPosition();

    console.log(`nowe koordynaty to x: ${playerX} y: ${playerY}`);
  } else if (elementUP.classList.contains("tile-wall")) {
    // hit wall
  } else if (elementUP.classList.contains("entity-block")) {
    const nextElement = document.getElementById(`x${playerX - 2}/y${playerY}`);

    if (nextElement.classList.contains("tile-space")) {
      //block -> player
      elementUP.classList.add("entity-player");
      elementUP.classList.remove("entity-block");
      //player -> space
      player.playerPosition.classList.remove("entity-player");
      player.playerPosition.classList.add("tile-space");
      //space -> block
      nextElement.classList.add("entity-block");
      nextElement.classList.remove("tile-space");

      getPlayerPosition();
    } else if (nextElement.classList.contains("tile-goal")) {
      //block -> player
      elementUP.classList.add("entity-player");
      elementUP.classList.remove("entity-block");

      //player -> space
      player.playerPosition.classList.remove("entity-player");

      //block -> blockDone
      nextElement.classList.add("entity-block-goal");
      nextElement.classList.remove("tile-goal");

      getPlayerPosition();
    }
  } else if (elementUP.classList.contains("tile-goal")) {
    const nextElement = document.getElementById(`x${playerX - 2}/y${playerY}`);

    elementUP.classList.add("entity-player");

    player.playerPosition.classList.remove("entity-player");

    if (nextElement.classList.contains("tile-goal")) {
      player.playerPosition.classList.add("tile-goal");
    } else if (nextElement.classList.contains("tile-wall")) {
      player.playerPosition.classList.remove("tile-space");
      player.playerPosition.classList.add("tile-goal");
    }

    getPlayerPosition();
  } else if (elementUP.classList.contains("entity-block-goal")) {
    const nextElement = document.getElementById(`x${playerX - 2}/y${playerY}`);

    if (nextElement.classList.contains("tile-goal")) {
      //block -> player
      elementUP.classList.add("entity-player");

      elementUP.classList.remove("entity-block-goal");

      //player -> space
      player.playerPosition.classList.remove("entity-player");
      player.playerPosition.classList.add("tile-goal");

      //block -> blockDone
      nextElement.classList.add("entity-block-goal");
      nextElement.classList.remove("tile-goal");

      getPlayerPosition();
    }
  }

  // player  x 11 y 11
  // block up x 10 y 11
  checkWinner();
}

function moveDown() {
  const player = getPlayerPosition();
  const elementDown = document.getElementById(`x${playerX + 1}/y${playerY}`);
  console.log(elementDown.id);

  if (elementDown.classList.contains("tile-space")) {
    elementDown.classList.add("entity-player");
    elementDown.classList.remove("tile-space");

    player.playerPosition.classList.remove("entity-player");
    player.playerPosition.classList.add("tile-space");

    getPlayerPosition();

    console.log(`new coordinates x: ${playerX} y: ${playerY}`);
  } else if (elementDown.classList.contains("tile-wall")) {
    // hit wall
  } else if (elementDown.classList.contains("entity-block")) {
    const nextElement = document.getElementById(`x${playerX + 2}/y${playerY}`);

    if (nextElement.classList.contains("tile-space")) {
      //block -> player
      elementDown.classList.add("entity-player");
      elementDown.classList.remove("entity-block");
      //player -> space
      player.playerPosition.classList.remove("entity-player");
      player.playerPosition.classList.add("tile-space");
      //space -> block
      nextElement.classList.add("entity-block");
      nextElement.classList.remove("tile-space");

      getPlayerPosition();
    } else if (nextElement.classList.contains("tile-goal")) {
      //block -> player
      elementDown.classList.add("entity-player");
      elementDown.classList.remove("entity-block");

      //player -> space
      player.playerPosition.classList.remove("entity-player");

      //block -> blockDone
      nextElement.classList.add("entity-block-goal");
      nextElement.classList.remove("tile-goal");

      getPlayerPosition();
    }
  } else if (elementDown.classList.contains("tile-goal")) {
    const nextElement = document.getElementById(`x${playerX + 2}/y${playerY}`);
    const beforeElement = document.getElementById(
      `x${playerX - 1}/y${playerY}`
    );
    const beforeNextElement = document.getElementById(
      `x${playerX - 2}/y${playerY}`
    );

    elementDown.classList.add("entity-player");

    player.playerPosition.classList.remove("entity-player");

    if (nextElement.classList.contains("tile-goal")) {
      player.playerPosition.classList.add("tile-goal");
    } else if (nextElement.classList.contains("tile-wall")) {
      player.playerPosition.classList.remove("tile-space");
      player.playerPosition.classList.add("tile-goal");
    }

    if (
      beforeElement.classList.contains("entity-block-goal") &&
      beforeNextElement.classList.contains("tile-wall")
    ) {
      player.playerPosition.classList.remove("tile-space");
    }

    getPlayerPosition();
  } else if (elementDown.classList.contains("entity-block-goal")) {
    const nextElement = document.getElementById(`x${playerX + 2}/y${playerY}`);

    if (nextElement.classList.contains("tile-goal")) {
      //block -> player
      elementDown.classList.add("entity-player");

      elementDown.classList.remove("entity-block-goal");

      //player -> space
      player.playerPosition.classList.remove("entity-player");
      player.playerPosition.classList.add("tile-goal");

      //block -> blockDone
      nextElement.classList.add("entity-block-goal");
      nextElement.classList.remove("tile-goal");

      getPlayerPosition();
    }
  }

  // player  x 11 y 11
  // block down x 12 y 11
  checkWinner();
}

function moveLeft() {
  const player = getPlayerPosition();
  const elementLeft = document.getElementById(`x${playerX}/y${playerY - 1}`);
  const elementNextLeft = document.getElementById(
    `x${playerX}/y${playerY - 2}`
  );
  const elementRight = document.getElementById(`x${playerX}/y${playerY + 1}`);
  const elementRightNext = document.getElementById(
    `x${playerX}/y${playerY + 2}`
  );

  if (elementLeft.classList.contains("tile-space")) {
    elementLeft.classList.add("entity-player");
    elementLeft.classList.remove("tile-space");

    player.playerPosition.classList.remove("entity-player");
    player.playerPosition.classList.add("tile-space");

    if (
      elementRight.classList.contains("entity-block-goal") &&
      elementRightNext.classList.contains("tile-wall")
    ) {
      player.playerPosition.classList.remove("tile-space");
      player.playerPosition.classList.add("tile-goal");
    } else if (
      elementRight.classList.contains("tile-goal") &&
      elementRightNext.classList.contains("tile-wall")
    ) {
      player.playerPosition.classList.remove("tile-space");
      player.playerPosition.classList.add("tile-goal");
    }

    getPlayerPosition();
  } else if (elementLeft.classList.contains("tile-wall")) {
    // hit wall
  } else if (elementLeft.classList.contains("entity-block")) {
    const nextElement = document.getElementById(`x${playerX}/y${playerY - 2}`);

    if (nextElement.classList.contains("tile-space")) {
      //block -> player
      elementLeft.classList.add("entity-player");
      elementLeft.classList.remove("entity-block");
      //player -> space
      player.playerPosition.classList.remove("entity-player");
      player.playerPosition.classList.add("tile-space");
      //space -> block
      nextElement.classList.add("entity-block");
      nextElement.classList.remove("tile-space");

      if (
        elementRight.classList.contains("tile-goal") &&
        elementRightNext.classList.contains("tile-wall")
      ) {
        player.playerPosition.classList.remove("tile-space");
        player.playerPosition.classList.add("tile-goal");
      }

      getPlayerPosition();
    } else if (nextElement.classList.contains("tile-goal")) {
      //block -> player
      elementLeft.classList.add("entity-player");
      elementLeft.classList.remove("entity-block");

      //player -> space
      player.playerPosition.classList.remove("entity-player");

      //block -> blockDone
      nextElement.classList.add("entity-block-goal");
      nextElement.classList.remove("tile-goal");

      getPlayerPosition();
    }
  } else if (elementLeft.classList.contains("tile-goal")) {
    elementLeft.classList.add("entity-player");

    player.playerPosition.classList.remove("entity-player");

    if (elementRight.classList.contains("tile-wall")) {
      player.playerPosition.classList.add("tile-goal");
    }

    getPlayerPosition();
  } else if (elementLeft.classList.contains("entity-block-goal")) {
    elementLeft.classList.remove("entity-block-goal");
    elementLeft.classList.add("entity-player");

    player.playerPosition.classList.remove("entity-player");
    player.playerPosition.classList.add("tile-goal");

    elementNextLeft.classList.remove("tile-space");
    elementNextLeft.classList.add("entity-block");
  }

  // player  x 11 y 11
  // block left x 11 y 10
  checkWinner();
}

function moveRight() {
  const player = getPlayerPosition();
  const elementRight = document.getElementById(`x${playerX}/y${playerY + 1}`);

  if (elementRight.classList.contains("tile-space")) {
    elementRight.classList.add("entity-player");
    elementRight.classList.remove("tile-space");

    player.playerPosition.classList.remove("entity-player");
    player.playerPosition.classList.add("tile-space");
  } else if (elementRight.classList.contains("tile-wall")) {
    // hit wall
  } else if (elementRight.classList.contains("entity-block")) {
    const nextElement = document.getElementById(`x${playerX}/y${playerY + 2}`);

    if (nextElement.classList.contains("tile-space")) {
      //block -> player
      elementRight.classList.add("entity-player");
      elementRight.classList.remove("entity-block");
      //player -> space
      player.playerPosition.classList.remove("entity-player");
      player.playerPosition.classList.add("tile-space");
      //space -> block
      nextElement.classList.add("entity-block");
      nextElement.classList.remove("tile-space");

      getPlayerPosition();
    } else if (nextElement.classList.contains("tile-goal")) {
      //block -> player
      elementRight.classList.add("entity-player");
      elementRight.classList.remove("entity-block");

      //player -> space
      player.playerPosition.classList.remove("entity-player");
      player.playerPosition.classList.add("tile-space");

      //block -> blockDone
      nextElement.classList.add("entity-block-goal");
      nextElement.classList.remove("tile-goal");

      getPlayerPosition();
    }
  } else if (elementRight.classList.contains("tile-goal")) {
    const nextElement = document.getElementById(`x${playerX}/y${playerY + 2}`);
    elementRight.classList.add("entity-player");

    player.playerPosition.classList.remove("entity-player");

    if (nextElement.classList.contains("tile-goal")) {
      player.playerPosition.classList.add("tile-space");
    } else if (nextElement.classList.contains("tile-wall")) {
      player.playerPosition.classList.remove("tile-space");
      player.playerPosition.classList.add("tile-goal");
    } else if (nextElement.classList.contains("entity-block-goal")) {
      player.playerPosition.classList.add("tile-space");
    }

    getPlayerPosition();
  } else if (elementRight.classList.contains("entity-block-goal")) {
    const nextElement = document.getElementById(`x${playerX}/y${playerY + 2}`);

    if (nextElement.classList.contains("tile-goal")) {
      //block -> player
      elementRight.classList.add("entity-player");
      elementRight.classList.add("tile-goal");
      elementRight.classList.remove("entity-block-goal");

      //player -> space
      player.playerPosition.classList.remove("entity-player");
      player.playerPosition.classList.add("tile-space");

      //block -> blockDone
      nextElement.classList.add("entity-block-goal");
      nextElement.classList.remove("tile-goal");

      getPlayerPosition();
    }
  }

  // player x 11 y 11
  // block up x 11 y 12
  checkWinner();
}

function restartGame() {
  location.reload();
}

function checkWinner() {
  const blockDone = document.querySelectorAll(".entity-block-goal");

  if (blockDone.length === 6) {
    const winnerDiv = document.createElement("div");

    winnerDiv.classList.add("winner");

    winnerDiv.innerHTML = `<h1>You Win!!</h1>`;

    map_container.appendChild(winnerDiv);

    setInterval(countDown, 1000);
  }
}

function countDown() {
  document.querySelector(
    ".winner"
  ).innerHTML = `<h4>Game will reset in ${count} s</h4>`;

  if (count === 0) {
    restartGame();
  }

  count--;
}

makeBoardGame();

getPlayerPosition();

/* Uncomment test function to win the game after one box placed in goal spot  */

function test() {
  const test = document.createElement("div");
  const test2 = document.createElement("div");
  const test3 = document.createElement("div");
  const test4 = document.createElement("div");
  const test5 = document.createElement("div");
  test.classList.add("entity-block-goal");
  test2.classList.add("entity-block-goal");
  test3.classList.add("entity-block-goal");
  test4.classList.add("entity-block-goal");
  test5.classList.add("entity-block-goal");

  map_container.appendChild(test);
  map_container.appendChild(test2);
  map_container.appendChild(test3);
  map_container.appendChild(test4);
  map_container.appendChild(test5);
}

//test();

// var items = [
//   [1, 2],
//   [3, 4],
//   [5, 6],
// ];
// console.log(items[0][0]); // 1
// console.log(items[0][1]); // 2
// console.log(items[1][0]); // 3
