class Auth {
  authenticated = false;

  login = (username, callback) => {
    if (username !== undefined && username !== "") {
      this.authenticated = true;
      this.currentUser = username;
      callback();
    } else {
      alert("Please enter a username");
    }
  };

  logout = () => {
    this.authenticated = false;
  };

  isAuthenticated = () => {
    return this.authenticated;
  };
  getActiveUser = () => {
    return this.currentUser;
  };
}
export default new Auth();
