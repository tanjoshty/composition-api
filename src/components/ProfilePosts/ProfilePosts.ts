import {store} from '@/store';
import Axios from "axios";
import { formatDate } from '@/utility/date';
import Post from '../Post/Post.vue';
import { ref, defineComponent, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent ({
    name: 'ProfilePosts',
    components: {
        Post
    },
    setup() {
        const route = useRoute();

        const username = route.params.id;

        const posts: any = ref([]);
        const isLoading = ref(true);

        watch(() => route.params.id, function (to: any, from: any) {fetchPosts(to);});

        const fetchPosts = async(username: string | string[]): Promise<void> => {
            try {
                const response = await Axios.get(`/profile/${username}/posts`);
                posts.value = response.data;
                isLoading.value = false;
            } catch (error) {
                console.log("There was a problem");
            }
            Array.from(posts.value).forEach((post: any, index: number) => {
                posts.value[index].createdDate = formatDate(posts.value[index]);
            });
        }

        onMounted(() => fetchPosts(username));

        return {
            username,
            posts,
            isLoading,
            fetchPosts,
        }
    }
})
