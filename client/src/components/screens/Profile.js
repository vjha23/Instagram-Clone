import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../App'

const Profile = () => {
    const [mypics, setPics] = useState([])
    const { state, dispatch } = useContext(UserContext)

    useEffect(() => {
        fetch('/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result);
                setPics(result.mypost)
            })
    }, [])

    return (
        <div style={{
            maxWidth: "750px",
            margin: "0 auto"
        }}>

            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div>
                    <img style={{
                        width: "160px", height: "160px", alt: "profile picture", borderRadius: "50%"
                    }}
                        src="https://images.unsplash.com/photo-1605764188303-a839afc0c0f5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDJ8fHdvbWFufGVufDB8MnwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    />
                </div>
                <div>
                    <h4>{state ? state.name : "loading"}</h4>
                    <div style={{
                        display: "flex",
                        width: "108%",
                        justifyContent: "space-between",


                    }}>
                        <h6>{mypics.length} posts</h6>
                        <h6>{state ? state.followers.length : "0"} followers</h6>
                        <h6>{state ? state.following.length : "0"} following</h6>
                    </div>
                </div>
            </div>

            <div className="gallery">
                {
                    mypics.map(item => {
                        return (
                            <img key={item._id} className="item" src={item.photo} alt={item.title} />
                        )
                    })
                }


            </div>
        </div>
    )
}
export default Profile;