import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type UserType = "client" | "provider" | "producer";

interface UserStore {
  pendingUserType: UserType | null;
  setPendingUserType: (type: UserType | null) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      pendingUserType: null,
      setPendingUserType: (type) => set({ pendingUserType: type }),
    }),
    {
      name: "eventlock-pending-user-type",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
