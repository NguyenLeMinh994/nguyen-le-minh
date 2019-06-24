'use strict';

import postApi from "./api/postApi.js";
import utils from "./utils.js";
import AppConstants from "./appConstants.js";


const getPostListElement = () => document.querySelector('#postsList');

//-----Learning------

// async function abc(){}

//-----Learning------

// Xóa bài đăng
const handleRemoveButtonClick = async (e, postItemElement) => {
  e.stopPropagation();
  e.preventDefault();

  try {
    if (window.confirm('Bạn có muốn xóa bài này không?') && postItemElement) {
      const postId = postItemElement.getAttribute('data-post-id');
      const responseDel = await postApi.remove(postId);
      if (utils.isEmptyObject(responseDel)) {
        document.location.reload();
      }
    }

  } catch (error) {
    console.log('Remove post', error);

  }

};
const handlePassDetailPage = (e, post) => {
  e.preventDefault();
  // console.log('Detail Page', 'OK nhe');
  document.location.href = `./post-detail.html?postId=${ post.id }`;

};
// Cập nhật bài đăng
const handleEditButtonClick = (e, post) => {
  e.stopPropagation();
  e.preventDefault();
  document.location.href = `./add-edit-post.html?postId=${ post.id }`;


};

// Xây dựng danh sách bài đăng
const buildPostItem = (post) => {
  const postItemTemplate = document.querySelector('#postItemTemplate');
  const postItemFragment = postItemTemplate.content.cloneNode(true);
  const postItemElement = postItemFragment.querySelector('li');

  if (postItemElement) {
    // console.log(post);
    postItemElement.setAttribute('data-post-id', post.id);

    //Title
    const postItemTitle = postItemElement.querySelector('#postItemTitle');
    postItemTitle.innerText = post.title || ' No Title';

    // Description
    const postItemDescription = postItemElement.querySelector('#postItemDescription');
    postItemDescription.innerText = utils.truncateTextlength(post.description, 50) || '';

    //Author
    const postItemAuthor = postItemElement.querySelector('#postItemAuthor');
    postItemAuthor.innerText = post.author || ' No Author';

    // TimeSpan
    const postItemTimeSpan = postItemElement.querySelector('#postItemTimeSpan');
    postItemTimeSpan.innerText = '- ' + utils.formatDate(post.createdAt);


    //Image
    const postItemImage = postItemElement.querySelector('#postItemImage');
    postItemImage.src = post.imageUrl || AppConstants.DEFAULT_IMAGE_URL;


  }

  const postItemRemove = postItemElement.querySelector('#postItemRemove');
  // console.log(postItemRemove);
  //error
  if (postItemRemove) {
    postItemRemove.addEventListener('click', (e) => handleRemoveButtonClick(e, postItemElement));
  }


  // Pass Edit Page
  const postItemEdit = postItemElement.querySelector('#postItemEdit');
  if (postItemEdit) {
    postItemEdit.addEventListener('click', (e) => handleEditButtonClick(e, post));
  }

  // Pass Detail Page
  const postItem = postItemElement.querySelector('#postItem');
  if (postItem) {
    postItem.addEventListener('click', (e) => handlePassDetailPage(e, post));
  }
  return postItemElement;

};

const renderPostList = (postList) => {
  const postListElement = getPostListElement();

  if (postListElement) {

    for (const post of postList) {
      const postItemElement = buildPostItem(post);
      if (postItemElement) {
        postListElement.appendChild(postItemElement);
      }
    }

  }
};

// -----------------------
// MAIN LOGIC
// -----------------------
const init = async () => {
  // Write your logic here ....


  const postList = await postApi.getAll();
  // console.log(postList);

  renderPostList(postList);
};


init();

/*
status: 1xx, 2xx:200 OK 201 create , 3xx, 4xx lỗi client  401 lỗi đăng nhập,5xx lỗi server
*/