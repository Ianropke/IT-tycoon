function randomColor() {
  const colors = [0x0000ff, 0x00ff00, 0xffff00, 0xff00ff, 0xffa500, 0x00ffff];
  return colors[Math.floor(Math.random() * colors.length)];
}

function log(message) {
  console.log(`[LOG] ${message}`);
}
