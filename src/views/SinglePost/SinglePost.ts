import {store} from '@/store';
import Axios from "axios";
import { formatDate } from '@/utility/date';
import { defineComponent, onBeforeMount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent ({
    name: 'SinglePost',
    setup() {
        const currentUser = String(store.state.user.username);
        const route = useRoute();
        const router = useRouter();

        const postId = ref('');
        const showButtons = ref(false);
        const isLoading = ref(true);
        
        const post: any = ref({});

        watch(() => route.params.id, function (to: any, from: any) {fetchPost(to)});

        const goToEdit = (id: string):void => {
            router.push({name: 'editPost', params: {id}});
        }

        const goToProfile = (id: string): void => {
            router.push({name: 'profile', params: {id}});
        }

        const fetchPost = async(id: string): Promise<void> => {
            try {
                const response = await Axios.get(`/post/${id}`);
                post.value = response.data;
                isLoading.value = false;
            } catch (error) {
                console.log("There was a problem");
            }
            post.value.createdDate = formatDate(post.value);
    
            if (currentUser === post.value.author.username) {
                showButtons.value = true;
            } else {
                showButtons.value = false;
            }
        }

        const deletePost = async(id: string): Promise<void> => {
            const areYouSure = window.confirm("Do you really want to delete this post?");
            if (areYouSure) {
                try {
                    const response = await Axios.delete(`/post/${id}`, {data: {token: store.state.user.token} });
                    if (response.data == "Success") {
                        alert("Post was successfully deleted.");
                        goToProfile(currentUser);
                    }
                    
                } catch (error) {
                    console.log("There was a problem");
                }
            } 
        }

        onBeforeMount(() => {
            postId.value = String (route.params.id);
            fetchPost(postId.value);
        })

        return {
            currentUser,
            route,
            router,
            postId,
            showButtons,
            isLoading,
            post,
            goToEdit,
            goToProfile,
            fetchPost,
            deletePost
        }

    }
})

// export default class SinglePost extends Vue {
//     private postId: any;
//     private showButtons = false;
//     private currentUser: any = store.state.user.username;
//     private isLoading = true;
//     private post: any = {};
//     private postBody: any;

//     mounted() {
//         this.postId = this.$route.params.id;
//         this.fetchPost(this.postId);
//     }

//     public goToEdit(id: string): void {
//         router.push({name: 'editPost', params: {id}})
//     }

//     public goToProfile(id: string): void {
//         router.push({name: 'profile', params: {id}})
//     }

//     @Watch('$route', {immediate: true, deep: true})
//     public onRouteChange (to: any, from: any) {
//         this.fetchPost(to.params.id);
//     }

//     public async fetchPost(id: string): Promise<void> {
//         try {
//             const response = await Axios.get(`/post/${id}`);
//             this.post = response.data;
//             this.postBody = this.post.body;
//             this.isLoading = false;
//         } catch (error) {
//             console.log("There was a problem");
//         }
//         this.post.createdDate = formatDate(this.post);

//         if (this.currentUser === this.post.author.username) {
//             this.showButtons = true;
//         } else {
//             this.showButtons = false;
//         }

//     }

//     public async deletePost(id: string): Promise<void> {
//         const areYouSure = window.confirm("Do you really want to delete this post?");
//         if (areYouSure) {
//             try {
//                 const response = await Axios.delete(`/post/${id}`, {data: {token: store.state.user.token} });
//                 if (response.data == "Success") {
//                     alert("Post was successfully deleted.");
//                     this.goToProfile(this.currentUser);
//                 }
                
//             } catch (error) {
//                 console.log("There was a problem");
//             }
//         } 
//     }

// }
