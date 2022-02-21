import React, {useContext, useEffect} from 'react';
import { UiContext } from '../../context/UiContext';
import VotreCommandeItem from './VotreCommandeItem';
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

function VotreCommande(props) {
    const {articles, setArticles} = props;
    const { handleNext, handleBack, setPaymentPannel } = useContext(UiContext);
    const { commande, setCommande } = useContext(UserContext);
    const history = useHistory();
    let { id } = useParams();
    
    useEffect(() => {
        if( articles && articles.length===0)
            history.push(`/profileRestaurant/${id}`)
    }, [articles])
    
    const confirmCommande = () => {
        if(articles){
            setPaymentPannel((prevPayementPannel) => { return {...prevPayementPannel, votreCommande: "confirmer"} })
            setPaymentPannel((prevPayementPannel) => { return {...prevPayementPannel, infosAdditionnelles: "encours"} })
            setCommande({...commande,total_price:somme2});
        }
    };
    
    const articleOption=articles && articles.articleOptions && articles.articleOptions.map((el)=>el.articleOptions);
    const articleOptionPrice = articleOption &&  articleOption.map((el)=>el.optionPrice);
    
    var somme2=0
    if(articles){
        for( var i = 0; i < articles.length; i++ ){
            somme2+=(articles[i].price * articles[i].quantity)
                if(articles[i].articleOptions){
                    for(var j=0;j<articles[i].articleOptions.length;j++)
                    {
                        somme2 += articles[i].articleOptions[j].optionPrice ;
                    }
                }else{
                    somme2+=articles[i].price * articles[i].quantity
                }
        }
    }
    
    return (
        <div className="orbit-slide">
            <button className="go-next" onClick={() => {handleNext(); confirmCommande()}} >
                Continuer
            </button>
            {articles &&
                <div className="total-to-pay">
                    <span className="total-to-pay-title">Total à payer</span>
                    <span className="total-to-pay-price">{somme2} DT </span>
                </div>
            }
            
            { articles && articles.map((el) => (
                <VotreCommandeItem article={el} articles ={articles} key={el.id} setArticles={setArticles} setCommande={setCommande}/>
            )) }
        
            <div className="slide-three-bottom">
                <div className="return" onClick={handleBack}> </div>
                <div className="go-next" onClick={() => {handleNext(); confirmCommande()}}>
                    <button>Continuer</button>
                </div>
            </div>
        </div>     
    )
}

VotreCommande.propTypes = { }

export default VotreCommande

