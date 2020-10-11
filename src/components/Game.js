import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import p5 from "p5";

class Character {
  constructor(drawingContext, x, y, color, size, name) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.name = name;
    this.color = color;
    this.canvas = drawingContext;
    this.dc = drawingContext.createGraphics(size, size);
    this.dc.clear();
  }
  render() {
    this.dc.clear();
    this.canvas.image(this.x, this.y, this.size, this.size);
  }
}

class Player extends Character {
  constructor(drawingContext, x, y, color, name) {
    super(...arguments, 50);
  }
  draw() {
    this.dc.fill(this.color);
    this.dc.square(0, 0, this.size);
    this.dc.text();
    // p5.text(data.name, data.x - textWidth / 2, data.y);
    this.render();
  }
}

export default function Game({ socket }) {
  const players = {};
  function addPlayer(name) {}

  const Sketch = (p5) => {
    // Sending data to the socket
    function sendmouse(x, y, pX, pY) {
      const data = {
        x: x,
        y: y,
        px: pX,
        py: pY,
      };
      socket.emit("mouse", data);
    }

    function receiveMouse(data) {
      p5.fill(data.color);
      p5.ellipse(data.pos.x, data.pos.y, 50, 50);
      // name
      let textWidth = p5.textWidth(data.name);
      p5.fill(0);
      p5.text(data.name, data.pos.x - textWidth / 2, data.pos.y);
    }

    socket.on("mouse", (data) => {
      receiveMouse(data);
    });

    p5.setup = () => {
      const gameContainer = document.getElementById("gameContainer");
      p5.createCanvas(p5.windowWidth, p5.windowHeight);
      p5.background(0);
      p5.noStroke();
    };

    p5.mouseMoved = () => {
      const { mouseX: x, mouseY: y, pmouseX: pX, pmouseY: pY } = p5;
      sendmouse(x, y, pX, pY);
    };
  };

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
