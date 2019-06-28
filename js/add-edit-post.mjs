'use strict';

import AppConstants from "./appConstants.js";
import utils from "./utils.js";
import postApi from "./api/postApi.js";

const postFormElement = () => document.querySelector('#postForm');

const renderDetailLink = (post) => {
    const goToDetailPageLink = document.querySelector('#goToDetailPageLink');

    if (goToDetailPageLink && post) {
        goToDetailPageLink.href = `post-detail.html?postId=${ post.id }`;
        goToDetailPageLink.innerHTML = '<i class="fas fa-eye mr-1"></i>View detail';
    }
};



const renderEditElement = (post) => {

    utils.setValueByElementId('postTitle', post.title);

    utils.setValueByElementId('postAuthor', post.author);

    utils.setValueByElementId('postDescription', post.description);

    utils.setBackgroundImageByElementId('postHeroImage', post.imageUrl)
};

const isValidate = () => {
    let isValid = true;
    const title = utils.getValueByElementId('postTitle');
    if (!title) {
        utils.addClassByElementId('postTitle', ['is-invalid']);
        isValid = false;
    }

    const author = utils.getValueByElementId('postAuthor');
    if (!author) {
        utils.addClassByElementId('postAuthor', ['is-invalid']);
        isValid = false;
    }
    return isValid;
};

const submitEditPost = async (e, postForm, post) => {
    e.preventDefault();

    const formValue = {};

    const formControlNameList = ['title', 'author', 'description'];
    const isValid = isValidate();
    //edit
    if (isValid) {
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
                formValue.id = post.id;
                await postApi.update(formValue);

                alert('Save post successfully');
            } else {
                alert('No change anything');
            }

        } catch (error) {
            alert('Save post fail');

        }
    }

};

const buildEditPost = (post) => {

    renderDetailLink(post);
    renderEditElement(post);

    const postForm = postFormElement();
    if (postForm) {
        postForm.addEventListener('submit', (e) => submitEditPost(e, postForm, post));
    }
};

const submitAddPost = async (e, postForm) => {
    e.preventDefault();

    const formValue = {};
    const formControlNameList = ['title', 'author', 'description'];
    const isValid = isValidate();

    if (isValid) {
        try {

            for (const controlName of formControlNameList) {
                const control = postForm.querySelector(`[name=${ controlName }]`);
                formValue[controlName] = control.value;
            }

            const imageUrl = utils.getBackgroundImageByElementId('postHeroImage');
            formValue.imageUrl = imageUrl;
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
};

const changePostImage = () => {
    // console.log('Heloo');
    const randomImage = utils.createRandom(100, 1000);
    console.log(randomImage);

    const imageUrl = `https://picsum.photos/id/${ randomImage }/1368/400`;
    utils.setBackgroundImageByElementId('postHeroImage', imageUrl)

};


const renderPostAddOrEditPage = async () => {
    const search = new URLSearchParams(window.location.search);
    const postId = search.get('postId');
    const mode = postId ? 'edit' : 'add';

    switch (mode) {
        case 'edit':
            console.log('edit');
            const postData = await postApi.getDetail(postId);
            if (!postData) {
                console.log('Can not get post detail');
                return;
            }
            buildEditPost(postData);

            break;
        case 'add':
            console.log('add');
            changePostImage();

            const postForm = postFormElement();
            if (postForm) {
                postForm.addEventListener('submit', (e) => submitAddPost(e, postForm));
            }
            break;
        default:
            console.error('Lỗi rồi!');

            break;
    }
    const postChangeImageElement = document.querySelector('#postChangeImage');
    if (postChangeImageElement) {
        postChangeImageElement.addEventListener('click', (e) => changePostImage(e))
    }


}
const init = async () => {
    // Write your logic here ....
    renderPostAddOrEditPage();

};


init();