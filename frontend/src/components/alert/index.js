import "./alert.style.scss";

export class Alert {
  static show(message, type = "info", duration = 5000) {
    const alertEl = document.createElement("div");
    alertEl.className = `custom-alert ${type}`;
    alertEl.innerHTML = `
            ${message}
            <button class="close-btn">&times;</button>
        `;

    document.body.appendChild(alertEl);

    // Animation d'apparition
    setTimeout(() => alertEl.classList.add("show"), 10);

    // Gestion de la fermeture
    const close = () => {
      alertEl.classList.remove("show");
      alertEl.classList.add("hide");
      setTimeout(() => alertEl.remove(), 300);
    };

    // Bouton de fermeture
    alertEl.querySelector(".close-btn").addEventListener("click", close);

    // Fermeture automatique
    if (duration > 0) {
      setTimeout(() => {
        if (document.body.contains(alertEl)) close();
      }, duration);
    }
  }

  static success(message, duration) {
    this.show(message, "success", duration);
  }

  static error(message, duration) {
    this.show(message, "error", duration);
  }

  static warning(message, duration) {
    this.show(message, "warning", duration);
  }

  static confirm(message, confirmText = "Confirmer", cancelText = "Annuler") {
    return new Promise((resolve) => {
      const alertEl = document.createElement("div");
      alertEl.className = "custom-alert confirm";
      alertEl.innerHTML = `
                ${message}
                <div class="alert-buttons">
                    <button class="alert-btn cancel">${cancelText}</button>
                    <button class="alert-btn confirm">${confirmText}</button>
                </div>
            `;

      document.body.appendChild(alertEl);
      setTimeout(() => alertEl.classList.add("show"), 10);

      // Gestion des clics
      const buttons = alertEl.querySelector(".alert-buttons");
      buttons.addEventListener("click", (e) => {
        if (e.target.classList.contains("confirm")) {
          closeAlert(true);
        } else if (e.target.classList.contains("cancel")) {
          closeAlert(false);
        }
      });

      const closeAlert = (result) => {
        alertEl.classList.remove("show");
        alertEl.classList.add("hide");
        setTimeout(() => {
          alertEl.remove();
          resolve(result);
        }, 300);
      };
    });
  }
}
