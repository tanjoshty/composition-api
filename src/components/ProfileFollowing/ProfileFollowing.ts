import {store} from '@/store';
import Axios from "axios";
import { defineComponent, onMounted, Ref, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';


export default defineComponent({
    name: 'ProfileFollowers',
    setup() {
        const route = useRoute();
        const router = useRouter();

        const following = ref([]);
        const isLoading = ref(true);

        const username = route.params.id;

        onMounted(() => {
            console.log(username);
            fetchFollowing(username);
        })

        const goToProfile = (id: string): void => {
            router.push({name: 'profile', params: {id}});
        }

        watch(() => route.params.id, function (to: any, from: any) {fetchFollowing(to);})

        const fetchFollowing = async (username: string | string[]): Promise<void> => {
            try {
                const response = await Axios.get(`/profile/${username}/following`);
                following.value = response.data;
                isLoading.value = false;
            } catch (error) {
                console.log("There was a problem");
            }
        }

        return {
            following,
            isLoading,
            username,
            goToProfile,
            fetchFollowing
        }
    }
})

// export default class ProfileFollowing extends Vue {
//     private username: any;
//     private isLoading: boolean = true;
//     private following: any = [];

//     mounted() {
//         this.username = this.$route.params.id;
//         this.fetchFollowing(this.username);
//     }

//     public goToProfile(id: string): void {
//         router.push({name: 'profile', params: {id}})
//     }

//     @Watch('$route', {immediate: true, deep: true})
//     public onRouteChange (to: any, from: any) {
//         this.fetchFollowing(to.params.id);
//     }

//     public async fetchFollowing(username: string): Promise<void> {
//         try {
//             const response = await Axios.get(`/profile/${username}/following`);
//             this.following = response.data;
//             this.isLoading = false;
//         } catch (error) {
//             console.log("There was a problem");
//         }
//     }
    
// }
