import axios from 'axios'

export default async function addUserToFollow(user) {

    var getUser = JSON.parse(localStorage.getItem('user'))

    const followUser = {
        following: user,
        user: getUser,
        user_id: getUser._id,
    }

      // Adds user to followers array in users model.
      await axios.post('http://localhost:4000/users/update', followUser)
      .then(function (resp) {
          console.log(resp);
          alert("Followed " + user);
      })
      .catch(function (error) {
          console.log(error);
      })


    // Adds user to following array in user model.
    await axios.post('http://localhost:4000/users/addToFollowList', followUser)
        //add to following array
        .then(function (resp) {
            console.log(resp);

            // Update societies array in localStorage
            if(!getUser.users.includes(user)) {
                getUser.users.push(user);
            }
            console.log(getUser);
            localStorage.setItem('user', JSON.stringify(getUser))
        })
        .catch(function (error) {
            console.log(error);
        })
    }