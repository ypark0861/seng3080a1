// https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d
// https://www.reddit.com/r/redditdev/comments/16lxfoe/how_to_get_posts_using_api_do_i_need_to_pay_to_do/
// https://www.honeybadger.io/blog/javascript-reddit-api/

import { useState, useEffect } from 'react'
import Post from './Post';

const Home = () => {
    const [subreddit, setSubreddit] = useState('');
    const [posts, setPosts] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleClick= async () => {
        fetch(`https://www.reddit.com/r/${subreddit}.json?sort=hot&limit=10`)
        .then(response => response.json())
        .then(data => {
            setPosts(data.data.children)
            setIsLoaded(true)
        })
        .catch(error => console.error(error.message));
    
    }
    // console.log(posts);
   
    return (
        <div>
            <form>
                <label>SUBREDDIT : </label>
                <input 
                    type="text"
                    required
                    value={subreddit}
                    onChange={(e) => setSubreddit(e.target.value)}
                />
                <button type="button" onClick={handleClick}>
                    Load
                </button>
            </form>
                <button type="button" onClick={handleClick}>
                    Favorites
                </button>
            <div>
                {isLoaded && posts && <Post subreddit={subreddit} posts={posts} />}
            </div>
        </div>
    );
}
 
export default Home;