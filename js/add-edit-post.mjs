'use strict';

import AppConstants from "./appConstants.js";
import utils from "./utils.js";

const renderDetailLink = (postId) => {
    const goToDetailPageLink = document.querySelector('#goToDetailPageLink');

    if (goToDetailPageLink) {
        goToDetailPageLink.href = `${ utils.getHost() }/post-detail.html?postId=${ postId }`;
        goToDetailPageLink.innerHTML = '<i class="fas fa-eye mr-1"></i>Edit post';
    }
}

const init = async () => {
    // Write your logic here ....
    const search = new URLSearchParams(window.location.search);
    const postId = search.get('postId');
    const mode = (search.has('postId') && postId) ? 'edit' : 'add';
    switch (mode) {
        case 'edit':
            renderDetailLink(postId)
            break;
        case 'add':

            break;
        default:
            break;
    }

};


init();