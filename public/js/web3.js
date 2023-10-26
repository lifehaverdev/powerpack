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
var found;
//var friend;
//var totalSup;
//var connected = true;
//var chainScanPre = 'https://etherscan.io/tx/'

const masterABI = [{"inputs":[{"internalType":"address","name":"p","type":"address"},{"internalType":"uint32","name":"c","type":"uint32"},{"internalType":"uint32","name":"s","type":"uint32"},{"internalType":"uint32","name":"st","type":"uint32"}],"name":"arm","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"game","type":"uint256"}],"name":"readDub","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"game","type":"uint256"}],"name":"readSchedule","outputs":[{"components":[{"internalType":"address","name":"player0","type":"address"},{"internalType":"uint32","name":"char","type":"uint32"},{"internalType":"uint32","name":"stock","type":"uint32"},{"internalType":"bool","name":"a","type":"bool"},{"internalType":"bool","name":"w","type":"bool"},{"internalType":"bool[10]","name":"score","type":"bool[10]"}],"internalType":"struct IPPOMaster.Game","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"game","type":"uint256"},{"internalType":"bool","name":"p0V","type":"bool"},{"internalType":"bool[10]","name":"p0ws","type":"bool[10]"}],"name":"result","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newChance","type":"address"}],"name":"setChance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newEXP","type":"address"}],"name":"setExp","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const expABI = [{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"},{"internalType":"uint32","name":"","type":"uint32"}],"name":"addValue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"id","type":"address"},{"internalType":"uint32","name":"char","type":"uint32"}],"name":"readExp","outputs":[{"internalType":"uint32","name":"xp","type":"uint32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"id","type":"address"}],"name":"readRegistrar","outputs":[{"components":[{"internalType":"uint32","name":"first","type":"uint32"},{"internalType":"uint32","name":"second","type":"uint32"},{"internalType":"uint32","name":"third","type":"uint32"},{"internalType":"uint32","name":"fourth","type":"uint32"},{"internalType":"uint32","name":"fifth","type":"uint32"},{"internalType":"uint32","name":"sixth","type":"uint32"}],"internalType":"struct IPPEXP1.Team","name":"","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32[6]","name":"","type":"uint32[6]"}],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const masterAdd = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
const expAdd = "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9";

const master = new web3.eth.Contract(masterABI, masterAdd);
const exp = new web3.eth.Contract(expABI, expAdd);

console.log('version 1');

connectWallet = async() => {
    console.log('you clicked connect')
    let connected = false;
    try {
        accounts = await web3.eth.requestAccounts().then()
        connected = true;
        console.log('we see this');
        onChained = true;
    } catch(err) {
        errorTell(err.message);
    }   
    if(connected){
        //var connectbutt = document.getElementById('connectbutt-text');
        //connectbutt.innerText = 'Connected';
        
        var networkId = await web3.eth.net.getId();
        //console.log(networkId);
        if (networkId !== 31337) {
        // Show an error message or take other appropriate action
        alert('change your network to foundry ethereum')
        }
        checkWallet();
    }
}

checkWallet = async() => {
    walletPacks = await exp.methods.readRegistrar(accounts[0]).call()
    console.log('team: ',walletPacks);
    await getUserExp();
    mainMenu();
}

arm = async() => {
    console.log('arm');
    if(onChained){
        try {
            lastGame = await master.methods.arm(accounts[0],character,arena,stocks).send({
                from: accounts[0]
            });
            console.log('last game',lastGame);
            go(lastGame);
        } catch(err) {
            console.log('arm error',err);
        }
    } else {
        battle();
    }
}

arm2 = async() => {

        // Sending the transaction and listening for the event
    const tx = await master.methods.arm(accounts[0],character, arena, stocks).send({
        from: accounts[0]
    });

    // Get the transaction receipt to access the event logs
    const receipt = await web3.eth.getTransactionReceipt(tx.transactionHash);
    console.log('arm2 receipt ',receipt)
    // Filter the logs to find the event you emitted
    const armResultLog = receipt.logs.find((log) => log.topics[0] === web3.utils.keccak256('Fight(uint256,address,uint32,uint32,uint32)'));

    if (armResultLog) {
        const data = armResultLog.data; // Get the data field of the log
        const uint256Hex = "0x" + data.slice(2, 66); // Assuming the uint256 is 32 bytes (64 characters)
        const uint256Value = web3.utils.toBN(uint256Hex);
        var reqId = web3.utils.toBN(uint256Value); // Convert the data to a BigNumber
        reqId = reqId.toString();
        console.log('reqId:', reqId);
    } else {
        console.log('Event not found or no result.');
    }
    go(reqId);
}

go = async(id) => {
    console.log('goin');
    let count = 0;
    wait();
    let checkInterval = setInterval(()=>{
        console.log('check',count);
        watch(id);
        if(found) {
            clearInterval(checkInterval);
            found = false;
            battle();
        }
        if(count > 20){
            clearInterval(checkInterval);
            mainMenu();
        }
        count++
    },5000);
}

watch = async(id) => {
    if(await checkGame(id)){
        console.log('we got a live one');
        found = true;
    };
}

checkGame = async(id) => {
    console.log('checking game');
    let a = false;
    let game;
    const idBN = web3.utils.toBN(id);
    try {
        game = (await master.methods.readSchedule(idBN).call());
        a = game[3];
    } catch (err) {
        console.log('checkGame error ',err);
    }
    if(a) {
        console.log('game in check game',game);
        loadScore(game[5]);
    }
    console.log('a',a);
    return a;
}

function loadScore(res) {
    score = new Array(stocks*2);
    for(let i = 0; i < score.length; i++){
        score[i] = res[i];
    }
    console.log('score',score);
}

getUserExp = async() => {
    let xp = 0;
    for(let i = 0; i < 6; i++){
        // console.log('wallet packs',walletPacks[i])
        xp += parseInt(await checkExp(accounts[0],walletPacks[i]));
    }
    console.log('user exp', xp);
    userXP = xp;
    return xp;
}

checkExp = async(address,id) => {
    let xp = 0;
    try {
        xp = await exp.methods.readExp(address,id).call();
        // console.log('xp in checkExp',xp);
    } catch (err) {
        console.log(err);
    }
    return xp;
}

defeat = async() => {
    //table = table - parseFloat(getBet());
    win = -1;
    await updateBar();
}

victory = async() => {
    streak++;
    win = 1;
    await updateBar()
}

//function insertCoin() {}

//function getProps() {}

//function checkBack() {}

////JAVASCRIPT FAKE WEB3

fund = async(amt) =>  {
    fakeTransaction(`pls pay ${amt} ETH to play`);
    //amt = parseFloat(amt);
    // playerWallet = playerWallet - amt;
    // purse = purse + amt;
    // table = table + amt;
    await updateBar();
}

fakeConnectWallet = async () => {
    const butt = get("wallet-ask");
    butt.innerHTML = 
        `<img src="loading.gif" alt="loading.."/>`
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
        // setTimeout(function() {
        //     console.log('chainchekced');
        //     console.log(userExp[i])
        //     if(userExp[i]){
        //         get('exp').innerHTML = "exp: " + `${userExp[i]}`;
        //     } else {
        //         get('exp').innerHTML = "exp: " + "0";
        //     }
        //     get('name').innerHTML = "name: " + "";
        //     return ["355","3",""];
        // },500)
        return checkExp(accounts[0],i);
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