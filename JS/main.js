let scrollItems = document.querySelector("#broad_list");
let showWindow = document.querySelector(".play_broad_container");
let buttons = document
  .getElementById("eats_buttons")
  .getElementsByTagName("span");
const WIDTH = 459;
let inputBox = document.getElementById("nav_search_keyword");
let historyList = document.getElementById("input_history_list");
let historyItems = document.getElementsByClassName("input_histoy_item");
let historyItemsDelBtn = document.getElementsByClassName("delete_btn");
let body = document.body;
let aniSwicthTab = document
  .getElementById("ani_switch")
  .getElementsByTagName("li"); //tab选项
let aniSwicthTabItem = document.getElementsByClassName("ani_list"); //ul数组
let dramaIframeTab = document
  .getElementById("drama_switch")
  .getElementsByTagName("li");
let dramaIframeTabItems = document.getElementsByClassName("new_drama_iframe"); //ul数组
let nationIframeTab = document
  .getElementById("nation_switch")
  .getElementsByTagName("li");
let nationIframeTabItems = document.getElementsByClassName("new_nation_iframe"); //ul数组
let tabTopLive = document.getElementById("live_tab_top").getElementsByTagName("li");
let tabTopLiveItems = document.getElementsByClassName("tab_bottom_item"); //ul数组
let tabTopAni = document.getElementById("tab_ani").getElementsByTagName("li");
let tabTopAniItems = document.getElementsByClassName("ani_ranking_list"); //ul数组

const LINE_HEIGHT = 30;
let rightSwicthItems = document.getElementsByClassName("right_switch");
let littleTvItems = document.getElementsByClassName("little_tv_item");

let index = 1;
let highLightIndex; //高亮的序号
let lettleTvA = getTvA(littleTvItems);
let asider = document.getElementById("little_tv");
let smallBtn=document.getElementsByClassName('small');


function getTvA(list) {
  let newList = [];
  for (let i = 0; i < list.length; i++) {
    let tvA = list[i].getElementsByTagName("a")[0];
    newList.push(tvA);
  }
  return newList;
}
function skip() {
  Array.from(buttons).forEach((button) => {
    button.className = "span_off";
  });

  this.className = "span_on";
  let nowIndex = this.dataset.skip;
  index = nowIndex;

  scrollItems.style.top = 0;
  scrollItems.style.left = -parseInt(nowIndex - 1) * WIDTH + "px";
}
function scroll() {
  index++;
  if (index > 5) index = 1;
  Array.from(buttons).forEach((button) => {
    button.className = "span_off";
  });
  buttons[index - 1].className = "span_on";
  scrollItems.style.transition = "left 0.5s"; //重置transition
  if (index > 5) {
    scrollItems.style.transition = "none";
  }
  scrollItems.style.top = 0;
  scrollItems.style.left = -parseInt(index - 1) * WIDTH + "px";
}
function stop() {
  clearInterval(timer);
}
function play() {
  timer = setInterval(scroll, 2000);
}
function unfocus(e) {
  if (
    e.target.id === "nav_search_keyword" ||
    e.target.id === "input_history_list" ||
    e.target.className === "input_histoy_item" ||
    e.target.className === "history_item_title" ||
    e.target.className === "delete_btn"
  ) {
    return;
  } else {
    beingHideen(historyList);
  }
}
function beingHideen(e) {
  e.style.visibility = "hidden";
}
function beingVisible(e) {
  e.style.visibility = "visible";
}
function beingCovered(e) {
  e.style.zIndex = 1;
}
function cover(e) {
  console.log(e);
  e.style.zIndex = 2;
}
function switch_tab(e, target_ele) {
  console.log(e);
  let _this = e.target;
  _this.parentNode.childNodes.forEach((node) => {
    node.className = "unselected";
  });
  Array.from(target_ele).forEach((ele) => {
    beingCovered(ele);
  });
  let triggerIndex = _this.dataset.tab;
  _this.className = "selected";
  cover(target_ele[triggerIndex]);
}
//轮播
Array.from(buttons).forEach((button) => {
  button.addEventListener("click", skip);
});
timer = setInterval(scroll, 2000);

//鼠标移入暂停
showWindow.addEventListener("mouseover", stop);
showWindow.addEventListener("mouseout", play);

//删除元素
body.addEventListener("click", unfocus);
Array.from(historyItemsDelBtn).forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let del_index = btn.dataset.index;
    for (let i = 0; i < historyItemsDelBtn.length; i++) {
      if ((historyItems[i].dataset.del = del_index)) {
        historyItems[i].parentNode.removeChild(historyItems[i]);
        break;
      }
    }
  });
});
inputBox.addEventListener("focus", () => {
  beingVisible(historyList);
});

//tab选项卡
function iter(list, target_item) {
  for (let i = 0; i < list.length; i++) {
    list[i].addEventListener("click", (e) => {
      switch_tab(e, target_item);
    });
  }
}
iter(aniSwicthTab, aniSwicthTabItem);
iter(dramaIframeTab, dramaIframeTabItems);
iter(nationIframeTab, nationIframeTabItems);
iter(tabTopLive, tabTopLiveItems);
iter(tabTopAni,tabTopAniItems);

//换一换功能
//动漫区大图片
//其他区域小图片

//得到sum个[0,range]的随机数
function getNoRepeat(sum,range){
  let indexList=[];
  let newList=[];
  for(let i=0;i<range;i++){
    newList[i]=0;
  } 
  for(let j=0;j<sum;j++){  
  let num=parseInt(Math.random()*range);
  while(newList[num]!==0){
    num=parseInt(Math.random()*range); 
  }
  newList[num]=1;
  indexList.push(num);
 }
 return indexList;
}
function getImage(parent){
  parents=document.getElementsByClassName(parent);
  Images=[]
  for(let i=0;i<parents.length;i++){
  let image=parents[i].getElementsByTagName('img')[0];
  Images.push(image);
  }
  return Images;
}
function changeLittle(domList){//domlist是img的集合
  
  let littleSrc=['../img/change1.webp','../img/change2.webp','../img/change3.webp','../img/change4.webp','../img/change5.webp','../img/change6.webp','../img/change7.webp','../img/change8.webp','../img/change9.webp','../img/change9.webp','../img/change10.webp','../img/change11.webp','../img/change12.webp','../img/change13.webp'];
  var sum=Math.ceil(((Math.random())*8));
  
  var positionList=getNoRepeat(sum,8);
 
  var itemsIndexList=getNoRepeat(sum,12);

  for(let i=0;i<sum;i++){
    console.log(domList[positionList[i]]);
   domList[positionList[i]].src=littleSrc[itemsIndexList[i]];
  }
}
function changeLarge(domList) {
  let largeSrc=['../img/change14.webp','../img/change15.webp','../img/change16.webp','../img/change17.webp','../img/change18.webp','../img/change19.webp','../img/change20.webp']
  var sum=Math.ceil(((Math.random())*8));
  let positionList=getNoRepeat(sum,10);
  let itemsIndexList=getNoRepeat(sum,6);
  for(let i=0;i<sum;i++){
   domList[positionList[i]].src=largeSrc[itemsIndexList[i]];
  }
}
//感觉这里可以用正则表达式简便的匹配，但时间不够了我就傻瓜式的调用函数了
let liveBtn=document.getElementById('live_btn');
liveBtn.addEventListener('click',()=>{
  changeLittle(getImage('section_host_item'));
});
let cartoonBtn=document.getElementById('cartoon_btn');
cartoonBtn.addEventListener('click',()=>{
  changeLittle(getImage('cartoon_item'));
});
let dramaChangeBtn=document.getElementById('drama_btn');
dramaChangeBtn.addEventListener('click',()=>{
  changeLittle(getImage(' drama_change_item'));
});
let nationBtn=document.getElementById('nation_btn');
nationBtn.addEventListener('click',()=>{
  changeLittle(getImage('nation_item'));
});
let aniBtn=document.getElementById('ani_btn');
console.log(getImage('ani_item').slice(10))
aniBtn.addEventListener('click',()=>{
  let hot_index=document.getElementById('_hot_ani').style.zIndex;
  if(hot_index==2){
   changeLarge(getImage('ani_item').slice(0,10));
  }else{
   changeLarge(getImage('ani_item').slice(10));
  }
});

//文字滚动
function random() {}

//小电视高亮
function getClientHeight() {
  let clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight =
      document.body.clientHeight < document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  } else {
    clientHeight =
      document.body.clientHeight > document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  }

  return clientHeight;
}
function highLight(e) {
  e.className = "switch_on";
  highLightIndex = e.dataset.switch;
}
function pale(e) {
  e.className = "none";
}
function allPale() {
  lettleTvA.forEach((tvA) => {
    if (tvA.dataset.switch !== highLightIndex) {
      pale(tvA);
    }
  });
}
function getItems(list, targetIndex) {
  for (let i = 0; i < list.length; i++) {
    let index = list[i].dataset.switch;
    if (index === targetIndex) return list[i];
  }
}
function littleTv(e) {
  //e是RIGHT_SWITCH_ITEMS,改变样式的是LITTLE_TV_ITEMS，用dataset连接

  let switch_index = e.dataset.switch;
  if (!switch_index) return;
  let rectObject = e.getBoundingClientRect();
  let clientHeight = getClientHeight();

  let swicth_distance = rectObject.top;

  if (swicth_distance > clientHeight) return;

  let item = getItems(lettleTvA, switch_index); //找到对应的小电视

  if (item && swicth_distance < 0.6 * clientHeight) {
    highLight(item);
  }
}
window.addEventListener("scroll", () => {
  Array.from(rightSwicthItems).forEach((item) => littleTv(item));
  allPale();
  if (asider.getBoundingClientRect().top > 0) {
    highLightIndex = 28;
    allPale();
  }
});

lettleTvA.forEach((tvA) => {
  tvA.addEventListener("click", () => {
    highLight(tvA);
    lettleTvA.forEach((tvA) => {
      let index = tvA.dataset.switch;

      if (index !== highLightIndex) {
        pale(tvA);
      }
    });
  });
});
