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
            +
            create("div","bar","","",
                create("button","back","","back()","BACK")
                +
                create("button","vol","","soundSwitch()","SOUND")
                +
                create("div","balance","","",
                    create("h3","wallet","","",`WALLET:${playerWallet}$DMT`)
                    +
                    create("h3","table","","",`TABLE:${table}$DMT`)
                    +
                    create("h3","purse","","",`PURSE:${purse}$DMT`)
                )
                +
                create("button","cash-out","","collect()","Collect")
            )
        )
    )
}

function updateBar() {
    get('wallet').innerHTML = `WALLET:${playerWallet}$DMT`;
    get('table').innerHTML = `TABLE:${table}$DMT`;
    get('purse').innerHTML = `PURSE:${purse}$DMT`;
}

function soundSwitch() {
    hear = !hear;
    sound.stop();
    menu.stop();
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