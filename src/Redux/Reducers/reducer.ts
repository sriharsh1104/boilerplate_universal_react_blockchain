import { combineReducers } from 'redux';
import { UserSlice } from '../Slices/user.slice'
import { LoaderSlice } from '../Slices/loader.slice'
import { IcoSlice } from '../Slices/ico.slice';
import { ThemeSlice } from '../Slices/theme.slice';

/**COMBINE ALL REDUCERS */
export const reducers = combineReducers({
    user: UserSlice.reducer,
    loader: LoaderSlice.reducer,
    ico: IcoSlice.reducer,
    theme: ThemeSlice.reducer,
});