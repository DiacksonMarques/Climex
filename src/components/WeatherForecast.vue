<template>
    <div class="content">
        <div class="input-container">
            <input id="codigo" type="text" pattern=".+" v-model="cite" @keyup.enter="submitweatherForecast()" required />
            <label  for="codigo">Nome da cidade</label>
            <button class="btn btn-primary" :class="{loading}" @click="submitweatherForecast()">Pesquisar</button>
        </div>

        <div v-if="message.type != null && message.message != null" class="toast" :class="`${message.type}`">
            <button class="btn btn-clear float-right" @click="closeMessage()"></button>
            {{message.message}}
        </div>
        
        <div class="toast toast-primary" v-if="pesquiseWeatherForecast === false && message.type == null && message.message == null">
            Para pesquisar basta digitar o nome da cidade!
        </div>
        <weather-forecast-frame v-if="pesquiseWeatherForecast === true" :weatherForecast="weatherForecast"/>
        <div class="week" v-if="pesquiseWeatherForecast === true">
            <weather-forecast-week  v-for="week in weatherForecastweek" @click="weatherForecastEscolhe(week)" :key="week" :weatherForecast="week"/>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import openweathermap from '../services/openweathermap';
import WeatherForecastFrame from '../components/WeatherForecastFrame';
import WeatherForecastWeek from '../components/WeatherForecastWeek';

export default {
    components:{
        WeatherForecastFrame,
        WeatherForecastWeek
    }, 
    setup(){
        const data = reactive({
            cite: null,
            pesquiseWeatherForecast: false,
            weatherForecast: {},
            weatherForecastweek: [],
            loading: false,
            message: {type: null, message: null}
        });

        async function submitweatherForecast(){
            data.weatherForecastweek = [];
            data.pesquiseWeatherForecast = false;
            closeMessage();
            data.loading = true;
            if(data.cite != null && data.cite != ''){
                this.submitWeatherForecastWeeks();
                try {
                    const response = await openweathermap.getWeather(data.cite);
                    if(response.data != null){
                        data.weatherForecast = response.data;
                        data.pesquiseWeatherForecast = true;
                    }else{
                        data.message = {
                            message: 'Error ao buscar cidade',
                            type: 'toast-error',
                        }
                        data.pesquiseWeatherForecast = false;
                    }
                    data.loading = false;
                } catch (error) {
                    data.message = {
                       message: 'Não foi encontrado nenhuma cidade ',
                       type: 'toast-error',
                    }
                    data.loading = false;
                    data.pesquiseWeatherForecast = false;
                }
            }else{
                let cite = data.cite;

                if(cite == null || cite == ''){
                    data.message = {
                        message: 'Campo vazio, preencha para avançar!',
                        type: 'toast-warning'
                    }
                    data.loading = false;
                }
            }
        }

        async function submitWeatherForecastWeeks(){
            data.weatherForecastweek = [];
            try {
                const response = await openweathermap.getForecast(data.cite);
                if(response.data != null){
                    let weeks = response.data;
                    let date = new Date;
                    let hour = date.getHours();
                    let day = date.getDate();
                    let month = date.getMonth() + 1;
                    let year = date.getFullYear();
                    let dateAtual;

                    if(month < 10){
                        month = `0${month}`;
                    }

                    if(day < 10){
                        day = `0${day}`;
                    }

                    if(hour < 19){
                        dateAtual = `${year}-${month}-${day} 21:00:00`;
                    }else{
                        dateAtual = `${year}-${month + 1}-${day} 12:00:00`;
                    }

                    weeks.list.map((responseWeek) => {
                        if(responseWeek.dt_txt == dateAtual){
                            responseWeek['name'] = weeks.city.name;
                            responseWeek['date_form'] = `${day}/${month}/${year}`;
                            data.weatherForecastweek.push(responseWeek);

                            dateAtual = `${year}-${month}-${day += 1} 12:00:00`;
                        }
                    });
                }
            } catch (error) {
                console.log(error)
            }
        }

        function weatherForecastEscolhe(weatherForecastWeek){
            data.weatherForecast = weatherForecastWeek;
        }

        function closeMessage(){
            data.message = {
                message: null,
                type: null,
            }
        }

        return{
            ...toRefs(data),
            submitweatherForecast,
            closeMessage,
            submitWeatherForecastWeeks,
            weatherForecastEscolhe,
        }
    }
}
</script>

<style scoped>
.content{
    margin: 0 auto;
    width: 70%;
    text-align: center;
}

.week{
    display: flex;
    flex-direction: row;
}

.active{
    background: rgb(255, 255, 255);
    color: #000;
    cursor: pointer;
}

/* Estrutura */
.input-container {
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 0.5rem 0;
}

input {
  border: 0;
  border-bottom: 2px solid #9e9e9e;
  outline: none;
  transition: .2s ease-in-out;
  box-sizing: border-box;
  font-size: 0.8rem;
}

label {
  top: 0;
  left: 0; right: 0;
  color: #616161;
  display: flex;
  align-items: center;
  position: absolute;
  font-size: 0.8rem;
  cursor: text;
  transition: .2s ease-in-out;
  box-sizing: border-box;
}

input,
label {
  width: 100%;
  height: 1.8rem;
  font-size: 0.8rem;
}

/* Interation */
input:valid,
input:focus {
  border-bottom: 2px solid #8554F7;
}

input:valid + label,
input:focus + label {
  color: #8554F7;
  font-size: 0.5rem;
  top: -15px;
  left: 0.5rem;
  pointer-events: none;
}

@media (max-width: 650px){
    .content{
        width: 100%;
    }
}
@media (max-width: 960px){
    .week{
        display: none !important;
    }
}
</style>