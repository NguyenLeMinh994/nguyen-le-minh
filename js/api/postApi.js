
import BaseApi from "./baseApi.js";

class PostApi extends BaseApi {
    getResourceName() {
        return 'posts'
    }


}

const postApi = new PostApi();
export default postApi;