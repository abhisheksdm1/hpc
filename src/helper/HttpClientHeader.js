import { v4 as uuidv4 } from "uuid";
import Auth from "./Auth";
import { getDefaultLanguage } from "./Translate";

const HttpClientHeader = {
  getHeaders: () => {
    return {
      Authorization: `Bearer ${Auth.getToken()}`,
      Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      Language: getDefaultLanguage(),
      "FCM-Token": null,
      "Device-Name": HttpClientHeader.getDeviceName(),
      "Device-Type": HttpClientHeader.getDeviceType(),
      "Device-ID": HttpClientHeader.getDeviceId(),
      "App-Version": HttpClientHeader.getAppVersion(),
      "Push-Notification": HttpClientHeader.getPushNotification(),
      "Content-Type": "multipart/form-data",
      //'Content-Type': 'application/json'
    };
  },

  getPushNotification: () => {
    let pushNotification = localStorage.getItem("push-notification");
    if (!pushNotification) {
      pushNotification = "1";
      localStorage.setItem("push-notification", pushNotification);
    }
    return pushNotification;
  },

  getAppVersion: () => {
    let appVersion = localStorage.getItem("app-version");
    if (!appVersion) {
      appVersion = "1.1";
      localStorage.setItem("app-version", appVersion);
    }
    return appVersion;
  },

  getDeviceId: () => {
    let deviceId = localStorage.getItem("device-id");
    if (!deviceId) {
      deviceId = uuidv4();
      localStorage.setItem("device-id", deviceId);
    }
    return deviceId;
  },

  getDeviceType: () => {
    const userAgent = window.navigator.userAgent;
    if (/Android/i.test(userAgent)) {
      return "A";
    }
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return "I";
    }
    return "W"; // Default to 'W' for Windows or other devices
  },

  getDeviceName: () => {
    const userAgent = window.navigator.userAgent;
    return userAgent;
    // Uncomment the following code for more descriptive device names
    /*
    if (/Windows/i.test(userAgent)) {
      return 'Windows Device';
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return 'iOS Device';
    } else if (/Android/i.test(userAgent)) {
      return 'Android Device';
    } else {
      return 'Unknown Device';
    }
    */
  },
};

export default HttpClientHeader;
