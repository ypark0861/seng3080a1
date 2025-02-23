// FILE : post.jsx
// PROGRAMMER : Yujung Park
// FIRST VERSION : 2025-02-20
// DESCRIPTION : this post.jsx is a component for the redit top 10 posts list
// https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
// https://serene-r.tistory.com/64
// https://react.dev/learn/updating-arrays-in-state
// https://stackoverflow.com/questions/75758162/react-usestate-on-an-array-not-taking-first-item
// https://stackoverflow.com/questions/76416854/how-to-save-and-retrieve-state-variables-to-session-storage-with-react

import { useState, useEffect } from 'react'
import starLogo from '../assets/star.svg'
import starfillLogo from '../assets/starfill.svg'

const Post = ({ subreddit, posts }) => {
    const baseurl = "https://www.reddit.com"
    const [usersfavorites, setUsersFavorites] = useState([])
    useEffect(() => {
        console.log(usersfavorites)
      }, [usersfavorites])
    // id, title, score, permalink: /r/news/comments/1iu72xo/senate_confirms_kash_patel_as_fbi_director_in/
    const handleFavorite = (uid, subreddit) => {
        console.log(uid, subreddit)
        let resfind = usersfavorites.find((element) => element.id === uid)
        // console.log(resfind)
        const newFav = { id: uid, value: subreddit };

        if (usersfavorites.length === 0)
        {
            // usersfavorites.push({id: uid, value: subreddit}) // if push then favorite button color doesn't changed       
            setUsersFavorites([newFav, ...usersfavorites])
            console.log("added", usersfavorites)
        } else {
            if(resfind !== undefined) {
                const updatedFavorites = usersfavorites.filter(favorite => favorite.id !== uid)
                setUsersFavorites(updatedFavorites)
                console.log("deleted", usersfavorites)
            } else {
                const cleardummy = usersfavorites.filter(favorite => favorite.id !== "id")
                setUsersFavorites(cleardummy)
                // usersfavorites.push({id: uid, value: subreddit})
                setUsersFavorites([newFav, ...usersfavorites])
                console.log("added", usersfavorites)
            }
        }
        
        sessionStorage.setItem("favorites", JSON.stringify(usersfavorites))
        console.log("sessionStorage", sessionStorage.getItem("favorites"));
    }

    return (
        <div >
            {posts.map(post => (
                <div key={post.data.id} >
                    <div className="card">
                    <table>
                        <thead>
                    <tr>
                        <td>
                        <img src={
                        usersfavorites.find((element) => element.id === post.data.id) ? 
                        starfillLogo : starLogo} 
                        width={30} 
                        onClick={() => handleFavorite(post.data.id, subreddit)} />
                        </td>                        
                        <td><h3>TITLE : { post.data.title }</h3></td>                        
                    </tr>
                    </thead>
                    </table>                   
                    <h4> SCORE : { post.data.score }</h4>
                    <a href = {baseurl + post.data.permalink} target="_blank">{ baseurl + post.data.permalink }</a>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default Post;