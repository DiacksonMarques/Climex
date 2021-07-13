<template>
    <main class="main-error">
        <div class="container-error">
            <div class="card-error">
                <div class="err">404</div>
                <div class="msg">
                    Talvez esta página tenha mudado? Foi excluído? Está se escondendo em quarentena? Para começar, nunca existiu? <p> Vamos <router-link to="/"> voltar para casa </router-link> e tentar a partir daí</p>
                </div>
            </div>
        </div>
    </main>
</template>

<style>
.main-error{
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(to right top, #8554f7, #a07ffb, #bba7fc, #d7cefa, #f5f5f5);
}
.container-error{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.card-error{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: beige;
}
.err{
    font-family: 'Oswald', sans-serif;
    font-weight: 900;
    font-size: 5rem;
}
.msg{
    font-family: 'Oswald', sans-serif;
    font-weight: 500;
    font-size: 1rem;
}
</style>