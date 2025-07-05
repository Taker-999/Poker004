export function isOnepair(cards){ //ワンペア判定
    const values = cards.map(card => card.getValue());
    const count = {};

    values.forEach(value => {
      count[value]=(count[value] || 0) +1;
    });

    const pairs =Object.values(count).filter(c => c ===2);
    return pairs.length === 1;//1ペアある。
}

export function isFlush(cards){ //フラッシュ判定関数 フラッシュの手札はcardsとする。
    const suits =cards.map(card => card.getSuit());
    return suits.every(suit => suit === suits[0]);

}
    export function isStraight(values) {
        // 重複を除く（同じ数が複数あるとストレートではない）
        const unique = [...new Set(values)];
      
        // ストレートは5枚の連番 → 重複があるとNG
        if (unique.length !== 5) return false;
      
        // 昇順に並べ替える
        unique.sort((a, b) => a - b);
      
        // A=1 のローストレート対応（A-2-3-4-5）
        const lowAce = JSON.stringify(unique) === JSON.stringify([1, 2, 3, 4, 5]);
        if (lowAce) return true;
      
        //ハイストレート対応（A-10-11-12-13)
        const highAce = JSON.stringify(unique) === JSON.stringify([1,10,11,12,13]);
        if(highAce) return true;

        // 通常のストレート（差がすべて1であるかを確認）
        for (let i = 0; i < 4; i++) {
          if (unique[i + 1] !== unique[i] + 1) return false;
        }
      
        return true;
      }  

export function isStraightFlush(cards){ //ストレートフラッシュ判定関数　cards
    const values = cards.map(card => card.getValue());
    return isFlush(cards)&& isStraight(values);
}
export function isRoyalFlush(cards){ //ロイヤルフラッシュ判定関数　
    const values =cards.map(card => card.getValue());
    const isFlushHand =isFlush(cards);
    const royalSet = new Set(values);
    const isRoyal = [1,10,11,12,13].every(v => royalSet.has(v));
    return isFlushHand && isRoyal;
}

export function judgeHand(cards){
    const values =cards.map(card => card.getValue());
    //値の頻度を数える
    const count={};
    values.forEach(value => {
        count [value] =(count[value] || 0)+1;
    });

    const counts =Object.values(count).sort((a,b) => b-a);

    if(isRoyalFlush(cards)) return"ロイヤルフラッシュ";
    if(isStraightFlush(cards)) return"ストレートフラッシュ";
    if(counts[0]=== 4) return "フォーカード";
    if(counts[0]=== 3 && counts[1]===2) return "フルハウス";
    if(isFlush(cards)) return"フラッシュ";
    if(isStraight(values)) return "ストレート";
    if(counts[0]=== 3) return "スリーカード";
    if(counts[0]=== 2 && counts[1]===2) return "2ペア";
    if(isOnepair(cards)) return "1ペア" ;

    return "役なし";
}