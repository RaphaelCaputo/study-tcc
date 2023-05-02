export const state = () => ({
  list: [],
})

export const getters = {
  getList(state) {
    return state.list
  },
}

export const mutations = {
  createList(state, payload) {
    state.list = payload
  },
  addOneToList(state, payload) {
    state.list.push(payload)
  },
}
