let mondaiA ='';
let mondaiB ='';
let mondaiC ='';
let mondaiD ='';
let mondaiE ='';
let kotae = 0;
let keisanA = 1; //kotae wo dasutame ni tsukau
let keisanB = 1; //
let gotouTsuikaFlag = false;
let hukusyuuFlag = false;
let lastMondai = 0; //hukusyuu sita ato sakki no mondai ni modosu tame
let gotouNum = 0; //gotou button ni id huriwakeru tame

function $(id){
  return document.getElementById(id);
}

/** 重複チェック用配列 */
var randoms = [];
 
/** 重複チェックしながら乱数作成 */
function syutsudai (){
  while(true){
    var hugou1 = intRandom(0, 1); 
    var hugou2 = intRandom(0, 1);
    var suuji = intRandom(1, 9);
    var ruijou = intRandom(2, 3);
    var tmp = hugou1 * 1000 + hugou2 * 100 + suuji * 10 + ruijou;
    if(!randoms.includes(tmp)){
      randoms.push(tmp);
      lastMondai = tmp;
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
 
/** min以上max以下の整数値の乱数を返す */
function intRandom(min, max){
  return Math.floor( Math.random() * (max - min + 1)) + min;
}

window.onload = syutsudai();


//kaitou button no onclick action
function kaitou(){
  let kaitouSuuji = $('kaitou').value;
  if(kaitouSuuji == ''){
    return;
  }
  if(kaitouSuuji == kotae){
    $('hazure').innerHTML = '○ 正解!＼(^-^)／'
    if(hukusyuuFlag == true){                //hukusyuu dattara
      
      let hugou1 = Math.floor(lastMondai / 1000) % 10;
      let hugou2 = Math.floor(lastMondai / 100) % 10;
      let suuji = Math.floor(lastMondai / 10) % 10;
      let ruijou = Math.floor(lastMondai) % 10;
      
      //sakki no mondai wo syutsudai
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
      gotouFlag = false;
      hukusyuuFlag = false;
      $('kaitou').value = '';
      return;
    }
    
    if(gotouTsuikaFlag == true){
      gotouTsuika();
      gotouTsuikaFlag = false;
    }
    if(randoms.length == 2*2*9*2){
      randoms = [];
    }
    syutsudai();
    $('kaitou').value = '';
  }else{
    $('hazure').innerHTML = '× ぶぶー!( ﾟДﾟ)'
      gotouTsuikaFlag = true;
  }
}


function gotouTsuika(){
// ----------------------------
// 追加する要素を作成します
// ----------------------------
var newElement = document.createElement("button"); 
newElement.appendChild(document.createTextNode($('mondai').innerHTML)); 
newElement.setAttribute("onclick",'hukusyuu(event)');
newElement.setAttribute("value",randoms[randoms.length - 1]);
  gotouNum++;
  newElement.setAttribute("id",'gotou' + gotouNum);
  
  var newsup = document.createElement("sup");
  newsup.innerHTML = mondaiE;
  
  
// ----------------------------
// gotoudivendのmaeに追加します
// ----------------------------
// 親要素（div）への参照を取得
var parentDiv = document.getElementById("gotoudiv");
 var childP3 = document.getElementById("gotoudivend");
 
// 追加
parentDiv.insertBefore(newElement, childP3);
  $('gotou' + gotouNum).appendChild(newsup);

}


function hukusyuu(e){
  hukusyuuFlag = true;
  let tmp2 = e.target.value;
  console.log(tmp2);
  let hugou1 = Math.floor(tmp2 / 1000) % 10;
  let hugou2 = Math.floor(tmp2 / 100) % 10;
  let suuji = Math.floor(tmp2 / 10) % 10;
  let ruijou = Math.floor(tmp2) % 10;
  
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
  
}
