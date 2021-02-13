//seletores
  //botoes+input  
const prev = document.querySelector('#button-prev');
const next = document.querySelector('#button-next');
const input = document.querySelector('#poke-search');
const btn = document.querySelector('#button-search');

  //estaticos
const img = document.querySelector('.img-thumbnail');
const nameScreen = document.querySelector('#name-screen p');
const type1 = document.querySelector('#type-1'); 
const type2 = document.querySelector('#type-2'); 
const stats = Array.from(document.querySelectorAll('#stats div:nth-child(n+7)'));


//sim.
let id = 0; 
let prevType = null;
let prevType2 = null;

//functions
function randomDex(){
    return Math.floor(Math.random() * (899-1) + 1);
}
async function getPoke(id){
    const req = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = req.data;
    return data;
}

function placeData(pokemon){
    //console.log(pokemon);
    nameScreen.innerText = `#${pokemon.id}: ${pokemon.name.toUpperCase()}`;
    img.src = pokemon.sprites.other['official-artwork'].front_default;;
    
    
    //console.log(pokemon.stats);
    for(let i = 0;i<6;i++){
        stats[i].innerText = pokemon.stats[i].base_stat;
    }
    console.log(pokemon.types);
    if(pokemon.types.length > 1){
        type2.style.display = '';
        currentType2 = pokemon.types[1].type.name;
        type2.classList.toggle(`${prevType2}`);
        type2.classList.toggle(`${currentType2}`);
        type2.innerText = currentType2;
        prevType2 = currentType2;
        
    }else{
        type2.style.display = 'none';
        //prevType2 = currentType2;
    }

    currentType = pokemon.types[0].type.name;
    type1.classList.toggle(`${prevType}`);
    type1.innerText = currentType;
    type1.classList.toggle(`${currentType}`);
    prevType = currentType;
    
    id = pokemon.id;
}


//listeners
window.addEventListener('load', async function(){
    id = randomDex();
    const pokemon = await getPoke(id);
    placeData(pokemon);

})
prev.addEventListener('click',async function(){
    id--;
    if(id < 1){
        alert('Invalid dex ID');
        id = 1;
    }
    let pokemon = await getPoke(id);
    placeData(pokemon);
})
next.addEventListener('click', async function(){
    id++;
    if(id > 898){
        alert('Invalid dex ID');
        id = 898;
    }
    let pokemon = await getPoke(id);
    placeData(pokemon);
})

btn.addEventListener('click', async function(){
    search = input.value;
    input.value = '';
    let pokemon = await getPoke(search.toLowerCase());
    placeData(pokemon); 
});

//https://pokeapi.co/api/v2/pokemon/{id or name}/