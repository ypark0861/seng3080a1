import { useState } from 'react'
import starLogo from '../assets/star.svg'
import starfillLogo from '../assets/starfill.svg'

const Favorite = ({favoritepost }) => {
    const baseurl = "https://www.reddit.com"
    const [usersfavorites, setUsersFavorites] = useState([])

    const handleFavorite = (uid, subreddit) => {
        console.log(uid, subreddit)
        let resfind = usersfavorites.find((element) => element.id === uid)
        if(resfind !== undefined) {
            setUsersFavorites(
                usersfavorites.filter(favorite => favorite.id !== uid)
            )            
        } else {
            setUsersFavorites([
                ...usersfavorites, 
                { id: uid, value: subreddit }
            ])
        }
        sessionStorage.setItem("favorites", JSON.stringify(usersfavorites))
        console.log(sessionStorage.getItem("favorites"));
    }

    return (
    <div >
        {favoritepost.map(post => (
            <div key={post.id} >
                <div className="card">
                    <h3>TITLE : { post.link_title }</h3>
                    <img src={
                        usersfavorites.find((element) => element.id === post.id) ? 
                        starfillLogo : starLogo}
                        width={30} 
                        onClick={() => handleFavorite(post.id, post.value)} />                    
                    <p>SCORE : { post.score }</p>
                    <a href = {baseurl + post.permalink} target="_blank"></a>
                </div>
            </div>
        ))}
    </div>
    );
}
 
export default Favorite
