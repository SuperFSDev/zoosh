import axios from 'axios'

export default async function addUserToSoc(soc) {

    const addUser = {
        society: soc,
        user: JSON.parse(localStorage.getItem('user'))
    }

    await axios.post('http://localhost:4000/societies/update', addUser)
        .then(function (resp) {
            console.log(resp);
            alert("Successfully joined " + soc);
        })
        .catch(function (error) {
            console.log(error);
        })
}