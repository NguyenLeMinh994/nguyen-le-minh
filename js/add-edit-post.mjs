'use strict';

import AppConstants from "./appConstants.js";
import utils from "./utils.js";
import postApi from "./api/postApi.js";


const renderDetailLink = (post) => {
    const goToDetailPageLink = document.querySelector('#goToDetailPageLink');

    if (goToDetailPageLink && post) {
        goToDetailPageLink.href = `post-detail.html?postId=${ post.id }`;
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

const isValidation = () => {
    let isVal = true;
    const title = utils.getValueByElementId('postTitle');
    if (!title) {
        utils.addClassByElementId('postTitle', ['is-invalid']);
        isVal = false;
    }

    const author = utils.getValueByElementId('postAuthor');
    if (!author) {
        utils.addClassByElementId('postAuthor', ['is-invalid']);
        isVal = false;
    }
    return isVal;
};

const handleSubmitForm = async (e, postForm, post) => {
    e.preventDefault();
    const formValue = {};
    const formControlNameList = ['title', 'author', 'description'];
    const isVal = isValidation();
    if (!utils.isEmptyObject(post)) {
        //edit
        if (isVal) {

            try {

                if (postForm) {

                    for (const controlName of formControlNameList) {
                        const control = postForm.querySelector(`[name=${ controlName }]`);
                        if (control.value !== post[controlName]) {
                            formValue[controlName] = control.value;
                        }
                    }

                    const imageUrl = utils.getBackgroundImageByElementId('postHeroImage');
                    if (imageUrl !== post.imageUrl) {
                        formValue['imageUrl'] = imageUrl;
                    }
                }

                if (!utils.isEmptyObject(formValue)) {
                    formValue['id'] = post.id;
                    await postApi.update(formValue);
                    alert('Save post successfully');
                } else {
                    alert('Save post successfully');
                }

            } catch (error) {
                alert('Save post fail');

            }
        }



    } else
        if (utils.isEmptyObject(post)) {
            //add
            if (isVal) {
                try {

                    for (const controlName of formControlNameList) {
                        const control = postForm.querySelector(`[name=${ controlName }]`);
                        formValue[controlName] = control.value;
                    }

                    const imageUrl = utils.getBackgroundImageByElementId('postHeroImage');
                    formValue['imageUrl'] = imageUrl;
                    const postDataApi = await postApi.add(formValue);

                    if (!utils.isEmptyObject(postDataApi)) {
                        alert('Save post successfully');
                        window.location.href = `add-edit-post.html?postId=${ postDataApi.id }`;
                    } else {
                        alert('Save post fail');

                    }
                } catch (error) {
                    alert('Save post fail');

                }
            }


        }
};

const renderAddEditPost = (post = {}) => {
    if (!utils.isEmptyObject(post)) {
        buildEditElement(post);

    } else {
        changePostImage();
    }
    const postForm = document.querySelector('#postForm');
    if (postForm) {
        postForm.addEventListener('submit', (e) => handleSubmitForm(e, postForm, post));
    }
};
const createRandomIdImage = (min, max) => {
    return Math.trunc(Math.random() * (max - min) + min);
}
const changePostImage = () => {
    // console.log('Heloo');
    const randomImage = createRandomIdImage(100, 1000);
    console.log(randomImage);

    const imageUrl = `https://picsum.photos/id/${ randomImage }/1368/400`;
    utils.setBackgroundImageByElementId('postHeroImage', imageUrl)

};

const renderPostEditPage = async () => {
    const search = new URLSearchParams(window.location.search);
    const postId = search.get('postId');
    const mode = (search.has('postId') && postId) ? 'edit' : 'add';

    switch (mode) {
        case 'edit':
            console.log('edit');

            const postData = await getPostDataFromServer(postId);
            console.log(postData);
            renderDetailLink(postData)

            renderAddEditPost(postData);

            break;
        case 'add':
            console.log('add');
            renderAddEditPost();

            break;
        default: console.console.error('Lỗi rồi!');

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