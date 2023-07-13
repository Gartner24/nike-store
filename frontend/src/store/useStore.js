import create from 'zustand';

const useStore = create((set, get) => ({
  isAuthenticated: false,
  logout: () => set({ isAuthenticated: false }),
}));

export { useStore };