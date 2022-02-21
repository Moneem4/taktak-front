import React,{useEffect,useState} from 'react';
import { CircularProgress } from '@material-ui/core';
import chief from './chief.svg';
import Results from './Results';

function AutourDeMoiResult(props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false)
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    
    const loader =   ( <div id="loading" className="autour-de-moi-loading">
      <div className="loading-inner">
        <div  ><CircularProgress className="chief"  size={300}  thickness={1.6} style={{color:"#ff6900"}} />   <img className="chief" src={chief} /></div>
    
      </div>
      <div className="loading-info">
        <span>
          Momtéééz!
        </span>
        <p>
          Nous sommes entrain de préparer votre espace «&nbsp;Autour de moi&nbsp;» selon tes dernières préférences.
          Vous pouvez à tout moment les mettre à jour.
        </p>
      </div>
    </div>)

    return (
      <div style={{marginTop: 50}}>
          {loading? loader : <Results/>}
      </div>
    )
}

export default AutourDeMoiResult

