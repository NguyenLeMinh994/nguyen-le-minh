'use strict';

import AppConstants from "./appConstants.js";
import utils from "./utils.js";
import postApi from "./api/postApi.js";



const renderDetailLink = (post) => {
    const goToDetailPageLink = document.querySelector('#goToDetailPageLink');

    if (goToDetailPageLink) {
        goToDetailPageLink.href = `${ utils.getHost() }/post-detail.html?postId=${ post.id }`;
        goToDetailPageLink.innerHTML = '<i class="fas fa-eye mr-1"></i>View detail';
    }
};

const getPostDataFromServer = (postId) => {
    if (!postId) return;
    return postApi.getDetail(postId);

};
const buildEditElement = (post) => {

    utils.setValueByElementId('postTitle', post.title);

    utils.setValueByElementId('postAuthor', post.author);

    utils.setValueByElementId('postDescription', post.description);

    utils.setBackgroundImageByElementId('postHeroImage', post.imageUrl)
};

const renderEdit = (post) => {
    buildEditElement(post);
};
const createRandomIdImage = (min, max) => {
    return Math.trunc(Math.random() * (max - min) + min);
}
const changePostImage = () => {
    // console.log('Heloo');
    const randomImage = createRandomIdImage(100, 1000);
    const imageUrl = `https://picsum.photos/id/${ randomImage }/1368/400`;
    utils.setBackgroundImageByElementId('postHeroImage', imageUrl)

};

const renderPostEditPage = async () => {
    const search = new URLSearchParams(window.location.search);
    const postId = search.get('postId');
    const mode = (search.has('postId') && postId) ? 'edit' : 'add';

    switch (mode) {
        case 'edit':
            const postData = await getPostDataFromServer(postId);
            console.log(postData);

            renderDetailLink(postData)
            renderEdit(postData);

            break;
        case 'add':

            break;
        default:
            break;
    }
    const postChangeImageElement = document.querySelector('#postChangeImage');
    if (postChangeImageElement) {
        postChangeImageElement.addEventListener('click', (e) => changePostImage(e))
    }


}
const init = async () => {
    // Write your logic here ....
    renderPostEditPage();

};


init();