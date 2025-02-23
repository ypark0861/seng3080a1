// FILE : favorites.jsx
// PROGRAMMER : Yujung Park
// FIRST VERSION : 2025-02-20
// DESCRIPTION : this favorites.jsx is a component for the user's favorites display and calls the favorite component
// https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
// https://stackoverflow.com/questions/40399873/initializing-and-using-sessionstorage-in-react
// https://www.youtube.com/playlist?list=PL4cUxeGkcC9jpi7Ptjl5b50p9gLjOFani
// https://react.dev/reference/react/useEffect#fetching-data-with-effects
// https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
import { useEffect, useState } from 'react'
import Favorite from './favorite';

const Favorites = () => {
    const [favposts, setFavPosts] = useState([]);
    // http://www.reddit.com/r/news/comments.json?q=1iue08p
    // http://www.reddit.com/r/StockMarket/comments.json?q=1iv1wjw&sort=relevance&limit=1
    const sessionfavorite = sessionStorage.getItem("favorites")
    const fav = JSON.parse(sessionfavorite)

    function fetchfavorite () {
        console.log("fetch",fav)
        fav.map((item) => {
            console.log(fav, typeof fav)
            fetch(`https://www.reddit.com/r/${item.value}/comments.json?q=${item.id}&sort=relevance&limit=1`)
            .then(response => response.json())
            .then(data => {
            console.log(`api for ${item.value}-${item.id}`, data)
            // setFavPosts({id: item.id, post: data})
            favposts.push({id: item.id, post: data})
            console.log("Favorites", favposts)
        })
        .catch(error => console.error(error.message))
        }, [fav])
    }
   
    useEffect(() => { 
        fetchfavorite ()
    }, []);


    return (
        <div>
            {/* <h2>Favorites</h2> */}
            <div>
                {favposts ? <Favorite usersfavs={favposts} /> : null}
            </div>
        </div>
    );
}
 

export default Favorites;