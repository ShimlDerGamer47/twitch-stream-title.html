document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const fontFamily = "--font-family";
  const robotoBold = getComputedStyle(html).getPropertyValue(fontFamily).trim();
  const body = document.body;

  body.style.fontFamily = robotoBold;
  body.style.background = "transparent";

  const titleTxt = document.getElementById("titleTxtId");
  titleTxt.style.fontFamily = robotoBold;

  const params = new URLSearchParams(window.location.search);
  const channelName = params.get("channelName") || "Shiml_der_Gamer47";
  const color = params.get("color") || "#ffffff";
  const textDecoration = params.get("textDecoration") || "none";
  const fontSizeParam = params.get("fontSize") || "50px";

  if (color) titleTxt.style.color = color;
  if (textDecoration) titleTxt.style.textDecoration = textDecoration;

  let maxFont = 200;
  if (fontSizeParam) {
    const parsed = parseInt(fontSizeParam, 10);

    if (!isNaN(parsed)) maxFont = parsed;
  }

  function fitText(elem, maxF = maxFont, minF = 8) {
    const container = elem.parentElement;

    const cw = container.clientWidth;
    const ch = container.clientHeight;

    let lo = minF,
      hi = maxF,
      best = minF;

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      elem.style.fontSize = mid + "px";

      if (elem.scrollWidth <= cw && elem.scrollHeight <= ch) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    elem.style.fontSize = best + "px";
  }

  function updateAndFit(text) {
    titleTxt.textContent = text || "Kein Titel vorhanden!";
    fitText(titleTxt);
  }

  window.addEventListener("resize", () => {
    fitText(titleTxt);
  });

  if (channelName) {
    const twitchTitleApi = `https://decapi.me/twitch/title/${encodeURIComponent(
      channelName
    )}`;
    fetch(twitchTitleApi)
      .then((res) => res.text())
      .then((title) => {
        if (title.startsWith("User not found:")) {
          updateAndFit("");
        } else {
          updateAndFit(title);
        }
      })
      .catch((err) => {
        console.error("Fehler beim Abrufen des Titels:", err);
        updateAndFit("");
      });
  }
});
