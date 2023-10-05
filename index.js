//VARIABLES
var phase;

var character = 12;
var character1 = 8;
var arena = 1;

var wager = .1;
var betMulti = 1;
var multiMax = 9;

var odds = .5;
var riskMulti = 0;

var win;

var curInt;

function calculatePrize() {
    var prize = wager * (odds / .5);
}

//FLOW
function next(){
    console.log('current phase',phase)
    if(phase == "char"){
        stageMenu();
        return
    }
    if(phase == "stage"){
        tote();
        return
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

function mainMenu(){
    phase = "main"
    frame("","inside","option","option",
        create("ul","","list","",
            create("li","","option","",
                create("button","","float","soloFlow()","Campaign")
            )
            +
            create("li","","option","",
                create("button","multi","float","multiFlow()","Create Multiplayer Game")
            )
            +
            create("li","","option","",
                create("button","join","float","joinFlow()","Join Multiplayer Game")
            )
        )
    )
    get("multi").disabled = true;
    get("join").disabled = true;
}

// solo
function soloFlow(){
    charMenu();
}

function charMenu(){
    phase = "char"
    position = { x: 0, y: 0};
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

function stageMenu() {
    phase = "stage"
    position = { x: 0, y: 0};
    frame("","inside","","",  
        create("div","stage-sel","float grid","",
            `${stageList()}`
        )
        +
        create("div","disc","draggable","","")
        +
        create("button","select","","next()",) 
    )
}

function tote() {
    frame("","","option","",
        create("div","summary","float sheet","",
            `${summary()}`
        )
        +
        create("button","fight","","battle()","FIGHT")
        +
        create("button","check","","stageMenu()","wait")
    )
}

function battle() {
    frame("","","match","",
        create("div","","","",
            `${action()}`
        )
    )
    battle1();
    checkChain("fight");
}

function action() {
    var game = ""
    game +=
        create("div","game","","",
            `<img src="public/stage/${arena}.png" alt="stage" id="arena" /> `
            +
            `<img src="public/char/${character}.png" alt="char0" id="player1" />`
            +
            `<img src="public/char/${character1}.png" alt="char1" id="player2" />`
        )
        
    return game
}

function result() {
    console.log('results');
    clearInterval(curInt)
    gloat();
}

function gloat() {
    frame("","","","",
        create("div","board","","",
            create("h1","result","","","")
        )
    )
    if(win){
        get('result').innerHTML = "YOU WIN"
    } else {
        get('result').innerHTML = "YOU LOSE"
    }
    var butt =  
        create("button","","","charMenu()","select Pack")
        +
        create("button","","","stageMenu()","select Stage")
        +
        create("button","","","battle()","again")
        +
        create("button","","","mainMenu()","main menu");
    
    get('board').innerHTML += butt;
}

//multi new
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

function charList(){
    var chars = "";
    
    for(i = 1; i < 13; i++){
        chars += create("div",`${i}`,"char op","",
            `<img src="public/char/${i}.png" alt="char${i}" class="pp"/>`    
        )
    }
    return chars
}

function stageList() {
    var stages = "";
    
    for(i = 1; i < 8; i++){
        stages += create("div",`${i}`,"dest op","",
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

loadCard = async(id) => {
    var img = get(id).innerHTML;
    //get("picked").innerHTML = img;
    
    character = parseInt(get(id).id);
    // console.log('loadcardchar',character)
    get("picked").innerHTML = 
        `<img src="public/char/${character}.png" id="chosen" alt="pack" />`
    //stats(id)
    get('picked').children[0].style.classList = "card"
    //console.log(get('picked').children[0].style.classList)
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
        create("h2","sum","","",`${getBet()} $DMT at ${getRisk()} odds for ${getPrize()} $DMT`)
        +
        create("button","","","next()","READY")
    );
    slideIn('banner');
}

function getBet() {
    return (wager*betMulti).toPrecision(2);
}
function getRisk() {
    return (odds-0.1*riskMulti).toPrecision(2);
}
function getPrize() {
    return ((getBet() / getRisk()) - getBet()).toPrecision(4);
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

function summary() {
    sum = 
    create("h2","bet","","",`You are wagering ${getBet()} $DMT`)
    +
    create("h2","risk","","",`You are playing with ${getRisk()} odds`)
    +
    create("h2","prize","","",`You will recieve ${getPrize()} $DMT if you win`)
    +
    create("h1","q","","","Are you ready to fight?")

    return sum
}


                    
//full spread
//boot();

//mainMenu();
//soloFlow();
//stageMenu();
//tote()
battle();