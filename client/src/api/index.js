import axios from 'axios';

const url = 'http://localhost:5000/posts';

const API = {
    fetchPosts: function () {
        return axios.get(url);
    },
    fetchById: function (id) {
        return axios.get(`${url}/find/${id}`);
    },
    createPost: function (postData) {
        return axios.post(url, postData);
    },
    updatePost: function (id, postData) {
        return axios.patch(`${url}/${id}`, postData);
    },
    likePost: function (id, postData) {
        return axios.patch(`${url}/${id}/likePost`, postData);
    },
    deletePost: function (id) {
        return axios.delete(`${url}/${id}`);
    }
}

export default API;
