import * as OfflinePluginRuntime from "offline-plugin/runtime";
import "./css/index.scss";

window.addEventListener("load", () => {
  console.log("Event: Load");

  function updateOnlineStatus() {
    if (navigator.onLine) {
      document.getElementById("status").innerHTML = "Online!";
    } else {
      document.getElementById("status").innerHTML = "Offline";
    }
  }

  setTimeout(() => {
    updateOnlineStatus();
  }, 500);

  window.addEventListener("offline", () => {
    console.log("Event: Offline");
    document.getElementById("status").innerHTML = "Offline";
  });

  window.addEventListener("online", () => {
    console.log("Event: Online");
    document.getElementById("status").innerHTML = "Online!";
  });
});

OfflinePluginRuntime.install({
  onInstalled: () => {
    console.log("SW Event: onInstalled");
  },

  onUpdating: () => {
    console.log("SW Event: onUpdating");
  },

  onUpdateReady: () => {
    console.log("SW Event: onUpdateReady");
    // Tells to new SW to take control immediately
    OfflinePluginRuntime.applyUpdate();
  },

  onUpdated: () => {
    console.log("SW Event: onUpdated");
  }
});
