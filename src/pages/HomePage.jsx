import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../styles/homepage.module.scss";
import { 
    Pagination,
  } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {getAllCountry} from "../domain/api";
import FilterNavigation from "../components/FilterNavigation";

function HomePage(){
    const [favorites, setFavorites] = useState([])
    const [country, setCountry] = useState([]);
    const [pagination, setPagination] = useState(1);
    const [filter, setFilter] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState("All");
    const maxItemPage = 12;

    useEffect(() => {
      const getData= async () => {
        try{
            const data = await getAllCountry();
            setCountry(data)
        }catch(error){
          console.log('Gagal mengambil data negara:', error)
        }
      }

      getData()
    }, []);

    useEffect(() => {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
      }
  }, []);

      const handleLike = (item) => {
        const newFavorites = [...favorites];
        const isFavorite = newFavorites.some((fav) => fav.name.common === item.name.common);
        
        if (isFavorite) {
            const updatedFavorites = newFavorites.filter((fav) => fav.name.common !== item.name.common);
            setFavorites(updatedFavorites);
        } else {
            newFavorites.push(item);
            setFavorites(newFavorites);
        }
        
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };
    const onKeywordChangeHandler = (val) => {
        const filteredResult = country.filter((item) =>
          item.name.common.toLowerCase().includes(val.toLowerCase())
        );
    
        setFilter(filteredResult);
        setPagination(1)
      };

    const allData = filter.length > 0 ? filter : country

    const handlePageChange = (event, page) => {
        setPagination(page)
    }

    const handleRegionChange = (event) => {
        const selectedRegion = event.target.value
        setSelectedRegion(selectedRegion)
        setPagination(1)
    }

    const filteredByRegion = selectedRegion === "All" ? allData : allData.filter((item) => item.region.toLowerCase() === selectedRegion.toLowerCase())
    
  
    const lastIndex = pagination * maxItemPage;
    const firstIndex = lastIndex - maxItemPage;
    const indexExist = filteredByRegion.slice(firstIndex, lastIndex);

    const renderCountry = () => {
        return indexExist?.map((item) => {
          const isFavorite = favorites.some(fav => fav.name.common === item.name.common);
          return(
            <>
              <div className={Container.countrycard}>
               <Link to={`/detail/${item.name.common}`}>
                  <img src={item.flags.svg} alt={item.name.common} />
                    <h2 className={Container.cardtitle}>{item.name.common}</h2>
                    <div className={Container.cardinfo}>
                    <p>Population: {item.population}</p>
                    <p>Region: {item.region}</p>
                    <p>Capital: {item.capital}</p>
                </div>
               </Link>
                
              {/* <button className="favorite" onClick={() => handleLike(item)}><FavoriteIcon /></button> */}
              <button className={Container.favorite} onClick={() => handleLike(item)}>
                    <FavoriteIcon style={{ color: isFavorite ? 'red' : 'gray' }} />
                </button>
        </div>
            </>
          )
        });
      };
    
      

      return (
        <>
          <div className={Container.content}>
            <FilterNavigation onChange={onKeywordChangeHandler} 
                              selectedRegion={selectedRegion} 
                              handleRegionChange={handleRegionChange} />
              
          </div>
          <section className={Container.cardlist}>
            {
                renderCountry()
            }
          </section>
          <Pagination
            count={Math.ceil(allData.length / maxItemPage)}
            page={pagination}
            onChange={handlePageChange}
            shape="rounded"
            sx={{ pb: 5, mt: 4 }}
          />
        </>
      );
}

export default HomePage;