<p align="center">
  <img src="favicon.png" alt="IG Tracker Logo" width="64" style="border-radius: 12px;">
</p>

<h1 align="center">IG Tracker</h1>

A lightweight, high-precision Instagram followers and following tracking tool written in pure Vanilla JavaScript. Designed to run directly in the browser's developer console, it successfully bypasses modern web API limitations and data masking without relying on invasive visual DOM scraping.

## 🛠️ How to Use

1. **Copy the Script:** Go to the [IG Tracker Tool](https://xohnol.github.io/ig-tracker/) and click the **Copy Code** button.
2. Go to the Instagram profile of the target user you want to analyze on your desktop browser.
3. Open the Developer Tools console (Press `F12`, or Right-click -> *Inspect* -> *Console*).
4. Paste the code into the console and hit `Enter`.*(Note: if your browser blocks you, you might need to type `allow pasting` in the console first to enable pasting)*.
5. Use the dashboard to extract followers, following, or compare data.

> 💾 **How to Save & Compare Target Accounts in the Future:**
> 1. When analyzing a target profile, click **"Copy List"** after extraction and paste those usernames into a simple text file (like Notepad) to save them on your computer.
> 2. In the future, when you want to see what changed on **that exact same user's account**, return to their Instagram profile.
> 3. Go to the **"Compare Lists"** section of the dashboard, paste your saved old list, and run the comparison.
> 4. The tool will compare your old list with the target user's current live data, showing you exactly who unfollowed them or who is new!

---

## ✨ Key Features

*   **Multi-Pass Request Engine:** Automatically detects the target account's metrics and executes sequential data sweeps to beat Instagram's defensive *Cap & Shuffle* limits.
*   **Mathematical De-duplication:** Leverages native JavaScript `Set` structures to filter out ghost duplicates and erratic server responses, ensuring 100% accurate, clean lists.
*   **Stealth Pacing & Anti-Ban Logic:** Implements smart randomized micro-delays (1.5s - 2.5s) combined with automatic cycle-resting periods to keep your account safe from temporary blocks.
*   **Zero Dependencies:** 100% standalone code. No browser extensions, no external software, and no third-party database connections required.
*   **Privacy First:** Runs entirely inside your local browser session. Your data never leaves your computer.

---

## 🔬 How It Works (The Logic)

Most modern Instagram scrapers fail because Meta limits web API pagination to around 160-400 entries before cutting off the token or shuffling the user array. 

**IG Tracker** solves this by implementing a **Multi-Giro (Multi-Pass) loop**:
Every time Instagram tries to hide the remaining followers by terminating the session prematurely, our engine caches the unique usernames retrieved so far, forces a tiny cooldown, and automatically triggers a new pass from a fresh starting point. By constantly merging new discoveries and wiping duplicates, it bridges the data gaps until the absolute target count is matched.

---

## ⚠️ Disclaimer

This project was developed for educational and research purposes only. Automating interactions or scraping data from Instagram may violate Meta's Terms of Service. The author assumes no responsibility for any temporary restrictions, shadowbans, or account suspensions resulting from the use of this code. Use it at your own discretion.

---
License: [MIT](LICENSE)
