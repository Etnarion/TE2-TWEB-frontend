import axios from "axios";

class AxiosService {
  _createConfig() {
    const user = JSON.parse(localStorage.getItem("user"));

    let jwt;
  
    if (user != null && user.jwt != null) {
      jwt = user.jwt;
    } else {
      jwt = null;
    }

    let config = {};

    if (jwt != null) {
      config = {
        headers: {
          Authorization: "Bearer " + jwt
        }
      };
    }

    return config;
  }

  request() {
    const config = this._createConfig();
    return axios.request(config);
  }

  get(url) {
    const config = this._createConfig();
    return axios.get(url, config);
  }

  delete(url) {
    const config = this._createConfig();
    return axios.delete(url, config);
  }

  head(url) {
    const config = this._createConfig();
    return axios.head(url, config);
  }

  options(url) {
    const config = this._createConfig();
    return axios.options(url, config);
  }

  post(url, data = {}) {
    const config = this._createConfig();
    return axios.post(url, data, config);
  }

  put(url, data = {}) {
    const config = this._createConfig();
    return axios.put(url, data, config);
  }

  patch(url, data = {}) {
    const config = this._createConfig();
    return axios.patch(url, data, config);
  }
}

export default new AxiosService();
