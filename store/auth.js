var aState = {
    login: true,
    isAdmin: true
};

var aMutations = {

};

var aActions = {

};

var aGetters = {
    getIsAdmin: state => state.isAdmin,
    getLogin: state => state.login,
};

module.exports = {
    aState,
    aMutations,
    aActions,
    aGetters
};
