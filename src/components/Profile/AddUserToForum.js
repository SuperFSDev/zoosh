import axios from 'axios'

export default async function addUserToForum(frm) {

    var getUser = JSON.parse(localStorage.getItem('user'))

    const addForum = {
        forum: frm,
        user: getUser,
        user_id: getUser._id,
    }

     // Adds users to forums followers array in user model.
     await axios.post('http://localhost:4000/forums/update', addForum)
        .then(function (resp) {
            console.log(resp);
            alert("Successfully followed forum " + frm);
        })
        .catch(function (error) {
            console.log(error);
        })

    // Adds forum to following array in user model.
    await axios.post('http://localhost:4000/users/addToForumFollowingList',addForum)
        //add to following array
        .then(function (resp) {
            console.log(resp);
        })
        .catch(function (error) {
            console.log(error);
        })

}

