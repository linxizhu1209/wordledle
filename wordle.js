const 정답 = ["TRUTH", "APPLE", "MOUSE", "QUEEN", "PANDA", "YOUTH"];
let index = 0;
let attempts = 0; //몇번째 시도
let timer;

function appStart() {
  const random = Math.floor(Math.random() * 6 + 1);
  const 오늘의정답 = 정답[random];
  const displayGameover = () => {
    const message = document.getElementById("message");
    message.style.opacity = 1;
    message.innerText = `게임이 종료됐습니다!!정답은 ${오늘의정답}~~!`;
    // 맞은 알파벳이 정답문구로 정렬되도록
    document
      .querySelector(`.key-block[data-key='${오늘의정답[0]}']`)
      .animate(
        [
          { transform: "translateX(0px)" },
          { transform: "translateY(-400px)" },
          { transform: "translateX(100px)" },
          { transform: "translateY(50px)" },
          { transform: "translateY(-100px)" },
        ],
        { duration: 6000, iterations: Infinity }
      );
    document
      .querySelector(`.key-block[data-key='${오늘의정답[1]}']`)
      .animate(
        [
          { transform: "translateX(0px)" },
          { transform: "translateY(-500px)" },
          { transform: "translateX(100px)" },
          { transform: "translateY(50px)" },
          { transform: "translateY(-100px)" },
        ],
        { duration: 4000, iterations: Infinity }
      );

    document
      .querySelector(`.key-block[data-key='${오늘의정답[2]}']`)
      .animate(
        [
          { transform: "translateX(0px)" },
          { transform: "translateY(-350px)" },
          { transform: "translateX(-300px)" },
          { transform: "translateY(-10px)" },
          { transform: "translateX(300px)" },
          { transform: "translateY(-100px)" },
        ],
        { duration: 5000, iterations: Infinity }
      );
    document
      .querySelector(`.key-block[data-key='${오늘의정답[3]}']`)
      .animate(
        [
          { transform: "translateX(0px)" },
          { transform: "translateY(-650px)" },
          { transform: "translateX(500px)" },
          { transform: "translateY(-20px)" },
          { transform: "translateY(200px)" },
        ],
        { duration: 3000, iterations: Infinity }
      );

    document
      .querySelector(`.key-block[data-key='${오늘의정답[4]}']`)
      .animate(
        [
          { transform: "translateX(0px)" },
          { transform: "translateY(-300px)" },
          { transform: "translateX(300px)" },
          { transform: "translateY(-50px)" },
          { transform: "translateY(100px)" },
        ],
        { duration: 3000, iterations: Infinity }
      );
    // }
    //     for (let i = 0; i < 오늘의정답.length; i + 2) {
    //       const keyBlock1 = document.querySelector(
    //         `.key-block[data-key='${오늘의정답[i]}']`
    //       );
    //       keyBlock1.animate(
    //         [
    //           // keyframes
    //           { transform: "translateX(0px)" },
    //           { transform: "translateY(-200px)" },
    //           { transform: "translateX(100px)" },
    //           { transform: "translateY(50px)" },
    //           { transform: "translateY(-100px)" },
    //         ],
    //         {
    //           // timing options
    //           duration: 6000,
    //           iterations: Infinity,
    //         }
    //       );
    //     }
    //     for (let i = 1; i < 오늘의정답.length; i + 2) {
    //       const keyBlock2 = document.querySelector(
    //         `.key-block[data-key='${오늘의정답[i]}']`
    //       );
    //       keyBlock2.animate(
    //         [
    //           // keyframes
    //           { transform: "translateX(0px)" },
    //           { transform: "translateY(-300px)" },
    //           { transform: "translateX(-100px)" },
    //           { transform: "translateY(-50px)" },
    //           { transform: "translateY(+100px)" },
    //         ],
    //         {
    //           // timing options
    //           duration: 6000,
    //           iterations: Infinity,
    //         }
    //       );
    //     }
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
      const 정답_글자 = 오늘의정답[i];
      const keyBlock = document.querySelector(
        `.key-block[data-key='${입력한_글자}']`
      );
      if (입력한_글자 === 정답_글자) {
        block.style.background = "#6AAA64";
        맞은_개수 += 1;
        keyBlock.style.background = "#6AAA64";
      } else if (오늘의정답.includes(입력한_글자)) {
        block.style.background = "#C9B458";
        keyBlock.style.background = "#C9B458";
      } else {
        block.style.background = "#787C7E";
        keyBlock.style.background = "#787C7E";
        block.style.color = "white";
        keyBlock.style.color = "white";
      }
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
      nowTime.get;
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
  const clickKey = (x) => {
    const keyBlock = x;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    const asciiKey = keyBlock.charCodeAt(0);

    if (keyBlock === "DELETE") handleBackspace();
    else if (index === 5) {
      if (keyBlock === "ENTER") handleEnterKey();
      else return;
    } else if (65 <= asciiKey <= 90) {
      //문자를 숫자로 변경함! ascii코드 이용
      thisBlock.innerText = keyBlock;
      index += 1; //index ++
    }
  };

  window.document.body.querySelectorAll("[data-key]").forEach((x) => {
    x.addEventListener("click", () => {
      clickKey(x.dataset["key"]);
      console.log(x.dataset.key); //clickKey()
      console.log(x.getAttribute("data-key"));
    });
  });
}

appStart();
