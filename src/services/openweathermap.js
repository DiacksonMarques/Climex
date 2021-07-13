import axios from 'axios'

const apiWeather = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5'
});

const apiLocal = axios.create({
    baseURL: 'http://localhost:3000'
});


export default {
    async getWeather(cite) {
        const response = await apiWeather.get(`/weather?q=${cite}&appid=18d57ee14ab57ed9337f746b2e43fb0b&lang=pt_br&units=metric`);
        if(response.data != null){
            const weatherForecast = response.data;
            delete weatherForecast.id;
            const date = new Date;
            weatherForecast['data_Pesq'] = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; 
            weatherForecast['user_id'] = localStorage.getItem('user'); 
            return apiLocal.post(`/weatherForecast`, weatherForecast);
        }
    },
    getForecast(cite) {
        return apiWeather.get(`/forecast?q=${cite}&appid=18d57ee14ab57ed9337f746b2e43fb0b&lang=pt_br&units=metric`);
    },
    getWeatherall(){
        return apiLocal.get(`/weatherForecast?user_id=${localStorage.getItem('user')}`);
    },
    patchVote(vote, weatherForecast){
        weatherForecast['start'] = vote;
        return apiLocal.put(`/weatherForecast/${weatherForecast.id}`, weatherForecast);
    }
}