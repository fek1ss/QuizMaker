const initialState = { test: null };

function testReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        test: action.payload.test,
      };
    case 'DELETE':
      return { ...state, test: null };
    default:
      return state;
  }
}

export default testReducer;

export const addTest = payload => ({ type: 'ADD', payload });
export const deleteTest = () => ({ type: 'DELETE' });
