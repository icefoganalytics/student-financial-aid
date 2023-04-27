import { defineStore } from "pinia";

import { useNotificationStore } from "@/store/NotificationStore";
import { useApiStore } from "@/store/ApiStore";
import { PROFILE_URL } from "@/urls";

let m = useNotificationStore();

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      display_name: "",
      first_name: "",
      last_name: "",
      email: "",
    },
  }),
  getters: {},
  actions: {
    async initialize() {
      console.log("Initializing user store...");

      await this.loadCurrentUser();

      console.log("Initialized user store");
    },
    async loadCurrentUser() {
      let api = useApiStore();
      await api.secureCall("get", PROFILE_URL).then((resp) => {
        this.user = resp.data;
      });
    },
  },
});
