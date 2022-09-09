import axios from "axios";


const BASE_URL = 'http://79.143.31.216/'

let jwt = ''

if(localStorage.getItem('token')){
    jwt = localStorage.getItem('token')
}


export const registration = async (username, password) => {
    await axios.post(`${BASE_URL}register`, null, {
        params: {
            username,
            password
        }
    })
}


export const login = async (username, password) => {
    const token = await axios.post(`${BASE_URL}login`, {
            username: username,
            password: password
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => res.data)

    if(token.access_token){
        localStorage.setItem('token', token.access_token)
    }
}


export const makeShortUrl = async (link) => {
    await axios.post(`${BASE_URL}squeeze`, null,{
        headers: {
            Authorization: 'Bearer '+ jwt
        },
        params: {
            link
        }
    })
}



  export const req = (page) => {
       return axios.get(`${BASE_URL}statistics?offset=${page}&limit=15`, {
          headers: {
              Authorization: 'Bearer ' + jwt
          }
      })
  }






export const goToUrl = async (key) => {
    await axios.get(`${BASE_URL}/s/${key}`)
}

