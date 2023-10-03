//VARIABLES
var phase;

var character;

var wager = .1;
var betMulti = 1;
var multiMax = 9;

var odds = .5;
var riskMulti = 0;

function calculatePrize() {
    var prize = wager * (odds / .5);
}

//FOUNDATIONAL
function create(elem, id, clast, onclick, bod){
    return `<${elem} id="${id}" class="${clast}" onclick="${onclick}">${bod}</${elem}>`
}

function reset(level){
    document.body.innerHTML = "";
}

function cast(...inner){
    document.body.innerHTML = inner;
}

//COSMETIC
function frame(idO, clastO, idI, clastI, bod) {
    cast(
        create("div",idO,"container "+clastO,"",
            create("div",idI,"container "+clastI,"",
                bod
            )
        )
    )
}
function get(id) {
    return document.getElementById(id);
}

function show(id) {
    var target = get(id);
    target.style.display = "block";
}

function hide(id) {
    var target = get(id);
    target.style.display = "none";
}

//FLOW
function next(){
    if(phase = "char"){
        stageMenu();
    }
}

function back(){
    if(phase = "char"){
        mainMenu();
    }
    if(phase = "stage"){
        charMenu();
    }
}

function boot(){
    phase = "boot";
    frame(
        "boot","","logo","",
        `<img src="public/bwlogosmol.png" alt="miladystation">`
    )
    welcome();
}

function start(){
    phase = "start"
    frame("","","","container",
        create(
            "button","","float centered-button","auth()","click-here"
        )
    )
}

function auth(){
    phase = "auth"
    frame("","","","container",
        create(
            "button","wallet-ask","float centered-button web3","walletConnect()","connect-walet"
        )
    )
}

walletConnect = () => {
    const butt = get("wallet-ask");
    butt.innerHTML = 
        `<img src="public/loading.gif" alt="loading.."/>`
    setTimeout(function (){
        console.log("simulating wallet connection");
        mainMenu();
    }, 2000)
}

function mainMenu(){
    phase = "main"
    frame("","inside","option","option",
        create("ul","","list","",
            create("li","","option","",
                create("button","","float","soloFlow()","Campaign")
            )
            +
            create("li","","option","",
                create("button","","float","multiFlow()","Create Multiplayer Game")
            )
            +
            create("li","","option","",
                create("button","","float","joinFlow()","Join Multiplayer Game")
            )
        )
    )
}

function soloFlow(){
    charMenu();
}

function charMenu(){
    phase = "char"
    frame("","inside","","",  
        create("div","char-sel","float grid","",
            `${charList()}`
        )
        +
        create("div","disc","draggable","","")
        +
        create("div","picked","card","",
            `<img src="" alt="pick"/>`
        )
        +
        create("div","spec","","",
            create("p","exp","stat","","exp: ")
            +
            create("p","wins","stat","","wins: ")
            +
            create("p","name","stat","","name: ")
        )
        +
        create("div","param","","",
            create("div","","dial","",
                create("p","odds","","","")
                +
                create("button","risk-less","ctrl","risk(0)","-")
                +
                create("button","risk-more","ctrl","risk(1)","+")
            )
            +
            create("div","","dial","",
                create("p","wager","","",``)
                +
                create("button","bet-less","ctrl","bet(0)","-")
                +
                create("button","bet-more","ctrl","bet(1)","+")
            )
        )
    )
    get('bet-less').disabled = true;
    checkChain("play");
}

function charList(){
    var chars = "";
    
    for(i = 1; i < 13; i++){
        chars += create("div",`char${i}`,"char op","",
            `<img src="public/char/${i}.png" alt="char${i}" class="pp"/>`    
        )
    }
    return chars
}

loadCard = async(id) => {
    var img = get(id).innerHTML;
    get("picked").innerHTML = img;
    character = img.slice(22);
    character = character.substring(0,2);
    if(character[1] == '.'){
        character = character.substring(0,1);
    }
    character = parseInt(character);
    //console.log(character)
    //stats(id)
    get('picked').children[0].style.classList = "card"
    console.log(get('picked').children[0].style.classList)
    stats();
    banner();
}

function banner() {
    if(get('banner')){
        get('banner').remove();
    }
    
    document.body.innerHTML += 
    create("div","banner","ribbon","",
        create("button","banner-min","tiny",`minimize('banner')`,"-")
        +
        create("h2","sum","","",`${getBet()} $DMT at ${getRisk()} odds for ${getPrize} $DMT`)
        +
        create("button","","","next()","READY")
    );
    slideIn('banner');
}

function getBet() {
    return (wager*betMulti).toPrecision(2);
}
function getRisk() {
    return odds-0.1*riskMulti.toPrecision(2);
}
function getPrize() {
    return getBet() / getRisk();
}

function minimize(target) {
    tar = get(target);
    tar.style.top = "0px";
    tar.style.height = "10%";
    tar.innerHTML = create("button","banner-max","tiny","banner()","+");
}

bet = (w) => {
    if(w > 0){
        betMulti++
    } else {
        betMulti--
    }
    get("wager").innerHTML = "wager: " + `${getBet()} $DMT`;
    if(betMulti > 1){
        get('bet-less').disabled = false;
    } else {
        get('bet-less').disabled = true;
    }

    if(betMulti > multiMax){
    get('bet-more').disabled = true;
    }
}

risk = (w) => {
    if(w > 0){
        riskMulti++
    } else {
        riskMulti--
    }
    console.log(riskMulti)
    get("odds").innerHTML = "odds: " + `${getRisk()}`;
    if(riskMulti > -4){
        get('risk-less').disabled = false;
    } else {
        get('risk-less').disabled = true;
    }

    if(riskMulti > 3){
    get('risk-more').disabled = true;
    } else {
        get('risk-more').disabled = false;
    }
}

stats = async (charSelId) => {
        await checkChain("stats");
}

function stageMenu() {
    phase = "stage"
    frame("","inside","","",  
        create("div","stage-sel","float grid","",
            `${stageList()}`
        )
        +
        create("div","disc","draggable","","")     
    )
}

function stageList() {
    var stages = "";
    
    for(i = 1; i < 8; i++){
        stages += create("div",`stage${i}`,"op","",
            `<img src="public/stage/${i}.png" alt="stage${i}" class="stage" />`    
        )
    }
    return stages
}

function gameList(){
    var games = "";
    var live = checkChain();
        for(i=0; i < live.length; i++){
            games += create("div","${i}","game float","",`Game ${live[i]}`+
                create("button","","join",`joinGame(${live[i]})`,"Join")
            );
        }
    return games;
}

function newGameFlow(){
    frame(
        "choose the param of your game"
    )
}

function joinFlow(){
    cast(
        create("div","","container","",
            create("div","","container","",
                gameList()
            )
        )
    )
}

checkChain = async(w) => {
    if(w == "games"){
        setTimeout(function() {
            console.log('chainchecked');
            return ["0x3493934","0x9284839","0x838949"];
            
        },500)
    }
    if(w == "stats"){
        setTimeout(function() {
            console.log('chainchekced');
            get('exp').innerHTML = "exp: " + "355";
            get('wins').innerHTML = "wins: " + "3";
            get('name').innerHTML = "name: " + "";
            return ["355","3",""];
        },500)
    }
    if(w == "play"){
        setTimeout(function() {
            console.log("chainchecked");
            get("odds").innerHTML = "odds: " + ".5";
            get("wager").innerHTML = "wager: " + `${wager*betMulti} $DMT`;
        })
    }
}

//drag drop
const position = { x: 0, y: 0 }

interact('.draggable').draggable({
  listeners: {
    start (event) {
      //console.log(event.type, event.target)
      event.target.classList.add('dragging');
      if(document.getElementById('banner')){
        get('banner').remove();
      }
    },
    move (event) {
      position.x += event.dx
      position.y += event.dy

      event.target.style.transform =
        `translate(${position.x}px, ${position.y}px)`
    },
    end (event) {
        event.target.classList.remove('dragging'); // Remove the class when the disc is dropped
    },
  }
})

interact('.op').dropzone({
    accept: '.draggable', // Only accept elements with the 'draggable' class
    ondropactivate(event) {
      const dropzone = event.target;
      dropzone.classList.add('drop-active');
    },
    ondropdeactivate(event) {
      const dropzone = event.target;
      dropzone.classList.remove('drop-active');
    },
    ondrop(event) {
        const draggableElement = event.relatedTarget;
        const dropzone = event.target;
        if (draggableElement.classList.contains('draggable')) {
          dropzone.classList.add('choice'); // Add a class to the tile when the disc is dropped
        }
        if (draggableElement.classList.contains('pp')) {
            loadCard(dropzone.id);
        }
        if (draggableElement.classList.contains('stage')) {
            console.log('stage picked');
        }
    },
    ondragenter(event) {
      const draggableElement = event.relatedTarget;
      const dropzone = event.target;
      if (draggableElement.classList.contains('draggable')) {
        //loadCard(dropzone.id);
        dropzone.classList.add('choice'); // Add a class to the tile when the disc enters
      }
    },
    ondragleave(event) {
      const draggableElement = event.relatedTarget;
      const dropzone = event.target;
      if (draggableElement.classList.contains('draggable')) {
        dropzone.classList.remove('choice'); // Remove the class from the tile when the disc leaves
      }
    },
});
  

//animation
function welcome() {
    var image = get("logo");
    var opacity = 0;
    var intervalID = setInterval(function() {
        if (opacity < 1) {
        opacity += 0.01;
        image.style.opacity = opacity;
        } else {
        clearInterval(intervalID);
        setTimeout(function() {
            var intervalID2 = setInterval(function() {
            if (opacity > 0) {
                opacity -= 0.01;
                image.style.opacity = opacity;
            } else {
                clearInterval(intervalID2);
            }
            }, 4);
        }, 1000);
        }
    }, 2);
    setTimeout(function() {
        start();
    }, 2000);
    
}

function slideIn(id) {
    const element = document.getElementById(id);
    // Use a setTimeout to apply the transformation after a brief delay
    setTimeout(() => {
      element.style.top = '50%'; /* Move to the vertical center of the screen */
      element.style.transform = 'translate(-50%, -50%)'; /* Apply transformation */
    }, 100);
}
                    
//full spread
//boot();

//mainMenu();
//soloFlow();
stageMenu();