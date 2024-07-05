
// 랜덤 번호 지정
// 유저가 번호를 입력한다. 그리고 go 라는 버튼을 누름
// 만약 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호 < 유저번호 이면 "DOWN!""
// 랜덤번호 > 유저번호 이면 "UP!""
// RESET 버튼을 누르면 게임이 리셋
// 5번의 기회를 다쓰면 게임이 끝난다(더이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깎지 않는다.


let computerNum = 0; // 랜덤번호를 저장 해둘 변수 


let userInput = document.getElementById("user-input");
let playButton = document.getElementById("play-button");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chancesArea = document.getElementById("chance-area");
let history = [];
let startButton = document.getElementById("start-button");
let startContainer = document.getElementById("start-container");
let mainTextClick = document.getElementById("main-text-click");

startButton.addEventListener("click", start);
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function() {
    userInput.value = "";
})
mainTextClick.addEventListener("click", backStart);

function backStart() {
    startContainer.style.display = "block";
}

function start() {
    startContainer.style.display = "none";
}

// 랜덤번호를 뽑을 함수를 만든다
function pickRandomNum() {
    // 숫자 0 ~ 49 까지의 랜덤 숫자인데 +1을 함으로써 1 ~ 50까지의 랜덤 숫자가 됌
    computerNum = Math.floor(Math.random()*50)+1;
    console.log("정답", computerNum);
}

function play() {
    let userValue = userInput.value;

    if (userValue < 1 || userValue > 50) {
        resultArea.textContent = "1~50 숫자입력"
        resultArea.style.color = 'orange'

        return;
    }

    if (history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 값"
        resultArea.style.color = 'orange';

        return;
    }

    chances --;
    chancesArea.textContent = `남은 횟수:${chances}번`;

    if(userValue < computerNum) {
        resultArea.textContent = "👆👆👆";
    } else if (userValue > computerNum) {
        resultArea.textContent = "👇👇👇"
    } else {
        resultArea.textContent = "🎉🎊정답!🎉🎊"
        playButton.disabled = true;
        playButton.style.backgroundColor = 'gray';
    }

    history.push(userValue);
     console.log(history)
    
    
    

    if (chances < 1) {
        gameOver = true;
    } 

    if (history.includes(userValue) )

    if (gameOver == true) {
        playButton.disabled = true;
        playButton.style.backgroundColor = 'gray';
    }

};

function reset() {

    userInput.value = "";
    playButton.style.backgroundColor = 'rgb(119, 119, 209)';
    pickRandomNum();
    resultArea.textContent = "결과는!";
    gameOver = false;
    playButton.disabled = false;
    chances = 5;
    chancesArea.textContent = `남은 횟수:${chances}번`;
    history=[];
    

    
    
    

    

}

pickRandomNum();
