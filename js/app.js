import Card from "./card.js";
import { judgeHand } from "./judge.js";
import Com from "./com.js";
import  Deck  from "./deck.js";

let deck;
let cards=[];
let com;
let selectedIndices = [];

function setupGame(){
    deck = new Deck();
    deck.shuffle();
    com =new Com(deck);
    com.drawHand();
}
function animateDealing(playerCards,opponentCards){        
    for(let i=0; i<10; i++){    //5×2枚分　10回分
        setTimeout(() => {
            const cardIndex =Math.floor(i / 2);//0~4のカードインデックス
            const audio =new Audio("sounds/haifu.mp3");
            audio.play();//配布毎に再生

            if(i % 2 === 0){
                playerCards[cardIndex].style.opacity =1;//偶数ならプレイヤーに配る
                } else {
                opponentCards[cardIndex].style.opacity =1;//奇数：相手に配る
                }
                },i*500);
        }
    }
function displayResult(resultText){
    const resultArea = document.getElementById("result-area");
        if(!resultArea) return;
        resultArea.textContent = resultText;
 }
 //ボタン・カード要素を取得
document.addEventListener("DOMContentLoaded",() => {
    const startButton = document.getElementById("start");
    const revealButton =document.getElementById("reveal");
    const drawButton = document.getElementById("draw"); 
    const battleButton =document.getElementById("battle");

    const playerCards = document.querySelectorAll('.card.you');//アニメーションでの追加
    const opponentCards = document.querySelectorAll('.card.opponent');//アニメーションでの追加
    
    startButton.addEventListener("click", () => {
    setupGame();

    cards =[];
    for(let i= 0; i < 5 ; i++) {
        cards.push(deck.draw());
        
    }

    [...playerCards, ...opponentCards].forEach(card => {
        card.style.opacity = 0;
    });
    new Audio("sounds/haifu.mp3").play();
    animateDealing(playerCards,opponentCards);

    revealButton.disabled =false;
});

revealButton.addEventListener("click", () => {
    new Audio("sounds/haifu.mp3").play();

    cards.forEach((card, i) => {
        const imgPath = "images/" + String(card.index).padStart(2,"0") + ".png";
        playerCards[i].src = imgPath;

    });

    const result = judgeHand(cards);
    displayResult(result);
});

//Drawボタン：新しいカードを配る

drawButton.addEventListener("click",()=> {

    if(deck.isEmpty()) {
        alert("山札が空です！");
        return;
    }
  
    let selectedIndices =[];
    playerCards.forEach((card, i) => {
        if(card.classList.contains("selected")) {
            selectedIndices.push(i);
        }
    });

    /*カードを実際に入れ替える（差し替え） */
    selectedIndices.forEach(index => {
        let newCard;
        let tries = 0;

        do{
            if(deck.isEmpty()) {
                alert("山札が足りません");
                return;
            }
            newCard =deck.draw();
            tries++;
            if(tries >100) {

            }
        } while (cards.some(c => c.index === newCard.index));

        cards[index]= newCard;

        const imgPath ="images/"+ String(newCard.index).padStart(2,"0")+".png";
        playerCards[index].src= imgPath;
        playerCards[index].style.opacity = 1; // 👈 これを追加
        playerCards[index].classList.remove("selected"); 
       });
       selectedIndices = [];

       const result =judgeHand(cards);
       displayResult(result);

       const audio =new Audio("sounds/kettei.mp3");
       new Audio("sounds/kettei.mp3").play();
    });
       
battleButton.addEventListener("click",() => {
    const comHand = com.getHand();
    const comHandDiv = document.getElementById("com-hand");
    comHandDiv.innerHTML = "";//初期化
    // Battleボタンが押されたら、元の裏面カードを非表示にする
document.querySelectorAll('.opponent-hand .card').forEach(card => {
  card.style.display = 'none';
});

    comHand.forEach(card => {
        const cardEl = document.createElement("img");
        const index = String(card.index).padStart(2, "0");
        cardEl.src = `images/${index}.png`;
        cardEl.classList.add("card", "opponent");
        comHandDiv.appendChild(cardEl);

    });

    
    const result = judgeHand(cards);
    displayResult(result);
   
 }); 
/*選択追加*/
    playerCards.forEach((card, index) => {
        card.addEventListener("click",() => {
            if(card.classList.contains("selected")){
                card.classList.remove("selected");
                card.style.opacity = 1 ;
                selectedIndices = selectedIndices.filter(i => i !==index);
            }else{
                card.classList.add("selected");
                card.style.opacity =0.5;
                selectedIndices.push(index);
            
                //カード選択時に音
                const audio = new Audio("sounds/haifu.mp3");
                audio.play();
            }
        });
    });

});









 /*console.log("draw時のカード", i, ":", card.index); // ← 追加！
 console.log("draw時のパス:", cardImage); // ← 追加！

 img.src = cardImage;
});
*/
/*
function dealCards(){
    const deck =[...Array(52)].map((_,i)=> new Card(i + 1));
    //シャッフル
    for(let i = deck.length -1 ; i>0 ; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i],deck[j]] = [deck[j],deck[i]];
    }
    cards = deck.slice(0,5);

    cards.forEach((card,i) => {
    const img =playerCards[i];
    const cardImage ="images/" + String(card.index).padStart(2,"0")+".png";
    img.src =cardImage;
    img.style.opacity =1;
    });
}
function animateDealing(cards){
    const deckImg = document.getElementById("deck");

    [...Array(5)].forEach((_,i)=> {
        setTimeout(()=> {
            opponentCards[i].classList.add('deal-to-top');
            dealFromDeckTo(deckImg, opponentCards[i]);
            const sound = new Audio("sounds/haifu.mp3"); //カード配布の際に発生する配布音を設定
            sound.play();//配布音の実行
        setTimeout(()=>{
            playerCards[i].classList.add('deal-to-bottom');
            dealFromDeckTo(deckImg, playerCards[i]);
            const sound =new Audio("sounds/haifu.mp3");
            sound.play();
        },600);//交互に少し遅らせて
        },i*1200);
    });
}
function dealFromDeckTo(fromImg,targetImg) {
    targetImg.style.opacity =0;

    //クローン作成
    const clone = fromImg.cloneNode(true);
    document.body.appendChild(clone); //bodyに追加
    
    //山札の位置と、対象の位置を取得
    const fromRect = fromImg.getBoundingClientRect();
    const toRect =targetImg.getBoundingClientRect();

    //初期位置をdeckの位置に固定
    clone.style.position = "absolute";
    clone.style.left =`${fromRect.left}px`;
    clone.style.top =`${fromRect.top}px`;
    clone.style.width =`${fromRect.width}px`;
    clone.style.height =`${fromRect.height}px`;
    clone.style.transition ="all 0.5s ease-out";
    clone.style.zIndex =999;

    //移動させる
    requestAnimationFrame(()=> {
        clone.style.left = `${toRect.left}px`;
        clone.style.top = `${toRect.top}px`;
        clone.style.width = `${toRect.width}px`;
        clone.style.height = `${toRect.height}px`;
    });
    //終了後に削除し、画像を表示
    setTimeout(() => {
        targetImg.src = "images/blue.png"; // 裏面画像を設定
        targetImg.style.opacity = 1;
        clone.remove();
    },700);
}
function displayResult(resultText){
    document.getElementById("result-area").innerText= resultText;
}


//プレイヤーに5枚配る
const playerHand =[];
while (playerHand.length <5){
    const card = deck.draw();
    if(card) playerHand.push(card);
}

//Comを作成し、デッキを渡して手札を引かせる。
const com =new Com(deck);
com.drawHand();
//⓷HTML にある #battle ボタンでイベント（相手手札を表示）設定：


    comHand.forEach(card => {
        const cardEl =document.createElement("img");
        const index =String(card.index).padStart(2,"0");
        cardEl.src = `images/${index}.png`;
        cardEl.classList.add("card","opponent");
        comHandDiv.appendChild(cardEl);
    });
*/