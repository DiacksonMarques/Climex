import axios from 'axios'

const apiLocal = axios.create({
    baseURL: 'http://localhost:3000'
});

export default {
    userCode(code) {
        return apiLocal.get(`/users?code=${code}`);
    },

    async createUser(code= {}) {
        const response = await apiLocal.post(`/users`, code);
        if(response.data != null){
            const dateActual = new Date();
            const codeFormPatch = response.data;
            codeFormPatch['code'] = `${dateActual.getFullYear()}${dateActual.getMonth()}${dateActual.getDate()}${codeFormPatch.id}`;

            return apiLocal.put(`/users/${codeFormPatch.id}`, codeFormPatch);
        }
    },

    userId(id){
        return apiLocal.get(`/users/${id}`);
    },

    pacthUser(user = {}){
        return apiLocal.put(`/users/${user.id}`, user);
    },

    recuCode(name){
        return apiLocal.get(`users?name=${name}`);
    }
}