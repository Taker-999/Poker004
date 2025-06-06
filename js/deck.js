import Card from './card.js';

export class Deck {
    constructor() {
        this.cards = [];

        for (let i=0; i < 52; i++) {
            this.cards.push(new Card(i+1));
        }
    }
    shuffle() {
        for (let i=this.cards.length -1 ; i>0 ;i--) {
            const j = Math.floor(Math.random()*(i+1));
            [this.cards[i],this.cards[j]]=[this.cards[j],this.cards[i]];
        }
    }

    draw() {
        return this.cards.pop();//山札から１枚引く
    }
    size() {
        return this.cards.length;
    }
}