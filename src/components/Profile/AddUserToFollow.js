import axios from 'axios'

export default async function addUserToFollow(user) {

    var getUser = JSON.parse(localStorage.getItem('user'))

    const myUser = {
        user_id: getUser._id,
        user: user,
    }

    const followUser = {
        id: user._id,
        _id: getUser,
    }

    // Adds user to following array in user model.
    await axios.post('http://localhost:4000/users/addToFollowingList',myUser)
        //add to following array
        .then(function (resp) {
            console.log(resp);
        })
        .catch(function (error) {
            console.log(error);
        })


    // Adds user to followers array in users model.
    await axios.post('http://localhost:4000/users/updateFollowers',followUser)
        .then(function (resp) {
            console.log(resp);
            console.log(followUser);
            alert("Followed " + user);
        })
        .catch(function (error) {
            console.log(error);
    })

}