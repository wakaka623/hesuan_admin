const Test = {
  state: {
    testState: '',
  },

  mutations: {
    SET_TEST: state => {
      console.log('commit_test123');
    }
  },

  actions: {
    test({ commit }) {
      console.log('action_test123')
      commit('SET_TEST');
    }
  }
}

export default Test
