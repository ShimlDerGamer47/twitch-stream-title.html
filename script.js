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

  const channelName = params.get("channelName");

  const fontSize = params.get("fontSize");
  const color = params.get("color");
  const textDecoration = params.get("textDecoration");

  if (fontSize) titleTxt.style.fontSize = fontSize;
  if (color) titleTxt.style.color = color;
  if (textDecoration) titleTxt.style.textDecoration = textDecoration;

  const twitchTitleApi = `https://decapi.me/twitch/title/${encodeURIComponent(
    channelName
  )}`;

  if (channelName) {
    fetch(twitchTitleApi)
      .then((res) => res.text())
      .then((title) => {
        if (title.startsWith("User not found:")) {
          titleTxt.textContent = "";
          return;
        }

        titleTxt.textContent = title || "Kein Titel vorhanden!";
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen des Titels:", error);
      });
  }
});
