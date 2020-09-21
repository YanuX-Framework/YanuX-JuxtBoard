import authenticationReducer from './authentication'

export const initialState = { authentication: authenticationReducer() }

export default (state, action) => {
    const { authentication } = state;
    return { authentication: authenticationReducer(authentication, action) };
}