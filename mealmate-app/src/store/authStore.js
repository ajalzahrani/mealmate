import { create } from "zustand";

const initialState = {
  auth: null,
};

const useAuthStore = create()((set, get) => ({
  ...initialState,

  login: (username, isAuthenticated) => {
    set({
      auth: { authUsername: username, isAuthenticated },
    });
  },

  logout: () => {
    set({ ...initialState });
  },

  resetAuth: () => {
    set({ ...initialState });
  },
}));

export default useAuthStore;
