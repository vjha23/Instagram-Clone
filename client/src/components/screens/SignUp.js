import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

const SignUp = () => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")


    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Invalid Email!", classes: "#e53935 red darken-1" })
            return
        }
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#e53935 red darken-1" })
                } else {
                    M.toast({ html: data.message, classes: "#00c853 green accent-4" })
                    history.push('/signin')
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
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #42a5f5 blue lighten-1"
                    onClick={() => PostData()}
                >
                    SignUP
                </button>
                <small className="smallText">
                    <Link to="/signin">Already Have an Account?</Link>
                </small>
            </div>
        </div>
    )
}
export default SignUp;