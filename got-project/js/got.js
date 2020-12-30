'use strict';

let charactersDiv = document.querySelector('.characters');
let bigImg = document.querySelector('.bigImg');
let house = document.querySelector('.house');
let charDescriptionText = document.querySelector('.charDescription');
let characterName = document.querySelector('h4');
let houseImg = document.querySelector('.houseImg');
let resultLive = [];

async function request(url) {
    try {
        const response = await fetch(url);
        const result = await response.json();

        resultLive = result.filter(item => !item.dead);

        resultLive.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });

        for (let char of resultLive) {
            let charDiv = document.createElement('div');
            charactersDiv.appendChild(charDiv);
            let charImg = document.createElement('img');
            charDiv.appendChild(charImg);
            charImg.setAttribute('src', `../got-project/${char.portrait}`);
            let charName = document.createElement('p');
            const charDescription = () => {
                bigImg.setAttribute('src', `../got-project/${char.picture}`);
                characterName.textContent = `${char.name}`;
                houseImg.setAttribute('src', `../got-project/assets/houses/${char.house}.png`);
                charDescriptionText.textContent = `${char.bio}`;
            }
            charName.addEventListener('click', charDescription);
            charDiv.appendChild(charName);
            charName.textContent = `${char.name}`;
        }
    } catch (error) {
        console.error(error);
    }
}
request('./got-project/json/got.json');