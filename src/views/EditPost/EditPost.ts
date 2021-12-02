import { Vue } from 'vue-class-component';
import {store} from '@/store';
import Axios from "axios";
import router from '@/router';
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent ({
    name: 'EditPost',
    setup() {
        const router = useRouter();
        const route = useRoute();
        const currentUser = store.state.user.username;
        
        const title = ref('');
        const body = ref('');
        const postId = ref('');
        const isLoading = ref(true);
        const post: any = ref({});

        const goToPost = (id: string): void => {
            router.push({name: 'singlePost', params: {id}});
        }

        const fetchPost = async(id: string): Promise<void> => {
            try {
                const response = await Axios.get(`/post/${id}`);
                title.value = response.data.title;
                body.value = response.data.body;
                isLoading.value = false;
                if (currentUser != response.data.author.username) {
                    console.log("No Permissions");
                    router.push({name: 'home'});
                }
            } catch (error) {
                console.log("There was a problem");
            }
        }

        const updatePost = async (): Promise<void> => {
            try {
                const response = await Axios.post(`/post/${postId.value}/edit`, { title: title.value, body: body.value, token: store.state.user.token });
                console.log("Post was successfully updated");
                goToPost(String(postId.value));
            } catch (error) {
                console.log("There was a problem");
            }
        }

        onMounted(() => {
            postId.value = String(route.params.id);
            fetchPost(postId.value);
        })

        return {
            currentUser,
            title,
            body,
            postId,
            isLoading,
            post,
            goToPost,
            fetchPost,
            updatePost
        }
    }
})

// export default class EditPost extends Vue {
//     public title: string = '';
//     public body: string = '';
//     private postId: any;
//     private currentUser: any = store.state.user.username;
//     private isLoading: boolean = true;
//     private post: any = {};

//     mounted() {
//         this.postId = this.$route.params.id;
//         this.fetchPost(this.postId);
//     }

//     public goToPost(id: string): void {
//         router.push({name: 'singlePost', params: {id}})
//     }

//     public async fetchPost(id: string): Promise<void> {
//         try {
//             const response = await Axios.get(`/post/${id}`);
//             this.title = response.data.title;
//             this.body = response.data.body;
//             this.isLoading = false;
//             if (this.currentUser != response.data.author.username) {
//                 console.log("No Permissions");
//                 router.push({name: 'home'});
//             }
//         } catch (error) {
//             console.log("There was a problem");
//         }
//     }

//     public async updatePost(): Promise<void> {
//         const title = this.title;
//         const body = this.body;

//         try {
//             const response = await Axios.post(`/post/${this.postId}/edit`, { title, body, token: store.state.user.token });
//             console.log("Post was successfully updated");
//             this.goToPost(this.postId);
            
//         } catch (error) {
//             console.log("There was a problem");
//         }
//     }
// }