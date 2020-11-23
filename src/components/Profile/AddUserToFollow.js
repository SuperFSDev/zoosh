import axios from 'axios'

export default function addUserToFollow(user) {

    var getUser = JSON.parse(localStorage.getItem('user'))

    const myUser = {
        user_id: getUser._id,
        user: user._id,
    }

    const followUser = {
        user_id: user._id,
        user:{
        followingUser: getUser._id
        }
    }

    // Adds user to following array in user model.
   axios.post('http://localhost:4000/users/addToFollowingList',myUser)
        //add to following array
        .then(function (resp) {
            console.log(resp);
        })
        .catch(function (error) {
            console.log(error);
        })


    // Adds user to followers array in users model.
   axios.post('http://localhost:4000/users/updateFollowers',followUser)
        .then(function (resp) {
            console.log(resp);
            console.log(followUser);
            alert(JSON.stringify(followUser));
        })
        .catch(function (error) {
            console.log(error);
    })

}