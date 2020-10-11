import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import p5 from "p5";

class Character {
  constructor(screen, pos, color, size, name) {
    this.pos = pos;
    this.size = size;
    this.name = name;
    this.color = color;
    this.canvas = screen;
    this.page = screen.createGraphics(size, size);
    this.page.clear();
    this.page.noStroke();
  }
  update(data) {
    const { pos } = data;
    this.pos = pos;
  }
  render() {
    this.canvas.image(this.page, this.pos.x, this.pos.y, this.size, this.size);
  }
}

class Player extends Character {
  constructor(screen, pos, color, name) {
    super(screen, pos, color, 50, name);
    console.log(this.name, this.pos);
  }
  draw() {
    this.page.fill(this.color);
    let textWidth = this.page.textWidth(this.name);

    this.page.clear();
    this.page.square(0, 0, this.size);
    this.page.fill(0);
    this.page.text(this.name, this.size / 2 - textWidth / 2, this.size - 5);

    this.render();
  }
}

export default function Game({ socket }) {
  const players = {};
  function addPlayer(p, screen) {
    players[p.name] = new Player(
      screen,
      { x: screen.windowWidth / 2, y: screen.windowHeight / 2 },
      p.color,
      p.name
    );
  }
  // function removePlayer(name) {
  //   delete players[name];
  // }
  function selectPlayer(p, screen) {
    if (!players.hasOwnProperty(p.name)) {
      addPlayer(p, screen);
    }
    return players[p.name];
  }

  const Sketch = (p5) => {
    function select(p) {
      return selectPlayer(p, p5);
    }
    function bg(col = 0) {
      p5.background(col);
    }

    socket.on("state", (state) => {
      bg(0);
      for (let player of state) {
        let p = select(player, p5);
        p.update(player);
        p.draw();
      }
    });

    p5.setup = () => {
      const gameContainer = document.getElementById("gameContainer");
      p5.createCanvas(p5.windowWidth, p5.windowHeight);
      p5.background(0);
      p5.noStroke();
    };

    let lastUpdateTime = new Date().getTime();
    setInterval(function () {
      let currentTime = new Date().getTime();
      // let timeDifference = currentTime - lastUpdateTime;

      socket.emit("movement", movement);

      lastUpdateTime = currentTime;
    }, 1000 / 60);
  };

  // Keybinds
  const movement = {
    up: false,
    down: false,
    left: false,
    right: false,
  };
  document.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "w":
      case "ArrowUp":
        movement.up = true;
        break;
      case "a":
      case "ArrowLeft":
        movement.left = true;
        break;
      case "s":
      case "ArrowDown":
        movement.down = true;
        break;
      case "d":
      case "ArrowRight":
        movement.right = true;
        break;
      default:
        console.log(`${event.key} is not bound to an action`);
    }
  });
  document.addEventListener("keyup", function (event) {
    switch (event.key) {
      case "w":
      case "ArrowUp":
        movement.up = false;
        break;
      case "a":
      case "ArrowLeft":
        movement.left = false;
        break;
      case "s":
      case "ArrowDown":
        movement.down = false;
        break;
      case "d":
      case "ArrowRight":
        movement.right = false;
        break;
      default:
        console.log(`${event.key} is not bound to an action`);
    }
  });

  let gRef = React.createRef();

  useEffect(() => {
    new p5(Sketch, gRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      maxHeight="800px"
      height="100%"
      width="100%"
      id="gameContainer"
      ref={gRef}
    ></Box>
  );
}
