import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import p5 from "p5";

export default function Game({ socket }) {
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
      p5.ellipse(data.x, data.y, 50, 50);
      // name
      let textWidth = p5.textWidth(data.name);
      p5.fill(0);
      p5.text(data.name, data.x - textWidth / 2, data.y);
    }

    socket.on("mouse", (data) => {
      receiveMouse(data);
    });

    p5.setup = () => {
      const gameContainer = document.getElementById("gameContainer");
      p5.createCanvas(gameContainer.offsetWidth, gameContainer.offsetHeight);
      p5.background(0);
      p5.noStroke();
    };

    p5.mouseDragged = () => {
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
