import { create, createStore } from 'zustand'

const useStore = create((set) => ({
  isAuthenticated: false,
  logout: () => set({ isAuthenticated: false }),
}));

export default useStore;