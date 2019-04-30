import * as OfflinePluginRuntime from "offline-plugin/runtime";
import "./css/index.scss";

const ONLINE = `<div style="color:green">PWA Online!</div>`;
const OFFLINE = `<div style="color:GoldenRod">PWA Offline</div>`;

window.addEventListener("load", () => {
  console.log("Event: Load");

  function updateOnlineStatus() {
    if (navigator.onLine) {
      document.getElementById("status").innerHTML = ONLINE;
    } else {
      document.getElementById("status").innerHTML = OFFLINE;
    }
  }

  setTimeout(() => {
    updateOnlineStatus();
  }, 500);

  // Reconnect online event
  window.addEventListener("online", () => {
    console.log("Event: Online");
    document.getElementById("status").innerHTML = ONLINE;
  });

  // Lose connection event
  window.addEventListener("offline", () => {
    console.log("Event: Offline");
    document.getElementById("status").innerHTML = OFFLINE;
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
