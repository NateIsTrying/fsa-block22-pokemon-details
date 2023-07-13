const body = document.querySelector(`h1`);
const ul = document.querySelector('ul');
// const globalPokeArr = [];

// retreive all pokemon
const retrievePokemon = async() => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
        const pokeData = await response.json();
        const pokeResults = pokeData.results;
        printPokeItems(pokeResults);

    } catch (error) {
        console.log('Something went wrong.', error);
    }
    
}

// render all pokemon
const printPokeItems = async(data) => {
    for(let i = 0; i < data.length; i++){
        const li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML = `<a>${data[i].name}</a>`;
        // globalPokeArr.push(data[i].name);
        pokeClick();
    }
    // console.log(globalPokeArr);
}

retrievePokemon();

// have eventListener
const pokeClick = () => { 
    const pokeLinks = document.querySelectorAll('a');
    // console.log(pokeLinks);
    for(let j = 0; j < pokeLinks.length; j++){
        let pokeLink = pokeLinks[j];
        // when clicked retrieve single pokemon
        pokeLink.addEventListener('click',async(event) => {
            event.preventDefault();
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${j+1}/`);
            const pokeData = await response.json();
            // console.log(pokeData.name);
            const h1 = document.querySelector('h1');
            //get singlePokemon and render. 
            h1.innerText = pokeData.name;
        })
    }
}
// use dataset to use attribute



// const getAPokemon = async(link) => {
//     let response; 
    
//     const pokeData = await response.json();
//     const pokeResults = pokeData.results;

// }

