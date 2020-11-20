import axios from 'axios'

export default async function addUserToFollow(user) {

    const followUser = {
        id: user._id,
        acc: user,
    }

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


    // Adds user to following array in user model.
    await axios.post('http://localhost:4000/users/addToFollowingList',followUser)
        //add to following array
        .then(function (resp) {
            console.log(resp);
        })
        .catch(function (error) {
            console.log(error);
        })
    }