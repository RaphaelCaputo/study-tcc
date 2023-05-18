export const state = () => ({
  list: [],
  currentChapter: {},
  chapterTime: 0,
  isPlay: false,
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
  setCurrentChapter(state, chapterId) {
    state.currentChapter = chapterId
  },
  setPlay(state, value) {
    state.isPlay = value
  },
  setChapterTime(state, value) {
    state.chapterTime = value
  },
}
