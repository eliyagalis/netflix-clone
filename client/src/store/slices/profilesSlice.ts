import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfilePreview, IProfile } from '../../types/IProfile';

interface ProfilesState {
  profiles: IProfilePreview[];
  currentProfile: IProfile | null;
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
    setCurrentProfile: (state, action: PayloadAction<IProfile>)=> {
      state.currentProfile = action.payload;
    },
    resetCurrentProfile: (state)=> {
      state.currentProfile = null;
    },
    resetProfiles: (state) => {
      state.currentProfile = null;
      state.profiles = [];
    }
  },
});

export const { setProfiles, addProfile, removeProfile, setCurrentProfile, resetCurrentProfile, resetProfiles } = profilesSlice.actions;
export default profilesSlice.reducer;
