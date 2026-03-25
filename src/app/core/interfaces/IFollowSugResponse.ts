export interface Suggestion {
    _id: string;
    name: string;
    username: string;
    photo: string;
    mutualFollowersCount: number;
    followersCount: number;
}

export interface IFollowSugData {
    suggestions: Suggestion[];
}

export interface IFollowSugPagination {
    currentPage: number;
    limit: number;
    total: number;
    numberOfPages: number;
    nextPage: number;
}

export interface IFollowSugMeta {
    pagination: IFollowSugPagination;
}

export interface IFollowSugResponse {
    success: boolean;
    message: string;
    data: IFollowSugData;
    meta: IFollowSugMeta;
}