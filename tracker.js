(function() {
    // 1. CLEAR ORIGINAL INSTAGRAM PAGE
    window.stop();
    document.body.innerHTML = '';
    document.querySelectorAll('style, link[rel="stylesheet"]').forEach(el => el.remove());

    // 2. INJECT CUSTOM STYLES
    const style = document.createElement('style');
    style.innerHTML = `
        body { margin: 0; padding: 0; background-color: #0f0f11; color: #e1e1e1; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; overflow: hidden; }
        #app-container { display: flex; height: 100vh; width: 100vw; }
        #sidebar { width: 280px; background-color: #18181b; border-right: 1px solid #27272a; padding: 24px; display: flex; flex-direction: column; gap: 12px; }
        #sidebar h1 { font-size: 24px; font-weight: 800; background: linear-gradient(to right, #10b981, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-top: 0; margin-bottom: 24px; letter-spacing: -0.5px; }
        .menu-btn { background-color: #27272a; color: #fff; border: 1px solid #3f3f46; padding: 12px 16px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; text-align: left; transition: all 0.2s; outline: none; }
        .menu-btn:hover { background-color: #3f3f46; border-color: #52525b; }
        .menu-btn.active { background-color: #2563eb; border-color: #3b82f6; }
        #main-content { flex: 1; padding: 40px; overflow-y: auto; background-color: #09090b; }
        .card { background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 24px; max-width: 800px; margin: 0 auto; }
        textarea { width: 100%; height: 150px; background-color: #09090b; color: #10b981; border: 1px solid #3f3f46; border-radius: 8px; padding: 12px; font-family: monospace; resize: vertical; box-sizing: border-box; margin-bottom: 16px; }

        .action-btn {
            display: block; width: 100%; padding: 16px; border-radius: 12px;
            font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.2s ease;
            border: none; background-color: #10b981; color: #042f2e;
            box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3); outline: none;
        }
        .action-btn:hover { background-color: #34d399; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4); }
        .action-btn:active { transform: translateY(0); }
        .action-btn.btn-blue { background-color: #2563eb; color: #ffffff; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3); }
        .action-btn.btn-blue:hover { background-color: #3b82f6; box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4); }
        .action-btn.btn-purple { background-color: #8b5cf6; color: #ffffff; box-shadow: 0 4px 14px rgba(139, 92, 246, 0.3); }
        .action-btn.btn-purple:hover { background-color: #a78bfa; box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4); }

        .list-container { margin-top: 20px; max-height: 400px; overflow-y: auto; border: 1px solid #27272a; border-radius: 8px; padding: 12px; }
        .list-item { padding: 8px; border-bottom: 1px solid #27272a; font-family: monospace; }
        .list-item:last-child { border-bottom: none; }
    `;
    document.head.appendChild(style);

    // 3. CREATE APP INTERFACE
    const appHTML = `
        <div id="app-container">
            <div id="sidebar">
                <h1>IG Tracker</h1>
                <button class="menu-btn" id="nav-compare">1. Compare Lists</button>
                <button class="menu-btn" id="nav-followers">2. Extract Followers</button>
                <button class="menu-btn" id="nav-following">3. Extract Following</button>
                <div style="margin-top: auto; font-size: 12px; color: #71717a;">
                    Status: <span style="color: #10b981;">Multi-Pass Engine Active</span>
                </div>
            </div>
            <div id="main-content">
                <div id="view-container" class="card">
                    <h2>Welcome</h2>
                    <p style="color: #a1a1aa;">Select an option from the sidebar to get started.</p>
                </div>
            </div>
        </div>
    `;
    document.body.innerHTML = appHTML;

    const views = {
        compare: `
            <h2>Compare Lists</h2>
            <p style="color: #a1a1aa; font-size: 14px;">Paste previously extracted usernames and compare with current data in real-time.</p>
            <textarea id="old-list" placeholder="Paste old usernames here...&#10;mario.rossi&#10;luca_bianchi&#10;giulia99"></textarea>
            <div style="display: flex; gap: 12px;">
                <button class="action-btn" id="btn-run-compare-followers">Compare with Followers</button>
                <button class="action-btn btn-blue" id="btn-run-compare-following">Compare with Following</button>
            </div>
            <div id="compare-results" style="margin-top: 24px;"></div>
        `,
        extractFollowers: `
            <h2>Extract Followers</h2>
            <p style="color: #a1a1aa; font-size: 14px;">Extract the full list of users following this profile.</p>
            <button class="action-btn" id="btn-start-followers">Start Extraction</button>
            <div id="followers-results" style="margin-top: 24px;"></div>
        `,
        extractFollowing: `
            <h2>Extract Following</h2>
            <p style="color: #a1a1aa; font-size: 14px;">Extract the full list of users this profile is following.</p>
            <button class="action-btn" id="btn-start-following">Start Extraction</button>
            <div id="following-results" style="margin-top: 24px;"></div>
        `
    };

    const viewContainer = document.getElementById('view-container');

    // COPY BUTTON FEEDBACK
    function showSuccessEffect(button) {
        const originalText = button.innerText;
        button.innerText = '✓ Copied!';
        button.style.backgroundColor = '#34d399';
        button.style.transform = 'scale(0.96)';
        setTimeout(() => { button.style.transform = 'scale(1)'; }, 100);
        setTimeout(() => {
            button.innerText = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    }

    // MULTI-PASS EXTRACTION ENGINE
    async function extractUsersSafe(type, logElement, counterElement) {
        // FIX: robust username parsing. pathname.replace(/\//g,'') broke on
        // multi-segment paths like /user/followers/. Take the first segment only.
        const username = window.location.pathname.split('/').filter(Boolean)[0];
        if (!username) throw new Error("WARNING: You are not on a user profile page!");

        logElement.innerHTML = `<p style="color: #3b82f6;">✓ Analyzing profile @${username}...</p>`;

        const resInfo = await fetch(`https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`, {
            headers: { 'X-IG-App-ID': '936619743392459' }
        });
        if (!resInfo.ok) throw new Error("Profile not found or rate limited.");

        const dataInfo = await resInfo.json();
        // FIX: guard against missing data (logged-out / changed API shape).
        const user = dataInfo && dataInfo.data && dataInfo.data.user;
        if (!user) throw new Error("Could not read profile data. Make sure you are logged in to Instagram.");
        const userId = user.id;

        const expectedCount = type === 'followers'
            ? user.edge_followed_by.count
            : user.edge_follow.count;

        // FIX: fail loudly on private accounts instead of silently returning 0.
        if (user.is_private && !user.followed_by_viewer) {
            throw new Error("This account is private and you don't follow it, so its list can't be accessed.");
        }

        let globalSet = new Set();
        let pass = 1;
        const maxPasses = 8;
        let previousSize = 0;
        let interrupted = false;
        let rateLimitRetries = 0;
        const maxRateLimitRetries = 5;

        logElement.innerHTML += `<p style="color: #10b981;">✓ Target: ${expectedCount} accounts. Starting multi-pass scraping...</p>`;

        while (globalSet.size < expectedCount && pass <= maxPasses) {
            let maxId = '';
            let hasNext = true;

            while (hasNext) {
                const url = `https://www.instagram.com/api/v1/friendships/${userId}/${type}/?count=50${maxId ? '&max_id=' + encodeURIComponent(maxId) : ''}`;

                let response;
                try {
                    response = await fetch(url, { headers: { 'X-IG-App-ID': '936619743392459' }});
                } catch (netErr) {
                    interrupted = true;
                    break;
                }

                if (response.status === 429) {
                    rateLimitRetries++;
                    if (rateLimitRetries > maxRateLimitRetries) {
                        throw new Error("Rate limited too many times. Wait a few minutes and try again.");
                    }
                    logElement.innerHTML = `<span style="color: #ef4444;">Rate limit hit (${rateLimitRetries}/${maxRateLimitRetries}). Pausing 15 seconds...</span>`;
                    await new Promise(r => setTimeout(r, 15000));
                    continue;
                } else if (!response.ok) {
                    interrupted = true;
                    break;
                }

                rateLimitRetries = 0;
                const data = await response.json();

                if (data.users) {
                    data.users.forEach(u => {
                        if (u && u.username) globalSet.add(u.username.trim().toLowerCase());
                    });
                }

                counterElement.innerText = `${globalSet.size} / ${expectedCount} unique`;
                logElement.innerText = `Pass ${pass}: Fetching next batch...`;

                hasNext = !!data.next_max_id;
                maxId = data.next_max_id;

                await new Promise(r => setTimeout(r, 1500 + Math.random() * 1000));
            }

            if (interrupted || globalSet.size >= expectedCount) break;

            if (globalSet.size === previousSize) {
                logElement.innerHTML += `<br><span style="color: #f59e0b;">Pass ${pass} completed with no new users. Remaining may be deactivated or hidden.</span>`;
                break;
            }

            previousSize = globalSet.size;
            pass++;

            if (pass <= maxPasses) {
                logElement.innerHTML = `<span style="color: #f59e0b;">End of pass. Instagram truncated results. Pausing before next attempt...</span>`;
                await new Promise(r => setTimeout(r, 4000));
            }
        }

        const complete = globalSet.size >= expectedCount;
        if (interrupted) {
            logElement.innerHTML += `<p style="color: #ef4444;">⚠ Extraction interrupted by Instagram (block or network error). Got ${globalSet.size}/${expectedCount} — results are partial.</p>`;
        } else if (complete) {
            logElement.innerHTML += `<p style="color: #10b981;">✓ Extraction complete: ${globalSet.size} unique accounts.</p>`;
        } else {
            logElement.innerHTML += `<p style="color: #f59e0b;">⚠ Partial extraction: ${globalSet.size}/${expectedCount}. Instagram did not return all accounts.</p>`;
        }
        return { users: Array.from(globalSet), expectedCount, complete, interrupted };
    }

    // COMPARISON LOGIC
    async function runComparison(type) {
        const oldListText = document.getElementById('old-list').value;
        const btnFollowers = document.getElementById('btn-run-compare-followers');
        const btnFollowing = document.getElementById('btn-run-compare-following');
        const resultsDiv = document.getElementById('compare-results');

        if (!oldListText.trim()) { alert("Please paste the old list first!"); return; }

        const rawOldList = oldListText.split(/[\r\n\t, ]+/).map(n => n.trim().toLowerCase()).filter(n => n !== '');
        const oldSet = new Set(rawOldList);
        const oldListClean = Array.from(oldSet);

        btnFollowers.disabled = true; btnFollowing.disabled = true;
        btnFollowers.style.opacity = "0.5"; btnFollowing.style.opacity = "0.5";

        try {
            resultsDiv.innerHTML = `
                <h3 id="compare-counter" style="color: #fff; margin: 16px 0;">0 unique extracted</h3>
                <p style="color: #a1a1aa; font-size: 12px;" id="compare-status-log">Preparing multi-pass...</p>
            `;

            const counterEl = document.getElementById('compare-counter');
            const logEl = document.getElementById('compare-status-log');

            const result = await extractUsersSafe(type, logEl, counterEl);
            const newListClean = result.users;
            const newSet = new Set(newListClean);
            const lost = oldListClean.filter(x => !newSet.has(x));
            const gained = newListClean.filter(x => !oldSet.has(x));

            // FIX: warn when the current list is incomplete — otherwise the
            // "no longer present" column is full of false positives.
            let warningBanner = '';
            if (!result.complete) {
                warningBanner =
                    '<div style="background: #422006; border: 1px solid #f59e0b; color: #fde68a; padding: 12px 16px; border-radius: 8px; margin-top: 16px; font-size: 13px; line-height: 1.4;">' +
                    '⚠ Current list is incomplete (' + newSet.size + '/' + result.expectedCount + ' extracted). ' +
                    'Some users in "No longer present" may be false positives — Instagram did not return everyone.' +
                    '</div>';
            }

            const lostLabel = 'No longer present (' + lost.length + ')';
            const gainedLabel = 'New users (' + gained.length + ')';
            const lostBody = lost.length > 0 ? lost.join('<br><br>') : 'No users lost!';
            const gainedBody = gained.length > 0 ? gained.join('<br><br>') : 'No new users!';
            const lostBtn = lost.length > 0 ? '<button class="action-btn btn-purple" id="btn-copy-lost" style="margin-top: 16px; padding: 10px; font-size: 13px;">Copy List</button>' : '';
            const gainedBtn = gained.length > 0 ? '<button class="action-btn btn-purple" id="btn-copy-gained" style="margin-top: 16px; padding: 10px; font-size: 13px;">Copy List</button>' : '';

            resultsDiv.innerHTML = `
                ${warningBanner}
                <h3 style="margin-top: 24px; color: #fff; border-bottom: 1px solid #27272a; padding-bottom: 12px;">
                    Comparison Results (${type === 'followers' ? 'Followers' : 'Following'})
                    <span style="font-size: 14px; color: #a1a1aa; font-weight: normal; margin-left: 12px;">
                        [ Old list: ${oldSet.size} | Current: ${newSet.size} ]
                    </span>
                </h3>

                <div style="display: flex; gap: 20px; margin-top: 16px;">
                    <div style="flex: 1; background: #27272a; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <h4 style="color: #ef4444; margin-top: 0; margin-bottom: 12px;">${lostLabel}</h4>
                            <div style="font-family: monospace; font-size: 13px; color: #d4d4d8; max-height: 250px; overflow-y: auto;">
                                ${lostBody}
                            </div>
                        </div>
                        ${lostBtn}
                    </div>

                    <div style="flex: 1; background: #27272a; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <h4 style="color: #10b981; margin-top: 0; margin-bottom: 12px;">${gainedLabel}</h4>
                            <div style="font-family: monospace; font-size: 13px; color: #d4d4d8; max-height: 250px; overflow-y: auto;">
                                ${gainedBody}
                            </div>
                        </div>
                        ${gainedBtn}
                    </div>
                </div>
            `;

            if (lost.length > 0) {
                document.getElementById('btn-copy-lost').onclick = function() {
                    navigator.clipboard.writeText(lost.join('\n')).then(() => showSuccessEffect(this));
                };
            }
            if (gained.length > 0) {
                document.getElementById('btn-copy-gained').onclick = function() {
                    navigator.clipboard.writeText(gained.join('\n')).then(() => showSuccessEffect(this));
                };
            }
        } catch(err) {
            resultsDiv.innerHTML += `<p style="color: #ef4444; font-weight:bold;">Error: ${err.message}</p>`;
        } finally {
            btnFollowers.disabled = false; btnFollowing.disabled = false;
            btnFollowers.style.opacity = "1"; btnFollowing.style.opacity = "1";
        }
    }

    // EXTRACT FOLLOWERS
    async function runFollowersExtraction() {
        const resultsDiv = document.getElementById('followers-results');
        const btn = document.getElementById('btn-start-followers');
        btn.disabled = true; btn.innerText = "Extraction in progress..."; btn.style.opacity = "0.5";

        try {
            resultsDiv.innerHTML = `
                <h3 id="ext-fol-counter" style="color: #fff; margin: 16px 0;">0 unique extracted</h3>
                <p style="color: #a1a1aa; font-size: 12px;" id="ext-fol-log">Starting multi-pass engine...</p>
            `;
            const counterEl = document.getElementById('ext-fol-counter');
            const logEl = document.getElementById('ext-fol-log');

            const result = await extractUsersSafe('followers', logEl, counterEl);
            const followers = result.users;

            const statusMsg = result.complete
                ? '<p style="color: #10b981; font-weight: bold; margin-bottom: 8px;">✓ Extraction completed successfully!</p>'
                : '<p style="color: #f59e0b; font-weight: bold; margin-bottom: 8px;">⚠ Partial extraction (' + followers.length + '/' + result.expectedCount + '). Instagram limited the results.</p>';

            resultsDiv.innerHTML = `
                ${statusMsg}
                <p style="color: #a1a1aa; font-size: 14px; margin-bottom: 8px;">Total: ${followers.length} unique accounts.</p>
                <textarea readonly id="extracted-list">${followers.join('\n')}</textarea>
                <button class="action-btn btn-purple" id="btn-copy-followers">Copy List</button>
            `;
            document.getElementById('btn-copy-followers').onclick = function() {
                navigator.clipboard.writeText(followers.join('\n')).then(() => showSuccessEffect(this));
            };
        } catch (err) {
            resultsDiv.innerHTML += `<p style="color: #ef4444; font-weight:bold;">Error: ${err.message}</p>`;
        } finally {
            btn.disabled = false; btn.innerText = "Start Extraction"; btn.style.opacity = "1";
        }
    }

    // EXTRACT FOLLOWING
    async function runFollowingExtraction() {
        const resultsDiv = document.getElementById('following-results');
        const btn = document.getElementById('btn-start-following');
        btn.disabled = true; btn.innerText = "Extraction in progress..."; btn.style.opacity = "0.5";

        try {
            resultsDiv.innerHTML = `
                <h3 id="ext-fow-counter" style="color: #fff; margin: 16px 0;">0 unique extracted</h3>
                <p style="color: #a1a1aa; font-size: 12px;" id="ext-fow-log">Starting multi-pass engine...</p>
            `;
            const counterEl = document.getElementById('ext-fow-counter');
            const logEl = document.getElementById('ext-fow-log');

            const result = await extractUsersSafe('following', logEl, counterEl);
            const following = result.users;

            const statusMsg = result.complete
                ? '<p style="color: #10b981; font-weight: bold; margin-bottom: 8px;">✓ Extraction completed successfully!</p>'
                : '<p style="color: #f59e0b; font-weight: bold; margin-bottom: 8px;">⚠ Partial extraction (' + following.length + '/' + result.expectedCount + '). Instagram limited the results.</p>';

            resultsDiv.innerHTML = `
                ${statusMsg}
                <p style="color: #a1a1aa; font-size: 14px; margin-bottom: 8px;">Total: ${following.length} unique accounts.</p>
                <textarea readonly id="extracted-list-following">${following.join('\n')}</textarea>
                <button class="action-btn btn-purple" id="btn-copy-following">Copy List</button>
            `;
            document.getElementById('btn-copy-following').onclick = function() {
                navigator.clipboard.writeText(following.join('\n')).then(() => showSuccessEffect(this));
            };
        } catch (err) {
            resultsDiv.innerHTML += `<p style="color: #ef4444; font-weight:bold;">Error: ${err.message}</p>`;
        } finally {
            btn.disabled = false; btn.innerText = "Start Extraction"; btn.style.opacity = "1";
        }
    }

    // VIEW NAVIGATION
    function setView(viewName, activeBtnId) {
        document.querySelectorAll('.menu-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(activeBtnId).classList.add('active');
        viewContainer.innerHTML = views[viewName];

        if(viewName === 'compare') {
            document.getElementById('btn-run-compare-followers').onclick = () => runComparison('followers');
            document.getElementById('btn-run-compare-following').onclick = () => runComparison('following');
        } else if (viewName === 'extractFollowers') {
            document.getElementById('btn-start-followers').onclick = runFollowersExtraction;
        } else if (viewName === 'extractFollowing') {
            document.getElementById('btn-start-following').onclick = runFollowingExtraction;
        }
    }

    // SETUP NAVIGATION BUTTONS
    document.getElementById('nav-compare').addEventListener('click', () => setView('compare', 'nav-compare'));
    document.getElementById('nav-followers').addEventListener('click', () => setView('extractFollowers', 'nav-followers'));
    document.getElementById('nav-following').addEventListener('click', () => setView('extractFollowing', 'nav-following'));
})();
//23
