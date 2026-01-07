const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const year = document.getElementById("year");
const miniForm = document.getElementById("miniForm");
const contactForm = document.getElementById("contactForm");
const copyBox = document.getElementById("copyBox");
const copyText = document.getElementById("copyText");
const copyBtn = document.getElementById("copyBtn");

year.textContent = new Date().getFullYear();

// Mobile nav
if (navToggle) {
  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Close menu after clicking a link (mobile)
  navMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Generate message (mini form)
if (miniForm) {
  miniForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(miniForm);
    const name = data.get("name");
    const level = data.get("level");
    const time = data.get("time");

    const msg =
`嗨 Jeff，我想預約單板課 🙌
- 名字：${name}
- 程度：${level}
- 想上課時段：${time}

我想先請你建議適合的課程長度與重點，謝謝！`;

    alert("已幫你產生訊息（可到「預約/聯絡」區用完整表單複製）\n\n" + msg);
    miniForm.reset();
  });
}

// Contact form => show copyable text
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);

    const name = data.get("name");
    const contact = data.get("contact");
    const level = data.get("level");
    const goal = data.get("goal");
    const time = data.get("time");
    const duration = data.get("duration");

    const msg =
`嗨 Jeff，我想預約單板課 🏂❄️
- 名字：${name}
- 聯絡方式：${contact}
- 程度：${level}
- 目標/想改善：${goal}
- 想上課時段：${time}
- 希望課程長度：${duration}

麻煩你回我可約時段與建議安排，謝謝！`;

    copyText.textContent = msg;
    copyBox.hidden = false;
    copyBox.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copyText.textContent);
      copyBtn.textContent = "已複製";
      setTimeout(() => (copyBtn.textContent = "複製"), 1200);
    } catch (err) {
      alert("你的瀏覽器不允許自動複製，請手動選取複製～");
    }
  });
}