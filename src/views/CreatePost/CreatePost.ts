import { store } from "@/store";
import Axios from "axios";
import { defineComponent, ref } from 'vue';
import { useRouter } from "vue-router";

export default defineComponent ({
    name: 'CreatePost',
    setup() {
        const router = useRouter();

        const title = ref('');
        const body = ref('');

        const createPost = async(): Promise<void> => {
            try {
                const response = await Axios.post("/create-post", { title: title.value, body: body.value, token: store.state.user.token });
                console.log("Post was successfully created");
                goToSinglePost(response.data);
                
            } catch (error) {
                console.log("There was a problem");
            }
        }

        const goToSinglePost = (id: string): void => {
            router.push({name: 'singlePost', params: {id}});
        }

        return {
            title,
            body,
            createPost,
            goToSinglePost
        }
    }
})

// export default class CreatePost extends Vue {
//     public title: string = '';
//     public body: string = '';

//     public async createPost(): Promise<void> {
//         const title = this.title;
//         const body = this.body;

//         try {
//             // API Call to register
//             const response = await Axios.post("/create-post", { title, body, token: store.state.user.token });
//             console.log("Post was successfully created");
//             this.goToSinglePost(response.data);
            
//         } catch (error) {
//             console.log("There was a problem");
//         }
//     }

//     public goToSinglePost(id: string): void {
//         router.push({name: 'singlePost', params: {id}});
//     }
// }