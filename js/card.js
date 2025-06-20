export default class Card {
    constructor(index){
        this.index =index;
    }

getValue() {  //ストレート手札
    return (this.index - 1) % 13 +1;
    }
getSuit() {　　//フラッシュ手札
    return Math.floor((this.index -1)/13);
    }
getSuitSymbol() {
    const suits =['♠','♥','♦','♣'];
    return suits[this.getSuit()];
}
toString() {
    return `${this.getSuitSymbol()}${this.getValue()}`;
}
}
console.log("card.js が読み込まれました（getValue付き）");