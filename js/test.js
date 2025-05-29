/*import Card from "./card.js";
import { judgeHand, isFlush, isStraight, isStraightFlush, isRoyalFlush } from "./judge.js"; //judge要素完成時に引用

console.log("test.jsが読み込まれました！")
// flash-test ボタンが押された時に実行
document.addEventListener("DOMContentLoaded",() =>{
   document.getElementById("flash-test").addEventListener("click", () => {
    // テスト用の手札（例：フラッシュのテスト）
    const testHand = [
        new Card(1),  // スペードA
        new Card(2),
        new Card(3),
        new Card(4),
        new Card(5),
    ];

    const result = judgeHand(testHand);
    const flush = isFlush(testHand.map(c => c.index));

    console.log("役判定:", result);
    console.log("isFlush結果:", flush);

    // HTML に結果を表示
    document.getElementById("result-area").textContent =result;
    });

    document.getElementById("fourcard-test").addEventListener("click",() =>{
    //テスト用手札
    const testHand =[
        new Card(1), //♠A
        new Card(14),//♥A
        new Card(27),//♦A
        new Card(40),//♣A
        new Card(3),//おまけカード
    ];
    const result = judgeHand(testHand);
    console.log("役判定:",result);
    document.getElementById("result-area").textContent =result;
    });
//straight-testボタンが押されたときに実行
    document.getElementById("straight-test").addEventListener("click",() => {
//テスト用手札
    const testHand=[
    new Card(1),  //1
    new Card(15),  //2
    new Card(3),
    new Card(4),
    new Card(5),
    ];
    const result = judgeHand(testHand);
    console.log("役判定:",result);
    document.getElementById("result-area").textContent =result;
    });

////straightflush-testボタンが押されたときに実行
    document.getElementById("straightflush-test").addEventListener("click",() =>{
    //テスト用手札
    const testHand=[
        new Card(13),
        new Card(16),
        new Card(17),
        new Card(18),
        new Card(19),
    ];
    const result = isStraightFlush(testHand)
    ?"ストレートフラッシュ完成！"
    :"ストレートフラッシュではありません"

    console.log("役判定:",result);
    document.getElementById("result-area").textContent =result;
    });

//royalflush-testボタンが押されたときに実行
    document.getElementById("royalflush-test").addEventListener("click",()=>{
    console.log("ボタンが押された"); // ← これを追加！

    const testHand =[
        new Card(10),// ♠10
        new Card(11),// ♠11
        new Card(12),// ♠12
        new Card(13),// ♠13
        new Card(1), // ♠1
    ];

    const result =isRoyalFlush(testHand)
    ?"ロイヤルフラッシュ完成!"
    :"ロイヤルフラッシュではありません"

    console.log("役判定:",result);
    document.getElementById("result-area").textContent =result;
    });
});
*/
import Card from "./card.js";
import { judgeHand, isFlush, isStraight, isStraightFlush, isRoyalFlush } from "./judge.js";

console.log("test.js が読み込まれました！");

document.addEventListener("DOMContentLoaded", () => {
  //One-pair-test ボタン
  document.getElementById("one-pair-test").addEventListener("click",()=>{
    const testHand =[
      new Card(2),new Card(5),new Card(6),new Card(26),new Card(39),
    ];
    const result =judgeHand(testHand);
    console.log("役判定:",result);

    const nodes=document.querySelectorAll(".card.you");
    testHand.forEach((card,i)=>{
      const img = nodes[i];
      img.src="images/"+String(card.index).padStart(2,"0")+".png";
    });
    document.getElementById("result-area").textContent =result;
  });
  // two-pair-testボタン
  document.getElementById("two-pair-test").addEventListener("click",()=>{
    const testHand=[
      new Card(3),new Card(16),new Card(30),new Card(43),new Card(44),
    ];
    const result =judgeHand(testHand);
    console.log("役判定",result);

    const nodes=document.querySelectorAll(".card.you");
    testHand.forEach((card,i)=>{
      const img = nodes[i];
      img.src="images/"+String(card.index).padStart(2,"0")+".png";
    });
    document.getElementById("result-area").textContent=result;
  });
  // flush-test ボタン
  document.getElementById("flush-test").addEventListener("click", () => {
    const testHand = [
      new Card(1), new Card(4), new Card(7), new Card(9), new Card(12),
    ];
    const result = judgeHand(testHand);
    console.log("役判定:", result);
    document.getElementById("result-area").textContent = result;
    
    const nodes = document.querySelectorAll(".card.you");//元々5枚あるimgを取得
    
    testHand.forEach((card,i) => {
      const img =nodes[i];
      const cardImage ="images/"+ String(card.index).padStart(2,"0") + ".png";
      img.src = cardImage;
    });
    //結果も表示
    document.getElementById("result-area").textContent =result;
  });

  // fourcard-test ボタン
  document.getElementById("fourcard-test").addEventListener("click", () => {
    const testHand = [
      new Card(1), new Card(14), new Card(27), new Card(40), new Card(5),
    ];
    const result = judgeHand(testHand);
    console.log("役判定:", result);
    document.getElementById("result-area").textContent = result;

    const nodes =document.querySelectorAll(".card.you");//ここから下5行手札カード画像例を表示
    testHand.forEach((card,i) => {
      const img =nodes[i];
      img.src="images/"+String(card.index).padStart(2,"0")+".png";
    });
    //結果を表示
    document.getElementById("result-area").textContent =result;
  });

  // straight-test ボタン
  document.getElementById("straight-test").addEventListener("click", () => {
    const testHand = [
      new Card(1), new Card(15), new Card(29), new Card(4), new Card(5),
    ];
    const result = judgeHand(testHand);
    console.log("役判定:", result);
    document.getElementById("result-area").textContent = result;
    const nodes =document.querySelectorAll(".card.you");//ここから下5行手札カード画像例を表示
    testHand.forEach((card,i) => {
      const img =nodes[i];
      img.src="images/"+String(card.index).padStart(2,"0")+".png";
    });
    //結果を表示
    document.getElementById("result-area").textContent =result;
  });

  // straightflush-test ボタン
  document.getElementById("straightflush-test").addEventListener("click", () => {
    const testHand = [
      new Card(9), new Card(10), new Card(11), new Card(12), new Card(13),
    ];
    const result = isStraightFlush(testHand)
      ? "ストレートフラッシュ完成！"
      : "ストレートフラッシュではありません";
    console.log("役判定:", result);
    const nodes =document.querySelectorAll(".card.you");//ここから下5行手札カード画像例を表示

    testHand.forEach((card,i) => {
      const img =nodes[i];
      img.src="images/"+String(card.index).padStart(2,"0")+".png";
    });
    document.getElementById("result-area").textContent = result;
  });

  // royalflush-test ボタン
  document.getElementById("royalflush-test").addEventListener("click", () => {
    console.log("ロイヤルフラッシュテスト：ボタンが押された！");
    const testHand = [
      new Card(10), new Card(11), new Card(12), new Card(13), new Card(1),
    ];
    const result = isRoyalFlush(testHand)
      ? "ロイヤルフラッシュ完成！"
      : "ロイヤルフラッシュではありません";
    console.log("役判定:", result);
    const nodes =document.querySelectorAll(".card.you");//ここから下5行手札カード画像例を表示

    testHand.forEach((card,i) => {
      const img =nodes[i];
      img.src="images/"+String(card.index).padStart(2,"0")+".png";
    });
    document.getElementById("result-area").textContent = result;
  });
});
