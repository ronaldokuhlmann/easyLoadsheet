const aircraftConfigs = {
  A319: { holds: ["H1", "H4", "H5"], mainHold: "H4" },
  A320: { holds: ["H1", "H3", "H4", "H5"], mainHold: "H1" },
  A321: { holds: ["H1", "H2", "H3", "H4", "H5"], mainHold: "H3" },
};

const maxReferenceBags = 85;
const storageKey = "easy-loadsheet-state-v7";
const maxSillas = 6;
let currentAircraft = "A319";
let currentLang = "pt";

const translations = {
  pt: {
    bagsDataTitle: "Dados das malas",
    bagsDataHelp: "Informe o total, o peso recebido e o parcial em kg por mala.",
    totalClose: "Total no cierre",
    closeWeight: "Peso total do cierre (kg)",
    bagAverage: "Parcial (kg por mala)",
    wheelchairsTitle: "Sillas elétricas",
    wheelchairSwitch: "Silla",
    addWheelchair: "Adicionar silla",
    addLmc: "Adicionar LMC",
    removeLast: "Remover última",
    bagsWithoutWheelchair: "Malas sem silla",
    newAverage: "Novo parcial",
    distributionTitle: "Distribuição",
    distributionHint: "Use as bodegas conforme a operação.",
    split: "Dividir",
    bagsWeight: "Peso malas",
    generalTotal: "Total geral",
    lmcTitle: "Last Minute Changes",
    lmcHelp: "LR soma 11 kg. Mala retirada do cierre subtrai 13 kg.",
    lrLoaded: "LR carregadas",
    lrHold: "Bodega LR",
    removedBags: "Malas retiradas",
    removedHold: "Bodega retirada",
    bagVariation: "Variação bags",
    weightVariation: "Variação peso",
    copySummaryTitle: "Resumo para copiar",
    copySummaryHelp: "Somente modelo e porões carregados.",
    copySummaryButton: "Copiar resumo",
    clear: "Limpar",
    weightKg: "Peso kg",
    hold: "Bodega",
    copied: "Copiado",
    closeMissing: "Informe cierre",
    closed: "Fechado",
    missing: "Falta",
    extra: "Sobra",
    fillClose: "Preencha total no cierre para calcular.",
    sillaCountError: "A quantidade de sillas está maior que o total do cierre.",
    sillaWeightError: "O peso das sillas está maior que o peso total do cierre.",
    sillaHoldError: "Informe a bodega de cada silla.",
    fillAverage: "Preencha o parcial ou os dados de silla para calcular a divisão.",
    overReference: "Um dos porões passou da referência de 85 malas. Confira se a distribuição está praticável.",
    approved: "Distribuição fechada com o total informado.",
    copyError: "Não foi possível copiar automaticamente. Selecione o resumo e copie manualmente.",
    more: "a mais",
    less: "a menos",
    above: "acima",
    below: "abaixo",
  },
  es: {
    bagsDataTitle: "Datos de maletas",
    bagsDataHelp: "Introduce el total, el peso recibido y el parcial en kg por maleta.",
    totalClose: "Total en cierre",
    closeWeight: "Peso total del cierre (kg)",
    bagAverage: "Parcial (kg por maleta)",
    wheelchairsTitle: "Sillas eléctricas",
    wheelchairSwitch: "Silla",
    addWheelchair: "Añadir silla",
    addLmc: "Añadir LMC",
    removeLast: "Eliminar última",
    bagsWithoutWheelchair: "Maletas sin silla",
    newAverage: "Nuevo parcial",
    distributionTitle: "Distribución",
    distributionHint: "Usa las bodegas según la operación.",
    split: "Dividir",
    bagsWeight: "Peso maletas",
    generalTotal: "Total general",
    lmcTitle: "Last Minute Changes",
    lmcHelp: "LR suma 11 kg. Maleta retirada del cierre resta 13 kg.",
    lrLoaded: "LR cargadas",
    lrHold: "Bodega LR",
    removedBags: "Maletas retiradas",
    removedHold: "Bodega retirada",
    bagVariation: "Variación bags",
    weightVariation: "Variación peso",
    copySummaryTitle: "Resumen para copiar",
    copySummaryHelp: "Solo modelo y bodegas cargadas.",
    copySummaryButton: "Copiar resumen",
    clear: "Limpiar",
    weightKg: "Peso kg",
    hold: "Bodega",
    copied: "Copiado",
    closeMissing: "Introduce cierre",
    closed: "Cerrado",
    missing: "Faltan",
    extra: "Sobran",
    fillClose: "Introduce el total en cierre para calcular.",
    sillaCountError: "La cantidad de sillas es mayor que el total del cierre.",
    sillaWeightError: "El peso de las sillas es mayor que el peso total del cierre.",
    sillaHoldError: "Indica la bodega de cada silla.",
    fillAverage: "Introduce el parcial o los datos de silla para calcular la división.",
    overReference: "Una bodega pasó la referencia de 85 maletas. Revisa si la distribución es practicable.",
    approved: "Distribución cerrada con el total informado.",
    copyError: "No fue posible copiar automáticamente. Selecciona el resumen y cópialo manualmente.",
    more: "de más",
    less: "de menos",
    above: "por encima",
    below: "por debajo",
  },
};

const $ = (selector) => document.querySelector(selector);
const elements = {
  aircraftEyebrow: $("#aircraftEyebrow"),
  variantTabs: [...document.querySelectorAll("[data-aircraft]")],
  languageTabs: [...document.querySelectorAll("[data-lang]")],
  distributionHint: $("#distributionHint"),
  totalBags: $("#totalBags"),
  totalWeight: $("#totalWeight"),
  bagAverage: $("#bagAverage"),
  wheelchairMode: $("#wheelchairMode"),
  wheelchairFields: $("#wheelchairFields"),
  sillaMetrics: $("#sillaMetrics"),
  sillaList: $("#sillaList"),
  addSillaButton: $("#addSillaButton"),
  removeSillaButton: $("#removeSillaButton"),
  bagsWithoutWheelchair: $("#bagsWithoutWheelchair"),
  recalculatedAverage: $("#recalculatedAverage"),
  holdGrid: $("#holdGrid"),
  calculatedWeight: $("#calculatedWeight"),
  calculatedCierreWeight: $("#calculatedCierreWeight"),
  generalTotalDiff: $("#generalTotalDiff"),
  splitMode: $("#splitMode"),
  notice: $("#notice"),
  approvalBox: $("#approvalBox"),
  summary: $("#summary"),
  copyButton: $("#copyButton"),
  clearButton: $("#clearButton"),
  lmcList: $("#lmcList"),
  addLmcButton: $("#addLmcButton"),
  removeLmcButton: $("#removeLmcButton"),
  lmcBagResult: $("#lmcBagResult"),
  lmcWeightResult: $("#lmcWeightResult"),
  lmcSummary: $("#lmcSummary"),
};

function t(key) {
  return translations[currentLang][key] || translations.pt[key] || key;
}

function getConfig() {
  return aircraftConfigs[currentAircraft];
}

function getHoldIds() {
  return getConfig().holds;
}

function numberFromInput(input) {
  const value = Number(String(input.value).replace(",", "."));
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function wholeNumberFromInput(input) {
  return Math.max(0, Math.floor(numberFromInput(input)));
}

function formatKg(value, decimals = 0) {
  return `${value.toLocaleString("pt-BR", { maximumFractionDigits: decimals, minimumFractionDigits: decimals })} kg`;
}

function getBagInput(hold) {
  return elements.holdGrid.querySelector(`[data-bag-input="${hold}"]`);
}

function getWeightOutput(hold) {
  return elements.holdGrid.querySelector(`[data-weight-output="${hold}"]`);
}

function getAutoSillaOutput(hold) {
  return elements.holdGrid.querySelector(`[data-auto-silla="${hold}"]`);
}

function getSillaInputs() {
  return [...elements.sillaList.querySelectorAll("[data-silla-weight]")];
}

function getSillaHolds() {
  return [...elements.sillaList.querySelectorAll("[data-silla-hold-value]")];
}

function getSillas() {
  if (!elements.wheelchairMode.checked) return [];
  const holds = getSillaHolds();
  return getSillaInputs().map((input, index) => {
    const weight = numberFromInput(input);
    const hold = holds[index].value;
    return weight > 0 ? { index: index + 1, weight, hold } : null;
  }).filter(Boolean);
}

function getSillaFormState() {
  const holds = getSillaHolds();
  return getSillaInputs().map((input, index) => ({ weight: input.value, hold: holds[index].value }));
}

function renderSillas(sillas = [{ weight: "", hold: "" }]) {
  const safeSillas = sillas.length ? sillas.slice(0, maxSillas) : [{ weight: "", hold: "" }];
  elements.sillaList.innerHTML = "";
  safeSillas.forEach((silla, index) => {
    const validHold = getHoldIds().includes(silla.hold) ? silla.hold : "";
    const item = document.createElement("article");
    item.className = "silla-card";
    item.innerHTML = `
      <div class="silla-card-title"><strong>Silla ${index + 1}</strong></div>
      <div class="silla-row">
        <label class="field"><span>${t("weightKg")}</span><input data-silla-weight="${index + 1}" type="number" inputmode="decimal" min="0" step="0.1" placeholder="Ex: ${index === 0 ? "23" : "15"}"></label>
        <div class="field">
          <span>${t("hold")}</span>
          <div class="hold-picker" data-silla-picker="${index + 1}">
            ${getHoldIds().map((hold) => `<button type="button" data-hold-option="${hold}">${hold}</button>`).join("")}
          </div>
          <input type="hidden" data-silla-hold-value="${index + 1}">
        </div>
      </div>`;
    item.querySelector("[data-silla-weight]").value = silla.weight || "";
    item.querySelector("[data-silla-hold-value]").value = validHold;
    item.querySelectorAll("[data-hold-option]").forEach((button) => {
      button.classList.toggle("selected", button.dataset.holdOption === validHold);
    });
    elements.sillaList.appendChild(item);
  });
  elements.removeSillaButton.hidden = safeSillas.length <= 1;
  elements.addSillaButton.disabled = safeSillas.length >= maxSillas;
}

function renderHolds(savedBags = {}) {
  const { mainHold } = getConfig();
  elements.holdGrid.innerHTML = "";
  getHoldIds().forEach((hold) => {
    const card = document.createElement("article");
    card.className = `hold-card${hold === mainHold ? " main-hold" : ""}`;
    card.innerHTML = `
      <div><p class="hold-name">${hold}</p><p class="hold-limit"></p></div>
      <label><span>Bags</span><input data-bag-input="${hold}" type="number" inputmode="numeric" min="0" step="1" placeholder="0"></label>
      <div class="auto-silla"><span>Sillas</span><strong data-auto-silla="${hold}">0</strong></div>
      <output data-weight-output="${hold}" class="hold-weight">0 kg</output>`;
    elements.holdGrid.appendChild(card);
    getBagInput(hold).value = savedBags[hold] || "";
  });
}

function getLmcRows() {
  return [...elements.lmcList.querySelectorAll(".lmc-card")].map((card) => ({
    lrQty: card.querySelector("[data-lmc-lr-qty]").value,
    lrHold: card.querySelector("[data-lmc-lr-hold]").value,
    removedQty: card.querySelector("[data-lmc-removed-qty]").value,
    removedHold: card.querySelector("[data-lmc-removed-hold]").value,
  }));
}

function renderLmcRows(rows = [{ lrQty: "", lrHold: "", removedQty: "", removedHold: "" }]) {
  const safeRows = rows.length ? rows : [{ lrQty: "", lrHold: "", removedQty: "", removedHold: "" }];
  elements.lmcList.innerHTML = "";
  safeRows.forEach((row) => {
    const card = document.createElement("article");
    card.className = "lmc-card";
    card.innerHTML = `
      <div class="lmc-card-main">
        <label class="field"><span>${t("lrLoaded")}</span><input data-lmc-lr-qty type="number" inputmode="numeric" min="0" step="1" placeholder="0"></label>
        <label class="field"><span>${t("lrHold")}</span><select data-lmc-lr-hold><option value="">-</option>${getHoldIds().map((hold) => `<option value="${hold}">${hold}</option>`).join("")}</select></label>
        <label class="field"><span>${t("removedBags")}</span><input data-lmc-removed-qty type="number" inputmode="numeric" min="0" step="1" placeholder="0"></label>
        <label class="field"><span>${t("removedHold")}</span><select data-lmc-removed-hold><option value="">-</option>${getHoldIds().map((hold) => `<option value="${hold}">${hold}</option>`).join("")}</select></label>
      </div>`;
    card.querySelector("[data-lmc-lr-qty]").value = row.lrQty || "";
    card.querySelector("[data-lmc-lr-hold]").value = getHoldIds().includes(row.lrHold) ? row.lrHold : "";
    card.querySelector("[data-lmc-removed-qty]").value = row.removedQty || "";
    card.querySelector("[data-lmc-removed-hold]").value = getHoldIds().includes(row.removedHold) ? row.removedHold : "";
    elements.lmcList.appendChild(card);
  });
  elements.removeLmcButton.hidden = safeRows.length <= 1;
}

function setNotice(message, type = "") {
  elements.notice.className = `notice ${type}`.trim();
  elements.notice.textContent = message;
  document.body.classList.toggle("loadsheet-approved", type === "ok");
  elements.approvalBox.hidden = type !== "ok";
}

function getBalanceHold(distribution) {
  const { mainHold } = getConfig();
  return distribution.reduce((current, item) => {
    if (!current || item.bags > current.bags) return item;
    if (item.bags === current.bags && item.hold === mainHold) return item;
    return current;
  }, null);
}

function calculate() {
  const cierreItems = wholeNumberFromInput(elements.totalBags);
  const cierreWeight = numberFromInput(elements.totalWeight);
  const sillas = getSillas();
  const wheelchairCount = sillas.length;
  const wheelchairWeight = sillas.reduce((sum, silla) => sum + silla.weight, 0);
  const totalBags = Math.max(0, cierreItems - wheelchairCount);
  const totalWeight = Math.max(0, cierreWeight - wheelchairWeight);
  const informedAverage = numberFromInput(elements.bagAverage);
  const recalculatedAverage = totalBags > 0 && totalWeight > 0 ? totalWeight / totalBags : 0;
  const hasWheelchairAdjustment = wheelchairCount > 0 || wheelchairWeight > 0;

  document.body.classList.toggle("has-silla-load", hasWheelchairAdjustment);
  elements.sillaMetrics.hidden = !hasWheelchairAdjustment;
  elements.bagsWithoutWheelchair.textContent = String(totalBags);
  elements.recalculatedAverage.textContent = recalculatedAverage > 0 ? `${recalculatedAverage.toFixed(2).replace(".", ",")} kg/bag` : "0 kg/bag";

  if (totalBags > 75 && !elements.splitMode.checked) {
    elements.splitMode.checked = true;
    updateMode();
    return;
  }

  const distribution = getHoldIds().map((hold) => {
    const bags = wholeNumberFromInput(getBagInput(hold));
    const holdSillas = sillas.filter((silla) => silla.hold === hold);
    return {
      hold,
      bags,
      sillas: holdSillas.length,
      sillaWeight: Math.round(holdSillas.reduce((sum, silla) => sum + silla.weight, 0)),
      weight: Math.round(bags * informedAverage),
      overReference: bags > maxReferenceBags,
    };
  });

  const distributedBags = distribution.reduce((sum, item) => sum + item.bags, 0);
  const isDividingBags = distribution.filter((item) => item.bags > 0).length > 1;
  const averageWeight = hasWheelchairAdjustment && isDividingBags ? recalculatedAverage : informedAverage;

  distribution.forEach((item) => { item.weight = Math.round(item.bags * averageWeight); });
  const estimatedTotalWeight = Math.round(distributedBags * averageWeight);
  const balanceHold = totalWeight > 0 && distributedBags === totalBags ? getBalanceHold(distribution) : null;
  if (balanceHold) {
    const other = distribution.reduce((sum, item) => item.hold === balanceHold.hold ? sum : sum + item.weight, 0);
    balanceHold.weight = Math.max(0, Math.round(totalWeight) - other);
  }

  const calculatedWeight = distribution.reduce((sum, item) => sum + item.weight, 0);
  const distributedSillas = distribution.reduce((sum, item) => sum + item.sillas, 0);
  const calculatedSillaWeight = distribution.reduce((sum, item) => sum + item.sillaWeight, 0);
  const calculatedCierreWeight = calculatedWeight + calculatedSillaWeight;
  elements.calculatedWeight.textContent = formatKg(calculatedWeight);
  elements.calculatedCierreWeight.textContent = formatKg(calculatedCierreWeight);

  const cierreDiff = cierreWeight > 0 ? calculatedCierreWeight - Math.round(cierreWeight) : 0;
  elements.generalTotalDiff.textContent = !cierreWeight ? t("closeMissing") : cierreDiff === 0 ? t("closed") : `${cierreDiff < 0 ? t("missing") : t("extra")} ${formatKg(Math.abs(cierreDiff))}`;

  distribution.forEach((item) => {
    const sillaOutput = getAutoSillaOutput(item.hold);
    const sillaBox = sillaOutput.closest(".auto-silla");
    const holdCard = sillaOutput.closest(".hold-card");
    sillaOutput.textContent = String(item.sillas);
    sillaBox.classList.toggle("has-auto-silla", item.sillas > 0);
    holdCard.classList.toggle("has-silla-card", item.sillas > 0);
    if (item.sillas > 0 && item.bags === 0) {
      getWeightOutput(item.hold).innerHTML = `<span>${formatKg(item.sillaWeight)}</span><small>${item.sillas > 1 ? "sillas" : "silla"}</small>`;
    } else if (item.sillas > 0) {
      const total = item.weight + item.sillaWeight;
      getWeightOutput(item.hold).innerHTML = `<span>${formatKg(total)}</span><small>${formatKg(item.weight)} bags + ${formatKg(item.sillaWeight)} ${item.sillas > 1 ? "sillas" : "silla"}</small>`;
    } else {
      getWeightOutput(item.hold).innerHTML = `<span>${formatKg(item.weight)}</span>`;
    }
  });

  const summaryLines = [
    currentAircraft,
    ...distribution.filter((item) => item.bags > 0 || item.sillas > 0).map((item) => {
      const bagText = item.bags > 0 ? `${item.bags} bags / ${item.weight} kg` : "";
      const sillaText = item.sillas > 0 ? `${item.sillas} ${item.sillas > 1 ? "sillas" : "silla"} / ${item.sillaWeight} kg` : "";
      return `${item.hold}: ${[bagText, sillaText].filter(Boolean).join(" + ")}`;
    }),
  ];
  elements.summary.textContent = summaryLines.length > 1 ? summaryLines.join("\n") : currentAircraft;

  if (wheelchairCount > cierreItems) setNotice(t("sillaCountError"), "danger");
  else if (wheelchairWeight > cierreWeight) setNotice(t("sillaWeightError"), "danger");
  else if (sillas.some((silla) => !silla.hold)) setNotice(t("sillaHoldError"), "danger");
  else if (distributedSillas !== wheelchairCount) setNotice("A distribuição de sillas não bate com o cierre.", "danger");
  else if (!totalBags) setNotice(t("fillClose"));
  else if (!averageWeight && isDividingBags) setNotice(t("fillAverage"), "warn");
  else if (distributedBags !== totalBags) setNotice(`A distribuição está com ${Math.abs(distributedBags - totalBags)} mala(s) ${distributedBags > totalBags ? t("more") : t("less")}.`, "danger");
  else if (cierreWeight > 0 && cierreDiff !== 0) setNotice(`O total geral está ${Math.abs(cierreDiff)} kg ${cierreDiff > 0 ? t("above") : t("below")} do cierre.`, "danger");
  else if (isDividingBags && totalWeight > 0 && Math.abs(estimatedTotalWeight - totalWeight) > 1) setNotice("Confira o parcial.", "warn");
  else if (distribution.some((item) => item.overReference)) setNotice(t("overReference"), "warn");
  else setNotice(t("approved"), "ok");

  saveState();
  calculateLmc();
}

function calculateLmc() {
  let bagVariation = 0;
  let weightVariation = 0;
  const holdChanges = {};
  const holdBagChanges = {};
  getLmcRows().forEach((row) => {
    const lrQty = Math.max(0, Math.floor(Number(row.lrQty) || 0));
    const removedQty = Math.max(0, Math.floor(Number(row.removedQty) || 0));
    if (lrQty && row.lrHold) {
      const weight = lrQty * 11;
      bagVariation += lrQty;
      weightVariation += weight;
      holdBagChanges[row.lrHold] = (holdBagChanges[row.lrHold] || 0) + lrQty;
      holdChanges[row.lrHold] = (holdChanges[row.lrHold] || 0) + weight;
    }
    if (removedQty && row.removedHold) {
      const weight = removedQty * -13;
      bagVariation -= removedQty;
      weightVariation += weight;
      holdBagChanges[row.removedHold] = (holdBagChanges[row.removedHold] || 0) - removedQty;
      holdChanges[row.removedHold] = (holdChanges[row.removedHold] || 0) + weight;
    }
  });
  const bagPrefix = bagVariation > 0 ? "+" : "";
  const weightPrefix = weightVariation > 0 ? "+" : weightVariation < 0 ? "-" : "";
  elements.lmcBagResult.textContent = `${bagPrefix}${bagVariation}`;
  elements.lmcWeightResult.textContent = `${weightPrefix}${formatKg(Math.abs(weightVariation))}`;
  const holdLines = Object.entries(holdChanges).map(([hold, weight]) => {
    const bags = holdBagChanges[hold] || 0;
    return `${hold} ${bags > 0 ? "+" : ""}${bags} / ${weight > 0 ? "+" : weight < 0 ? "-" : ""}${formatKg(Math.abs(weight))}`;
  });
  elements.lmcSummary.textContent = holdLines.length ? ["LMC:", ...holdLines].join("\n") : `LMC: ${bagPrefix}${bagVariation} / ${weightPrefix}${formatKg(Math.abs(weightVariation))}`;
}

function getCurrentBagsState() {
  return Object.fromEntries(getHoldIds().map((hold) => [hold, getBagInput(hold)?.value || ""]));
}

function saveState() {
  const old = JSON.parse(localStorage.getItem(storageKey) || "{}");
  localStorage.setItem(storageKey, JSON.stringify({
    aircraft: currentAircraft,
    lang: currentLang,
    totalBags: elements.totalBags.value,
    totalWeight: elements.totalWeight.value,
    bagAverage: elements.bagAverage.value,
    wheelchairMode: elements.wheelchairMode.checked,
    splitMode: elements.splitMode.checked,
    sillas: getSillaFormState(),
    lmcRows: getLmcRows(),
    bagsByAircraft: { ...(old.bagsByAircraft || {}), [currentAircraft]: getCurrentBagsState() },
  }));
}

function renderAircraft(savedBags = {}) {
  elements.aircraftEyebrow.textContent = `Airbus ${currentAircraft}`;
  elements.distributionHint.textContent = t("distributionHint");
  elements.variantTabs.forEach((button) => button.classList.toggle("selected", button.dataset.aircraft === currentAircraft));
  renderHolds(savedBags);
  renderLmcRows(getLmcRows());
}

function applyLanguage() {
  document.documentElement.lang = currentLang === "es" ? "es" : "pt-BR";
  document.querySelectorAll("[data-i18n]").forEach((node) => { node.textContent = t(node.dataset.i18n); });
  elements.languageTabs.forEach((button) => button.classList.toggle("selected", button.dataset.lang === currentLang));
  renderAircraft(getCurrentBagsState());
  renderSillas(getSillaFormState());
  renderLmcRows(getLmcRows());
  calculate();
}

function updateMode() {
  elements.wheelchairFields.hidden = !elements.wheelchairMode.checked;
  if (!elements.wheelchairMode.checked) renderSillas();
  calculate();
}

function loadState() {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return;
  try {
    const state = JSON.parse(raw);
    currentAircraft = aircraftConfigs[state.aircraft] ? state.aircraft : "A319";
    currentLang = translations[state.lang] ? state.lang : "pt";
    elements.totalBags.value = state.totalBags || "";
    elements.totalWeight.value = state.totalWeight || "";
    elements.bagAverage.value = state.bagAverage || "";
    elements.wheelchairMode.checked = Boolean(state.wheelchairMode);
    elements.splitMode.checked = Boolean(state.splitMode);
    renderAircraft(state.bagsByAircraft?.[currentAircraft] || {});
    renderSillas(state.sillas || [{ weight: "", hold: "" }]);
    renderLmcRows(state.lmcRows || [{ lrQty: "", lrHold: "", removedQty: "", removedHold: "" }]);
  } catch {
    localStorage.removeItem(storageKey);
  }
}

async function copySummary() {
  try {
    await navigator.clipboard.writeText(elements.summary.textContent);
    elements.copyButton.textContent = t("copied");
    setTimeout(() => { elements.copyButton.textContent = t("copySummaryButton"); }, 1300);
  } catch {
    setNotice(t("copyError"), "warn");
  }
}

function clearAll() {
  localStorage.removeItem(storageKey);
  currentAircraft = "A319";
  currentLang = "pt";
  elements.totalBags.value = "";
  elements.totalWeight.value = "";
  elements.bagAverage.value = "";
  elements.wheelchairMode.checked = false;
  elements.splitMode.checked = false;
  renderAircraft();
  renderSillas();
  renderLmcRows();
  applyLanguage();
}

["input", "change"].forEach((eventName) => {
  [elements.totalBags, elements.totalWeight, elements.bagAverage].forEach((input) => input.addEventListener(eventName, calculate));
  elements.holdGrid.addEventListener(eventName, calculate);
  elements.wheelchairFields.addEventListener(eventName, calculate);
  elements.lmcList.addEventListener(eventName, calculate);
});

elements.splitMode.addEventListener("change", updateMode);
elements.wheelchairMode.addEventListener("change", updateMode);
elements.variantTabs.forEach((button) => button.addEventListener("click", () => {
  if (button.dataset.aircraft === currentAircraft) return;
  currentAircraft = button.dataset.aircraft;
  elements.totalBags.value = "";
  elements.totalWeight.value = "";
  elements.bagAverage.value = "";
  elements.wheelchairMode.checked = false;
  elements.splitMode.checked = false;
  renderAircraft();
  renderSillas();
  renderLmcRows();
  updateMode();
}));
elements.languageTabs.forEach((button) => button.addEventListener("click", () => { currentLang = button.dataset.lang; applyLanguage(); }));
elements.wheelchairFields.addEventListener("click", (event) => {
  const button = event.target.closest("[data-hold-option]");
  if (!button) return;
  const card = button.closest(".silla-card");
  card.querySelector("[data-silla-hold-value]").value = button.dataset.holdOption;
  card.querySelectorAll("[data-hold-option]").forEach((option) => option.classList.toggle("selected", option === button));
  calculate();
});
elements.addSillaButton.addEventListener("click", () => { renderSillas([...getSillaFormState(), { weight: "", hold: "" }]); calculate(); });
elements.removeSillaButton.addEventListener("click", () => { renderSillas(getSillaFormState().slice(0, -1)); calculate(); });
elements.addLmcButton.addEventListener("click", () => { renderLmcRows([...getLmcRows(), { lrQty: "", lrHold: "", removedQty: "", removedHold: "" }]); calculate(); });
elements.removeLmcButton.addEventListener("click", () => { renderLmcRows(getLmcRows().slice(0, -1)); calculate(); });
elements.copyButton.addEventListener("click", copySummary);
elements.clearButton.addEventListener("click", clearAll);

renderAircraft();
renderSillas();
renderLmcRows();
loadState();
applyLanguage();
updateMode();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
