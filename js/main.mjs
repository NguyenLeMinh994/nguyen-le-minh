'use strict';
const getPostListElement = () => document.querySelector('#postsList');

//-----Learning------
//

// async function abc(){}
const getPostListAsync = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    // body: '',
  };
  // Trả về promise
  // Way 2
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts', options);
  if (response.status >= 200 && response.status < 300) {
    return response.json();// return promise

  }
  // Way 1
  // return fetch('https://js-post-api.herokuapp.com/api/posts', options)
  // .then(response => {
  //   // lấy dữ liệu
  //   // console.log(response);
  //   if (response.status >= 200 && response.status < 300) {
  //     return response.json();
  //     // response.json()
  //     //   .then(data => console.log(data));

  //   }
  // });
};



//-----Learning------
// Xóa bài đăng
const handleRemoveButtonClick = (e, postItemElement) => {
  const postListElement = getPostListElement();
  if (postItemElement && postListElement) {
    postListElement.removeChild(postItemElement);
  }
};

// Cập nhật bài đăng
const handleEditButtonClick = (e) => {

}
// Xây dựng danh sách bài đăng

const buildPostItem = (post) => {
  const postItemTemplate = document.querySelector('#postItemTemplate');
  const postItemFragment = postItemTemplate.content.cloneNode(true);
  const postItemElement = postItemFragment.querySelector('li');

  if (postItemElement) {
    // console.log(post);
    postItemElement.setAttribute('data-post-id', post);

  }

  const postItemRemove = postItemElement.querySelector('#postItemRemove');
  if (postItemRemove) {
    postItemRemove.addEventListener('click', (e) => handleRemoveButtonClick(e, postItemElement));
    postItemRemove.removeAttribute('id');
  }

  const postItemEdit = postItemElement.querySelector('#postItemEdit');
  if (postItemRemove) {
    postItemEdit.addEventListener('click', (e) => handleEditButtonClick(e));
    postItemEdit.removeAttribute('id');
  }
  return postItemElement;

};
const renderPostList = (postList) => {
  const postListElement = getPostListElement();

  if (postListElement) {

    for (let i = 0; i < 10; i++) {

      const postItemElement = buildPostItem(i);
      postListElement.appendChild(postItemElement);

    }

  }
};

// -----------------------
// MAIN LOGIC
// -----------------------
const init = async () => {
  // Write your logic here ....


  const postList = await getPostListAsync();
  console.log('init', postList);

  renderPostList(postList);
};


init();

/*
status: 1xx, 2xx:200 OK 201 create , 3xx, 4xx lỗi client  401 lỗi đăng nhập,5xx lỗi server
*/