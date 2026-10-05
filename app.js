const API_URL = "https://gen.pollinations.ai/alpha/decisions";
const OAUTH_CLIENT_ID = "pk_SDaxDwGheUlEUpij";
const TOKEN_KEY = "jev-pollinations-token";
const OAUTH_TOKEN_KEY = "jev-pollinations-session-token";
const form = document.querySelector("#inference-form");
const tokenForm = document.querySelector("#token-form");
const tokenInput = document.querySelector("#api-token");
const tokenStatus = document.querySelector("#token-status");
const tokenButton = document.querySelector("#token-button");
const clearToken = document.querySelector("#clear-token");
const connectButton = document.querySelector("#connect-button");
const executeButton = document.querySelector("#execute-button");
const results = document.querySelector("#results");
const resultContent = document.querySelector("#result-content");
const runState = document.querySelector("#run-state");
const errorMessage = document.querySelector("#error-message");
const accountPanel = document.querySelector("#account-panel");
const accountNotice = document.querySelector("#account-notice");
const appShell = document.querySelector("#app-shell");
const noticeClose = document.querySelector("#notice-close");
const noticeCountdown = document.querySelector("#notice-countdown");
const noticeCountdownText = document.querySelector("#notice-countdown-text");
const accountDetails = document.querySelector("#account-details");
const toggleAccountStatsButton = document.querySelector("#toggle-account-stats");
const balanceValue = document.querySelector("#balance-value");
const balanceBreakdown = document.querySelector("#balance-breakdown");
const usageCount = document.querySelector("#usage-count");
const earningsTotal = document.querySelector("#earnings-total");
const questsCount = document.querySelector("#quests-count");
const accountView = document.querySelector("#account-view");
const refreshAccountButton = document.querySelector("#refresh-account");
const promptTemplate = document.querySelector("#prompt-template");
const questionsList = document.querySelector("#questions-list");
const contextInput = document.querySelector("#context");
const addQuestionButton = document.querySelector("#add-question");
const PROMPT_TEMPLATES = {
  scam: {
    state: "WARNING!!! Earn $5000 per day with zero investments!! Click the link http://crypto-scam-click.com right now, limited spots available!! Your friends are already rich, what are you waiting for??",
    questions: ["Is this text a scam, phishing attempt, or financial fraud?", "Does the content contain high-risk clickbait or malicious links?", "Should this message be automatically blocked or quarantined?"]
  },
  support: {
    state: "Hello. I purchased a yearly premium subscription yesterday. The money was deducted from my credit card, but my account status is still showing as Free. I have attached the payment receipt. Please fix this.",
    questions: ["Is this issue related to a technical bug or system downtime?", "Is this issue strictly about billing, payments, or refunds?", "Does this ticket require high priority escalation to a senior manager?"]
  },
  lead: {
    state: "Company: TechnoProd Inc. Name: Alexander (Director of IT). Message: We are looking for an immediate vendor to migrate our entire infrastructure to a private cloud within the next 2 weeks. Budget is pre-approved, ready for a discovery call tomorrow morning.",
    questions: ["Does this lead have a high budget and high intent to buy?", "Is this an urgent request requiring a response within 1 hour?", "Is the contact person a verified decision-maker (C-level / Director)?"]
  }
};
let questionSequence = 0;
let authPopup = null;
let activeAccountTab = "usage";
let accountData = {};
let keyReady = false;
let keyStatus = "disconnected";
let noticeSeconds = 5;
let noticeTimer = null;
let noticeDismissed = false;
const oauthProcessing = new Set();
const HANDOFF_KEY = "jev-pollinations-oauth-handoff";
const oauthChannel = "BroadcastChannel" in window ? new BroadcastChannel("jev-pollinations-auth") : null;
if (oauthChannel) oauthChannel.addEventListener("message", function(event) {
  if (event.data && event.data.type === "jev-pollinations-oauth") receiveOAuth(event.data);
});
window.addEventListener("storage", function(event) {
  if (event.key !== HANDOFF_KEY || !event.newValue) return;
  try { receiveOAuth(JSON.parse(event.newValue)); } catch (error) {}
  try { localStorage.removeItem(HANDOFF_KEY); } catch (error) {}
});

function savedToken() {
  try { return localStorage.getItem(TOKEN_KEY) || ""; }
  catch (error) { return ""; }
}

function authorizedToken() {
  try { return sessionStorage.getItem(OAUTH_TOKEN_KEY) || savedToken(); }
  catch (error) { return savedToken(); }
}

function updateTokenUI() {
  const hasSavedToken = Boolean(savedToken());
  const hasToken = Boolean(authorizedToken());
  let hasSessionToken = false;
  try { hasSessionToken = Boolean(sessionStorage.getItem(OAUTH_TOKEN_KEY)); } catch (error) {}
  tokenStatus.textContent = !hasToken ? "Connect Pollinations to enable inference" : keyStatus === "checking" ? "Checking API key…" : keyStatus === "invalid" ? "Key check failed. Update to verify before generating." : hasSessionToken ? "Pollinations account connected and verified" : "API token saved and verified";
  tokenButton.textContent = hasSavedToken ? "Update" : "Save";
  clearToken.hidden = !hasSavedToken;
  connectButton.textContent = hasSessionToken ? keyStatus === "invalid" ? "Reconnect" : "Disconnect" : "Connect Pollinations";
  connectButton.disabled = keyStatus === "checking";
  executeButton.disabled = !hasToken || !keyReady;
  accountPanel.hidden = !hasToken;
  syncAccountNotice();
}

function syncAccountNotice() {
  if (keyReady) noticeDismissed = true;
  const visible = !noticeDismissed;
  accountNotice.hidden = !visible;
  appShell.classList.toggle("is-blurred", visible);
  appShell.inert = visible;
  appShell.setAttribute("aria-hidden", String(visible));
  document.body.classList.toggle("modal-open", visible);
  if (visible && noticeSeconds > 0 && !noticeTimer) {
    noticeClose.disabled = true;
    noticeTimer = window.setInterval(function() {
      noticeSeconds = Math.max(0, noticeSeconds - 1);
      noticeCountdown.textContent = String(noticeSeconds);
      if (noticeSeconds === 0) {
        window.clearInterval(noticeTimer);
        noticeTimer = null;
        noticeCountdownText.textContent = "You can close this notice now";
        noticeClose.disabled = false;
      }
    }, 1000);
  } else if (visible && noticeSeconds === 0) {
    noticeCountdownText.textContent = "You can close this notice now";
    noticeClose.disabled = false;
  } else if (!visible && noticeTimer) {
    window.clearInterval(noticeTimer);
    noticeTimer = null;
  }
}

async function validateKey() {
  const token = authorizedToken();
  if (!token) {
    keyReady = false;
    keyStatus = "disconnected";
    updateTokenUI();
    return false;
  }
  keyReady = false;
  keyStatus = "checking";
  refreshAccountButton.disabled = true;
  refreshAccountButton.textContent = "Checking…";
  setButtonLoading(refreshAccountButton, true);
  updateTokenUI();
  try {
    const response = await fetch("https://gen.pollinations.ai/account/key", { headers: { Authorization: "Bearer " + token } });
    const payload = await response.json().catch(function() { return {}; });
    if (!response.ok || payload.valid !== true) throw new Error(payload.error && payload.error.message || "This Pollinations key is invalid or expired.");
    keyReady = true;
    keyStatus = "valid";
    updateTokenUI();
    await refreshAccount();
    return true;
  } catch (error) {
    keyReady = false;
    keyStatus = "invalid";
    updateTokenUI();
    tokenStatus.textContent = (error.message || "Could not verify Pollinations key.") + " Use Update to check again.";
    refreshAccountButton.disabled = false;
    refreshAccountButton.textContent = "Update ↻";
    setButtonLoading(refreshAccountButton, false);
    return false;
  }
}

function setButtonLoading(button, loading) {
  button.classList.toggle("is-loading", loading);
  button.setAttribute("aria-busy", String(loading));
}

function escapeHTML(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, function(char) {
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char];
  });
}

function addQuestionRow(question, type, options) {
  questionSequence += 1;
  const card = document.createElement("div");
  card.className = "question-card question-card-enter";
  card.innerHTML = '<div class="question-card-top"><span>QUESTION ' + String(questionSequence).padStart(2, "0") + '</span><button type="button" class="remove-question">Remove</button></div><label class="question-text-label">Question<input class="decision-question" type="text" aria-label="Question text" placeholder="e.g. What is 2 + 2?" required></label><div class="question-controls"><select class="question-type" aria-label="Answer type"><option value="score">Score</option><option value="choice">Choice</option></select><label class="question-answer-field"><span>Answers</span><input class="question-options" aria-label="Answers" placeholder="" required></label></div>';
  const questionInput = card.querySelector(".decision-question");
  const typeInput = card.querySelector(".question-type");
  const optionsInput = card.querySelector(".question-options");
  questionInput.value = question || "";
  typeInput.value = type || "score";
  optionsInput.value = options || "";
  function updateAnswerInput(reset) {
    const isScore = typeInput.value === "score";
    optionsInput.setAttribute("aria-label", isScore ? "Score levels" : "Answer choices");
    optionsInput.placeholder = isScore ? "2-10 numbers, 0-100 (e.g. 0, 25, 50, 75, 100)" : "Answers, comma-separated (e.g. 4, 5)";
    if (reset) optionsInput.value = "";
  }
  updateAnswerInput(false);
  typeInput.addEventListener("change", function() { updateAnswerInput(true); });
  card.querySelector(".remove-question").addEventListener("click", function() { card.remove(); });
  questionsList.append(card);
}

function loadPromptTemplate() {
  const template = PROMPT_TEMPLATES[promptTemplate.value];
  questionsList.replaceChildren();
  if (!template) {
    addQuestionRow();
    return;
  }
  contextInput.value = template.state;
  template.questions.forEach(function(question) { addQuestionRow(question, "score"); });
}

function buildQuestions() {
  const questions = {};
  const cards = Array.from(questionsList.querySelectorAll(".question-card"));
  if (!cards.length) throw new Error("Add at least one target question.");
  cards.forEach(function(card) {
    const question = card.querySelector(".decision-question").value.trim();
    const type = card.querySelector(".question-type").value;
    if (!question) throw new Error("Fill in each target question before running Jev.");
    if (Object.prototype.hasOwnProperty.call(questions, question)) throw new Error("Each target question must be unique.");
    const answers = card.querySelector(".question-options").value.split(",").map(function(answer) { return answer.trim(); }).filter(Boolean);
    if (type === "choice") {
      const options = answers;
      if (options.length < 2) throw new Error("Choice questions need at least two comma-separated answers.");
      if (new Set(options.map(function(option) { return option.toLocaleLowerCase(); })).size !== options.length) throw new Error("Choice answers must be unique (\"" + question + "\").");
      const criteria = {};
      options.forEach(function(option) {
        const normalized = option.toLocaleLowerCase();
        criteria[option] = /^(correct|true|yes)$/.test(normalized)
          ? "The claim or answer in the question is supported by the supplied state and is factually or logically correct."
          : /^(incorrect|false|no)$/.test(normalized)
            ? "The claim or answer in the question is contradicted by the supplied state or is factually or logically incorrect."
            : /^[-+]?\d+(?:\.\d+)?$/.test(normalized)
              ? "Candidate answer " + option + ". Select this only if it exactly matches the result of solving the question."
              : option;
      });
      questions[question] = { type: "choice", instructions: "First solve the objective question independently of the option labels. For arithmetic, calculate the exact result; for logic or factual questions, determine the answer from the supplied state. Then compare each option with that answer and select the single best-supported option as the verdict. Do not default to the first option or to positive labels like Correct, True, or Yes. For Correct/False or True/False options, judge whether the proposition in the question is actually true. If one option is clearly correct, give it at least 90% of the probability and assign only the remaining probability to incorrect alternatives; do not give a clearly wrong option the same weight. Assign weights to every option, totaling exactly 100%, and make the highest-weight option match your verdict." , criteria: criteria };
    } else {
      if (answers.length < 2) throw new Error("Score questions need at least two numeric score levels.");
      if (answers.length > 10) throw new Error("Score questions can have at most 10 levels.");
      const scoreLevels = answers.map(Number);
      if (scoreLevels.some(function(score) { return !Number.isFinite(score) || score < 0 || score > 100; })) {
        throw new Error("Score levels must be numbers from 0 to 100.");
      }
      if (new Set(scoreLevels).size !== scoreLevels.length) throw new Error("Score levels must be unique.");
      questions[question] = {
        type: "score",
        instructions: question + " Choose the best-fitting score level from these answers only: " + scoreLevels.join(", ") + ". Return probability weights across the levels based on the evidence. The weights must sum to 100%. Use weights to express uncertainty between nearby levels, not just one winning level.",
        criteria: scoreLevels.map(String)
      };
    }
  });
  return questions;
}

function numberText(value, digits) {
  const number = Number(value);
  return Number.isFinite(number) ? number.toLocaleString(undefined, { minimumFractionDigits: digits || 0, maximumFractionDigits: digits == null ? 2 : digits }) : "--";
}

function accountError(value) {
  return value && value.error ? '<p class="account-error">' + escapeHTML(value.error) + '</p>' : "";
}

function renderAccountView(tab) {
  activeAccountTab = tab;
  document.querySelectorAll("[data-account-tab]").forEach(function(button) {
    button.setAttribute("aria-selected", String(button.dataset.accountTab === tab));
  });
  const result = accountData[tab];
  if (!result || result.error) {
    accountView.innerHTML = accountError(result) || '<p class="account-empty">Connect your Pollinations account to load account details.</p>';
    return;
  }
  const data = result.data;
  if (tab === "usage") {
    const rows = (data.usage || []).map(function(item) {
      return '<tr><td>' + escapeHTML(item.timestamp || "-") + '</td><td>' + escapeHTML(item.model || item.type || "-") + '</td><td>' + (item.cost_usd == null ? "-" : "$" + numberText(item.cost_usd, 4)) + '</td></tr>';
    }).join("");
    accountView.innerHTML = rows ? '<table class="account-table"><thead><tr><th>Time</th><th>Model</th><th>Cost</th></tr></thead><tbody>' + rows + '</tbody></table>' : '<p class="account-empty">No recent usage in the last 30 days.</p>';
  } else if (tab === "earnings") {
    const rows = (data.perEntity || []).map(function(item) {
      return '<tr><td>' + escapeHTML(item.entity_name || item.source || "Earnings") + '</td><td>' + numberText(item.requests) + '</td><td>' + numberText(item.pollen_earned, 2) + '</td></tr>';
    }).join("");
    accountView.innerHTML = rows ? '<table class="account-table"><thead><tr><th>Source</th><th>Requests</th><th>Pollen earned</th></tr></thead><tbody>' + rows + '</tbody></table>' : '<p class="account-empty">No earnings recorded in the last 30 days.</p>';
  } else {
    const quests = data.quests || [];
    accountView.innerHTML = quests.length ? '<div class="quest-list">' + quests.map(function(item) {
      return '<div class="quest-row"><strong>' + escapeHTML(item.title) + '</strong><span>' + escapeHTML(item.status || item.state || "available") + '</span></div>';
    }).join("") + '</div>' : '<p class="account-empty">No quests are available.</p>';
  }
}

async function refreshAccount() {
  const token = authorizedToken();
  if (!token) return;
  refreshAccountButton.disabled = true;
  refreshAccountButton.textContent = "Updating…";
  setButtonLoading(refreshAccountButton, true);
  const headers = { Authorization: "Bearer " + token };
  async function get(path) {
    const response = await fetch("https://gen.pollinations.ai" + path, { headers: headers });
    const result = await response.json().catch(function() { return {}; });
    if (!response.ok) throw new Error(result.error && result.error.message || result.message || "Request failed (" + response.status + ")");
    return result;
  }
  const paths = ["/account/balance", "/account/usage?days=30&limit=20", "/account/earnings?days=30", "/account/quests"];
  const results = await Promise.all(paths.map(async function(path) {
    try { return { data: await get(path) }; }
    catch (error) { return { error: error.message }; }
  }));
  accountData = { balance: results[0], usage: results[1], earnings: results[2], quests: results[3] };
  const balance = results[0].data;
  if (balance) {
    const accountBalance = balance.accountBalance || {};
    balanceValue.textContent = numberText(accountBalance.total == null ? balance.balance : accountBalance.total, 2);
    balanceBreakdown.textContent = accountBalance.total == null ? "remaining on this key" : "This key " + numberText(balance.balance, 2) + " · Quest " + numberText(accountBalance.tier, 2) + " · Paid " + numberText(accountBalance.paid, 2);
  } else {
    balanceValue.textContent = "--";
    balanceBreakdown.textContent = results[0].error || "Balance unavailable";
  }
  const usage = results[1].data;
  usageCount.textContent = usage ? numberText(usage.count == null ? (usage.usage || []).length : usage.count) : "--";
  const earnings = results[2].data;
  const earningRows = earnings && (earnings.perEntity || []);
  earningsTotal.textContent = earnings ? numberText(earningRows.reduce(function(sum, item) { return sum + Number(item.pollen_earned || 0); }, 0), 2) + " P" : "--";
  const quests = results[3].data && results[3].data.quests;
  questsCount.textContent = quests ? numberText(quests.filter(function(item) { return item.status === "completed" || item.state === "completed"; }).length) + " / " + numberText(quests.length) : "--";
  renderAccountView(activeAccountTab);
  refreshAccountButton.disabled = false;
  refreshAccountButton.textContent = "Update ↻";
  setButtonLoading(refreshAccountButton, false);
}

function percent(value) {
  if (value == null || value === "") return null;
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  return Math.max(0, Math.min(100, number <= 1 ? number * 100 : number));
}

function displayLabel(value) {
  if (typeof value === "string") return value;
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return String(value);
  if (value && typeof value === "object") {
    const label = value.label == null ? value.verdict == null ? value.choice == null ? value.value : value.choice : value.verdict : value.label;
    return label == null ? "" : String(label);
  }
  return "";
}

function probabilityRows(answer, details) {
  const source = details.probabilities || answer.probabilities || details.weights || answer.weights || {};
  if (Array.isArray(source)) return source.map(function(item, index) {
    const label = item.label || item.choice || item.name || String(index);
    const value = item.probability == null ? item.weight == null ? item.score : item.weight : item.probability;
    return [String(label), Number(value)];
  }).filter(function(entry) { return Number.isFinite(entry[1]); });
  if (!source || typeof source !== "object") return [];
  return Object.entries(source).map(function(entry) { return [entry[0], Number(entry[1])]; }).filter(function(entry) { return Number.isFinite(entry[1]); });
}

function scorePercent(answer, verdict, details, scoreLevels) {
  const levelValues = (scoreLevels || []).map(Number);
  const levelByLabel = new Map((scoreLevels || []).map(function(level, index) { return [String(level).trim().toLocaleLowerCase(), levelValues[index]]; }));
  const weightedLevels = probabilityRows(answer, details).map(function(entry) {
    const label = entry[0].trim().toLocaleLowerCase();
    const match = label.match(/^(-?\d+(?:\.\d+)?)/);
    const numericLevel = match ? Number(match[1]) : null;
    const level = levelByLabel.has(label) ? levelByLabel.get(label) : levelValues.includes(numericLevel) ? numericLevel : Number.isInteger(numericLevel) && numericLevel >= 0 && numericLevel < levelValues.length ? levelValues[numericLevel] : null;
    return { level: level, weight: entry[1] };
  });
  if (weightedLevels.length > 1 && weightedLevels.every(function(entry) { return entry.level !== null && entry.weight >= 0; })) {
    const totalWeight = weightedLevels.reduce(function(sum, entry) { return sum + entry.weight; }, 0);
    if (totalWeight > 0) return weightedLevels.reduce(function(sum, entry) { return sum + entry.level * entry.weight; }, 0) / totalWeight;
  }
  const verdictMatch = String(verdict).match(/^\s*(\d+(?:\.\d+)?)\s*(?:%|[-–—:])/);
  if (verdictMatch) return Math.max(0, Math.min(100, Number(verdictMatch[1])));
  const bareVerdict = String(verdict).trim().match(/^(\d+(?:\.\d+)?)$/);
  if (bareVerdict && levelValues.includes(Number(bareVerdict[1]))) return Number(bareVerdict[1]);
  if (answer.score == null || answer.score === "") return null;
  const score = Number(answer.score);
  if (!Number.isFinite(score)) return null;
  if (Number.isInteger(score) && score >= 0 && score < levelValues.length && !levelValues.includes(score)) return levelValues[score];
  if (score >= 0 && score < 1 && !Number.isInteger(score)) return score * 100;
  return Math.max(0, Math.min(100, score));
}

function allocationRows(answer, details, options, positionalFallback) {
  const source = probabilityRows(answer, details).filter(function(entry) { return entry[1] >= 0; });
  if (!source.length) return [];
  let rows = source;
  if (options && options.length) {
    const byLabel = new Map(source.map(function(entry) { return [entry[0].trim().toLocaleLowerCase(), entry[1]]; }));
    const matched = options.map(function(option) {
      const key = option.trim().toLocaleLowerCase();
      return byLabel.has(key) ? byLabel.get(key) : null;
    });
    const hasMatches = matched.some(function(value) { return value !== null; });
    const allMatched = matched.every(function(value) { return value !== null; });
    if (allMatched) {
      rows = options.map(function(option, index) { return [option, matched[index]]; });
    } else if (source.length === options.length && (positionalFallback || !hasMatches)) {
      rows = options.map(function(option, index) { return [option, source[index][1]]; });
    } else if (hasMatches) {
      rows = options.map(function(option, index) { return [option, matched[index] === null ? 0 : matched[index]]; });
    } else {
      return [];
    }
  }
  const total = rows.reduce(function(sum, entry) { return sum + entry[1]; }, 0);
  if (!total) return [];
  const points = rows.map(function(entry, index) {
    const exact = entry[1] / total * 100;
    return { label: entry[0], value: Math.floor(exact), remainder: exact - Math.floor(exact), index: index };
  });
  let left = 100 - points.reduce(function(sum, entry) { return sum + entry.value; }, 0);
  points.slice().sort(function(a, b) { return b.remainder - a.remainder; }).slice(0, left).forEach(function(entry) { points[entry.index].value += 1; });
  return points.map(function(entry) { return [entry.label, entry.value]; });
}

function parseDecision(question, answer, options, scoreLevels) {
  const details = answer.details && typeof answer.details === "object" ? answer.details : {};
  const probabilities = probabilityRows(answer, details);
  const distributionOptions = options && options.length ? options : scoreLevels || [];
  const allocation = distributionOptions.length ? allocationRows(answer, details, distributionOptions, !(options && options.length)) : [];
  const allocationTitle = options && options.length ? "Option allocation" : "Score distribution";
  const winner = probabilities.slice().sort(function(a, b) { return b[1] - a[1]; })[0];
  const legend = answer.legend || details.legend;
  let verdict = displayLabel(details.verdict || answer.verdict || answer.choice || details.choice);
  if (options && options.length && allocation.length) {
    const selectedOption = allocation.reduce(function(best, entry) { return entry[1] > best[1] ? entry : best; });
    verdict = selectedOption[0];
  }
  if (!verdict && answer.type === "score" && legend && typeof legend === "object" && Number.isFinite(Number(answer.score))) {
    verdict = displayLabel(legend[String(Math.round(Number(answer.score)))]) || "";
  }
  if (!verdict && answer.type === "score" && typeof legend === "string") verdict = legend;

  if (!verdict && winner) {
    const legendLabel = legend && typeof legend === "object" ? displayLabel(legend[winner[0]]) : "";
    verdict = legendLabel || winner[0].replace(/\s*\/\s*-?\d+(?:\.\d+)?\s*$/, "").trim();
  }
  if (!verdict && answer.noul != null) verdict = Number(answer.noul) >= 0.5 ? "Yes" : "No";
  if (!verdict && typeof legend === "string") verdict = legend;
  if (!verdict && Number.isFinite(Number(answer.score)) && legend && typeof legend === "object") {
    verdict = displayLabel(legend[String(Math.round(Number(answer.score)))]) || "";
  }
  if (!verdict && Number.isFinite(Number(answer.score))) verdict = "Score " + numberText(answer.score, 2);
  if (!verdict) verdict = "No verdict returned";

  const explicitConfidence = details.confidence == null ? answer.confidence == null ? answer.overall_confidence : answer.confidence : details.confidence;
  let confidence = scoreLevels && scoreLevels.length || answer.type === "score" || answer.score != null ? scorePercent(answer, verdict, details, scoreLevels) : null;
  if (confidence === null) confidence = percent(explicitConfidence);
  if (confidence === null && winner) {
    const total = probabilities.reduce(function(sum, item) { return sum + Math.max(0, item[1]); }, 0);
    confidence = total > 0 ? Math.max(0, winner[1]) / total * 100 : percent(winner[1]);
  }
  if (confidence === null && answer.noul != null) {
    const truth = Math.max(0, Math.min(1, Number(answer.noul)));
    confidence = Math.max(truth, 1 - truth) * 100;
  }
  return { question: question, verdict: verdict, confidence: confidence, isScore: Boolean(scoreLevels && scoreLevels.length) || answer.type === "score" || answer.score != null, allocation: allocation, allocationTitle: allocationTitle };
}

function renderResult(decisions) {
  resultContent.innerHTML = '<div class="decision-cards">' + decisions.map(function(item, index) {
    const confidence = item.confidence;
    const displayedScore = item.isScore && confidence !== null ? Math.ceil(confidence) : confidence;
    const confidenceText = displayedScore === null ? "N/A" : item.isScore ? displayedScore + "%" : String(Number(confidence.toFixed(1))) + "%";
    const fill = displayedScore === null ? 0 : displayedScore / 100;
    const verdictEstimate = item.isScore && confidence !== null ? '<span class="decision-score-estimate">~' + Math.ceil(confidence) + '% weighted</span>' : "";
    const verdictMarkup = item.isScore ? '<div class="decision-answer-value"><strong>' + escapeHTML(item.verdict) + '</strong>' + verdictEstimate + '</div>' : '<strong>' + escapeHTML(item.verdict) + '</strong>';
    const allocation = item.allocation && item.allocation.length ? '<div class="decision-allocation"><div class="decision-allocation-title">' + escapeHTML(item.allocationTitle) + ' <span>100% total</span></div>' + item.allocation.map(function(entry) {
      return '<div class="decision-allocation-row"><span class="decision-allocation-label">' + escapeHTML(entry[0]) + '</span><span class="decision-allocation-track"><span style="--allocation:' + entry[1] / 100 + '"></span></span><strong>' + entry[1] + '%</strong></div>';
    }).join("") + '</div>' : "";
    return '<article class="decision-card" style="--card-index:' + index + '"><div class="decision-question-text">' + escapeHTML(item.question) + '</div><div class="decision-answer"><span class="decision-answer-label">VERDICT</span>' + verdictMarkup + '</div><div class="decision-confidence"><div class="decision-confidence-meta"><span>' + (item.isScore ? "Score" : "Confidence") + '</span><strong>' + confidenceText + '</strong></div><div class="decision-confidence-track"><div class="decision-confidence-fill" style="--fill:' + fill + '"></div></div></div>' + allocation + '</article>';
  }).join("") + '</div>';
  results.hidden = false;
  runState.textContent = "COMPLETE";
  runState.classList.remove("loading");
}

function base64url(bytes) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(bytes))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function connectPollinations() {
  if (authorizedSessionExists() && keyReady) {
    try { sessionStorage.removeItem(OAUTH_TOKEN_KEY); } catch (error) {}
    keyReady = false;
    keyStatus = savedToken() ? "checking" : "disconnected";
    updateTokenUI();
    if (savedToken()) validateKey();
    return;
  }
  if (authorizedSessionExists()) {
    try { sessionStorage.removeItem(OAUTH_TOKEN_KEY); } catch (error) {}
  }
  const authWindow = window.open("about:blank", "pollinations-authorization", "popup,width=520,height=720");
  if (!authWindow) throw new Error("Allow pop-ups to connect your Pollinations account.");
  authPopup = authWindow;
  setButtonLoading(connectButton, true);
  try {
    const verifier = base64url(crypto.getRandomValues(new Uint8Array(32)));
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
    const challenge = base64url(digest);
    const state = base64url(crypto.getRandomValues(new Uint8Array(32)));
    const redirectURI = window.location.origin + window.location.pathname;
    sessionStorage.setItem("jev-oauth-verifier", verifier);
    sessionStorage.setItem("jev-oauth-state", state);
    sessionStorage.setItem("jev-oauth-redirect", redirectURI);
    sessionStorage.setItem("jev-oauth-popup", "1");
    authWindow.sessionStorage.setItem("jev-oauth-verifier", verifier);
    authWindow.sessionStorage.setItem("jev-oauth-state", state);
    authWindow.sessionStorage.setItem("jev-oauth-redirect", redirectURI);
    authWindow.sessionStorage.setItem("jev-oauth-popup", "1");
    const params = new URLSearchParams({ response_type: "code", client_id: OAUTH_CLIENT_ID, redirect_uri: redirectURI, scope: "usage", state: state, code_challenge: challenge, code_challenge_method: "S256", models: "typesafe/jev-1.13", budget: "5", expiry: "7" });
    authWindow.location.replace("https://enter.pollinations.ai/authorize?" + params.toString());
    setButtonLoading(connectButton, false);
  } catch (error) {
    setButtonLoading(connectButton, false);
    authWindow.close();
    throw new Error("Could not start Pollinations authorization. Check browser storage and try again.");
  }
}

function authorizedSessionExists() {
  try { return Boolean(sessionStorage.getItem(OAUTH_TOKEN_KEY)); }
  catch (error) { return false; }
}

async function completeOAuth(data) {
  if (data.error) throw new Error("Pollinations authorization was not completed: " + data.error.replace(/_/g, " "));
  let verifier, expectedState, redirectURI;
  try {
    verifier = sessionStorage.getItem("jev-oauth-verifier");
    expectedState = sessionStorage.getItem("jev-oauth-state");
    redirectURI = sessionStorage.getItem("jev-oauth-redirect");
    sessionStorage.removeItem("jev-oauth-verifier");
    sessionStorage.removeItem("jev-oauth-state");
    sessionStorage.removeItem("jev-oauth-redirect");
    sessionStorage.removeItem("jev-oauth-popup");
  } catch (error) {}
  if (!verifier || !expectedState || data.state !== expectedState) throw new Error("Could not verify the Pollinations sign-in response. Please connect again.");
  const response = await fetch("https://enter.pollinations.ai/api/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "authorization_code", code: data.code, client_id: OAUTH_CLIENT_ID, redirect_uri: redirectURI, code_verifier: verifier })
  });
  const payload = await response.json().catch(function() { return {}; });
  if (!response.ok || !payload.access_token) throw new Error(payload.error_description || payload.error || "Pollinations sign-in could not be completed.");
  sessionStorage.setItem(OAUTH_TOKEN_KEY, payload.access_token);
  await validateKey();
}

async function handleOAuthCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const state = params.get("state");
  const error = params.get("error");
  if (!code && !error) return;
  window.history.replaceState({}, "", window.location.origin + window.location.pathname);
  const callback = { type: "jev-pollinations-oauth", code: code, state: state, error: error };
  if (window.opener && window.opener !== window) {
    window.opener.postMessage(callback, window.location.origin);
    window.setTimeout(function() { window.close(); }, 250);
    return;
  }
  let openedAsPopup = false;
  try { openedAsPopup = sessionStorage.getItem("jev-oauth-popup") === "1"; } catch (error) {}
  if (openedAsPopup) {
    if (oauthChannel) oauthChannel.postMessage(callback);
    try { localStorage.setItem(HANDOFF_KEY, JSON.stringify(callback)); } catch (error) {}
    window.setTimeout(function() {
      try { localStorage.removeItem(HANDOFF_KEY); } catch (error) {}
    }, 12000);
    window.setTimeout(function() { window.close(); }, 500);
    return;
  }
  await receiveOAuth(callback);
}

async function receiveOAuth(data, source) {
  let expectedState = "";
  try { expectedState = sessionStorage.getItem("jev-oauth-state") || ""; } catch (error) {}
  if (!expectedState || data.state !== expectedState) return;
  const requestId = data.state;
  if (oauthProcessing.has(requestId)) return;
  oauthProcessing.add(requestId);
  if (source && source !== window) source.close();
  if (authPopup && !authPopup.closed) authPopup.close();
  authPopup = null;
  try {
    await completeOAuth(data);
  } catch (error) {
    oauthProcessing.delete(requestId);
    errorMessage.textContent = error.message || "Pollinations sign-in could not be completed.";
    errorMessage.hidden = false;
  }
}

window.addEventListener("message", function(event) {
  if (event.origin === window.location.origin && event.data && event.data.type === "jev-pollinations-oauth") receiveOAuth(event.data, event.source);
});

tokenForm.addEventListener("submit", async function(event) {
  event.preventDefault();
  const token = tokenInput.value.trim();
  if (!token) { tokenInput.focus(); return; }
  tokenButton.disabled = true;
  setButtonLoading(tokenButton, true);
  try {
    localStorage.setItem(TOKEN_KEY, token);
    tokenInput.value = "";
    updateTokenUI();
    await validateKey();
  } catch (error) {
    tokenStatus.textContent = "Could not save token in this browser";
  } finally {
    tokenButton.disabled = false;
    setButtonLoading(tokenButton, false);
  }
});

clearToken.addEventListener("click", function() {
  try { localStorage.removeItem(TOKEN_KEY); } catch (error) {}
  updateTokenUI();
});

refreshAccountButton.addEventListener("click", validateKey);
toggleAccountStatsButton.addEventListener("click", function() {
  const collapsed = !accountDetails.classList.contains("is-collapsed");
  accountDetails.classList.toggle("is-collapsed", collapsed);
  accountDetails.inert = collapsed;
  accountDetails.setAttribute("aria-hidden", String(collapsed));
  toggleAccountStatsButton.textContent = collapsed ? "Show stats" : "Hide stats";
  toggleAccountStatsButton.setAttribute("aria-expanded", String(!collapsed));
});
document.querySelectorAll("[data-account-tab]").forEach(function(button) {
  button.addEventListener("click", function() { renderAccountView(button.dataset.accountTab); });
});

noticeClose.addEventListener("click", function() {
  if (noticeClose.disabled) return;
  noticeDismissed = true;
  syncAccountNotice();
});

async function startPollinationsConnection() {
  try { await connectPollinations(); }
  catch (error) {
    errorMessage.textContent = error.message || "Could not start Pollinations authorization.";
    errorMessage.hidden = false;
  }
}

document.querySelector("#notice-connect").addEventListener("click", startPollinationsConnection);
connectButton.addEventListener("click", startPollinationsConnection);

form.addEventListener("submit", async function(event) {
  event.preventDefault();
  errorMessage.hidden = true;
  const context = contextInput.value.trim();
  let questions;
  try { questions = buildQuestions(); }
  catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.hidden = false;
    return;
  }
  if (!context) {
    errorMessage.textContent = "Add the application state or context before running Jev.";
    errorMessage.hidden = false;
    return;
  }
  const activeToken = authorizedToken();
  if (!activeToken || !keyReady) {
    errorMessage.textContent = activeToken ? "Verify a valid Pollinations key before running Jev inference." : "Connect Pollinations before running Jev inference.";
    errorMessage.hidden = false;
    updateTokenUI();
    return;
  }
  executeButton.disabled = true;
  setButtonLoading(executeButton, true);
  executeButton.querySelector(".button-label").textContent = "Running inference…";
  results.hidden = false;
  runState.textContent = "INFERENCING";
  runState.classList.add("loading");
  resultContent.innerHTML = '<div class="result-body"><p class="result-summary">Evaluating context …</p></div>';
  let generationRequestFailed = false;

  try {
    const token = activeToken;
    let response;
    try { response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: "Bearer " + token } : {}) },
      body: JSON.stringify({ model: "jev", state: context, questions: questions, temperature: 0 })
    }); } catch (error) {
      // A network failure says nothing about the key, so don't invalidate it.
      throw new Error("Could not reach Pollinations. Check your connection and try again.");
    }
    const payload = await response.json().catch(function() { return {}; });
    if (!response.ok) {
      // Only an auth failure means the key is bad; 400/422/5xx errors must not lock the Execute button.
      generationRequestFailed = response.status === 401 || response.status === 403;
      const message = payload.error && payload.error.message || payload.message || "Pollinations request failed (" + response.status + "). Check the token and try again.";
      const fieldErrors = payload.error && payload.error.details && payload.error.details.fieldErrors;
      const detailText = fieldErrors ? Object.entries(fieldErrors).map(function(entry) {
        return entry[0] + ": " + (Array.isArray(entry[1]) ? entry[1].join(", ") : String(entry[1]));
      }).join("; ") : "";
      throw new Error(message + (detailText ? " " + detailText : ""));
    }
    const answers = payload.answers || {};
    const entries = Object.entries(answers);
    if (!entries.length) throw new Error("Jev did not return any decision answers. Please try again.");
    const decisions = entries.map(function(entry) {
      const question = questions[entry[0]];
      const options = question && question.type === "choice" ? Object.keys(question.criteria) : [];
      const scoreLevels = question && question.type === "score" ? question.criteria : [];
      return parseDecision(entry[0], entry[1], options, scoreLevels);
    });
    renderResult(decisions);
    refreshAccount();
  } catch (error) {
    if (generationRequestFailed) {
      keyReady = false;
      keyStatus = "invalid";
      updateTokenUI();
      tokenStatus.textContent = "Inference request failed. Update to verify the key before retrying.";
    }
    results.hidden = true;
    errorMessage.textContent = error.message || "Inference failed. Check your connection and try again.";
    errorMessage.hidden = false;
  } finally {
    executeButton.disabled = !authorizedToken() || !keyReady;
    setButtonLoading(executeButton, false);
    executeButton.querySelector(".button-label").textContent = "Execute Jev Inference";
  }
});

updateTokenUI();
addQuestionRow();
promptTemplate.addEventListener("change", loadPromptTemplate);
addQuestionButton.addEventListener("click", function() { addQuestionRow(); });
if (authorizedToken()) validateKey();
handleOAuthCallback().catch(function(error) {
  errorMessage.textContent = error.message || "Pollinations sign-in could not be completed.";
  errorMessage.hidden = false;
});