let newWindow; // any potential issues with global declaration? what would be better?

// Clicking the Open Window! button opens a new window, switching current from ALONE to ORIGINAL and setting new one to CLONE
document.getElementById("open-window").addEventListener("click", () => {
    newWindow = window.open(
        "http://127.0.0.1:5500/window-experiment.html",
        "", "width=700,height=700,left=785,top=125");

    if (newWindow) {
        setIndicatorText("ORIGINAL", window);
        newWindow.addEventListener("load",  () => { // potential issues from waiting for it to load?
            setIndicatorText("CLONE", newWindow)
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