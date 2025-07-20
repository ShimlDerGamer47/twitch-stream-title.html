document.addEventListener("DOMContentLoaded", () => {
  try {
    const html = document.documentElement;
    const fontFamily = "--font-family";
    const robotoBold = getComputedStyle(html).getPropertyValue(fontFamily);
    const body = document.body;

    Object.assign(body.style, {
      fontFamily: robotoBold,
      background: "transparent",
      width: "100%",
      height: "100%",
      margin: "0",
      padding: "0",
      overflow: "hidden"
    });

    const container = document.getElementById("titleTxtContainerId");
    const titleTxt = document.getElementById("titleTxtId");

    Object.assign(container.style, {
      fontFamily: robotoBold,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      margin: "0",
      padding: "0",
      userSelect: "none",
      cursor: "default",
      pointerEvents: "none",
      textAlign: "center"
    });

    Object.assign(titleTxt.style, {
      fontFamily: robotoBold,
      margin: "0",
      padding: "0",
      userSelect: "none",
      cursor: "default",
      pointerEvents: "none"
    });

    const params = new URLSearchParams(window.location.search);
    const channelName = params.get("channelName") || "Shiml_der_Gamer47";
    const maxFontSize = parseInt(params.get("maxFontSize"), 10) || 120;
    const minFontSize = parseInt(params.get("minFontSize"), 10) || 1;
    const color = params.get("color") || "#ffffff";
    const textDecor = params.get("textDecoration") || "none";

    const hasUrlFont = params.has("fontSize");
    const defaultSize = 35;
    const urlFontSize = parseInt(params.get("fontSize") || defaultSize, 10);

    if (hasUrlFont && !isNaN(urlFontSize)) {
      titleTxt.style.fontSize = urlFontSize + "px";
    }

    titleTxt.style.color = color;
    titleTxt.style.textDecoration = textDecor;

    function fitText(textEl, wrapper, maxSize, minSize) {
      let lo = minSize,
        hi = maxSize;
      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        textEl.style.fontSize = mid + "px";
        const overflows =
          textEl.scrollWidth > wrapper.clientWidth ||
          textEl.scrollHeight > wrapper.clientHeight;
        if (overflows) {
          hi = mid - 1;
        } else {
          lo = mid + 1;
        }
      }
      textEl.style.fontSize = hi + "px";
    }

    fetch(`https://decapi.me/twitch/game/${encodeURIComponent(channelName)}`, {
      mode: "cors"
    })
      .then((res) => res.text())
      .then((game) => {
        const text = game.startsWith("User not found")
          ? "Keine Kategorie gefunden."
          : game || "Keine Kategorie gefunden.";
        titleTxt.textContent = text;

        if (!hasUrlFont) {
          fitText(titleTxt, container, maxFontSize, minFontSize);
        }
      })
      .catch((err) => {
        console.error("Fehler beim Abrufen des Spiels:", err);
        titleTxt.textContent = "Fehler beim Laden.";
        if (!hasUrlFont) {
          fitText(titleTxt, container, maxFontSize, minFontSize);
        }
      });

    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => {
        if (!hasUrlFont) {
          fitText(titleTxt, container, maxFontSize, minFontSize);
        }
      });
      ro.observe(container);
    }
  } catch (error) {
    console.error("Fehler im Script:", error);
  }
});
