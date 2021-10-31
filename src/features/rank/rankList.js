import { createAction, handleActions } from 'redux-actions';

// 액션 타입
const GET_INITIAL_RANK = 'rank/GET_INITIAL_RANK';

// 액션 생성자
export const getInitialRank = createAction(GET_INITIAL_RANK);


const initialState = {
  list: []
}

export default handleActions({
    // 초기 메모 로딩
}, initialState);