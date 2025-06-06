import Card from "./card.js";
import { Deck } from "./deck.js";

const nodes = document.querySelectorAll(".card.you");
const startButton = document.getElementById("startButton");

let deck;

startButton.addEventListener("click",() => {
//デッキ作成とシャッフル
deck =new Deck();
deck.shuffle();

//5枚カードを配る
const cards = [...Array(5)].map(() => deck.draw());


cards.forEach((card,i)=>{
    const img =nodes[i];
    img.src ="images/" +String(card.index).padStart(2,"0")+".png";
    });
});