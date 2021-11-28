import Axios from "axios";
import { defineComponent, onMounted, reactive, ref, watch } from 'vue';
import {useRoute, useRouter} from 'vue-router';

export default defineComponent({
    name: 'ProfileFollowers',
    props: {
        testProp: {type: Boolean, required: true}
    },
    setup(props) {
        const route = useRoute();
        const router = useRouter();

        const followers = ref([]);
        const isLoading = ref(true);

        const username = route.params.id;

        onMounted(() => {
            fetchFollowers(username);
        })

        watch(() => route.params.id, function (to: any, from: any) {fetchFollowers(to)})

        watch(() => props.testProp, function (newVal: any, oldVal: any) {fetchFollowers(username);})

        const goToProfile = (id: string):void => {
            router.push({name: 'profile', params: {id}})
        }

        const fetchFollowers = async (username: string | string[]): Promise<void> => {
            try {
                const response = await Axios.get(`/profile/${username}/followers`);
                followers.value = response.data;
                isLoading.value = false;
            } catch (error) {
                console.log("There was a problem");
            }
        }
        return {
            followers,
            isLoading,
            username,
            goToProfile,
            fetchFollowers
        }
    }
})