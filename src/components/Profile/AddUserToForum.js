import axios from 'axios'

export default function addUserToForum(forum) {

    var getUser = JSON.parse(localStorage.getItem('user'))

    const addForum = {
        forum: forum,
        user_id: getUser._id,
    }

    // Adds user to following array in user model.
    axios.post('http://localhost:4000/users/addToForumFollowingList',addForum)
        //add to following array
        .then(function (resp) {
            console.log(resp);
        })
        .catch(function (error) {
            console.log(error);
        })


     // Adds society to societies array in user model.
    axios.post('http://localhost:4000/forums/updateForumFollowers', addForum)
     .then(function (resp) {
         console.log(resp);


     })
     .catch(function (error) {
         console.log(error);
     })

}

