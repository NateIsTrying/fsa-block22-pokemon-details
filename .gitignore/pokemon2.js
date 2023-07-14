// get pokemon API
//get the results
const getPokemon = async() => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
        const pokeData = await response.json(); 
        
        return pokeData.results;

    } catch (error) {
        console.log(`Something went wrong`, error);
    }
}

// getPokemon();

// render function
const pokeRender = (pokeArray) => {
    // use map, and split the url of a single pokemon
    const pokeToLi = pokeArray.map((singlePokemon)=> {
        // isolate the pokemon's id # from url
        const urlSplit = singlePokemon.url.split('/');
        // store the number in the data of the HTML anchor tag
        const pokeId = urlSplit[6];
        return `<li><a data-number='${pokeId}'>${singlePokemon.name}</a></li>`;
        }).join('');

    const ul = document.querySelector('ul');
    // store mapped value in the ul HTML
    ul.innerHTML = pokeToLi;
}

// pokeRender();



// store eventListener inside an arrow function
const pokeLinkListeners = () => {
    // grab all anchor tags for js
    const allAnchors = document.querySelectorAll('a');
    // loop through all anchor tags
    for(let i = 0; i < allAnchors.length; i++){
        const aPokeLink = allAnchors[i];
        // create addEventListener 
        aPokeLink.addEventListener('click', async(event) => {
            event.preventDefault();
            // pull value from data set for pokemon number
            const pokeNum = aPokeLink.dataset.number;
            // reassign response and data for links
            const linkResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`);
            const linkData = await linkResponse.json();
            const p = document.querySelector('p');
            // attach JSON.stringigy to tag of choice
            p.innerText = JSON.stringify(linkData, null, 2);
        });
    };
};




// create init function to activate render while waitng for getPokemon and linkListeners
const init = async() => {
    pokeRender(await getPokemon());
    pokeLinkListeners();
};


// activate init
init();


// Extra Credit: 

// study stringify and dataset

// study init functions and async and await

// Study Wyatt's project, learn what you can, 
