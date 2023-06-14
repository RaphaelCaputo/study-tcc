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
  updateList(state, payload) {
    const { selectedChapter, newChapters, newChapter } = payload
    if (selectedChapter) state.currentChapter = newChapter
    state.list = newChapters
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
  incrementChapterTime(state) {
    state.chapterTime++
  },
}

export const actions = {
  async updateChapterReq({ commit, state }, payload) {
    try {
      console.log('payload Update', payload)

      const { id, selectedChapter, addTime, ...changes } = payload
      const index = state.list.findIndex((chapter) => chapter.objectID === id)

      const chapter = state.list[index]

      if (addTime)
        changes.studyTime = Number(chapter.studyTime) + Number(addTime)

      const newChapter = {
        ...chapter,
        ...changes,
      }

      console.log('chapter', chapter)
      console.log('changes', changes)
      console.log('new', newChapter)

      const newChapters = state.list.slice(0)
      newChapters[index] = newChapter
      commit('updateList', { selectedChapter, newChapters, newChapter })

      const response = await fetch('/api/chapter', {
        method: 'PUT',
        body: JSON.stringify({ id, ...newChapter }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log('submit!')
      console.log('response', response)

      if (response.ok) {
        const json = await response.json()
        console.log('json', json)
      }
    } catch (error) {
      console.error(error)
    }
  },
}
