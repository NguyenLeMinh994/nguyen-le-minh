'use strict';

import AppConstants from "./appConstants.js";

const getPostDetail = async (postId) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: '',
    };
    const url = `${ AppConstants.API_URL }/posts/${ postId }`;
    // Trả về promise
    // Way 2
    const response = await fetch(url, options);
    if (response.status >= 200 && response.status < 300) {
        const data = await response.json();// return promise
        return data;
    }

};

const init = async () => {
    // Write your logic here ....
    const getPost = await getPostDetail('2e9d8474-56d7-41da-a4dc-17b9dd0016b1');
    console.log(getPost);
};


init();