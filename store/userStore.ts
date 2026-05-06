import {create} from 'zustand'

export const useUserStore = create<UserStore>((set) => ({
    isAdmin: false,
    setIsAdmin: (isAdmin: boolean) => set({ isAdmin: isAdmin }),
}))
