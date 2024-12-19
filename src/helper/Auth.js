const Auth = {
  save: (data) => {
    const { access_token, ...userData } = data;
    Auth.setToken(access_token);
    Auth.setUser(userData);
    return true;
  },

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    return true;
  },

  getId: () => {
    return Auth.getUser()?.id || null;
  },

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  setToken: (token) => {
    localStorage.setItem("token", token);
    return true;
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  isAuthenticated: () => {
    return !!Auth.getToken();
  },

  clearAuth: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return true;
  },

  logout: () => {
    return Auth.clearAuth();
  },
};

export default Auth;
