import axios from 'axios';

const registerEndPoint = (firstName, lastName, nickname, age, gender, country, address) => {
    return axios({
    method: 'put',
    url: 'http://192.168.0.87:8080/auth/signup',
    data: {
        firstName: firstName,
        lastName: lastName,
        nickname: nickname,
        age: age,
        gender: gender,
        country: country,
        address: address
    }
    })
    .then(response => {
        return response.data;

    }, error => {
        console.log(error);
    });
}

export default registerEndPoint;