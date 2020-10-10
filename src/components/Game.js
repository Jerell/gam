import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import p5 from "p5";

export default function Game({ socket }) {
  const Sketch = (p5) => {
    const settings = {
      bgCol: 0,
    };

    p5.setup = () => {
      const gameContainer = document.getElementById("gameContainer");
      p5.createCanvas(gameContainer.offsetWidth, gameContainer.offsetHeight);
      p5.background(0);
    };

    // p5.mouseDragged = () => {
    //   const { mouseX, mouseY } = p5;
    //   // Make a little object with mouseX and mouseY
    //   let data = {
    //     x: mouseX,
    //     y: mouseY,
    //   };
    //   // Send that object to the socket
    //   socket.emit("mouse", data);
    // };

    // p5.draw = () => {
    //   p5.background(bgCol);
    //   // p5.ellipse(p5.width / 2, p5.height / 2, radius, radius);
    // };

    // p5.mouseDragged
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
