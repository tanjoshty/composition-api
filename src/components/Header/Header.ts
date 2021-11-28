import { defineComponent, ref } from 'vue';
import {store} from '@/store';
import Axios from "axios";
import router from '@/router';

export default defineComponent ({
    name: 'Header',
    setup() {
        //logged in header
        const username = ref('');
        const password = ref('');

        const loggedIn: boolean = store.getters['getLoggedIn'];
        const avatar: string = store.getters['getUser'].avatar;

        const logIn = async (): Promise<void> => {
            try {
                const response = await Axios.post("/login", { username: username.value, password: password.value });
                if (response.data) {
                    store.dispatch('login', response.data);
                    window.location.reload();
                } else {
                    console.log("Incorrect username / password");
                }
            } catch (error) {
                console.log("There was a problem.");
            }
        }

        //logged out header
        const goHome = (): void => {
            router.push({name: 'home'});
        }
        const goCreatePost = (): void => {
            router.push({name: 'createPost'});
        }
    
        const goToProfile = (): void => {
            const id = store.getters['getUser'].username;
            router.push({name: 'profile', params: {id}})
        }
    
        const logOut = (): void => {
            store.dispatch('logout');
            window.location.reload();
        }
    
        const openSearch = (): void => {
            store.dispatch('openSearch');
        }


        return {
            username,
            password,
            loggedIn,
            avatar,
            logIn,
            goHome,
            goCreatePost,
            goToProfile,
            logOut,
            openSearch
        }
    }
})