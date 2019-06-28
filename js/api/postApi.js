
import BaseApi from "./baseApi.js";
import AppConstants from "../appConstants.js";
import fetchClient from "./fetchClient.js";

class PostApi extends BaseApi {
    getResourceName() {
        return 'posts'
    }

    getPagination(params) {
        const url = `${ AppConstants.API_URL }/${ this.getResourceName() }?${ params }`;
        // const url = `${ AppConstants.API_URL }/${ this.getResourceName() }?_sort=updatedAt&_order=desc&_limit=6&_page=1`;
        // console.log(url);

        return fetchClient.get(url);
    }

}

const postApi = new PostApi();
export default postApi;