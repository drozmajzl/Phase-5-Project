import React from "react";
import Profile from "./Profile";
import { useEffect, useState } from "react";

function SwipePage({ profiles, handleDeleteUser, setProfiles, setUser, user }){

    let filteredProfiles = []

    if(profiles.length !== 0){
    filteredProfiles = profiles.filter((p) => p.id !== user.id )
    }

    useEffect(() => {
        fetch("/me").then((response) => {
          if (response.ok) {
            response.json().then((user) => setUser(user));
          }
        });
      }, []);

    let userLikes = []
    let userDislikes = []
    let x = user.likes
    x.forEach(y => y.disliked_person_id ? userDislikes.push(y.disliked_person_id) : null)
    x.forEach(y => y.liked_person_id ? userLikes.push(y.liked_person_id) : null)
    const removeIds = [...userLikes, ...userDislikes]
    
    let currentProfile = filteredProfiles.filter((p) => !removeIds.includes(p.id))
    

    // useEffect(() => {
    //     fetch("/users")
    // .then((res) => res.json())
    // .then((data) => setProfiles(data))}, 
    // [])

    return(
        <div>
            <h1>
                Welcome to the Swipe Page
            </h1>
            <div >
                <Profile currentProfile={currentProfile} user={user} profiles={profiles} handleDeleteUser={handleDeleteUser} setProfiles={setProfiles}/>
            </div>
        </div>
    )
}

export default SwipePage;