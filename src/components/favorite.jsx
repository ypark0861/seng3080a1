// FILE : favorite.jsx
// PROGRAMMER : Yujung Park
// FIRST VERSION : 2025-02-20
// DESCRIPTION : this favorite.jsx is a component for the user's favorites list display 
import { useEffect, useState, useLayoutEffect } from 'react'
import starfillLogo from '../assets/starfill.svg'

const Favorite = (props) => {
    const baseurl = "https://www.reddit.com"
    const [usersfavs, setUsersFavorites] = useState(props.favposts)
    // const [usersfavs, setUsersFavorites] = useState(null)
    useLayoutEffect(() => {
        // setUsersFavorites(props.usersfavs)
        console.log("layouteff", props.usersfaves)
    }, []);
   
    const deleteFavorite = (id) => {
        let resfind = usersfavs.find((element) => element.id === id)
        const sessiontoobj = JSON.parse(sessionStorage.getItem("favorites"))

        if(resfind !== undefined) {
            setUsersFavorites(usersfavs.filter(favorite => favorite.id !== id))                  
            const updatedsession = sessiontoobj.filter(favid => favid.id !== id);
            // sessionStorage.setItem("favorites", JSON.stringify(updatedsession))
        }
        console.log("Session-after", sessionStorage.getItem("favorites"));
    }

    const getFavorites = () => {
        setUsersFavorites(props.usersfavs)
        console.log("getfavorites", props.usersfaves)
    }

    return (
    <div> 
        <button onClick={() => getFavorites()}>My favorites</button>
        {usersfavs?.map(post => (
            <div key={post.id} >
                <div className="card">
                    <table>
                    <tbody>
                    <tr>
                    <td><img src={starfillLogo} width={30} onClick={() => deleteFavorite(post.id)} /></td>
                    <td><h3>TITLE : { post.post.data.children[0].data.link_title }</h3></td>
                    </tr>
                    </tbody>
                    </table>
                    <p>SCORE : { post.post.data.children[0].data.score }</p>
                    <a href = {baseurl + post.post.data.children[0].data.permalink} target="_blank">{ baseurl + post.post.data.children[0].data.permalink }</a>
                </div>
            </div>
        ))}

    </div>
    );
}
 
export default Favorite
