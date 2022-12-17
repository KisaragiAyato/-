let mondaiA ='';
let mondaiB ='';
let mondaiC ='';
let mondaiD ='';
let mondaiE ='';
let kotae = 0;
let keisanA = 1; //kotae wo dasutame ni tsukau
let keisanB = 1; //

function $(id){
  return document.getElementById(id);
}

// 重複チェック用配列 
var randoms = [];
 
// 重複チェックしながら乱数作成
function syutsudai (){
  while(true){
    var hugou1 = intRandom(0, 1); 
    var hugou2 = intRandom(0, 1);
    var suuji = intRandom(1, 9);
    var ruijou = intRandom(2, 3);
    var tmp = hugou1 * 1000 + hugou2 * 100 + suuji * 10 + ruijou;
    if(!randoms.includes(tmp)){
      randoms.push(tmp);
      //syutsudai
      if(hugou1 == 0){
        mondaiA ='';
        keisanA = 1;
      }else{
        mondaiA ='-';
        keisanA = -1;
      }
      if(hugou2 == 0){
        mondaiB ='';
        mondaiD ='';
        keisanB = 1;
      }else{
        mondaiB ='(-';
        mondaiD =')';
        keisanB = -1;
      }
      mondaiC = suuji ;
      mondaiE = ruijou ;
      $('mondai').innerHTML = mondaiA + mondaiB + mondaiC + mondaiD;
      $('ruijou').innerHTML = mondaiE;
      kotae = (keisanB * suuji) ** ruijou;
      kotae = kotae * keisanA;
      console.log(kotae);
      break;
    }
  }
}
 
// min以上max以下の整数値の乱数を返す
function intRandom(min, max){
  return Math.floor( Math.random() * (max - min + 1)) + min;
}

window.onload = syutsudai();

//kaitou button no onclick action
function kaitou(){
  let kaitouSuuji = $('kaitou').value;
  if(kaitouSuuji == kotae){
    $('hazure').innerHTML = '○ 正解!＼(^-^)／'
    if(randoms.length == 2*2*9*2){
      randoms = [];
    }
    syutsudai();
    $('kaitou').value = '';
  }else{
    $('hazure').innerHTML = '× ぶぶー!( ﾟДﾟ)'
  }
}
