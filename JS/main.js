const SCROLL_ITEMS = document.querySelector("#broad_list");
const SHOW_WINDOW = document.querySelector(".play_broad_container");
const BUTTONS = document
  .getElementById("eats_buttons")
  .getElementsByTagName("span");
const WIDTH = 459;
const INPUT_BOX = document.getElementById("nav_search_keyword");
const HISTORY_LIST = document.getElementById("input_history_list");
const HISTORY_ITEMS = document.getElementsByClassName("input_histoy_item");
const HISTORY_ITEMS_DELETE_BTN = document.getElementsByClassName("delete_btn");
const BODY=document.body;
const ANI_SWITCH_TAB=document.getElementById("ani_switch").getElementsByTagName('li');//tab选项
const ANI_SWITCH_TAB_ITEM=document.getElementsByClassName("ani_list");//ul数组
const DRAMA_IFRAME_TAB=document.getElementById("drama_switch").getElementsByTagName('li');
const DRAMA_IFRAME_TAB_ITEMS=document.getElementsByClassName("new_drama_iframe");//ul数组
const NATION_IFRAME_TAB=document.getElementById("nation_switch").getElementsByTagName('li');
const NATION_IFRAME_TAB_ITEMS=document.getElementsByClassName("new_nation_iframe");//ul数组
const TAB_TOP=document.getElementById("live_tab_top").getElementsByTagName('li');
const TAB_TOP_ITEMS=document.getElementsByClassName("tab_bottom_item");//ul数组
const LINE_HEIGHT=30;
var index = 1;

function skip() {
  Array.from(BUTTONS).forEach((button) => {
    button.className="span_off"
  });

  this.className = "span_on";
  var nowIndex = this.dataset.skip;
  index = nowIndex;

  SCROLL_ITEMS.style.top = 0;
  SCROLL_ITEMS.style.left = -parseInt(nowIndex - 1) * WIDTH + "px";
}
function scroll() {
  index++;
  if (index > 5) index = 1;
  Array.from(BUTTONS).forEach((button) => {
    button.className = "span_off";
  });
  BUTTONS[index - 1].className = "span_on";
  SCROLL_ITEMS.style.transition = "left 0.5s"; //重置transition
  if (index > 5) {
    SCROLL_ITEMS.style.transition = "none";
  }
  SCROLL_ITEMS.style.top = 0;
  SCROLL_ITEMS.style.left = -parseInt(index - 1) * WIDTH + "px";
}

function stop() {
  clearInterval(timer);
}
function play(){
  timer = setInterval(scroll, 2000);
}
function unfocus(e){
    console.log(e.target.id);
    console.log(e.target.className);
    if(e.target.id==='nav_search_keyword'||e.target.id==='input_history_list'||e.target.className==='input_histoy_item'||e.target.className==='history_item_title'||e.target.className==='delete_btn'){
       return;
    }else{
        beingHideen(HISTORY_LIST);
    }
}
function beingHideen(e){
    e.style.visibility="hidden";
}
function beingVisible(e){
    e.style.visibility="visible";
}
function beingCovered(e){
    e.style.zIndex=-1;
}
function cover(e){
  console.log(e);
    e.style.zIndex=2;
}
function switch_tab(e,target_ele){
    console.log(e.target);
    var _this=e.target;
    _this.parentNode.childNodes.forEach((node)=>{
      node.className='unselected';
    })
    Array.from(target_ele).forEach((ele)=>{
        beingCovered(ele);       
    })
  var triggerIndex=_this.dataset.tab;
  console.log(triggerIndex);
  _this.className='selected';
  cover(target_ele[triggerIndex]);
}
//轮播
Array.from(BUTTONS).forEach((button) => {
  button.addEventListener("click", skip);
});
timer = setInterval(scroll, 2000);

//鼠标移入暂停
SHOW_WINDOW.addEventListener("mouseover", stop);
SHOW_WINDOW.addEventListener("mouseout", play);

//删除元素
BODY.addEventListener('click',unfocus)
Array.from(HISTORY_ITEMS_DELETE_BTN).forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
      var del_index= btn.dataset.index;
      console.log(del_index);
      for(var i=0;i<HISTORY_ITEMS_DELETE_BTN.length;i++){
        if(HISTORY_ITEMS[i].dataset.del=del_index){
          HISTORY_ITEMS[i].parentNode.removeChild(HISTORY_ITEMS[i]);
          break;
        }
      }     
    })
})
INPUT_BOX.addEventListener("focus", () => {
    beingVisible(HISTORY_LIST);
});

//tab选项卡
function iter(list,target_item){
  for(var i=0;i<list.length;i++){    
    list[i].addEventListener('click',(e)=>{
      switch_tab(e,target_item);      
     });
  }
}
iter(ANI_SWITCH_TAB,ANI_SWITCH_TAB_ITEM);  
iter(DRAMA_IFRAME_TAB,DRAMA_IFRAME_TAB_ITEMS);  
iter(NATION_IFRAME_TAB,NATION_IFRAME_TAB_ITEMS);
iter(TAB_TOP,TAB_TOP_ITEMS);

//换一换功能
function change(){
//模拟json,更换元素的innerHTML
}

//文字滚动
function random(){

}