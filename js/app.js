import Card from "./card.js";
import { judgeHand } from "./judge.js";
import Com from "./com.js";
import { Deck } from "./deck.js";

const deck =new Deck;
deck.shuffle();
//ボタン・カード要素を取得
const startButton = document.getElementById("start");
const revealButton =document.getElementById("reveal");
const drawButton = document.getElementById("draw"); 
const battleButton =document.getElementById("buttle!!");

const playerCards = document.querySelectorAll('.card.you');//アニメーションでの追加
const opponentCards = document.querySelectorAll('.card.opponent');//アニメーションでの追加
const nodes=document.querySelectorAll(".card.you");

let Deck;
let cards=[];
let Com;

function setupGame(){
    deck = new Deck();
    deck.shuffle();
    com =newCom(Deck);
}
//const distributesound =new Audio("sounds/haifu.mp3");//カード配布音を設定

startButton.addEventListener("click", () => {

    setupGame();

    cards =[];
    for(let i=0; i<5 ;i++){
        cards.push(deck.draw());
    }

    [playerCards, ...opponentCards].forEach(card.style.opacity =0);
    animateDealing(cards);
    revealButton.disabled =false;
});

revealButton.addEventListener("click", ()=> {
    new Audio("sounds/haifu.mp3").play();

    cards.forEach((card, i) => {
        const imgPath ="images/" + String(card.index).padStart(2,"0") + ".png";
        nodes[i].src = imgPath;
    });


    const result = judgeHand(cards);
    displayResult(result);

 document.querySelectorAll(".card.you").forEach(card => {
    card.addEventListener("click", () => {
    card.classList.toggle("selected");
    new Audio("sounds/haifu.mp3").play();
        });
    });
});

//Drawボタン：新しいカードを配る
drawButton.addEventListener("click",()=> {
    const selectedIndices =[];
    document.querySelectorAll(".card.you").forEach((card,i) => {
        if(card.classList.contains("selected")) 
            selectedIndices.push(i); 
    });

    /*カードを実際に入れ替える（差し替え） */
    selectedIndices.forEach(index => {
        let newCard;
        do{
            newCard =deck.draw();
        }while(card.some(c => c.index === newCard.index));

        cards[index]= newCard;

        const imgPath ="images/"+String(newCard[i].index).padStart(2,"0")+".png";
        nodes[index].src= imgPath;
        nodes[index].classList.remove("selected");
        
       });
    const result = judgeHand(cards);
    displayResult(result);
    }); 

    battleButton.addEventListener("click",()=> {
    const comHand = com.getHand();
    const comHandDiv = document.getElementById("com-hand");
    comHandDiv.innerHTML = "";//クリア
    comHand.forEach(card => {
        const cardEl = document.createElement("img");
        const index = String(card.index).padStart(2, "0");
        cardEl.src = `images/${index}.png`;
        cardEl.classList.add("card", "opponent");
        comHandDiv.appendChild(cardEl);
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