let newWindow; // any potential issues with global declaration? what would be better?

// TODO: detect when second window closes and switch back to ALONE

// Clicking the Open Window! button opens a new window, switching current from ALONE to ORIGINAL and setting new one to CLONE
document.getElementById("open-window").addEventListener("click", () => {
    // TODO: need to check that window isnt open before opening new one
    newWindow = window.open(
        "http://127.0.0.1:5500/window-experiment.html",
        "", "width=700,height=700,left=785,top=125");

    if (newWindow) {
        setIndicatorText("ORIGINAL", window);
        newWindow.addEventListener("load",  () => { // potential issues from waiting for it to load?
            setIndicatorText("CLONE", newWindow);
            startProximityUpdates();
        }, {once: true});
    }
})

// Clicking Write to Window! button switches second window from CLONE to POSTED
document.getElementById("post-window").addEventListener("click", () => {
    if (!newWindow || newWindow.closed) {
        alert("Window not open!");
        return;
    }
    setIndicatorText("POSTED", newWindow);
})

function setIndicatorText(indicatorText, targetWindow) { // is the best place for function declarations at the top or bottom?
    const indicator = targetWindow?.document?.getElementById("indicator");
    if (indicator) {
        indicator.textContent = indicatorText;
    } else {
        alert("Couldn't find #indicator in target window");
    }
}

function startProximityUpdates() {
  setInterval(() => {
    if (!newWindow || newWindow.closed) return;

    updateProximityText(window, newWindow);
    updateProximityText(newWindow, window);
  }, 100);
}

function updateProximityText(mainWin, otherWin) {
  const proximity = mainWin.document.getElementById("proximity");
  if (!proximity) {
    alert("Couldn't find #proximity in main window");
    return;
  }

  const distance = getDistance(mainWin, otherWin);
  if (distance < 75) {
    proximity.textContent = "☀️ FOUND ME ☀️"
  } else if (distance < 300) {
    proximity.textContent = "🔥 HOT";
  } else if (distance < 550) {
    proximity.textContent = "😐 WARM";
  } else {
    proximity.textContent = "❄️ COLD";
  }
}

function getDistance(winA, winB) {
  const a = getWindowCenter(winA);
  const b = getWindowCenter(winB);
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function getWindowCenter(win) {
    return {
        x: win.screenX + win.outerWidth / 2,
        y: win.screenY + win.outerHeight / 2,
    }
}