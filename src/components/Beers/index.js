import beerStyles from './style.module.scss';
import { api } from '../../services/api'
import { useState, useEffect } from 'react';
import { sortBeer} from '../../services/sortBeer';



export function Beers(){
  
  //CONSTS
  const [beer, setBeer] = useState("Carregando...");
  const [imgBeer, setImgBeer] = useState("loading.gif");
  const dirImg = "/Images/";
  const [listBeer, setListBeer] = useState([]);
  const [statusCode, setStatusCode] = useState(true);
  
  //USEEFFECTS
  useEffect(() => {

    (async () => {
      await api.get('cervejas')
      .then(function (response) {
        setListBeer(response.data);
        setStatusCode(true);
        setBeer("Clique em sort para sortear uma nova cerveja!")
        setImgBeer("ok.png");
    
      }).catch(function (error) {
        // nao se comunicou com a api
        setBeer("Não foi possível recuperar a cerveja! :/");
        setImgBeer("error.png");
        setStatusCode(false);
      });
    })();

    }, [])


  //FUNCTIONS
  function apiCheck(){

        setBeer("Carregando...");
        setImgBeer("loading.gif");

        api.get('cervejas')
        .then(function (response) {
          setListBeer(response.data);
          setStatusCode(true);
          setBeer("Clique em sort para sortear uma nova cerveja!")
          setImgBeer("ok.png");
      
        }).catch(function (error) {
          // nao se comunicou com a api
          setBeer("Não foi possível recuperar a cerveja! :/");
          setImgBeer("error.png");
          setStatusCode(false);
        });
}

  function changeBeer(){
    
    if(statusCode === true){
      // chama função de aleatoriedade para escolher qual dos itens deve pegar
    const size = listBeer.length;
    const beerDraw = sortBeer(size);
    setBeer(listBeer[beerDraw].nome);
    setImgBeer(listBeer[beerDraw].dir);
    }
    else
    {
      apiCheck();
    }
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

