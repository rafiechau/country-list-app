import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Container from "../styles/homepage.module.scss";

function FavoritePage() {
    const [favorites, setFavorites] = useState([]);

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

    return (
        <div>
            <h2 className={Container.titlefavorite}>Your Favorite Countries</h2>
            <section className={Container.cardlist}>
        {favorites.map((item) => {
            const isFavorite = favorites.some(fav => fav.name.common === item.name.common); // Pindahkan ke sini

            return (
                <div className={Container.countrycard} key={item.name.common}>
                    <Link to={`/detail/${item.name.common}`}>
                        <img src={item.flags.svg} alt={item.name.common} />
                        <h2 className={Container.cardtitle}>{item.name.common}</h2>
                        <div className={Container.cardinfo}>
                            <p>Population: {item.population}</p>
                            <p>Region: {item.region}</p>
                            <p>Capital: {item.capital}</p>
                        </div>
                    </Link>
                    <button className={Container.favorite} onClick={() => handleLike(item)}>
                        <FavoriteIcon style={{ color: isFavorite ? 'red' : 'gray' }} />
                    </button>
                </div>
            );
        })}
    </section>
        </div>
    );
}

export default FavoritePage;