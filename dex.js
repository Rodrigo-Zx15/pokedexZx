//seletores
  //botoes+input  
const buttonPrevious = document.querySelector('#button-prev');
const buttonNext = document.querySelector('#button-next');
const userInput = document.querySelector('#poke-search');
const searchButton = document.querySelector('#button-search');

  //estaticos
const img = document.querySelector('.img-thumbnail');
const nameBox = document.querySelector('#name-screen p');
const type1Box = document.querySelector('#type-1'); 
const type2Box = document.querySelector('#type-2'); 
const statsBoxes = Array.from(document.querySelectorAll('#stats div:nth-child(n+7)'));


//sim.
let id = 0; 
let previousType;
let previousType2;

//functions
function randomDex(){
    return Math.floor(Math.random() * (899-1) + 1);
}
async function getPoke(id){
    try{
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const data = response.data;
        return data;
    }catch(error){
        alert('Sorry! An error has ocurred: ' + error);
    }
        
}

function placeData(pokemon){
    //console.log(pokemon);
    nameBox.innerText = `#${pokemon.id}: ${pokemon.name.toUpperCase()}`;
    img.src = pokemon.sprites.other['official-artwork'].front_default;;
    
    
    //console.log(pokemon.stats);
    for(let i = 0;i<6;i++){
        statsBoxes[i].innerText = pokemon.stats[i].base_stat;
    }
    console.log(pokemon.types);
    if(pokemon.types.length > 1){
        type2Box.style.display = '';
        currentType2 = pokemon.types[1].type.name;
        type2Box.classList.toggle(`${previousType2}`);
        type2Box.classList.toggle(`${currentType2}`);
        type2Box.innerText = currentType2;
        previousType2 = currentType2;
        
    }else{
        type2Box.style.display = 'none';
        //prevType2 = currentType2;
    }

    currentType = pokemon.types[0].type.name;
    type1Box.classList.toggle(`${previousType}`);
    type1Box.innerText = currentType;
    type1Box.classList.toggle(`${currentType}`);
    previousType = currentType;
    
    id = pokemon.id;
}


//listeners
window.addEventListener('load', async function(){
    id = randomDex();
    const pokemon = await getPoke(id);
    placeData(pokemon);

})
buttonPrevious.addEventListener('click',async function(){
    id--;
    if(id < 1){
        alert('Invalid dex ID');
        id = 1;
    }
    let pokemon = await getPoke(id);
    placeData(pokemon);
})
buttonNext.addEventListener('click', async function(){
    id++;
    if(id > 898){
        alert('Invalid dex ID');
        id = 898;
    }
    let pokemon = await getPoke(id);
    placeData(pokemon);
})

searchButton.addEventListener('click', async function(){
    let search = userInput.value;
    userInput.value = '';
    let pokemon = await getPoke(search.toLowerCase());
    placeData(pokemon); 
});

//https://pokeapi.co/api/v2/pokemon/{id or name}/