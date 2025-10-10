const { Board, Led } = require("johnny-five");
const board = new Board({ port: "COM3", repl: false });

board.on("ready", function() {
  console.log("✅ Board connected and ready!");
  
  const led = new Led(13); // use the built-in LED (pin 13)
  led.blink(500); // blink every 0.5 seconds

  // When you stop Node (Ctrl + C), turn off the LED safely
  process.on("SIGINT", function() {
    led.stop().off();
    console.log("\n🟡 LED stopped and turned off. Goodbye!");
    process.exit();
  });
});