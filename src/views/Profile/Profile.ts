import { Options, Vue } from 'vue-class-component';
import {store} from '@/store';
import Axios from "axios";
import { response } from 'express';
import { Component, Watch } from 'vue-property-decorator';
import ProfilePosts from '@/components/ProfilePosts/ProfilePosts.vue';
import ProfileFollowers from '@/components/ProfileFollowers/ProfileFollowers.vue';
import ProfileFollowing from '@/components/ProfileFollowing/ProfileFollowing.vue';
import router from '@/router';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'Profile',
    components: {
        ProfilePosts,
        ProfileFollowers,
        ProfileFollowing
    },
    setup() {
        const route = useRoute()
        const showFollowButton = ref(false);
        const showFollowingButton = ref(false);
        const postsSelected = ref(true);
        const followersSelected = ref(false);
        const followingSelected = ref(false);
        const followActionLoading = ref(false);
        const profileData = ref({
            profileUsername: "...",
            profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
            isFollowing: false,
            counts: {postCount: 0, followerCount: 0, followingCount: 0}
        })
        const isSearchOpen = ref(store.state.isSearchOpen);

        watch(() => store.state.isSearchOpen, function (to: any, from: any) {isSearchOpen.value = to});

        watch(() => route.params.id, function (to: any, from: any) {fetchProfileData()});

        const showProfilePosts = (): void => {
            postsSelected.value = true;
            followersSelected.value = false;
            followingSelected.value = false;
        }
        const showProfileFollowers = (): void => {
            postsSelected.value = false;
            followersSelected.value = true;
            followingSelected.value = false;
        }
        const showProfileFollowing = (): void => {
            postsSelected.value = false;
            followersSelected.value = false;
            followingSelected.value = true;
        }

        const fetchProfileData = async(): Promise<void> => {
            const username = route.params.id;
            try {
                const response = await Axios.post(`/profile/${username}`, {token: store.state.user.token});
                profileData.value = response.data;
                checkUser(response.data);
            } catch (error) {
                console.log("There was a problem");
            }
        }

        const checkUser = (profile: any): void => {
            const currentUser = store.state.user.username;
            const profileUser = profile.profileUsername;
            if (profileUser !== currentUser && profile.isFollowing) {
                showFollowButton.value = false;
                showFollowingButton.value = true;
            } else if (profileUser !== currentUser && !profile.isFollowing) {
                showFollowButton.value = true;
                showFollowingButton.value = false;
            } else {
                showFollowButton.value = false;
                showFollowingButton.value = false;
            }
        }

        const followUser = async(id: string): Promise<void> => {
            try {
                const response = await Axios.post(`/addFollow/${id}`, {token: store.state.user.token});
                showFollowButton.value = false;
                profileData.value.isFollowing = true;
                profileData.value.counts.followerCount++;
                followActionLoading.value = false;
            } catch (error) {
                console.log("There was a problem");
            }
        }
    
        const unFollowUser = async(id: string): Promise<void> => {
            try {
                const response = await Axios.post(`/removeFollow/${id}`, {token: store.state.user.token});
                showFollowButton.value = true;
                showFollowingButton.value = false;
                profileData.value.isFollowing = false;
                profileData.value.counts.followerCount--;
                followActionLoading.value = false;
            } catch (error) {
                console.log("There was a problem");
            }
        }

        onMounted(() => fetchProfileData());

        return {
            showFollowButton,
            showFollowingButton,
            postsSelected,
            followersSelected,
            followingSelected,
            followActionLoading,
            profileData,
            isSearchOpen,
            showProfilePosts,
            showProfileFollowers,
            showProfileFollowing,
            fetchProfileData,
            checkUser,
            followUser,
            unFollowUser
        }
    }

})