import Card from "./card.js";
const cards =[...Array(5)].map((_,i) => new Card(i+1));

const nodes = document.querySelectorAll(".card.you");

cards.forEach((card,i)=>{
    const img =nodes[i];
    img.src ="images/" +String(card.index).padStart(2,"0")+".png";
});