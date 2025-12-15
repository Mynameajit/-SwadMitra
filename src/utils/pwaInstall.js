let deferredPrompt;

export const initPWAInstall = () => {
  if (window.matchMedia("(display-mode: standalone)").matches) return;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    setTimeout(() => {
      showInstallBanner();
    }, 3000);
  });
};

function showInstallBanner() {
  if (document.getElementById("pwa-install")) return;

  const div = document.createElement("div");
  div.id = "pwa-install";
  div.innerHTML = `
    <div style="
      position:fixed;
      bottom:20px;
      left:50%;
      transform:translateX(-50%);
      background:#ff4d4d;
      color:white;
      padding:14px 18px;
      border-radius:12px;
      display:flex;
      gap:10px;
      align-items:center;
      z-index:9999;
      box-shadow:0 6px 20px rgba(0,0,0,.2);
    ">
      <span>📲 Install SwadMitra App</span>
      <button style="background:white;color:#ff4d4d;border:none;padding:6px 10px;border-radius:6px;">
        Install
      </button>
    </div>
  `;

  div.querySelector("button").onclick = async () => {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    div.remove();
  };

  document.body.appendChild(div);
}
