<template>
    <main>
        <div class="container grid-lg">
            <div class="column col-12 col-xs-12">
                <div class="canvas">
                    <div class="off-canvas off-canvas-sidebar-show">
                        <div class="off-canvas-sidebar" id="sidebar-demo">
                            <ul class="nav nav-center">
                                <li class="nav-item">
                                    <fas icon="cloud-sun"/>
                                    <button @click="onLisnten(0)" class="btn btn-link">Pesquisar Clima</button>
                                </li>
                                <li class="nav-item">
                                    <fas icon="clipboard-list"/>
                                    <button @click="onLisnten(1)" class="btn btn-link">Ver Pesquisas</button>
                                </li>
                                <li class="nav-item">
                                    <fas icon="user"/>
                                    <button @click="onLisnten(2)" class="btn btn-link">Perfil</button>
                                </li>
                                <li class="nav-item">
                                    <button @click="logout()" class="btn btn-primary"><fas icon="door-open"/> Sair</button>
                                </li>
                            </ul>
                        </div>
                        <a class="off-canvas-overlay" href="#close"></a>
                    </div>
                </div>
                <header class="navbar">
                    <section class="navbar-section">
                        <a @click="onLisnten(0)" class="btn btn-link"><fas icon="cloud-sun"/> Pesquisar Clima</a>
                        <a @click="onLisnten(1)" class="btn btn-link"><fas icon="clipboard-list"/> Ver Pesquisas</a>
                    </section>
                    <section class="navbar-center img-menu">
                        <img class="img-responsive img-logo" src="@/assets/logo.png" alt="Logo da Climex" />
                    </section>
                    <section class="navbar-section">
                        <a @click="onLisnten(2)" class="btn btn-link"><fas icon="user"/> Perfil</a>
                        <a @click="logout()" class="btn btn-primary"><fas icon="door-open"/> Sair</a>
                    </section>
                </header>
                <section>
                        <a class="off-canvas-toggle btn btn-primary btn-action my-2" href="#sidebar-demo">
                            <i class="icon icon-menu"></i>
                        </a>
                        <div class="img-menu-resp">
                            <img class="img-responsive img-logo" src="@/assets/logo.png" alt="Logo da Climex" />
                        </div>
                </section>
                <weather-forecast v-if="listen === 0" />
                <weather-forecast-research v-if="listen === 1" />
                <perfil v-if="listen === 2" />
            </div>
         </div>
    </main>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import router from '../router';

import WeatherForecast from '../components/WeatherForecast';
import WeatherForecastResearch from '../components/WeatherForecastResearch';
import Perfil from '../components/Perfil';

export default {
  components: { 
      WeatherForecast ,
      WeatherForecastResearch,
      Perfil,
    },
  setup(){
      const data = reactive({
        listen: 0,

      });

      function onLisnten(value){
          data.listen = value
      }

      function logout(){
          localStorage.removeItem('user');
          router.push("/")
      }

      return{
          ...toRefs(data),
          onLisnten,
          logout,
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

/* menu */
.nav-center{
    margin: 1rem 1rem 1rem 1rem;
}

.off-canvas .off-canvas-sidebar {
    background: #f7f8f9;
    bottom: 0;
    left: 0;
    min-width: 10rem;
    overflow-y: auto;
    position: fixed;
    top: 0;
    transform: translateX(-100%);
    transition: transform .25s;
    z-index: 200;
}

.off-canvas .off-canvas-sidebar.active, .off-canvas .off-canvas-sidebar:target {
    transform: translateX(0);
}

.off-canvas .off-canvas-overlay {
    background: rgba(48,55,66,.1);
    border-color: transparent;
    border-radius: 0;
    bottom: 0;
    display: none;
    height: 100%;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    width: 100%;
}
.off-canvas .off-canvas-sidebar.active~.off-canvas-overlay, .off-canvas .off-canvas-sidebar:target~.off-canvas-overlay {
    display: block;
    z-index: 100;
}

@media (max-width: 960px){
    .navbar{
        display: none;
    }
    .img-menu-resp{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: -45px;
    }
    .img-logo{
        width: 20%;
    }
}

@media (min-width: 960px){
    .off-canvas-toggle{
        display: none;
    }
    .off-canvas.off-canvas-sidebar-show .off-canvas-sidebar {
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        position: relative;
        transform: none;
    }
    .canvas{
        display: none;
    }
    .img-menu-resp{
        display: none;
    }
}

</style>