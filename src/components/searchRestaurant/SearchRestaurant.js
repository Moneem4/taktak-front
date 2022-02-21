import React ,{useState,useEffect,useContext} from 'react';
import "./searchRestaurant.css"
import { useParams } from "react-router";
import RestaurantCardSearch from './RestaurantCardSearch';
import { RestaurantContext } from '../../context/RestaurantContext';
import SideBarSearchResto from "../sideBar/SideBarSearchResto";
import Slider from 'infinite-react-carousel';
import UserSearchCard from './UserSearchCard';

function SearchRestaurant(props) {
  let { searchValue } = useParams();
  const [openFilter, setOpenFilter] = useState(false)
  const [filterValue, setFilterValue] = useState(null)
  const [results, setResults] = useState(null)
  const {searchRestaurantByKeyWord} = useContext(RestaurantContext,setResults)

  useEffect(() => {
    searchRestaurantByKeyWord(searchValue,setResults)
    // setfilterSearch(filtres, setData)
  }, [props]);

  const settings =  {
    slidesPerRow: 4,
    centerMode: true,
    //centerPadding: 120,
    dots: false
  };

  const categories = ["Loremispum", "Pasta", "Fruits de mer", "Cuisine Tunisie", "Sans alchool"]
  const items = categories.map((el) => (
      <div className="carousel-cell">  <span>{el}</span> </div>
  ));

console.log(results,'searchresults')
  return (
    <div className="recherche-resto-page">
      <div className="recherche-resto-page-content container">   
        <div className="recherche-resto-page-content-feed">
          <div className="feed-main">
            <div className="thai-food">
              <span>{searchValue}</span>
            </div>
            {/* <div class="categories">
            <div class="category">
              <span>Pasta</span>
            </div>
            <div class="category">
              <span>Loremispum</span>
            </div>
            <div class="category">
              <span>Fruits de mer</span>
            </div>
            <div class="category">
              <span>Sans alchool</span>
            </div>
            <div class="category">
              <span>Cuisine Tunisie</span>
            </div>
          </div> */}
            {/* <div className="carousel" data-flickity="{ &quot;groupCells&quot;: true }">
              <div className="carousel-cell">  
                <span>Pasta</span> 
              </div>
              <div className="carousel-cell"> 
                <span>Fruits de mer</span> 
              </div>
              <div className="carousel-cell">  <span>Loremispum</span> </div>
              <div className="carousel-cell">  <span>Loremispum</span> </div>
              <div className="carousel-cell">  <span> Pasta</span></div>
              <div className="carousel-cell">  <span>Fruits de mer</span> </div>
              <div className="carousel-cell">  <span>Loremispum</span> </div>
              <div className="carousel-cell">  <span> Pizza</span></div>
              <div className="carousel-cell">  <span> Salades</span></div>
              <div className="carousel-cell">  <span> Café</span></div>
              <div className="carousel-cell">  <span> Pasta</span></div>
            </div>
            */}
            <UserSearchCard />
            <div style={{marginTop: 20}}>
              <Slider { ...settings }>
                {items}
              </Slider>
            </div>
            <div className="search-result">
              <span className="number-result">Sousse, {results && results.length} restaurants trouvés</span>
              <div className="filter">
                <span onClick={() => setOpenFilter(!openFilter)} style={!openFilter?{display : "block"} : {display : "none"}}>Les plus évalués </span>
                <i className="fal fa-sort-down" onClick={() => setOpenFilter(!openFilter)} style={!openFilter?{display : "block"} : {display : "none"}} />
                <div className="filter-pane"  style={openFilter?{display : "block"} : {display : "none"}}>
                  <div className="filter-header" onClick={() => setOpenFilter(!openFilter)}>
                    Filtrez l’affichage des restaurants
                    <i className="fal fa-sort-up"  />
                  </div>
                  <div className="filter-content">
                    <span onClick={()=>setFilterValue("Nouveaux")} className={filterValue === "Nouveaux" ?" content-title clicked" : "content-title"  }>Nouveaux</span>
                    <span onClick={()=>setFilterValue("Les plus évalués")} className={filterValue === "Les plus évalués" ?" content-title clicked" : "content-title"  }>Les plus évalués</span>
                    <span onClick={()=>setFilterValue("Les plus appreciés")} className={filterValue === "Les plus appreciés" ?" content-title clicked" : "content-title"  }>Les plus appreciés</span>
                    <span onClick={()=>setFilterValue("Les plus visités")} className={filterValue === "Les plus visités" ?" content-title clicked" : "content-title"  }>Les plus visités</span>
                  </div>
                </div>
              </div>
            </div>
          
            {results && results.map((result) => (
              <RestaurantCardSearch result={result} />
            ))}
            
          </div>
          <SideBarSearchResto />
        </div>
      </div>
    </div>
  )
}

SearchRestaurant.propTypes = {

}

export default SearchRestaurant

