document.addEventListener("DOMContentLoaded", () => {
  // PERSONALIZE THESE TWO VALUES
  const friendName = "Birthday Girl";
  const senderName = "Your Friend";

  const byId = (id) => document.getElementById(id);
  const scenes = Array.from(document.querySelectorAll(".scene"));
  const progressLabel = byId("progressLabel");
  const backgroundMusic = byId("backgroundMusic");
  const musicToggle = byId("musicToggle");
  const toast = byId("toast");
  let typingTimer = null;
  let toastTimer = null;
  let musicStarted = false;

  // Set names in every part of the page.
  ["friendName", "letterName", "finalName"].forEach((id) => {
    if (byId(id)) byId(id).textContent = friendName;
  });
  ["senderName", "finalSender"].forEach((id) => {
    if (byId(id)) byId(id).textContent = senderName;
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
  }

  // MUSIC: browsers may block autoplay until the visitor interacts.
  async function startMusic() {
    if (!backgroundMusic) return;
    backgroundMusic.volume = 0.4;
    try {
      await backgroundMusic.play();
      musicStarted = true;
      if (musicToggle) {
        musicToggle.setAttribute("aria-pressed", "true");
        const label = musicToggle.querySelector("span");
        if (label) label.textContent = "Sound on";
      }
    } catch (error) {
      // A first user click/tap will try again.
    }
  }
  startMusic();
  document.addEventListener("pointerdown", () => {
    if (backgroundMusic && backgroundMusic.paused) startMusic();
  }, { once: true });

  if (musicToggle) {
    musicToggle.addEventListener("click", async () => {
      if (!backgroundMusic) return;
      if (backgroundMusic.paused) {
        await startMusic();
      } else {
        backgroundMusic.pause();
        musicStarted = false;
        musicToggle.setAttribute("aria-pressed", "false");
        const label = musicToggle.querySelector("span");
        if (label) label.textContent = "Sound off";
      }
    });
  }

  // Create gentle floating hearts and sparkles.
  const floatingSymbols = ["💕", "💖", "✨", "🌸", "💗", "🎀"];
  const sparkleContainer = byId("sparkleField") || document.body;
  function createFloatingSymbol() {
    const symbol = document.createElement("span");
    symbol.className = "floating-symbol";
    symbol.setAttribute("aria-hidden", "true");
    symbol.textContent = floatingSymbols[Math.floor(Math.random() * floatingSymbols.length)];
    Object.assign(symbol.style, {
      position: "fixed", left: `${Math.random() * 100}vw`, bottom: "-30px",
      fontSize: `${14 + Math.random() * 18}px`, opacity: "0.8", pointerEvents: "none",
      zIndex: "1", transition: "transform 7s linear, opacity 7s linear"
    });
    sparkleContainer.appendChild(symbol);
    requestAnimationFrame(() => {
      symbol.style.transform = `translateY(-${window.innerHeight + 80}px) rotate(${Math.random() * 360}deg)`;
      symbol.style.opacity = "0";
    });
    setTimeout(() => symbol.remove(), 7200);
  }
  setInterval(createFloatingSymbol, 900);

  // FIXED NAVIGATION: every button points to a real section ID.
  function showScene(sceneId) {
    const target = document.getElementById(String(sceneId).replace(/^#/, ""));
    if (!target || !target.classList.contains("scene")) {
      console.warn("Could not find scene:", sceneId);
      return;
    }
    scenes.forEach((scene, index) => {
      scene.classList.toggle("active", scene === target);
      if (scene === target && progressLabel) {
        progressLabel.textContent = `Surprise ${index + 1} of ${scenes.length}`;
      }
    });
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // This was missing in the earlier script: Home -> Memories.
  byId("startButton")?.addEventListener("click", () => showScene("memories"));
  document.querySelectorAll("[data-next]").forEach((button) => {
    button.addEventListener("click", () => showScene(button.dataset.next));
  });
  byId("brandLink")?.addEventListener("click", (event) => {
    event.preventDefault();
    showScene("home");
  });

  // Clickable photos and their message modal.
  const photoModal = byId("photoModal");
  const modalPhoto = byId("modalPhoto");
  const modalMessage = byId("modalMessage");
  function openPhotoModal(card) {
    const image = card.querySelector("img");
    if (image && modalPhoto) {
      modalPhoto.src = image.getAttribute("src") || "";
      modalPhoto.alt = image.alt || "Selected memory";
    }
    if (modalMessage) modalMessage.textContent = card.dataset.message || "A lovely memory with my favourite human. 💖";
    if (photoModal) {
      photoModal.hidden = false;
      photoModal.classList.add("active", "show");
      photoModal.setAttribute("aria-hidden", "false");
    }
  }
  function closePhotoModal() {
    if (!photoModal) return;
    photoModal.hidden = true;
    photoModal.classList.remove("active", "show");
    photoModal.setAttribute("aria-hidden", "true");
  }
  document.querySelectorAll(".polaroid").forEach((card) => {
    card.addEventListener("click", () => openPhotoModal(card));
  });
  byId("modalClose")?.addEventListener("click", closePhotoModal);
  photoModal?.addEventListener("click", (event) => {
    if (event.target === photoModal) closePhotoModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePhotoModal();
  });

  // Birthday letter types word by word.
  const letterText = "Happy Birthday! 🎂💖 Even though this wish is a little late, I hope your special day was filled with happiness, laughter, and lots of cake! 😂✨ May this year bring you success, peace, good memories, and all the wonderful things you deserve. Keep smiling, stay happy, and never stop being your unique, introverted self. 😂🫶 Wishing you an amazing year ahead filled with fun, surprises, and fewer awkward social interactions! 🎉";
  const typedLetter = byId("typedLetter");
  function typeLetter() {
    if (!typedLetter) return;
    clearTimeout(typingTimer);
    typedLetter.textContent = "";
    const words = letterText.split(/\s+/);
    let index = 0;
    function typeNextWord() {
      if (index >= words.length) return;
      typedLetter.textContent += `${index === 0 ? "" : " "}${words[index++]}`;
      typingTimer = setTimeout(typeNextWord, 105);
    }
    typeNextWord();
  }
  const envelopeButton = byId("envelopeButton");
  envelopeButton?.addEventListener("click", () => {
    const opened = envelopeButton.classList.toggle("opened");
    envelopeButton.setAttribute("aria-expanded", String(opened));
    const hint = byId("envelopeHint");
    if (hint) hint.textContent = opened ? "YOUR LETTER IS OPEN 💗" : "TAP TO OPEN YOUR VERY IMPORTANT MAIL 💌";
    if (opened) {
      byId("letterCard")?.classList.add("visible");
      typeLetter();
    } else {
      byId("letterCard")?.classList.remove("visible");
      clearTimeout(typingTimer);
    }
  });
  byId("retypeButton")?.addEventListener("click", typeLetter);

  // Wish button and all three candles work.
  const candles = Array.from(document.querySelectorAll(".candle"));
  let wishMade = false;
  function makeWish() {
    candles.forEach((candle) => {
      candle.classList.add("out");
      candle.setAttribute("aria-pressed", "true");
    });
    wishMade = true;
    const hint = byId("wishHint");
    if (hint) hint.textContent = "Wish made! May something wonderful come true. 💫";
    byId("finalMessage")?.classList.add("visible");
    byId("wishButton")?.setAttribute("disabled", "disabled");
    createCelebration(75);
    showToast("Your wish has been sent to the universe! 🌟");
  }
  candles.forEach((candle) => candle.addEventListener("click", () => {
    candle.classList.add("out");
    candle.setAttribute("aria-pressed", "true");
    if (candles.every((item) => item.classList.contains("out"))) makeWish();
  }));
  byId("wishButton")?.addEventListener("click", makeWish);

  function createCelebration(amount = 60) {
    const layer = byId("confettiLayer") || document.body;
    const emojis = ["🎉", "🎊", "💖", "💕", "✨", "🎂", "🌸"];
    for (let i = 0; i < amount; i++) {
      const particle = document.createElement("span");
      particle.className = "celebration-particle";
      particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      Object.assign(particle.style, {
        position: "fixed", left: `${Math.random() * 100}vw`, top: "-40px",
        fontSize: `${16 + Math.random() * 20}px`, pointerEvents: "none", zIndex: "9999",
        transition: `transform ${2 + Math.random() * 3}s ease-in, opacity 3s`
      });
      document.body.appendChild(particle);
      const horizontal = (Math.random() - 0.5) * 300;
      requestAnimationFrame(() => {
        particle.style.transform = `translate(${horizontal}px, ${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`;
        particle.style.opacity = "0";
      });
      setTimeout(() => particle.remove(), 5200);
    }
  }

  // Replay returns to the first scene and resets the surprise.
  byId("replayButton")?.addEventListener("click", () => {
    clearTimeout(typingTimer);
    showScene("home");
    byId("letterCard")?.classList.remove("visible");
    envelopeButton?.classList.remove("opened");
    envelopeButton?.setAttribute("aria-expanded", "false");
    if (byId("envelopeHint")) byId("envelopeHint").textContent = "TAP TO OPEN YOUR VERY IMPORTANT MAIL 💌";
    if (typedLetter) typedLetter.textContent = "";
    byId("finalMessage")?.classList.remove("visible");
    candles.forEach((candle) => {
      candle.classList.remove("out");
      candle.setAttribute("aria-pressed", "false");
    });
    byId("wishButton")?.removeAttribute("disabled");
    wishMade = false;
    if (byId("wishHint")) byId("wishHint").textContent = "Psst… click the candles or the button below!";
    createCelebration(35);
    showToast("Let's relive the memories! 💕");
  });
});
