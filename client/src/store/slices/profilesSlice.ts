import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfilePreview } from '../../types/IProfile';

interface ProfilesState {
  profiles: IProfilePreview[];
  currentProfile: IProfilePreview | null;
}

const initialState: ProfilesState = {
  profiles: [],
  currentProfile: null
};

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setProfiles: (state, action: PayloadAction<IProfilePreview[]>) => {
      state.profiles = action.payload;
    },
    addProfile: (state, action: PayloadAction<IProfilePreview>) => {
      state.profiles.push(action.payload);
    },
    removeProfile: (state, action: PayloadAction<string>) => {
      state.profiles = state.profiles.filter(profile => profile.id !== action.payload);
    },
    setCurrentProfile: (state, action: PayloadAction<IProfilePreview>)=> {
      state.currentProfile = action.payload;
    }
  },
});

export const { setProfiles, addProfile, removeProfile, setCurrentProfile } = profilesSlice.actions;
export default profilesSlice.reducer;
