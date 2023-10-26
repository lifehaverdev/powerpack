/*

 ________  ___   __    ______   ______   __     __     
/_______/\/__/\ /__/\ /_____/\ /_____/\ /__/\ /__/\    
\__.::._\/\::\_\\  \ \\:::_ \ \\::::_\/_\ \::\\:.\ \   
   \::\ \  \:. `-\  \ \\:\ \ \ \\:\/___/\\_\::_\:_\/   
   _\::\ \__\:. _    \ \\:\ \ \ \\::___\/_ _\/__\_\_/\ 
  /__\::\__/\\. \`-\  \ \\:\/.:| |\:\____/\\ \ \ \::\ \
  \________\/ \__\/ \__\/ \____/_/ \_____\/ \_\/  \__\/
                                                       

*/


//VARIABLES
    //state
    var phase;
    var hear = false;
    var character = 12;
    var character1 = 8;
    var arena = 1;
    var curInt;
    var walletPacks = [];
    var onChained = false;
    var userXP;
    //betting
    var multiMax = 9;
    var odds = .5;
    //game
    var lastGame;
    var win = 0;
    var streak = 0;
    var stocks = 3;
    var random = [];
    var score = [];
    var round;

//working

var game = {
    p1: {
        stock: 0
    },
    p2: {
        stock: 0
    }
}

function addExp(packId) {
    if(userExp[packId]){
        //console.log('pack found');
        userExp[packId] += 50 * (.5 / odds) ;
    } else {
        //console.log('fresh pack');
        userExp[packId] = 50 * (.5 / odds ) ;
    }
    console.log(userExp)
}

function calculatePrize() {
    prize = wager * ((1-odds) / .5) * ((1 - odds) / .5);
}

//sound

var sound = new Howl({
    src: ['sounds/song.mp3'],
    html5: true,
    loop: true
  });

var menu = new Howl({
    src: ['sounds/time.mp3'],
    html5: true,
    loop: true
})

function mainMenu(){
    phase = "main"
    console.log('main menu wallet packs',walletPacks.length);
    if(walletPacks.length > 0){
        frame("","inside","option","option",
            create("ul","","list","",
                create("li","","option","",
                    create("button","","float","charMenu()","Campaign")
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
    } else {
        frame("","inside","option","option",
            create("p","","","","We don't see any packs in your wallet, you need to register your packs to fight. Please switch to ethereum mainnet and click register")
            +
            create("ul","","list","",
                create("li","","option","",
                    create("button","","float","register()","Register")
                )
                +
                create("li","","option","",
                    create("button","","float","charMenu()","Play Offline")    
                )
            )
        )
    }
}

// solo

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
            create("p","name","stat","","name: ")
        )
        +
        create("div","param","","",
            create("div","","dial","",
                create("p","odds","","","STOCKS: 3")
                +
                create("button","risk-less","ctrl","risk(0)","-")
                +
                create("button","risk-more","ctrl","risk(1)","+")
            )
        )
    )
    checkChain("play",0);
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
        
    )
}

function tote() {
    phase = "tote";
    frame("","","option","",
        create("div","summary","float sheet","",
            `${summary()}`
        )
        +
        create("button","fight","","arm2()","FIGHT")
        +
        create("button","check","","charMenu()","wait")
    )
}

function battle() {
    phase = "battle";
    // if(hear){
    //     menu.stop()
    //     sound.play()
    // }
    round = 0;
    if(onChained){
        console.log('we gotta wait for the results');
    } else {
        writeChain("fight");
    }
    
    game.p1.stock = stocks;
    game.p2.stock = game.p1.stock;
    frame("","","match","",
        create("div","action","","",
            `${action()}`
        )
    )
    get('player1').style.display = 'none';
    get('player2').style.display = 'none';
    fight()
}

function fight() {
    spawnSlide('player1');
    spawnSlide('player2');    
    
    setTimeout(()=>{
        get('action').innerHTML = action();
    },cadence.fight.spawn)

    setTimeout(()=>{
        countDown()
    },cadence.fight.countdown)

    setTimeout(()=>{
        battle1();
    },cadence.fight.battle)
}

function action() {
    return  create("div","game","","",
                `<img src="./stage/${arena}.png" alt="stage" id="arena" /> `
                +
                `<img src="./char/${character}.png" alt="char0" id="player1" />`
                +
                `<img src="./char/${character1}.png" alt="char1" id="player2" />`
                +
                getStocks()
            )
}

function getStocks() {
    let p1s = `<div class="stocks stock0">`
    let p2s = `<div class="stocks stock1">`
    for(let i = 1; i < stocks + 1; i++){
        if(game.p1.stock + 1 > i){
            p1s += `<img src="./char/${character}.png" alt="stock0" id="0stock${i}" class="stock0"/>`;
        }
        if(game.p2.stock + 1 > i){
            p2s += `<img src="./char/${character1}.png" alt="stock1" id="1stock1${i}" class="stock1"/>`;
        }
    }
    p1s += "</div>"
    p2s += "</div>"
    return p1s + p2s;
}

function wait() {
    phase = "wait";
    frame("","","wait","",
        create("div","","","",
            `<img src="assets/loading.gif"/>`
        )
    )
}

function result() {
    phase = "result";
    // if(hear){
    //     sound.stop()
    //     menu.play()
    // }
    clearInterval(curInt);
    if(game.p1.stock > 0){
        victory();
    } else if(game.p2.stock > 0){
        defeat();
    }
    resetField();
    gloat();
}

function resetField() {
    game.p1.stock = stocks;
    game.p2.stock = stocks;
    score = [];
    a = false;
    found = false;
}

function gloat() {
    frame("","","","water",
        create("div","board","","",
            create("h1","result","","","")
        )
    )
    if(win == 1){
        get('result').innerHTML = "YOU WIN"
    } else if(win == -1){
        get('result').innerHTML = "YOU LOSE"
    } else {
        get('result').innerHTML = "something rong"
    }
    var butt =  
        create("button","","","charMenu()","select Pack")
        +
        create("button","","","stageMenu()","select Stage")
        +
        create("button","","","tote()","again")
        +
        create("button","","","mainMenu()","main menu");
    
    get('board').innerHTML += butt;
}

function transaction() {

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
            `<img src="./char/${i}.png" alt="char${i}" class="pp"/>`    
        )
    }
    return chars
}

function stageList() {
    var stages = "";
    
    for(i = 1; i < 14; i++){
        stages += create("div",`${i}`,"dest op","",
            `<img src="./stage/${i}.png" alt="stage${i}" class="stage" />`    
        )
    }
    return stages
}

function gameList(){
    var games = "";
    var live = checkChain("",0);
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
        `<img src="char/${character}.png" id="chosen" alt="pack" />`
    //stats(id)
    get('picked').children[0].style.classList = "card"
    //console.log(get('picked').children[0].style.classList)
    stats(id);
    banner();
}

function banner() {
    if(get('banner')){
        get('banner').remove();
    }
    document.body.innerHTML += 
    create("div","banner","ribbon","",
        create("button","banner-min","tiny",`minimize('banner')`,"-")
        //+
        // create("h2","sum","","",`${getBet()} $DMT at ${getRisk()} odds for ${getPrize()} $DMT`)
        +
        create("button","next","","next()","READY")
    );
    bannerSlide('banner');
    get('disc').style.opacity = ".33";
}

function minimize(target) {
    tar = get(target);
    tar.style.top = "0px";
    tar.style.height = "10%";
    tar.innerHTML = create("button","banner-max","tiny","banner()","+");
    get('disc').style.opacity = "1";
    get('banner').style.padding = "0%";
}

risk = (w) => {
    if(w > 0){
        stocks++
    } else {
        stocks--
    }
    get("odds").innerHTML = "STOCKS: " + `${stocks}`;
    if(stocks < 2){
        get('risk-less').disabled = true;
    } else {
        get('risk-less').disabled = false;
    }

    if(stocks > 4){
    get('risk-more').disabled = true;
    } else {
        get('risk-more').disabled = false;
    }
    //bannerUpdate()
}

stats = async (charSelId) => {
        //await checkChain("stats",charSelId);
        xp = await checkExp(accounts[0],charSelId);
        get('exp').innerHTML = `exp: ${xp}`;
}

function summary() {
    sum = 
    
    create("h3","q","","","Are you ready to fight?")

    return sum
}

//full spread
boot();
//start()
//auth()
//mainMenu();
//charMenu();
//banner();
//tote();
//stageMenu();
//tote()
//battle();
//spare();