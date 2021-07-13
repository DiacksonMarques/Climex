<template>
    <div class="content">
        <div class="input-container">
            <input id="codigo" type="text" pattern=".+" v-model="cite" required />
            <label  for="codigo">Nome da cidade</label>
            <button class="btn btn-primary" :class="{loading}" @click="submitweatherForecast()">Submit</button>
        </div>

        <div v-if="message.type != null && message.message != null" class="toast" :class="`${message.type}`">
            <button class="btn btn-clear float-right" @click="closeMessage()"></button>
            {{message.message}}
        </div>
        <div class="toast toast-primary" v-if="pesquiseWeatherForecast === false">
            Para pesquisar basta digitar o nome da cidade!
        </div>
        <weather-forecast-frame v-if="pesquiseWeatherForecast === true" :weatherForecast="weatherForecast"/>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import openweathermap from '../services/openweathermap';
import WeatherForecastFrame from '../components/WeatherForecastFrame';

export default {
    components:{
        WeatherForecastFrame
    }, 
    setup(){
        const data = reactive({
            cite: null,
            pesquiseWeatherForecast: false,
            weatherForecast: {},
            loading: false,
            message: {type: null, message: null}
        });

        async function submitweatherForecast(){
            data.pesquiseWeatherForecast = false;
            closeMessage();
            data.loading = true;
            if(data.cite != null && data.cite != ''){
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
            }
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
</style>