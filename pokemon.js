const content = document.querySelector('#content'); 

// retreive all pokemon
const retrievePokemon = async() => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
        const pokeData = await response.json();
        return pokeData.results;

    } catch (error) {
        console.log('Something went wrong.', error);
    }
    
}

// render all pokemon
const pokeRender = (pokeArray) => {
    const pokeLis = pokeArray.map((singlePokemon) =>{
        const urlSplit = singlePokemon.url.split(`/`);
        const pokeId = urlSplit[6];
        return `<li><a data-number='${pokeId}'>${singlePokemon.name}</a></li>`;}).join(``);

    const content = document.querySelector('#content');    
    const ul = document.createElement('ul');
    content.appendChild(ul);
    ul.innerHTML = pokeLis;
}



// have eventListener
const pokeClick = () => { 
    const pokeLinks = document.querySelectorAll('a');
    // console.log(pokeLinks.length);
    for(let i = 0; i < pokeLinks.length; i++){
        let pokeLink = pokeLinks[i];
        // when clicked retrieve single pokemon
        pokeLink.addEventListener('click', async(event) => {
            event.preventDefault();
            const pokeNumber = pokeLink.dataset.number;
            const linkResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNumber}/`);
            const linkData = await linkResponse.json();

            singlePokeDetails(linkData, pokeNumber);

            backButtonEvents();

        })
    }
}

const singlePokeDetails = (data,number) => {
    content.innerHTML = ``;

    const h2 = document.createElement('h2');
    h2.innerText = `#${number}: ${data.name}`;
    content.appendChild(h2);

    const img = document.createElement('img');
    const pokeSprite = data.sprites.front_default;
    img.setAttribute('src', pokeSprite);
    content.appendChild(img);

    const typeArr = [];
    (data.types).forEach((num) => {
        typeArr.push(num.type.name);                
    })
    const typeFinal = typeArr.join()
    const typeH3 = document.createElement('h3');
    content.appendChild(typeH3);
    typeH3.innerText = `Type: ${typeFinal}`;

    // add unique abilities from abilities array
    const abilityArr = [];
    (data.abilities).forEach((num) => {
        abilityArr.push(num.ability.name);                
    })
    const abilityFinal = abilityArr.join()
    const abilityH3 = document.createElement('h3');
    content.appendChild(abilityH3);
    abilityH3.innerText = `Abilities: ${abilityFinal}`
}

const backButtonEvents = () =>{
    const backButton = document.createElement('button');
    content.appendChild(backButton);
    backButton.innerText = `Go Back!`;
    backButton.addEventListener('click', async()=> {
        init();
    })
    // pokeRender(await retrievePokemon())
}


// use init to initalize all crucial functions in order
const init = async() => {
    content.innerHTML = '';
    pokeRender(await retrievePokemon());
    pokeClick();
}

init();
