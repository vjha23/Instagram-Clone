import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import M from 'materialize-css'
const Navbar = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const renderList = () => {
        if (state) {
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/createpost">Create Post</Link></li>,
                <li ><Link to="/myfollowingpost">My following Posts</Link></li>,
                <li><button className="btn #c62828 red darken-3"
                    onClick={() => {
                        localStorage.clear()
                        dispatch({ type: "CLEAR" })
                        M.toast({ html: "Logged Out Successfully!", classes: "#00c853 green accent-4" })
                        history.push('/signin')

                    }}
                >Logout</button></li>
            ]
        } else {
            return [
                <li><Link to="/signin">Sign In</Link></li>,
                <li><Link to="/signup">Sign Up</Link></li>,

            ]
        }
    }
    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to={state ? "/" : "/signin"} className="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" className="right ">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}
export default Navbar