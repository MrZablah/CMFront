var aState = {
    islogin: false,
    isAdmin: false
};

var aMutations = {
    login(state){
        state.islogin = true;
    },
    logout(state){
        state.islogin = false;
    },
    isAdmin(state){
        state.isAdmin = true;
    },
    notAdmin(state){
        state.isAdmin = false;
    }
};

var aActions = {
    login(vuexContext, user){
        console.log(user);
        vuexContext.commit('login');
        vuexContext.commit('isAdmin');
        return user;
    },
    logout(vuexContext){
        vuexContext.commit('logout');
        vuexContext.commit('notAdmin');
    }

};

var aGetters = {
    getIsAdmin: state => state.isAdmin,
    getLogin: state => state.islogin,
};

module.exports = {
    aState,
    aMutations,
    aActions,
    aGetters
};
