import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfilePreview, IProfile } from '../../types/IProfile';
import IMyListItem from '../../types/IMyListItem';

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
    setCurrentProfile: (state, action: PayloadAction<IProfile>) => {
      state.currentProfile = action.payload;
    },
    resetCurrentProfile: (state) => {
      state.currentProfile = null;
    },
    resetProfiles: (state) => {
      state.currentProfile = null;
      state.profiles = [];
    },
    addMovieToList: (state, action: PayloadAction<IMyListItem>) => {
      state.currentProfile?.myList.push(action.payload);
    },
    removeMovieFromList: (state, action: PayloadAction<string>) => {
      if (state.currentProfile) {
        state.currentProfile.myList = state.currentProfile.myList.filter(
          (item) => item.contentId !== action.payload
        );
      }
    }
  },
});

export const {
  setProfiles,
  addProfile,
  removeProfile,
  setCurrentProfile,
  resetCurrentProfile,
  resetProfiles,
  addMovieToList,
  removeMovieFromList
} = profilesSlice.actions;

export default profilesSlice.reducer;
