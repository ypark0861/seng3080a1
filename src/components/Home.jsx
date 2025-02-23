// FILE : home.jsx
// PROGRAMMER : Yujung Park
// FIRST VERSION : 2025-02-20
// DESCRIPTION : this home.jsx is a main component for the redit top 10 posts list
// https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d
// https://www.reddit.com/r/redditdev/comments/16lxfoe/how_to_get_posts_using_api_do_i_need_to_pay_to_do/
// https://www.honeybadger.io/blog/javascript-reddit-api/

import { useEffect, useState } from 'react'
import Post from './Post';

const Home = () => {
    const [subreddit, setSubreddit] = useState('');
    const [posts, setPosts] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {document.getElementById('subreddit').value = '';});

    const handleClick= async () => {
        fetch(`https://www.reddit.com/r/${subreddit}.json?sort=hot&limit=10`) 
        .then(response => response.json())
        .then(data => {
            setPosts(data.data.children)
            setIsLoaded(true)
        })
        .catch(error => console.error(error.message)); 
    }
    // if (isLoaded) {
    //     document.getElementById('subreddit').value = '';
    // }

    return (
        <div>
            <form>
                <label>SUBREDDIT : </label>
                <input 
                    type="text"
                    id="subreddit"
                    required
                    value={subreddit}
                    onChange={(e) => setSubreddit(e.target.value)}
                />
                <button type="button" onClick={handleClick}>
                    Load
                </button>
            </form>
                
            <div>
                {isLoaded && posts && <Post subreddit={subreddit} posts={posts} />}
            </div>
        </div>
    );
}
 
export default Home;