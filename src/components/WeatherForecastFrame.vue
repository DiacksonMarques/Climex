<template>
    <div class="card">
        <div class="card-header">
            <div class="card-title h4">{{weatherForecast.name}}</div>
        </div>
        <div class="divider text-center" data-content="DADOS DO CLIMA"></div>
        <div class="card-body">
            <div class="content-clima">
                <img :src="'http://openweathermap.org/img/wn/'+weatherForecast.weather[0].icon+'@2x.png'" class="img-responsive">
                <div class="content-clima-title">
                    <div class="h1">{{weatherForecast.main.temp}}°</div>
                    <div class="h5">{{weatherForecast.weather[0].main}}</div>
                    <div>{{weatherForecast.weather[0].description}}</div>
                    <div><fas icon="temperature-low" />Sensação térmica: {{weatherForecast.main.feels_like}}º</div>
                </div>
                    
                <div class="card-body content-clima-title">
                    <div class="more-information">
                        <div>
                            <fas icon="temperature-low" />
                            Temperatura:
                        </div>
                        <div>
                            <fas icon="arrow-circle-up"/>
                            {{weatherForecast.main.temp_max}}º

                            <fas icon="arrow-circle-down"/>
                            {{weatherForecast.main.temp_min}}º
                        </div>
                    </div>

                    <div class="divider"></div>

                    <div class="more-information">
                        <div> <fas icon="cloud-rain"/> Chuva:</div>
                        <div> <fas icon="tint"/> {{weatherForecast.clouds.all}}% </div>
                    </div>

                    <div class="divider"></div>

                    <div class="more-information">
                        <div> <fas icon="eye-dropper"/> Umidade:</div>
                        <div> {{weatherForecast.main.humidity}}% </div>
                    </div>

                    <div class="divider"></div>

                    <div class="more-information">
                        <div> <fas icon="wind"/> Vento:</div>
                        <div> <fas icon="wind"/> {{weatherForecast.wind.speed}} km/h</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="divider text-center" data-content="AVALIAÇÃO DOS DADOS"></div>
        <div class="card-footer">
            <div class="estrelas">
                <small >Qual sua nota para as informações: </small >
                <div class="estrelas" v-if="weatherForecast.start == null">
                    <label for="cm_star-1" @click="submitVote(1, weatherForecast)"><fas :class="stars >= 1? 'fas-check': 'fas'" icon="star"/></label>
                    <label for="cm_star-2" @click="submitVote(2, weatherForecast)"><fas :class="stars >= 2? 'fas-check': 'fas'" icon="star"/></label>
                    <label for="cm_star-3" @click="submitVote(3, weatherForecast)"><fas :class="stars >= 3? 'fas-check': 'fas'" icon="star"/></label>
                    <label for="cm_star-4" @click="submitVote(4, weatherForecast)"><fas :class="stars >= 4? 'fas-check': 'fas'" icon="star"/></label>
                    <label for="cm_star-5" @click="submitVote(5, weatherForecast)"><fas :class="stars >= 5? 'fas-check': 'fas'" icon="star"/></label> 
                </div>
                <div class="estrelas" v-else>
                    <label for="cm_star-1"><fas :class="weatherForecast.start >= 1? 'fas-check': ''" icon="star"/></label>
                    <label for="cm_star-2"><fas :class="weatherForecast.start >= 2? 'fas-check': ''" icon="star"/></label>
                    <label for="cm_star-3"><fas :class="weatherForecast.start >= 3? 'fas-check': ''" icon="star"/></label>
                    <label for="cm_star-4"><fas :class="weatherForecast.start >= 4? 'fas-check': ''" icon="star"/></label>
                    <label for="cm_star-5"><fas :class="weatherForecast.start >= 5? 'fas-check': ''" icon="star"/></label> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import openweathermap from '../services/openweathermap';

export default {
    props:{
        weatherForecast: { type: Object, required: true }
    },
    setup(){
        const data = reactive({
            stars: 0,
        });

        async function submitVote(vote, id_weatherForecast){
            if(vote != null && id_weatherForecast != null){
                try {
                    await openweathermap.patchVote(vote, id_weatherForecast);
                    data.stars = vote;
                } catch (error) {
                    console.log(error)
                }
            }
        }

        return{
            ...toRefs(data),
            submitVote
        }
    }
}
</script>

<style scoped>

.content-clima{
    display: flex;
    flex-direction: row;
}

.content-clima-title{
    display: flex;
    flex-direction: column;
}

.more-information{
    display: flex;
    justify-content: space-between;
}

.img-responsive{
    width: 25%;
    height: 50%;
    margin: -1.80rem;
}

.divider{
    margin: 0.2rem 0;
}

.estrelas{
    display: flex;
    justify-content: start;
    align-items: center;
}
.fas:hover{
    color: yellow;
}
.fas-check{
    color: yellow;
}
</style>