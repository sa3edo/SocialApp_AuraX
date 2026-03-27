import { environment } from "../../../environments/environment.development";

export const appAPIs = {

    // Auth APIs
    register: `${environment.baseUrl}/users/signup`,
    login: `${environment.baseUrl}/users/signin`,


    // User
    followSuggestions: `${environment.baseUrl}/users/suggestions?limit=5`,
    getUserPosts: (userId: string) => `${environment.baseUrl}/users/${userId}/posts`,


    // Posts
    getAllPosts: `${environment.baseUrl}/posts`,
    createPost: `${environment.baseUrl}/posts`,
    getPostLikes: (postId: string) => `${environment.baseUrl}/posts/${postId}/likes`,
    toggleLikePost: (postId: string) => `${environment.baseUrl}/posts/${postId}/like`,
}