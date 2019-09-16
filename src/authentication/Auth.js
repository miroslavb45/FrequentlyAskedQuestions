class Auth {
    authenticated = true;

    login(username, callback) {
        if (username !== undefined && username !== '') {
            this.authenticated = true;
            this.acitveUser = username;
            callback();
        } else {
            alert("Please enter a username");
        }

    }

    logout(callback) {
        this.authenticated = false;
        callback();
    }

    isAuthenticated() { return this.authenticated };
    getActiveUser() { return this.activeUser };
}
export default new Auth();