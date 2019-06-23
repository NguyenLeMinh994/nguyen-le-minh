const request = async (url, options) => {

    try {
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json'
            },
            ...options,
            // method: 'PATCH',

            // body: JSON.stringify(post), // là biến json thành chuỗi
        };
        // const url = `${ AppConstants.API_URL }/posts/${ post.id }`;
        // Trả về promise
        // Way 2
        const response = await fetch(url, requestOptions);
        if (response.status >= 200 && response.status < 300) {
            const data = await response.json();// return promise
            return data;
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
        // Handle error
        const error = new Error(response.status);
        throw error;
    } catch (error) {

    }
};
const get = (url, params) => request(url, { method: 'GET' });

const post = (url, body) => request(url, { body: JSON.stringify(body), method: 'POST' });

const patch = (url, body) => request(url, { body: JSON.stringify(body), method: 'PATH' });

const deleteRequest = (url) => request(url, { method: 'DELETE' });


const fetchClient = {
    get,
    post,
    patch,
    delete: deleteRequest,
};

export default fetchClient;