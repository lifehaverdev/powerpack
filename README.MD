# MILADYSTATION FIRST RELEASE: POWER PACKS ONCHAINED

This dApp web game is a simple coinflip happening onchain using chainlink vrf, and a smashbros skin, with pokemon exp leveling.

Players pay to play to fund the vrf subscription on the arbitrum blockchain. If they win, they received experience points linked to their Power Pack NFT to get on the leaderboard and unlock new fighting locations, animations and game modes.

The website uses javascript and html to animate the characters and web assets. The game interactions are intermediated with web3js. There is offline play without setting up the onchain activity.

For testing, there is a separate repo that contains a foundry project that you can run on anvil to simulate the web3 version.

## setup

The website is a static page sight. You can run the game simply by opening the index.html located in the public folder.

In order to run the site on a local web server you must install the node packages.

```
npm i
```

To run the server use the command

```
npm start
```

If you make changes to the code, end the server using control+c on mac. Then npm start again to reset it.

## onchained

The Onchained foundry repo and startup instructions can be found here:

https://github.com/jfkwebdev/PPO

