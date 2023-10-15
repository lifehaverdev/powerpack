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
    //if(!isMobileDevice()){
    if(true){
        cast(
            create("div",idO,"container "+clastO,"",
                create("div",idI,"container "+clastI,"",
                    bod
                )
                +
                create("div","bar","","",
                    create("button","back","","back()","BACK")
                    +
                    create("button","vol","","soundSwitch()",`${volume()}`)
                    +
                    create("div","balance","","",
                        create("h3","wallet","","",`WINS:${streak}`)
                    )
                    +
                    create("button","cash-out","","settings()","Menu")
                    +
                    create("button","close-settings","","hideSettings()","Menu")
                )
            )
        )
    } else {
        cast(
            create("div",idO,"container "+clastO,"",
                create("div",idI,"container "+clastI,"",
                    bod
                )
                +
                create("div","bar","","",
                    create("button","back","","back()","BACK")
                    +
                    create("button","vol","","soundSwitch()",`${volume()}`)
                    +
                    create("div","balance","","",
                        create("h3","wallet","","",`WINS:${streak}`)
                    )
                    +
                    create("button","cash-out","","settings()","Menu")
                )
            )
        )
    }
    
}

function settings() {
    var settings = get('cash-out');
    settings.style.display = "none";
    get('close-settings').style.display = "inline-block";
    document.body.innerHTML += 
        create("div","settings","","",
            create("p","","","","Menu")
            +
            create("p","","","",
                `Your Packs: ${walletPacks}`
            )
        )
}

function hideSettings() {
    var settings = get('close-settings');
    settings.style.display = "none";
    get('cash-out').style.display = "inline-block";
    get('settings').remove();
}


function updateBar() {
    if(!isMobileDevice()){
        get('wallet').innerHTML = `WINS:${streak}`;
        get('vol').innerHTML = `${volume()}`;
    } else {
        get('wallet').innerHTML = `WINS:${streak}`;
        get('vol').innerHTML = `${volume()}`;
    }
}

function soundSwitch() {
    hear = !hear;
    sound.stop();
    menu.stop();
    updateBar();
    //sound off 	128263
    //sound on  128266
    //skip 9193
    //back 9194
}

function volume() {
    if(hear) {
        return '&#128263'
    } else {
        return '&#128266'
    }
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
    if(phase = "main"){
        boot()
    }
}

function boot(){
    phase = "boot";
    frame(
        "boot","","logo","",
        `<img src="public/bwlogosmol.png" alt="miladystation">`
    )
    get('bar').style.display = "none";
    welcome();
}

function start(loud){
    phase = "start"
    if(loud){
        hear = true;
        menu.play();
    }
    frame("","","intro","container",
        create("h1","title","fight","","POWER PACKS ONCHAINED")
        +
        create(
            "button","start","float centered-button","auth()","START"
        )
        +
        `<img src="./public/dogpile.png" id="dogpile" />`
    )
    get('bar').style.display = "none";
    panUp(1.3)
}

function auth(){
    phase = "auth"
    frame("","","","container",
        create(
            "button","wallet-ask","float centered-button web3","walletConnect()","connect-walet (jk)"
        )
    )
    get('bar').style.display = "none";
}
