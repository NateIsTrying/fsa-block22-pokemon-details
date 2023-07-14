
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

    const ul = document.querySelector('ul');
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
            // console.log(linkData);
            const p = document.querySelector('p');
            //get singlePokemon and render. 
            p.innerText = JSON.stringify(linkData, null, 2);;
        })
    }
}

// use init to initalize all crucial functions in order
const init = async() => {
    pokeRender(await retrievePokemon());
    pokeClick();
}

init();
