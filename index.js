//VARIABLES

var character;

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
function boot(){
    frame(
        "boot","","logo","",
        `<img src="public/bwlogosmol.png" alt="miladystation">`
    )
    welcome();
}

function start(){
    frame("","","","container",
        create(
            "button","","float centered-button","auth()","click-here"
        )
    )
}

function auth(){
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
    )
    //setInterval(dragWatch(),20);
}


function charList(){
    var chars = "";
    
    for(i = 0; i < 12; i++){
        chars += create("div",`char${i}`,"char","",
            `<img src="public/char/${i}.png" alt="char${i}"/>`    
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
    console.log(character)
    //stats(id)
}

stats = async (charSelId) => {
        await checkChain("stats");
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
}

//drag drop
const position = { x: 0, y: 0 }

interact('.draggable').draggable({
  listeners: {
    start (event) {
      //console.log(event.type, event.target)
      event.target.classList.add('dragging');
    },
    move (event) {
      position.x += event.dx
      position.y += event.dy

      event.target.style.transform =
        `translate(${position.x}px, ${position.y}px)`
    },
    end (event) {
        event.target.classList.remove('dragging'); // Remove the class when the disc is dropped
        stats();
    },
  }
})

interact('.char').dropzone({
    accept: '.draggable', // Only accept elements with the 'draggable' class
    ondropactivate(event) {
      const dropzone = event.target;
      dropzone.classList.add('drop-active');
    },
    ondropdeactivate(event) {
      const dropzone = event.target;
      dropzone.classList.remove('drop-active');
    },
    ondragenter(event) {
      const draggableElement = event.relatedTarget;
      const dropzone = event.target;
      if (draggableElement.classList.contains('draggable')) {
        loadCard(dropzone.id);
        dropzone.classList.add('char-pick'); // Add a class to the tile when the disc enters
      }
    },
    ondragleave(event) {
      const draggableElement = event.relatedTarget;
      const dropzone = event.target;
      if (draggableElement.classList.contains('draggable')) {
        dropzone.classList.remove('char-pick'); // Remove the class from the tile when the disc leaves
        
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

function glitchIn() {

}
                    
//full spread
//boot();

//mainMenu();
soloFlow();