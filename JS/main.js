const SCROLL_ITEMS = document.querySelector("#broad_list");
const SHOW_WINDOW = document.querySelector(".play_broad_container");
const BUTTONS = document
  .getElementById("eats_buttons")
  .getElementsByTagName("span");
const WIDTH = 459;
const INPUT_BOX = document.getElementById("nav_search_keyword");
const HISTORY_LIST = document.getElementById("input_history_list");
const HISTORY_ITEMS = document.getElementsByClassName("input_history_item");
const HISTORY_ITEMS_delete_btn = document.getElementsByClassName("delete_btn");

var index = 1;
function skip() {
  Array.from(BUTTONS).forEach((button) => {
    button.style.background = "white";
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
  if (index == 5) {
    SCROLL_ITEMS.style.transition = "none";
  }
  SCROLL_ITEMS.style.top = 0;
  SCROLL_ITEMS.style.left = -parseInt(index - 1) * WIDTH + "px";
}
function play() {
  setInterval(scroll, 2000);
}
function stop() {
  clearInterval(timer);
}
Array.from(BUTTONS).forEach((button) => {
  button.addEventListener("click", skip);
});
var timer = setInterval(scroll, 2000);

SHOW_WINDOW.addEventListener("mouseover", stop);
SHOW_WINDOW.addEventListener("mouseout", play);
INPUT_BOX.addEventListener("focus", () => {
  HISTORY_LIST.style.visibility = "visible";
});

Array.from(HISTORY_ITEMS_delete_btn).forEach((btn)=>{
    btn.addEventListener('click',()=>{
      var del_index= btn.dataset.index;
      HISTORY_ITEMS[del_index].parentNode.removeChild(HISTORY_ITEMS[del_index]);
    })
})
