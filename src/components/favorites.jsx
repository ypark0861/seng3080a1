// https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
// https://stackoverflow.com/questions/40399873/initializing-and-using-sessionstorage-in-react
// https://www.youtube.com/playlist?list=PL4cUxeGkcC9jpi7Ptjl5b50p9gLjOFani
import { useEffect, useState } from 'react'
import Favorite from './favorite';

const Favorites = () => {
    const [favposts, setFavPosts] = useState([]);
    // http://www.reddit.com/r/news/comments.json?q=1iue08p
    // http://www.reddit.com/r/StockMarket/comments.json?q=1iv1wjw&sort=relevance&limit=1
    const sessionfavorite = sessionStorage.getItem("favorites")
    const fav = JSON.parse(sessionfavorite)
    console.log(fav)

    useEffect(() => {
        fav.map((item) => { 
            fetch(`https://www.reddit.com/r/${item.value}/comments.json?q=${item.id}&sort=relevance&limit=1`)
            .then(response => response.json())
            .then(data => {
            console.log(data.data.children[0].data)
            setFavPosts(
                [
                    ...favposts,
                    data.data.children[0].data
                ]
            )
            console.log(favposts)
            // setIsLoaded(true)
        })
        .catch(error => console.error(error.message));
    })
        
        // const fetchFavoritesReddit = async (favorite) => {
        //     const response = await fetch(`http://www.reddit.com/r/${favorite.value}/comments.json?q=${favorite.id}`)
        //     console.log(response.json())
        // }
    
    }, []);


    return (
        <div>
            <h2>Favorites</h2>
            <div>
                {favposts ? <Favorite favoritepost={favposts} /> : null}
            </div>
        </div>
    );
}
 

export default Favorites;