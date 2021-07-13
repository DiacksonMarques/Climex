<template>
    <main>
        <div class="container grid-lg">
            <div class="column col-7 col-xs-12">
                <div class="card">
                    <div v-if="message.type != null && message.message != null" class="toast" :class="`${message.type}`">
                        <button class="btn btn-clear float-right" @click="closeMessage()"></button>
                        {{message.message}}
                    </div>
                    <div class="card-header">
                        <div class="card-title h3">Bem vindo ao Climex</div>
                        <div class="card-subtitle">Para ter acesso digite o código gerado caso ainda não tenha o código pode criar um novo</div>
                    </div>
                    <div class="card-body" v-if="checkedCode == true">
                        <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
                            <div class="input-container">
                                <input id="name" type="text" pattern=".+" required v-model="codeForm.name" />
                                <label  for="name">Nome</label>
                            </div>
                            <div class="input-container" style="margin-top: 1rem;">
                                <input id="email" type="text" pattern=".+" required v-model="codeForm.email" />
                                <label  for="email">Email</label>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <button class="btn btn-link" @click="checkCode(true)">Voltar</button>

                            <button class="btn btn-primary" @click="submitForm()">Criar</button>
                        </div>
                    </div>
                    <div class="card-body" v-else>
                        <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
                            <div class="input-container">
                                <input id="codigo" type="text" pattern=".+" v-model="code" required />
                                <label  for="codigo">Código</label>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <button class="btn btn-link" @click="checkCode(false)">Criar código</button>
                            <button class="btn btn-primary" @click="submitCode()">Entrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import apiUser from '../services/user';
import router from '../router';


export default {
    name: "Home",
    setup(){
        const data = reactive({
            checkedCode: false,
            code: null,
            codeForm: {
                name: null,
                email: null
            },
            message: {type: null, message: null}
        });

        function checkCode(code){
            if(code === true){
                data.checkedCode = false;
            }else{
                data.checkedCode = true;
            }
        }

        function closeMessage(){
            data.message.message = null;
            data.message.type = null;
        }

        async function submitCode(){
            if(data.code != null && data.code != ''){
                try {
                    const response = await apiUser.userCode(data.code);
                    if(response.data[0] == null){
                        data.message.message = 'Não foi encontrado nenhum usuário com esse código';
                        data.message.type = 'toast-warning';
                    }else{
                        router.push("dashboard")
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }

        async function submitForm(){
            if((data.codeForm.name != null && data.codeForm.name != '') && data.codeForm.email != null && data.codeForm.email != ''){
                try {
                    const response = await apiUser.createUser(data.codeForm);
                    if(response.data != null){
                        data.message.message = `Acesso criado com sucesso o seu código é: ${response.data.code}`;
                        data.message.type = 'toast-success'; 
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }

        return{
            ...toRefs(data),
            checkCode,
            closeMessage,
            submitCode,
            submitForm
        }
    }
}
</script>

<style scoped>
main{
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(to right top, #8554f7, #a07ffb, #bba7fc, #d7cefa, #f5f5f5);
}
.container{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.card{
    background-color: #FCF8FF;
    margin: 0 auto;
}

/* Estrutura */
.input-container {
  position: relative;
  width: 98%;
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
  height: 1rem;
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
  top: -20px;
  pointer-events: none;
}
</style>