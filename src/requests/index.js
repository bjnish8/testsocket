import axios from "axios"

class Users{
    getYear = () => {
        return axios.get('http://127.0.0.1:8000/')
    }
    updateYear = (year) => {
        console.log("Updaing user from API")
        return axios.post('http://127.0.0.1:8000/update',
        {
            year: year
        }
        )
    }
}

export default new Users()