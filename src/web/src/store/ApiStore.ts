import { defineStore, acceptHMRUpdate } from "pinia";
import { useNotificationStore } from "@/store/NotificationStore";
import { SecureAPICall } from "./helpers/axiosAPIConfig";

//refs are reactive variables
//computed are reactive variables that are derived from other reactive variables
// functions are equivalent to methods/actions in vue2

export const useApiStore = defineStore("api", () => {
  const m = useNotificationStore();

  function doApiErrorMessage(err: any) {
    let status_code = 500;
    if (err.response) {
      status_code = err.response.status || 500;
    }

    if (status_code == 401) {
      window.location.replace("/sign-in");
      return;
    }

    let message = {
      status_code: status_code,
      text: `${err.message}`, // ${err.response.statusText}`,
      icon: "mdi-error",
      variant: "error",
    };
    m.notify(message);
  }

  async function secureCall(method: string, url: string, data?: any) {
    return await SecureAPICall(method, "")
      .request({ url, data })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        doApiErrorMessage(err);
        return { error: err };
      });
  }
  return {
    secureCall,
  };
});

// hot reloading for this store
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useApiStore, import.meta.hot));
}
