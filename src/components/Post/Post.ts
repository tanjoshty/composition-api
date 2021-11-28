import {store} from '@/store';
import Axios from "axios";
import router from '@/router';
import { defineComponent } from 'vue';

export default defineComponent ({
    name: 'Post',
    props: {
        posts: [],
        username: String,
        search: Boolean
    },
    emits: ['close-search'],
    setup(_, context) {
        const goToSinglePost = (id: string):void => {
            router.push({name: 'singlePost', params: {id}});
            context.emit("close-search");
        }

        return {
            goToSinglePost
        }
    }
})
