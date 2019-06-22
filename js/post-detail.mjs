'use strict';

import postApi from "./api/postApi.js";
import utils from "./utils.js";


// get post of data from server
const getPostDataFromServer = () => {
    const url = new URL(document.location.href);
    const search = url.searchParams;
    const postId = search.get('postId');

    return postApi.getDetail(postId);
};

// render post data
const renderPost = (post) => {
    utils.setBackgroundImageByElementId('postHeroImage', post.imageUrl);

    const postDetailTitle = document.querySelector('#postDetailTitle');
    if (postDetailTitle) {
        document.title = post.title;
        postDetailTitle.innerText = post.title;
    }

    const postDetailAuthor = document.querySelector('#postDetailAuthor');
    const postDetailTimeSpan = document.querySelector('#postDetailTimeSpan');
    if (postDetailAuthor && postDetailTimeSpan) {
        postDetailAuthor.innerText = post.author;
        postDetailTimeSpan.innerText = '- ' + utils.formatDate(post.createdAt);
    }

    const postDetailDescription = document.querySelector('#postDetailDescription');
    if (postDetailDescription) {
        postDetailDescription.innerText = post.description;
    }

};


const init = async () => {
    const postData = await getPostDataFromServer();
    console.log(postData);

    renderPost(postData);

};


init();