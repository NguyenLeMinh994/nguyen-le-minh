'use strict';

import postApi from "./api/postApi.js";
import utils from "./utils.js";


// get post of data from server
const getPostDataFromServer = () => {
    const search = new URLSearchParams(window.location.search);
    const postId = search.get('postId');
    if (!search.has('postId') || !postId) {
        return -1;
    }
    return postApi.getDetail(postId);


};
const renderEditLink = (post) => {
    const goToEditPageLink = document.querySelector('#goToEditPageLink');

    if (goToEditPageLink) {
        goToEditPageLink.href = `${ utils.getHost() }/add-edit-post.html?postId=${ post.id }`;
        goToEditPageLink.innerHTML = '<i class="fas fa-edit"></i>Edit post';
    }
}

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
    try {
        const postData = await getPostDataFromServer();
        if (postData == -1) return;

        renderPost(postData);

        renderEditLink(postData);
    } catch (error) {
        console.log('Warning! ', error)
    }


};

init();