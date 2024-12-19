import axios from "axios";
import ToastMessage from "./ToastMessage";
import HttpClientHeader from "./HttpClientHeader";

const HttpClient = {
  async request(method, url, data = null, config = {}, settings = {}) {
    try {
      const baseUrl = import.meta.env.VITE_BASE_URL;

      settings.showToast = settings.showToast ?? true;
      settings.headerContentType = settings.headerContentType ?? "multipart";

      // Validate header content type
      const headers = HttpClientHeader.getHeaders();
      if (settings.headerContentType === "json") {
        headers["Content-Type"] = "application/json";
      } else {
        headers["Content-Type"] = "multipart/form-data";
      }

      const response = await axios({
        method: method,
        url: baseUrl + url,
        data: data,
        headers: headers,
        ...config,
      });

      if (response.data.success === true) {
        if (settings.showToast) {
          ToastMessage.success(response.data.message);
        }
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      ToastMessage.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  get(url, data = {}, config = {}, settings = {}) {
    // Serialize the data object into a query string
    const queryString = Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");

    // Check if the URL already contains a query string
    const separator = url.includes("?") ? "&" : "?";

    // Append the query string to the URL if data is not empty
    url = url + (queryString ? separator + queryString : "");
    return this.request("GET", url, null, config, settings);
  },

  post(url, data = {}, config = {}, settings = {}) {
    return this.request("POST", url, data, config, settings);
  },

  put(url, data = {}, config = {}, settings = {}) {
    return this.request("PUT", url, data, config, settings);
  },

  delete(url, data = {}, config = {}, settings = {}) {
    // Serialize the data object into a query string
    const queryString = Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");

    // Check if the URL already contains a query string
    const separator = url.includes("?") ? "&" : "?";

    // Append the query string to the URL if data is not empty
    url = url + (queryString ? separator + queryString : "");
    return this.request("DELETE", url, null, config, settings);
  },
};

export default HttpClient;
