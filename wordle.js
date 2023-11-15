const 정답 = "TRUTH";
let index = 0;
let attempts = 0; //몇번째 시도
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다!!";
    div.style =
      "display:flex; justify-content:center;align-items:center;position:absolute; top:40vh; left:25vw; width:200px; height:100px; opacity:0.5;background-color:white";
    document.body.appendChild(div);
  };

  const gameOver = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 5)
      return gameOver(); //강의에서는 attemps가 6이면 게임종료하라 했는데, 오류가 생김
    // 왜냐면, attempts가 6이 되려면 nextline -> else문으로 가서 attemps6을 만들어줘야하는데 6을 만들고 바로 게임오버 및 이벤트리셋이 되는게 아니니까
    else {
      attempts += 1;
      index = 0;
    }
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };
  const handleEnterKey = () => {
    //정답확인
    let 맞은_개수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        block.style.background = "#6AAA64";
        맞은_개수 += 1;
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "#C9B458";
      } else block.style.background = "#787C7E";
      block.style.color = "white";
    }
    if (맞은_개수 === 5) gameOver();
    else nextLine();
  };

  const handleKeydown = () => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1; //index ++
    }
  };

  const startTimer = () => {
    const startTime = new Date();

    function setTime() {
      const nowTime = new Date(); //startTime과 다른 이유는, nowtime은 1초마다 실행될 것이기 때문에 구분가능
      const flowTime = new Date(nowTime - startTime);
      const min = flowTime.getMinutes().toString();
      const sec = flowTime.getSeconds().toString();
      const timeH1 = document.querySelector("#timer");
      timeH1.innerText = `${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
    }

    timer = setInterval(setTime, 1000); //timer에 id를 저장하게됨(setInterval의 id)
  };
  window.addEventListener("keydown", handleKeydown);
  //1.5글자 단어(존재하는 단어가 아니어도 됨)
  //2. 6번의  시도 가능
  //3. 존재하면 노란색, 위치도 맞으면 초록색으로 표시
  //4. 게임 종료 판단
  //(추가) 상단에 게임 시간 표시하기
  //(선택) 키보드에도 동일하게 표시
  //(선택) 키보드 클릭으로도 입력
  startTimer();
}

appStart();
