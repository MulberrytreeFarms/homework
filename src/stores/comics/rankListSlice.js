import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchComics } from './rankListAPI'
import { LIST_STATE } from '../../models/comics'

const initialState = {
  list: [],
  filterResult: [],
  filter: [],
  page: 1,
  isLoading: true,
}

const delay = millis => new Promise( resolve => setTimeout(resolve, millis))

export const getComicList = createAsyncThunk(
  'rank/fetchComics',
  async query => {
    try {
      const response = await fetchComics(query)
      await delay(600)
      return response     
    } catch (e) {
      console.error(e)
    }
  }
)

export const rankSlice = createSlice({
  name: 'rank',
  initialState,
  reducers: { // mutations
    nextPage: state => {
      state.page += 1
    },
    filterList: (state, {payload}) => {
      state.filterResult = payload
    },
    filterSet: (state, {payload}) => {
      state.filter = payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getComicList.pending, state => {
        state.isLoading = true
      })
      .addCase(getComicList.fulfilled, (state, {payload}) => {
        state.isLoading = false
        let all = [...state.list, ...payload]
        state.list = [...all]
      })
  }
})

export const { nextPage, filterList, filterSet } = rankSlice.actions
export const rankListState = state => state.rank

export const setFilterList = () => (dispatch, getState) => {
  const currentList = rankListState(getState()).list
  const currentFilter = rankListState(getState()).filter
  
  if(currentFilter.length === 0 || currentFilter.length === 3) {
    dispatch(filterList(currentList))
    return
  }
  const OPTION = 'contentsState' // 필터를 걸 속성

  let setFilterString = ''    
  for(let val of currentFilter) {
    setFilterString += LIST_STATE[val].status
  }
  let setList = currentList.filter( val => {
    if (setFilterString.indexOf('freedEpisodeSize') > -1 && val.freedEpisodeSize > 2) {
      return val
    } else return setFilterString.indexOf(val[OPTION]) > -1
  })
  dispatch(filterList(setList))
}

export default rankSlice.reducer