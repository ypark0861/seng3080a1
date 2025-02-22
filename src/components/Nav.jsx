const Nav = ({ setPage }) => {
    return ( 
        <nav>
            <h1>Hot 10 Reddit Posts</h1>

            <button onClick={()=> setPage('home')}> Home </button>
            <button onClick={()=> setPage('favoties')}> Favorites </button>
        </nav>
     );
}
 
export default Nav;