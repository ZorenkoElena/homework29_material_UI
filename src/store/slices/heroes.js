import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const heroSlice = createSlice({
  name: 'heroes',
  initialState: {
    listOfHeroes: [],
    errorInListOfHeroes: null,
    info: {},
    selectedHero: null,
    errorInSelectedHero: null,
    page: 1,
  },
  reducers: {
    getListOfHeroes: (state, action) => {
      state.listOfHeroes = action.payload;
    },
    setErrInListOfHeroes: (state, action) => {
      state.errorInListOfHeroes = action.payload;
    },
    getInfo: (state, action) => {
      state.info = action.payload;
    },
    setSelectedHero: (state, action) => {
      state.selectedHero = action.payload;
    },
    closeSelectedHero: (state) => {
      state.selectedHero = null;
    },
    setErrInSelectedHero: (state, action) => {
      state.errorInSelectedHero = action.payload;
    },
  },
});

export const { getListOfHeroes, setErrInListOfHeroes, getInfo, setSelectedHero, closeSelectedHero, setErrInSelectedHero } =
  heroSlice.actions;

export const getListOfHeroesAsync = (page) => async (dispatch) => {
  try {
    const res = await axios.get(`character?page=${page}`);
    dispatch(getListOfHeroes(res.data.results));
    dispatch(getInfo(res.data.info));
  } catch (err) {
    console.log('setErrInListOfHeroes', err);
    dispatch(setErrInListOfHeroes(err));
  }
};

export const getHeroByIdAsync = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`character/${id}`);
    dispatch(setSelectedHero(res.data));
  } catch (err) {
    console.log('setErrInSelectedHero', err);
    dispatch(setErrInSelectedHero(err));
  }
};

export default heroSlice.reducer;
// https://rickandmortyapi.com/api/character?page=1
