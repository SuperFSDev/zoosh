import axios from 'axios'

export default async function addUserToFollow(uname) {

    var getUser = JSON.parse(localStorage.getItem('user'))

    const followUser = {
        user: getUser,
        user_id: getUser._id,
    }

    // Adds society to following array in user model.
    await axios.post('http://localhost:4000/users/addToFollowList', followUser)
        //add to following array
    }