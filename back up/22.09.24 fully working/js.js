
//Initial functions and variables
var levelarr = [];
var tempplayarr = [];

// When the game starts, gameover has to be set to true
var gameover = true;

function startlevel1() {
  levelarr = [];
  tempplayarr = [];
  $("h1").text("Level 1");
  gameover = false;
}

function gameoverscreen() {
  gameover = true;
  levelarr = [];
  tempplayarr = [];
  $("h1").text("Game Over, Press Any Key to Restart");
  $('body').addClass("game-over");
  new Audio("./sounds/wrong.mp3").play();
  setTimeout(() => {$('body').removeClass("game-over");}, 100);
  startagain();
}

//can use this function for all clicked tiles
function clickedtile(color) {
  color.addClass("pressed");
  var colid = color.attr('id');
  new Audio("./sounds/" + colid + ".mp3").play();
  setTimeout(() => {color.removeClass("pressed")}, 100);
}


function tempgreyingon(color) {
  return color.on("click", () => {
      clickedtile(color);
  })
}


function tempgreyingoff(color) {
    const clickHandler = tempgreyingon(color);
    return color.off("click", clickHandler);
}

function highlightedtile(color){
  color.css("opacity","0.6");
  var colid = color.attr('id');
  new Audio("./sounds/" + colid + ".mp3").play();
  setTimeout(() => {
    color.css("opacity","1.0");}, 500);
}

// The math for the tile selector
function tilesel() { return (Math.floor(4 * Math.random()) + 1)};

function leveltilehighlight() {
  var latestrandomtile = tilesel();

  switch (latestrandomtile) {
    case 1:
      levelarr.push(latestrandomtile);
      highlightedtile($("#green"));
      break;
      case 2:
        levelarr.push(latestrandomtile);
        highlightedtile($("#red"));
        break;
        case 3:
          levelarr.push(latestrandomtile);
          highlightedtile($("#yellow"));
          break;
          case 4:
            levelarr.push(latestrandomtile);
            highlightedtile($("#blue"));
            break;
    //closing for the switch
  }
// closing for the leveltilehighlight function
}


function startagain() {
$(document).on("keypress", () =>{
if (gameover) {
//the tile highlight for the first level alone is contained below
startlevel1();
console.log("was here");
//this is to remove the keypress after the first level has started
$(document).off("keypress");


  tempgreyingon($('#red'));
  tempgreyingon($('#green'));
  tempgreyingon($('#yellow'));
  tempgreyingon($('#blue'));
//level 1 tile push already done below
leveltilehighlight();
var tileselected = '';
//closing for the if gameover check
}
//items should become clickable only on startagain, which resets the counters
 $('.btn').on("click", (e)=>{

if (!gameover){
  tileselected = e.target.id;
switch (tileselected){
  case 'red':
  tileselected = 2;
  break;
  case 'green':
  tileselected = 1;
  break;
  case 'yellow':
  tileselected = 3;
  break;
  case 'blue':
  tileselected = 4;
  break;
//end of the switch
}
tempplayarr.push(tileselected);

//can be seen from the browser console how the below arrays behave


//i needs to be reset on each click event handler for the button items
  var i = 0;

//need to have levelarr outside the loop and templayarr in the loop
  for (i =0; i < levelarr.length; i++) {

//the below if checks if more clicks have been done after a level is done
if (tempplayarr.length > levelarr.length) {
  $('.btn').off("click");
  gameoverscreen();
  break;
//closing for the excessive tile click after level is clear check
}

{if (i < tempplayarr.length) {

if (tempplayarr[i] === levelarr[i]){

  {if ((i === levelarr.length - 1) && !(tempplayarr.length > levelarr.length)){
  //the following code for the next level should run after checking for all i in levearr.length
  console.log("temparr = " + tempplayarr);
  console.log("levelarr = " + levelarr);
  setTimeout( () =>{
  //this check needs to be here incase the user selects another tile after the final level tile
  //because the setTimeout function will still run asynchronously afterwards using the later updated variables
  //We can alternately wrap the setTimeout function in another IIFE to take in current variables
    if (!gameover){
    $("h1").text("Level " + (levelarr.length + 1) );
    console.log("i =" + i);
  tempplayarr = [];
  //highlights a new level tile and also pushes it into the levelarr array
  leveltilehighlight();

  //end of the if !gameover check for setTimeout
  }
  // else {
  //   $('.btn').off("click");
  //   gameoverscreen();
  // //end of the else
  // }

  //end of the setTimeout for level change
  }, 1000);
// //need to have this else here otherwise it will break and not give game over
// else {
//   $('.btn').off("click");
//   gameoverscreen();
//end of the else for levelarr[i]
// }
  //need to break out of the loop after reaching
break;
  //end of the tempplayerarr.length if statement and block
  }}

//the continue below should skip one iteration of the i for loop
continue;
//end of the if for levelarr[i]
}
  else {
    $('.btn').off("click");
    gameoverscreen();
  //end of the else for levelarr[i]
}


//end of the if i < tempplayarr.length statement
}
//break is used to avoid excessive iterations after tempplayarr.length is reached
else {break;}};

//end of the for main loop i for levelarr.length
}

//closing for the if !gameover check
}

  // closing of the click event handler and function
})

//closing for the keypress event handler and anonymous function
});

//closing for start again function
}

//this specifically needs to be called to control the event listener
startagain();
