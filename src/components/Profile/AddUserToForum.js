import axios from 'axios'

export default async function addUserToForum(user) {

    var getUser = JSON.parse(localStorage.getItem('user'))

    const addUser = {
        forum: user,
        user: getUser,
        user_id: getUser._id,
    }

    // Adds society to societies array in user model.
    await axios.post('http://localhost:4000/users/addToForumList', addUser)
        .then(function (resp) {
            console.log(resp);

            // Update societies array in localStorage
            if(!getUser.forums.includes(user)) {
                getUser.forums.push(user);
            }
            console.log(getUser);
            localStorage.setItem('user', JSON.stringify(getUser))
        })
        .catch(function (error) {
            console.log(error);
        })
}