//var playerWallet = 50 //dmt
//var purse = 50 //dmt
//var table = 0;
//const safety = 8

function fund(amt) {
    fakeTransaction(`pls pay ${amt} ETH to play`);
    //amt = parseFloat(amt);
    // playerWallet = playerWallet - amt;
    // purse = purse + amt;
    // table = table + amt;
    updateBar();
}

function defeat() {
    //table = table - parseFloat(getBet());
    win = -1;
    updateBar();
}

function victory() {
    //bet = parseFloat(bet);
    //table = table + bet;
    streak++;
    win = 1;
    addExp(character);
    updateBar()
}

walletConnect = async () => {
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
    walletPacks = await checkChain("checkPacks");
    mainMenu();
}

fakeTransaction = (w) => {
    alert(w)
}

writeChain = async(w) => {
    if(w=="fight"){
        fakeTransaction('you are now sending an amount of eth on arb to pay for the vrf');
        score = vrf(stocks*2);
        // if(hear){
        //     sound.stop()
        // }
    }
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
            //get("odds").innerHTML = "odds: " + `${getRisk()}`;
            //get("wager").innerHTML = "wager: " + `${getBet()} $DMT`;
        })
    }
    if(w == "checkPacks"){
        //return [171,2,4];
        return [];
    }
}

function vrf(num) {
    //console.log(score,'inside vrf');
    let ran = [];
    for(let i = 0; i < num; i++){
        // Generate a random number between 0 and 1
        var random = Math.random();
        // console.log(random);
        // If the random number is less than 0.5, consider it heads (true)
        // Otherwise, consider it tails (false)
        ran.push(random < parseFloat(.5));
    }
    console.log('score',ran)
    random = ran;
    return ran;
}

function simRf(odd) {
    const random = Math.random();
    return random < odd;
}

function getPrizeSim(wage, odd) {
    return (wage * (.5 / odd));
}

function printMulti() {
    for(let i = 0; i < 100; i++){
        let odd = (i/100);
        console.log('odd',odd,'multi',(1 * (.5/odd) * (1.5 - odd)))
    }
}

function sim(odd) {
    var play = 100;
    var tabl = 0;
    var purs = 1000;
    var wage;
    const turn = 1000;

    wage = 1;
    var count = 10000;
    while(play > 0 && count > 0 && tabl < purs){
        if(tabl < wage){
            play = play - (wage - tabl);
            tabl = tabl + (wage - tabl);
            purs = purs + (wage - tabl);
        }
        if(tabl > 10){
            play = play + tabl;
            purs = purs - tabl;
            tabl = 0;
        }
        var game = simRf(odd);
        if(game){
            //win
            tabl = tabl + getPrizeSim(wage,odd);
        } else {
            tabl = tabl - wage;
        }
        count --;
    }
    console.log(`sim complete for odds ${odd} table:`,tabl,'player',play,'purs',purs)

}