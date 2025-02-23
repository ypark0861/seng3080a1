// FILE : Nav.jsx
// PROGRAMMER : Yujung Park
// FIRST VERSION : 2025-02-20
// DESCRIPTION : this Nav.jsx is a nav component that has the page title and Home and Favorites buttons for user's naviagation
const Nav = ({ setPage }) => {
    return ( 
        <nav>
            <h1>Hot 10 Reddit Posts</h1>

            <button onClick={()=> setPage('home')}> Home Page</button>
            <button onClick={()=> setPage('favoties')}> Favorites Page</button>
        </nav>
     );
}
 
export default Nav;