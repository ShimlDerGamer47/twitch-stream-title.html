document.addEventListener("DOMContentLoaded", () => {
  const titleTxt = document.getElementById("titleTxtId");

  const params = new URLSearchParams(window.location.search);
  const channelName = params.get("channelName") || "Shiml_der_Gamer47";
  const color = params.get("color") || "#ffffff";
  const textDecoration = params.get("textDecoration") || "none";
  const fontSizeParamRaw = params.get("fontSize");

  let maxFont = 200;
  const parsedFontSize = parseInt(fontSizeParamRaw, 10);
  if (!isNaN(parsedFontSize)) maxFont = parsedFontSize;

  titleTxt.style.color = color;
  titleTxt.style.textDecoration = textDecoration;

  function fitText(elem, maxF = maxFont, minF = 8) {
    const container = elem.parentElement;
    const cw = container.clientWidth;
    const ch = container.clientHeight;

    let low = minF,
      high = maxF,
      best = minF;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      elem.style.fontSize = `${mid}px`;

      if (elem.scrollWidth <= cw && elem.scrollHeight <= ch) {
        best = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    elem.style.fontSize = `${best}px`;
  }

  function updateAndFit(text) {
    titleTxt.textContent = text || "Kein Titel vorhanden!";
    fitText(titleTxt);
  }

  window.addEventListener("resize", () => {
    fitText(titleTxt);
  });

  function fetchTwitchTitle() {
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
  fetchTwitchTitle();
});
