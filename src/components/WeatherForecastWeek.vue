<template>
    <div class="card-week">
        <div class="h6">{{weatherForecast.date_form}}</div>
        <div class="center">
            <img :src="'http://openweathermap.org/img/wn/'+weatherForecast.weather[0].icon+'@2x.png'" class="img-week" alt="Clima">
        </div>
        <div class="temp-week">
           <div>
                <fas icon="arrow-circle-up"/>
                {{weatherForecast.main.temp_max}}º
           </div>
           <div>
                <fas icon="arrow-circle-down"/>
                {{weatherForecast.main.temp_min}}º
           </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        weatherForecast: { type: Object, required: true }
    },
}
</script>

<style scoped>
.card-week{
    background: rgb(223, 218, 218);
    border: .05rem solid #dadee4;
    color: rgb(70, 70, 70);
    border-radius: .1rem;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    margin: 0.3rem 1.1rem 0.3rem 0;

    width: 15%;
    height: 15%;
}

.card-week:hover{
    background: rgb(255, 255, 255);
    color: #000;
    cursor: pointer;
}
.img-week{
    width: 60%;
    height: 50%;
}

.temp-week{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>