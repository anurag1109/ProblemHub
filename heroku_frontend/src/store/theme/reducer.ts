import { Reducer } from "redux";
import { SET_THEME, SET_THEME_COLOR, ThemeActions } from "./action";

export interface ThemeState {
  readonly theme:MyTheme;
  readonly themeColor:ThemeColor;

}
export const defaultState: ThemeState = {
  theme:'light',
  themeColor:'green'
};

const reducer: Reducer<ThemeState, ThemeActions> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case SET_THEME:
      return{
          ...state,
          theme:action.payload
      }
    case SET_THEME_COLOR:
        return {
            ...state,
            themeColor:action.payload
        }  
    default:
      return state;
  }
};

export default reducer;
