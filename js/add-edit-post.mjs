'use strict';

import AppConstants from "./appConstants.js";

const updatePost = async (post) => {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post), // là biến json thành chuỗi
    };
    const url = `${ AppConstants.API_URL }/posts/${ post.id }`;
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
    const getPost = await updatePost('2e9d8474-56d7-41da-a4dc-17b9dd0016b1');
};


init();