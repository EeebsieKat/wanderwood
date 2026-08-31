<div style="text-align: center; font-family: monospace;">
  <h2>404 - Lost in the Wanderwood!</h2>
  <p>Your Mob Buddy got separated from the pack. Guide them back to safety!</p>
  
  <canvas id="flappyCanvas" width="340" height="460" style="border: 2px solid #7aa2f7; background: #16161e; border-radius: 10px; cursor: pointer;"></canvas>
  <p style="font-size: 0.85rem; color: #cfc9c2; margin-top: 8px;">Press <b>SPACE</b> or <b>CLICK</b> to Flap | Click to Retry</p>
</div>

<script>
  const canvas = document.getElementById('flappyCanvas');
  const ctx = canvas.getContext('2d');

  let buddyY = 200, velocity = 0, gravity = 0.32, jump = -6.2;
  let score = 0, gameOver = false;
  let pipes = [];
  const pipeWidth = 46, pipeGap = 130;

  function spawnPipe() {
    let topHeight = Math.floor(Math.random() * (canvas.height - pipeGap - 100)) + 40;
    pipes.push({ x: canvas.width, top: topHeight, passed: false });
  }

  function update() {
    if (gameOver) return;

    velocity += gravity;
    buddyY += velocity;

    if (buddyY > canvas.height - 18 || buddyY < 0) gameOver = true;

    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 170) {
      spawnPipe();
    }

    for (let i = 0; i < pipes.length; i++) {
      let p = pipes[i];
      p.x -= 2.2;

      // Collision Detection
      if (
        30 + 16 > p.x && 30 < p.x + pipeWidth &&
        (buddyY < p.top || buddyY + 16 > p.top + pipeGap)
      ) {
        gameOver = true;
      }

      if (!p.passed && p.x < 30) {
        p.passed = true;
        score++;
      }
    }

    pipes = pipes.filter(p => p.x > -pipeWidth);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Wanderwood Logs (Obstacles)
    pipes.forEach(p => {
      ctx.fillStyle = '#2b2b2b';
      ctx.fillRect(p.x, 0, pipeWidth, p.top);
      ctx.fillRect(p.x, p.top + pipeGap, pipeWidth, canvas.height - (p.top + pipeGap));

      ctx.fillStyle = '#84a59d';
      ctx.fillRect(p.x - 2, p.top - 8, pipeWidth + 4, 8);
      ctx.fillRect(p.x - 2, p.top + pipeGap, pipeWidth + 4, 8);
    });

    // Draw Allay Buddy Body
    ctx.fillStyle = '#7dcfff';
    ctx.fillRect(30, buddyY, 16, 16);

    // Draw Allay Wings
    ctx.fillStyle = '#bb9af7';
    let wingOffset = Math.sin(Date.now() / 100) * 4;
    ctx.fillRect(24, buddyY + 4 + wingOffset, 6, 8);

    // Draw Glow Trail Particles
    ctx.fillStyle = 'rgba(125, 207, 255, 0.4)';
    ctx.fillRect(20, buddyY + 6, 4, 4);

    // Score Counter
    ctx.fillStyle = '#cfc9c2';
    ctx.font = '16px monospace';
    ctx.fillText(`Score: ${score}`, 12, 28);

    if (gameOver) {
      ctx.fillStyle = '#f7768e';
      ctx.font = '20px monospace';
      ctx.fillText('BUDDY CRASHED!', 85, 220);
      ctx.fillStyle = '#cfc9c2';
      ctx.font = '12px monospace';
      ctx.fillText('Click or press Space to retry', 70, 250);
    }
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  function doJump() {
    if (gameOver) {
      buddyY = 200; velocity = 0; score = 0; pipes = []; gameOver = false;
    } else {
      velocity = jump;
    }
  }

  window.addEventListener('keydown', (e) => { 
    if (e.code === 'Space') { e.preventDefault(); doJump(); } 
  });
  canvas.addEventListener('click', doJump);

  loop();
</script>