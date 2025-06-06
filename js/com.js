export default class Com{
    constructor(deck){
        this.hand =[];
        this.deck=deck; //渡されたデッキを使う（重複防止）
    }
drawHand() {
    while(this.hand.length<5) {
        const card =this.deck.draw();
        if(card){
            this.hand.push(card);
        }
    }
}
getHand() {
    return this.hand;
    }
}