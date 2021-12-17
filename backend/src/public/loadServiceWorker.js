if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((reg) => console.log("serviceWorker registered!", reg))
      .catch((err) => console.log("serviceWorker not registered!", err));
  }