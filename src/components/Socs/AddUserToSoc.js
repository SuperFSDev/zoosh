import axios from 'axios'

export default async function addUserToSoc(soc) {

    var getUser = JSON.parse(localStorage.getItem('user'))

    const addUser = {
        society: soc,
        user: getUser,
        user_id: getUser._id
    }

    // Adds user to users array in society model.
    await axios.post('http://localhost:4000/societies/update', addUser)
        .then(function (resp) {
            console.log(resp);
            alert("Successfully joined " + soc);
        })
        .catch(function (error) {
            console.log(error);
        })


    // Adds society to societies array in user model.
    await axios.post('http://localhost:4000/users/addToSocList', addUser)
        .then(function (resp) {
            console.log(resp);
        })
        .catch(function (error) {
            console.log(error);
        })
}