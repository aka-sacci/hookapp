import beerStyles from './style.module.scss';
import { api } from '../../services/api'
import { useState } from 'react';
import { sortBeer} from '../../services/sortBeer';



export function Beers(){
  
  const [beer, setBeer] = useState("Bohemia");
  const [imgBeer, setImgBeer] = useState("boh.png");
  const dirImg = "/Images/"

  function changeBeer(){
    api.get('cervejas')
  .then(function (response) {
    // chama função de aleatoriedade para escolher qual dos itens deve pegar

    const size = response.data.length;
    const beerDraw = sortBeer(size);
    setBeer(response.data[beerDraw].nome);
    setImgBeer(response.data[beerDraw].dir);

  }).catch(function (error) {
    // erro
    setBeer("Não foi possível recuperar a cerveja! :/");
    setImgBeer("error.png");
  });

  }


    return (

       <div className={beerStyles.divMain}>
         <p>Cervejinha hmm</p>
        <img src={dirImg + imgBeer} alt="Cerveja" height='300' width='250'></img>
        <p className={beerStyles.bottomText}> {beer} </p>
        <button onClick={changeBeer}>Sort</button>
       </div>
      
      );
}

