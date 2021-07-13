<template>
    <main>
        <div class="container grid-lg">
            <div class="column col-12 col-xs-12">
                <header class="navbar">
                    <section class="navbar-section">
                        <a @click="onLisnten(false)" class="btn btn-link">Pesquisar Clima</a>
                        <a @click="onLisnten(true)" class="btn btn-link">Ver Pesquisas</a>
                    </section>
                    <section class="navbar-center">
                        <img class="img-responsive img-logo" src="@/assets/logo.png" alt="Logo da Climex" />
                    </section>
                    <section class="navbar-section">
                        <a href class="btn btn-link">LinkeDin</a>
                        <a href class="btn btn-link">GitHub</a>
                    </section>
                </header>
                <weather-forecast v-if="listen === false" />
                <weather-forecast-research v-if="listen === true" />
            </div>
         </div>
    </main>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import WeatherForecast from '../components/WeatherForecast';
import WeatherForecastResearch from '../components/WeatherForecastResearch';

export default {
  components: { 
      WeatherForecast ,
      WeatherForecastResearch
    },
  setup(){
      const data = reactive({
        listen: false,
      });

      function onLisnten(value){
          data.listen = value
      }

      return{
          ...toRefs(data),
          onLisnten,
      }
  }
}
</script>

<style scoped>
main{
    height: 100%;
    background-color:#d7cefa;
}

.img-logo {
  max-width: 60%;
}
</style>