import { environment } from "../../../environments/environment.development";

export const appAPIs = {

    // Auth APIs
    register: `${environment.baseUrl}/users/signup`,
    login: `${environment.baseUrl}/users/signin`,


    // User
    followSuggestions: `${environment.baseUrl}/users/suggestions?limit=5`,



    // Posts
    getAllPosts: `${environment.baseUrl}/posts`,
    createPost: `${environment.baseUrl}/posts`,
}