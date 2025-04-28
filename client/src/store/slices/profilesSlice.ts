import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfilePreview } from '../../types/IProfile';

interface ProfilesState {
  profiles: IProfilePreview[];
}

const initialState: ProfilesState = {
  profiles: [],
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
  },
});

export const { setProfiles, addProfile, removeProfile } = profilesSlice.actions;
export default profilesSlice.reducer;
