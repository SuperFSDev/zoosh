import axios from 'axios'

export default async function followUser(user) {

    var getUser = JSON.parse(localStorage.getItem('user'))

    const followUser = {
        user: getUser,
        user_id: getUser._id,
    }

    // Adds society to societies array in user model.
    await axios.post('http://localhost:4000/users/followUser', followUser)
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