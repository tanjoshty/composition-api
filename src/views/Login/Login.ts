import {store} from '@/store';
import Axios from "axios";
import { ref } from 'vue';

export default {
    name: 'Login',
    setup() {
        const username = ref('');
        const email = ref('');
        const password = ref('');

        const register = async(): Promise<void> => {
            try {
                // API Call to register
                const response = await Axios.post("/register", { username, email, password });
                console.log("user was successfully created");
    
                // Dispatch store action
                store.dispatch('login', response.data);
    
                window.location.reload();
            } catch (error) {
                console.log("There was an error");
            }
        }

        return {
            username,
            email,
            password,
            register
        }
    }
    
}

// public username: string = '';
//     public email: string = '';
//     public password: string = '';

//     public async register(): Promise<void> {
//         const username = this.username;
//         const email = this.email;
//         const password = this.password;

//         try {
//             // API Call to register
//             const response = await Axios.post("/register", { username, email, password });
//             console.log("user was successfully created");

//             // Dispatch store action
//             store.dispatch('login', response.data);

//             window.location.reload();
//         } catch (error) {
//             console.log("There was an error");
//         }
//     }