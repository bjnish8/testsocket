import axios from "axios"

class Users{
    getYear = () => {
        return axios.get('http://127.0.0.1:8000/')
    }
    updateYear = () => {
        console.log("Updaing user from API")
        return axios.post('http://127.0.0.1:8000/update',
        {
            year: 2033
        }
        )
    }
}

export default new Users()