
walletConnect = () => {
    const butt = get("wallet-ask");
    butt.innerHTML = 
        `<img src="public/loading.gif" alt="loading.."/>`
    setTimeout(function (){
        console.log("simulating wallet connection");
        mainMenu();
    }, 2000)
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
