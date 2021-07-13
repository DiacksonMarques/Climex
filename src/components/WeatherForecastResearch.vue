<template>
    <div class="content">
        <div v-if="message.type != null && message.message != null" class="toast" :class="`${message.type}`">
            <button class="btn btn-clear float-right" @click="closeMessage()"></button>
            {{message.message}}
        </div>
        <div v-if="pesquiseWeatherForecast === true">
            <weather-forecast-frame v-for="weatherForecast in weathersForecasts[number_pag]" :key="weatherForecast.id"  :weatherForecast="weatherForecast"/>
        </div>
        <ul class="pagination">
            <li class="page-item">
                <a href="#" @click="paginationExe(0 ,2)" tabindex="-1">Previous</a>
            </li>
            <li class="page-item"  v-for="pag in paginators" :key="pag" :class="pag - 1 === number_pag? 'active':''">
                <a href="#" @click="paginationExe(pag ,0)">{{pag}}</a>
            </li>
            <li class="page-item">
                <a href="#" @click="paginationExe(0 ,1)">Next</a>
            </li>
        </ul>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import WeatherForecastFrame from '../components/WeatherForecastFrame';
import openweathermap from '../services/openweathermap';

export default {
    components:{
        WeatherForecastFrame
    },
    created(){
        this.submitweatherForecast();
    },
    methods:{
        async submitweatherForecast(){
            this.pesquiseWeatherForecast = false;
            this.closeMessage();
            try {
                const response = await openweathermap.getWeatherall();
                if(response.data != null){
                    this.weatherForecasts = response.data;
                    await this.paginations(response.data);
                    this.pesquiseWeatherForecast = true;
                }else{
                    this.message = {
                        message: 'Error ao buscar pesquisas anteriaores',
                        type: 'toast-error',
                    }
                    this.pesquiseWeatherForecast = false;
                }
                /* data.loading = false; */
            } catch (error) {
                this.message = {
                    message: 'Não foi encontrado nenhum dado ',
                    type: 'toast-primary',
                }
                /* data.loading = false; */
                this.pesquiseWeatherForecast = false;
            }
        }
    },
    setup(){
        const data = reactive({
            weatherForecasts: [],
            pesquiseWeatherForecast: false,
            message: {type: null, message: null},
            paginators: [],
            weathersForecasts: [],
            number_pag: 0,
        });

        function closeMessage(){
            data.message = {
                message: null,
                type: null,
            }
        }

        function paginationExe(number, type){
            switch(type){
                case 0:{
                    data.number_pag = number - 1;
                    break;
                }
                case 1:{
                    if(data.number_pag < data.weathersForecasts.length - 1){
                        data.number_pag += 1
                    }
                    break;
                }
                case 2:{
                    if(data.number_pag != 0){
                        data.number_pag -= 1
                    }
                    break;
                }
            }
        }

        function paginations(weatherForecastt){
            let cont = 0;
            let contPaginator = 0;
            let weatherForecastMap = [];

            weatherForecastt.map(weatherForecast => {
                cont += 1;
                contPaginator;

                if(cont == 2){
                    weatherForecastMap = [];
                    cont = 0;
                    contPaginator += 1;
                    data.weathersForecasts.push(weatherForecastMap)
                    data.paginators.push(contPaginator)
                    weatherForecastMap.push(weatherForecast)
                }else{
                    weatherForecastMap.push(weatherForecast)
                }
            });
        }

        return{
            ...toRefs(data),
            closeMessage,
            paginations,
            paginationExe,
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

</style>