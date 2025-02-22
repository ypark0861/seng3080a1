// https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
// https://serene-r.tistory.com/64
// https://react.dev/learn/updating-arrays-in-state

import { useState } from 'react'
import starLogo from '../assets/star.svg'
import starfillLogo from '../assets/starfill.svg'

const Post = ({ subreddit, posts }) => {
    const baseurl = "https://www.reddit.com"
    const [usersfavorites, setUsersFavorites] = useState([])
    // console.log(Object.keys(posts).length);
    // console.log(posts)
    // id, title, score, permalink: /r/news/comments/1iu72xo/senate_confirms_kash_patel_as_fbi_director_in/
    const handleFavorite = (uid, subreddit) => {
        console.log(uid, subreddit)
        let resfind = usersfavorites.find((element) => element.id === uid)
        console.log(resfind)

        const newFav = { id: uid, value: subreddit };

        if(resfind !== undefined) {
            setUsersFavorites(
                usersfavorites.filter(favorite => favorite.id !== uid)
            )            
        } else {
            setUsersFavorites([...usersfavorites, newFav])
            console.log(usersfavorites);
        }
        sessionStorage.setItem("favorites", JSON.stringify(usersfavorites))
        console.log(sessionStorage.getItem("favorites"));
    }

    return (
        <div >
            {posts.map(post => (
                <div key={post.data.id} >
                    <div className="card">
                    <h3>TITLE : { post.data.title }</h3>
                    <img src={
                        usersfavorites.find((element) => element.id === post.data.id) ? 
                        starfillLogo : starLogo} 
                        width={30} 
                        onClick={() => handleFavorite(post.data.id, subreddit)} />                    
                    <p>SCORE : { post.data.score }</p>
                    <a href = {baseurl + post.data.permalink} target="_blank">{ baseurl + post.data.permalink }</a>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default Post;