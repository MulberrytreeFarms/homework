import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchComics } from './rankListAPI'

const initialState = {
  list: [],
  page: 1,
  filter: [0,1,2],
  isLoading: true,
}

export const getComicList = createAsyncThunk(
  'rank/fetchComics',
  async query => {
    const response = await fetchComics(query)
    console.log(response)
    return response
  }
)

export const rankSlice = createSlice({
  name: 'rank',
  initialState,
  reducers: {
    initialList: state => {
      state.list = []
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getComicList.pending, state => {
        state.isLoading = true
      })
      .addCase(getComicList.fulfilled, (state, action) => {
        state.isLoading = false
        // state.value += action.payload
      })
  },
})

export const { initialList } = rankSlice.actions
export const selectRank = state => state.rank.list

export default rankSlice.reducer