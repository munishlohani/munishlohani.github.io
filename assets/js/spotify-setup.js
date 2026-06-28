document.addEventListener("DOMContentLoaded", function () {
  const item = document.querySelector(".spotify-navbar-item");
  const trigger = document.querySelector(".spotify-navbar-trigger");
  const player = document.querySelector("[data-spotify-player]");

  if (!item || !trigger || !player) {
    return;
  }

  const embeds = JSON.parse(player.dataset.spotifyEmbeds || "[]");
  if (!embeds.length) {
    return;
  }

  const index = Math.floor(Math.random() * embeds.length);
  player.innerHTML = embeds[index];

  const open = function () {
    item.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
  };

  const close = function () {
    item.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
  };

  trigger.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (item.classList.contains("is-open")) {
      close();
    } else {
      open();
    }
  });

  item.addEventListener("mouseenter", open);
  item.addEventListener("mouseleave", close);

  document.addEventListener("click", function (event) {
    if (!item.contains(event.target)) {
      close();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      close();
    }
  });

  trigger.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (item.classList.contains("is-open")) {
        close();
      } else {
        open();
      }
    }
  });
});
