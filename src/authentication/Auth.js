class Auth {
    authenticated = true;
    currentUser = "miroslav"

    login = (username, callback) => {
        if (username !== undefined && username !== '') {
            this.authenticated = true;
            this.currentUser = username;
            callback();
        } else {
            alert("Please enter a username");
        }

    }

    logout = (callback) => {
        this.authenticated = false;
        callback();
    }

    isAuthenticated = () => {
        return this.authenticated;
    };
    getActiveUser = () => {
        return this.currentUser
    };
}
export default new Auth();