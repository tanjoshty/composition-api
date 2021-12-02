import {store} from '@/store';
import Axios from "axios";
import { User } from '@/models/user';
import router from '@/router';
import { formatDate } from '@/utility/date';
import Post from '../../components/Post/Post.vue';
import { computed, ComputedRef, onMounted, ref, watch } from 'vue';

export default {
    name: 'Home',
    components: {
        Post
    },
    setup() {
        const user = store.getters['getUser'];

        const isLoading = ref(true);
        const posts: any = ([]);
        const isSearchOpen = ref(store.state.isSearchOpen);
        const showFeed = ref(false);

        watch(() => store.state.isSearchOpen, function (to: any, from: any) {isSearchOpen.value = to});

        const username: ComputedRef<string> = computed(() => user.username);

        const fetchPosts = async(): Promise<void> => {
            try {
                const response = await Axios.post("/getHomeFeed", { token: user.token });
                if (response.data) {
                    showFeed.value = true;
                }
                posts.value = response.data;
                isLoading.value = false;
            } catch (error) {
                console.log("There was a problem");
            }
            Array.from(posts.value).forEach((post: any, index: number) => {
                posts.value[index].createdDate = formatDate(posts.value[index]);
            });
            
        }

        const goToSinglePost = (id: string): void => {
            router.push({name: 'singlePost', params: {id}});
        }

        onMounted(() => fetchPosts())

        return {
            user,
            showFeed,
            isLoading,
            posts,
            isSearchOpen,
            username,
            fetchPosts,
            goToSinglePost

        }
    }
}
