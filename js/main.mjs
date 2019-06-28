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
  window.location.href = `post-detail.html?postId=${ post.id }`;

};
// Cập nhật bài đăng
const handleEditButtonClick = (e, post) => {
  e.stopPropagation();
  e.preventDefault();
  window.location.href = `add-edit-post.html?postId=${ post.id }`;


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

const renderPagination = async () => {
  const search = new URLSearchParams(window.location.search);
  const page = parseInt(search.get('_page'));
  const limit = parseInt(search.get('_limit'));
  const postsPaginationElement = document.querySelectorAll('#postsPagination > li');

  const liFirstElement = postsPaginationElement[0];
  const liSecondElement = postsPaginationElement[1];

  const nextPage = liSecondElement.querySelector('a');
  const prePage = liFirstElement.querySelector('a');


  const params = {
    _page: !page ? AppConstants.DEFAULT_PAGE : page,
    _limit: !limit ? AppConstants.DEFAULT_LIMIT : limit,
    _order: 'desc',
    _sort: 'updatedAt'
  };

  const paramsString = new URLSearchParams(params).toString();
  const postList = await postApi.getPagination(paramsString);

  const { pagination, data } = postList;
  const totalPage = Math.ceil(pagination._totalRows / pagination._limit);
  renderPostList(data);


  if (page === 1 || !search.has('_page')) {
    if (liFirstElement) {
      console.log('page la 1');

      liFirstElement.classList.add('disabled');

      nextPage.href = `index.html?_limit=${ params._limit }&_page=${ params._page + 1 }`;


    }

  }
  else {
    if (liFirstElement) {
      // console.log('page ko 1');

      liFirstElement.classList.remove('disabled');
      if (params.page >= totalPage) {
        nextPage.href = '#';

      } else {
        nextPage.href = `index.html?_limit=${ params._limit }&_page=${ params._page + 1 }`;

      }
    }
  }



  if (page >= totalPage) {
    if (liSecondElement) {
      // console.log('đây là second');

      liSecondElement.classList.add('disabled');

      prePage.href = `index.html?_limit=${ params._limit }&_page=${ params._page - 1 }`;
    }
  } else {
    if (liSecondElement) {
      liSecondElement.classList.remove('disabled');
      if (params.page === 1) {
        prePage.href = '#';

      } else {
        prePage.href = `index.html?_limit=${ params._limit }&_page=${ (params._page - 1) !== 0 ? (params._page - 1) : 1 }`;

      }

    }

  }


}
// -----------------------
// MAIN LOGIC
// -----------------------
const init = async () => {
  // Write your logic here ....

  renderPagination();
};


init();

/*
status: 1xx, 2xx:200 OK 201 create , 3xx, 4xx lỗi client  401 lỗi đăng nhập,5xx lỗi server
*/