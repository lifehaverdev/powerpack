/*

 __ __ __   ______    _______   ______      
/_//_//_/\ /_____/\ /_______/\ /_____/\     
\:\\:\\:\ \\::::_\/_\::: _  \ \\:::_:\ \    
 \:\\:\\:\ \\:\/___/\\::(_)  \/_  /_\:\ \   
  \:\\:\\:\ \\::___\/_\::  _  \ \ \::_:\ \  
   \:\\:\\:\ \\:\____/\\::(_)  \ \/___\:\ ' 
    \_______\/ \_____\/ \_______\/\______/  
                                            

*/

const web3 = new Web3(Web3.givenProvider); 
var accounts = [];
var team;
var playerXP;
//var friend;
//var totalSup;
//var connected = true;
//var chainScanPre = 'https://etherscan.io/tx/'

const masterABI = [{"inputs":[{"internalType":"address","name":"player1","type":"address"},{"internalType":"uint256","name":"character","type":"uint256"},{"internalType":"uint256","name":"stage","type":"uint256"},{"internalType":"uint256","name":"stock","type":"uint256"},{"internalType":"uint256","name":"reqId","type":"uint256"}],"name":"announce","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"p","type":"address"},{"internalType":"uint256","name":"c","type":"uint256"},{"internalType":"uint256","name":"s","type":"uint256"},{"internalType":"uint256","name":"st","type":"uint256"}],"name":"arm","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"game","type":"uint256"},{"internalType":"bool","name":"p0w","type":"bool"}],"name":"result","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newChance","type":"address"}],"name":"setChance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newEXP","type":"address"}],"name":"setExp","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const expABI = [{"inputs":[{"internalType":"address","name":"id","type":"address"}],"name":"addPlayer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"id","type":"address"},{"internalType":"uint256","name":"char","type":"uint256"}],"name":"addValue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"players","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"id","type":"address"},{"internalType":"uint256","name":"char","type":"uint256"}],"name":"readExp","outputs":[{"internalType":"uint256","name":"exp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"rolo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newWin","type":"uint256"}],"name":"setWin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"win","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const masterAdd = "0x1821BD18CBdD267CE4e389f893dDFe7BEB333aB6";
const expAdd = "0x1821BD18CBdD267CE4e389f893dDFe7BEB333aB6";

const master = new web3.eth.Contract(masterABI, masterAdd);
const exp = new web3.eth.Contract(expABI, expAdd);

connectWallet = async() => {
    console.log('you clicked connect')
    let connected = false;
    try {
        accounts = await web3.eth.requestAccounts().then()
        connected = true;
        console.log('we see this');
    } catch(err) {
        errorTell(err.message);
    }   
    if(connected){
        //var connectbutt = document.getElementById('connectbutt-text');
        //connectbutt.innerText = 'Connected';
        
        var networkId = await web3.eth.net.getId();
        //console.log(networkId);
        if (networkId !== 1) {
        // Show an error message or take other appropriate action
        alert('change your network to main ethereum')
        }
        checkWallet();
    }
}

checkWallet = async() => {
    team = await exp.registrar(accounts[0]).call()
    console.log('team: ',team);
}

//function insertCoin() {}

//function getProps() {}

//function checkBack() {}

////JAVASCRIPT FAKE WEB3

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

fakeConnectWallet = async () => {
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