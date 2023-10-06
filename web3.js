var playerWallet = 1000 //dmt
var purse = 50 //dmt
var table = 0;
const safety = 8

function fund(amt) {
    fakeTransaction(`youre gonna pay ${amt} $DMT to the table so you can play`);
    amt = parseFloat(amt);
    playerWallet = playerWallet - amt;
    purse = purse + amt;
    table = table + amt;
    updateBar();
}

function defeat() {
    //purse = purse + parseFloat(getBet());
    table = table - parseFloat(getBet());
    updateBar();
}

function victory(bet) {
    bet = parseFloat(bet);
    table = table + bet;
    addExp(getRisk(),character);
    updateBar()
}

function collect() {
    fakeTransaction(`you are collecting ${table} $DMT to your personal wallet`);
    table = parseFloat(table);
    playerWallet = playerWallet + table;
    purse = purse - table;
    table = 0;
    updateBar();
}
//
walletConnect = () => {
    const butt = get("wallet-ask");
    butt.innerHTML = 
        `<img src="public/loading.gif" alt="loading.."/>`
    // setTimeout(function (){
    //     console.log("simulating wallet connection");
    //     mainMenu();
    // }, 2000)
    fakeTransaction('connect');
    // while(thinking){
    //     //stay here
    // }
    mainMenu();
}

fakeTransaction = (w) => {
    alert(w)
}

writeChain = async(w) => {
    return ""
}


checkChain = async(w,i) => {
    if(w == "games"){
        setTimeout(function() {
            console.log('chainchecked');
            return ["0x3493934","0x9284839","0x838949"];
            
        },500)
    }
    if(w == "stats"){
        setTimeout(function() {
            console.log('chainchekced');
            console.log(userExp[i])
            if(userExp[i]){
                get('exp').innerHTML = "exp: " + `${userExp[i]}`;
            } else {
                get('exp').innerHTML = "exp: " + "0";
            }
            get('name').innerHTML = "name: " + "";
            return ["355","3",""];
        },500)
    }
    if(w == "play"){
        setTimeout(function() {
            console.log("chainchecked");
            get("odds").innerHTML = "odds: " + `${getRisk()}`;
            get("wager").innerHTML = "wager: " + `${getBet()} $DMT`;
        })
    }
    if(w=="fight"){
        setTimeout(function () {
            console.log("vrf");
            if(hear){
                sound.stop()
            }
            if(vrf()){
                win = 1;
            } else {
                win = -1;
            }
            document.body.innerHTML += 
                create("button","result","","result()","FIN");
            clearInterval(curInt);
            smash();
        },15000)
    }
}

function vrf() {
    
        // Generate a random number between 0 and 1
        const random = Math.random();
        
        // If the random number is less than 0.5, consider it heads (true)
        // Otherwise, consider it tails (false)
        return random < getRisk();
    
}
