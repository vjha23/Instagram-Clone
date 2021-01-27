import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import { UserContext } from '../../App'

const Signin = () => {
    const history = useHistory()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const { state, dispatch } = useContext(UserContext)


    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Invalid Email!", classes: "#e53935 red darken-1" })
            return
        }
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    M.toast({ html: data.error, classes: "#e53935 red darken-1" })
                } else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    dispatch({ type: "USER", payload: data.user })
                    M.toast({ html: "Logged in Successfully!", classes: "#00c853 green accent-4" })
                    history.push('/')
                }
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field" >
                <h2>Instagram</h2>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #42a5f5 blue lighten-1"
                    onClick={() => PostData()}
                >
                    Login
                </button>
                <small className="smallText" >
                    <Link to="/signup"  >Dont Have an Account?</Link>
                </small>
            </div>
        </div>
    )
}
export default Signin;