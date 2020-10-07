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
let tabTop = document.getElementById("live_tab_top").getElementsByTagName("li");
let tabTopItems = document.getElementsByClassName("tab_bottom_item"); //ul数组
const LINE_HEIGHT = 30;
let rightSwicthItems = document.getElementsByClassName("right_switch");
let littleTvItems = document.getElementsByClassName("little_tv_item");
let index = 1;
let highLightIndex; //高亮的序号
let lettleTvA = getTvA(littleTvItems);
let asider = document
  .getElementById("little_tv");
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
  e.style.zIndex = -1;
}
function cover(e) {
  e.style.zIndex = 2;
}
function switch_tab(e, target_ele) {
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
iter(tabTop, tabTopItems);

//换一换功能
function change() {
  //模拟json,更换元素的innerHTML
}

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
function allPale(){
  lettleTvA.forEach((tvA)=>{
   if(tvA.dataset.switch!==highLightIndex){
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
  if(!switch_index) return;
  let rectObject = e.getBoundingClientRect();
  let clientHeight = getClientHeight();
  

  let swicth_distance = rectObject.top;
  
  if (swicth_distance > clientHeight) return;

  let item = getItems(lettleTvA, switch_index); //找到对应的小电视
 
  if (item && swicth_distance <0.6*clientHeight) {
    
    highLight(item);
  }
} 
window.addEventListener('scroll',()=>{

  Array.from(rightSwicthItems).forEach((item)=>littleTv(item));
  allPale();
  if(asider.getBoundingClientRect().top>0){
    highLightIndex=28;
    allPale();
  }
})

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
