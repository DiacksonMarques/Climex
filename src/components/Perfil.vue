<template>
    <div class="card">
        <div v-if="message.type != null && message.message != null" class="toast" :class="`${message.type}`">
            <button class="btn btn-clear float-right" @click="closeMessage()"></button>
            {{message.message}}
        </div>
        <div class="card-header">
            <div class="card-title h4">
                <fas icon="user"/> Perfil
            </div>
        </div>
        <div class="card-body">
            <div class="container-body">
                <div class="input-container">
                    <input id="name" class="input-cont" v-model="user.name" type="text" pattern=".+" required />
                    <label  for="name">Nome</label>
                </div>
                <div class="input-container">
                    <input id="email" class="input-cont" v-model="user.email" type="text" pattern=".+" required />
                    <label  for="email">Email</label>
                </div>
                <div class="input-container">
                    <input id="code" name="code" class="input-cont" v-model="user.code" type="text" tabindex="-1" pattern=".+" required />
                    <label  for="code">Código</label>
                </div>
            </div>
        </div>
        <div class="card-footer finaly">
            <button @click="putUser()" class="btn btn-primary">Salvar</button>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import user from '../services/user';

export default {
    created(){
        this.getUser();
    },
    setup(){
        const data = reactive({
            user: {
                id: null,
                name: null,
                email: null,
                code: null
            },
            message: {type: null, message: null}
        });

        async function getUser(){
            try {
                const response = await user.userId(localStorage.getItem('user'));
                if(response.data != null){
                   data.user = response.data; 
                }
            } catch (error) {
                console.log(error)
            }
        }

        async function putUser(){
            if((data.user.name != null && data.user.name != '') && data.user.email != null && data.user.email != ''){
                try {
                    const response = await user.pacthUser(data.user);
                    if(response.data != null){
                    data.user = response.data; 
                    data.message = {
                        message: "Usuário atualizado com sucesso",
                        type: "toast-success"
                    }
                    }
                } catch (error) {
                    console.log(error)
                    data.message = {
                        message: "Error ao atilizar usuário",
                        type: "toast-error"
                    }
                }
            }else{
                let codeForm = data.user;

                if(codeForm.name == null || codeForm.name == '' || codeForm.email == null || codeForm.email == ''){
                    data.message = {
                        message: 'Campo vazio, preencha para avançar!',
                        type: 'toast-warning'
                    }
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
            getUser,
            putUser,
            closeMessage,
        }
    }
}
</script>

<style scoped>

/* Estrutura */
.input-container {
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 0.5rem 0;
}

.container-body{
    display: grid;
    grid-template-columns: 1fr 1fr;
}

@media (max-width: 960px){
    .container-body{
        display: flex;
        flex-direction: column;
    }
}

.input-cont{
    width: 98%;
}

.finaly{
    display: flex;
    justify-content: flex-end;
}

 input[name=code] {
    pointer-events: none;
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