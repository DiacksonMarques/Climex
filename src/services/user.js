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
}