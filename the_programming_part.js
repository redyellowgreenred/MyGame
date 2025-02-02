const target = document.getElementById("target");
const scoreDisplay = document.getElementById('score');
const countdownDisplay = document.getElementById('countdown');
let score = 0;
let countdown = 3;
scoreDisplay.textContent = score;
let countdownInterval = null; 
let targetWidth = 100;
let targetHeight = 100;
target.style.width = `${targetWidth}px`;
target.style.height = `${targetHeight}px`;

function moveTarget() {
    const gameContainer = document.querySelector(".game-container");
    const containerRect = gameContainer.getBoundingClientRect();
    const targetWidth = target.offsetWidth;
    const targetHeight = target.offsetHeight;

    // 计算随机位置
    let randomX = Math.floor(Math.random() * (containerRect.width - targetWidth));
    let randomY = Math.floor(Math.random() * (containerRect.height - targetHeight));

    // 确保新位置在容器内
    randomX = Math.max(0, randomX)*0.8;
    randomY = Math.max(0, randomY)*0.8;

    // 设置目标的新位置（考虑容器偏移）
    target.style.left = `${containerRect.left + randomX}px`;
    target.style.top = `${containerRect.top + randomY}px`;
}

moveTarget();

function startCountdown() {
    // 设置定时器，每秒触发一次
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    countdown = 3;
    countdownDisplay.textContent = countdown;
    countdownInterval = setInterval(() => {
        // 如果倒计时大于0，减少倒计时
        if (countdown > 0) {
            countdown--;
            // 更新倒计时显示
            countdownDisplay.textContent = countdown;
        } else {clearInterval(countdownInterval);
            // 如果倒计时结束，清除定时器;
            // 可以在这里添加倒计时结束后的逻辑
        }
    }, 1000); // 定时器间隔时间为1000毫秒（即1秒）
};

target.addEventListener("click",() =>{
    targetWidth *= 0.95; // 每次点击缩小10%
    targetHeight *= 0.95;
    if (targetWidth < 2) targetWidth = 2;
    if (targetHeight < 2) targetHeight = 2;
    target.style.width = `${targetWidth}px`;
    target.style.height = `${targetHeight}px`;
    score++;
    scoreDisplay.textContent = score;
    moveTarget();
    startCountdown();

});
