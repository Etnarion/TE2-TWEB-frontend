const axios = require('axios')

const axiosInstance = axios.create({
	baseURL: process.env.BACKEND_URL,
})

module.exports = axiosInstance