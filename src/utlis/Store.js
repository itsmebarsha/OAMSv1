/** @format */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const userStore = create()(
  persist(
    (set) => ({
      userData: {
        userEmail: "",
        userRole: "",
        schoolCode: "",
      },
      setData: (data) =>
        set((state) => ({
          userData: {
            ...state.userData,
            userEmail: data.userEmail ?? state.userData.userEmail,
            userRole: data.userRole ?? state.userData.userRole,
            schoolCode: data.schoolCode ?? state.userData.schoolCode,
          },
        })),
      emptyData: () =>
        set(() => ({
          userData: {
            userEmail: "",
            userRole: "",
            schoolCode: "",
          },
        })),
      clearPersistedStorage: () => {
        localStorage.removeItem("userStored"); // Remove the specific key used in local storage
      },
    }),
    {
      name: "userStored",
    }
  )
);
