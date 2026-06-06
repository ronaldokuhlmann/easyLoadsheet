const aircraftConfigs = {
  A319: { holds: ["H1", "H4", "H5"], mainHold: "H4" },
  A320: { holds: ["H1", "H3", "H4", "H5"], mainHold: "H1" },
  A321: { holds: ["H1", "H2", "H3", "H4", "H5"], mainHold: "H3" },
};

const maxReferenceBags = 85;
const storageKey = "easy-loadsheet-state-v6";
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
    addLmc: "Adicionar LMC",
    lmcAction: "Ação",
    lmcQty: "Qtd",
    bagVariation: "Variação bags",
    weightVariation: "Variação peso",
    copySummaryTitle: "Resumo para copiar",
    copySummaryHelp: "Somente modelo e porões carregados.",
    copySummaryButton: "Copiar resumo",
    clear: "Limpar",
    mainHoldReference: "",
    holdReference: "Referência: até 85 malas",
    weightKg: "Peso kg",
    hold: "Bodega",
    wheelchair: "Silla",
    copied: "Copiado",
    closeMissing: "Informe cierre",
    closed: "Fechado",
    missing: "Falta",
    extra: "Sobra",
    fillClose: "Preencha total no cierre para calcular.",
    sillaCountError: "A quantidade de sillas está maior que o total do cierre.",
    sillaWeightError: "O peso das sillas está maior que o peso total do cierre.",
    sillaHoldError: "Informe a bodega de cada silla.",
    sillaDistributionError: "A distribuição está com {count} silla(s) {direction} que o informado no cierre.",
    bagsDistributionError: "A distribuição está com {count} mala(s) {direction} que o total informado.{extra}",
    more: "a mais",
    less: "a menos",
    calculatedWeightMismatch: " Peso calculado está {kg} kg {direction} do informado.",
    above: "acima",
    below: "abaixo",
    generalMismatch: "O total geral está {kg} kg {direction} do peso do cierre informado.",
    fillAverage: "Preencha o parcial ou os dados de silla para calcular a divisão.",
    partialMismatch: "O total calculado ficou {kg} kg {direction} do peso informado. Confira o parcial.",
    overReference: "Um dos porões passou da referência de 85 malas. Confira se a distribuição está praticável.",
    approved: "Distribuição fechada com o total informado.",
    copyError: "Não foi possível copiar automaticamente. Selecione o resumo e copie manualmente.",
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
    addLmc: "Añadir LMC",
    lmcAction: "Acción",
    lmcQty: "Cant.",
    bagVariation: "Variación bags",
    weightVariation: "Variación peso",
    copySummaryTitle: "Resumen para copiar",
    copySummaryHelp: "Solo modelo y bodegas cargadas.",
    copySummaryButton: "Copiar resumen",
    clear: "Limpiar",
    mainHoldReference: "",
    holdReference: "Referencia: hasta 85 maletas",
    weightKg: "Peso kg",
    hold: "Bodega",
    wheelchair: "Silla",
    copied: "Copiado",
    closeMissing: "Introduce cierre",
    closed: "Cerrado",
    missing: "Faltan",
    extra: "Sobran",
    fillClose: "Introduce el total en cierre para calcular.",
    sillaCountError: "La cantidad de sillas es mayor que el total del cierre.",
    sillaWeightError: "El peso de las sillas es mayor que el peso total del cierre.",
    sillaHoldError: "Indica la bodega de cada silla.",
    sillaDistributionError: "La distribución tiene {count} silla(s) {direction} que lo informado en cierre.",
    bagsDistributionError: "La distribución tiene {count} maleta(s) {direction} que el total informado.{extra}",
    more: "de más",
    less: "de menos",
    calculatedWeightMismatch: " El peso calculado está {kg} kg {direction} del informado.",
    above: "por encima",
    below: "por debajo",
    generalMismatch: "El total general está {kg} kg {direction} del peso del cierre informado.",
    fillAverage: "Introduce el parcial o los datos de silla para calcular la división.",
    partialMismatch: "El total calculado quedó {kg} kg {direction} del peso informado. Revisa el parcial.",
    overReference: "Una bodega pasó la referencia de 85 maletas. Revisa si la distribución es practicable.",
    approved: "Distribución cerrada con el total informado.",
    copyError: "No fue posible copiar automáticamente. Selecciona el resumen y cópialo manualmente.",
  },
};

function t(key) {
  return translations[currentLang][key] || translations.pt[key] || key;
}

const elements = {
  aircraftEyebrow: document.querySelector("#aircraftEyebrow"),
  variantTabs: [...document.querySelectorAll("[data-aircraft]")],
  languageTabs: [...document.querySelectorAll("[data-lang]")],
  distributionHint: document.querySelector("#distributionHint"),
  totalBags: document.querySelector("#totalBags"),
  totalWeight: document.querySelector("#totalWeight"),
  bagAverage: document.querySelector("#bagAverage"),
  wheelchairMode: document.querySelector("#wheelchairMode"),
  wheelchairFields: document.querySelector("#wheelchairFields"),
  sillaMetrics: document.querySelector("#sillaMetrics"),
  sillaList: document.querySelector("#sillaList"),
  addSillaButton: document.querySelector("#addSillaButton"),
  removeSillaButton: document.querySelector("#removeSillaButton"),
  bagsWithoutWheelchair: document.querySelector("#bagsWithoutWheelchair"),
  recalculatedAverage: document.querySelector("#recalculatedAverage"),
  holdGrid: document.querySelector("#holdGrid"),
  calculatedWeight: document.querySelector("#calculatedWeight"),
  calculatedCierreWeight: document.querySelector("#calculatedCierreWeight"),
  generalTotalDiff: document.querySelector("#generalTotalDiff"),
  splitMode: document.querySelector("#splitMode"),
  notice: document.querySelector("#notice"),
  approvalBox: document.querySelector("#approvalBox"),
  summary: document.querySelector("#summary"),
  copyButton: document.querySelector("#copyButton"),
  clearButton: document.querySelector("#clearButton"),
  lmcList: document.querySelector("#lmcList"),
  addLmcButton: document.querySelector("#addLmcButton"),
  removeLmcButton: document.querySelector("#removeLmcButton"),
  lmcBagResult: document.querySelector("#lmcBagResult"),
  lmcWeightResult: document.querySelector("#lmcWeightResult"),
  lmcSummary: document.querySelector("#lmcSummary"),
};

function getConfig() {
  return aircraftConfigs[currentAircraft];
}

function getHoldIds() {
  return getConfig().holds;
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
  return getSillaInputs()
    .map((input, index) => {
      const weight = numberFromInput(input);
      const hold = holds[index].value;
      return weight > 0 ? { index: index + 1, weight, hold } : null;
    })
    .filter(Boolean);
}

function getSillaFormState() {
  const holds = getSillaHolds();
  return getSillaInputs().map((input, index) => ({
    weight: input.value,
    hold: holds[index].value,
  }));
}

function renderSillas(sillas = [{ weight: "", hold: "" }]) {
  const safeSillas = sillas.length ? sillas.slice(0, maxSillas) : [{ weight: "", hold: "" }];
  const holdOptions = getHoldIds();

  elements.sillaList.innerHTML = "";

  safeSillas.forEach((silla, index) => {
    const item = document.createElement("article");
    item.className = "silla-card";
    item.innerHTML = `
      <div class="silla-card-title">
        <strong>Silla ${index + 1}</strong>
      </div>
      <div class="silla-row">
        <label class="field">
          <span>${t("weightKg")}</span>
          <input data-silla-weight="${index + 1}" type="number" inputmode="decimal" min="0" step="0.1" placeholder="Ex: ${index === 0 ? "23" : "15"}">
        </label>
        <div class="field">
          <span>${t("hold")}</span>
          <div class="hold-picker" data-silla-picker="${index + 1}">
            ${holdOptions.map((hold) => `<button type="button" data-hold-option="${hold}">${hold}</button>`).join("")}
          </div>
          <input type="hidden" data-silla-hold-value="${index + 1}">
        </div>
      </div>
    `;

    const input = item.querySelector("[data-silla-weight]");
    const holdInput = item.querySelector("[data-silla-hold-value]");
    const validHold = holdOptions.includes(silla.hold) ? silla.hold : "";
    input.value = silla.weight || "";
    holdInput.value = validHold;
    item.querySelectorAll("[data-hold-option]").forEach((button) => {
      button.classList.toggle("selected", button.dataset.holdOption === validHold);
    });
    elements.sillaList.appendChild(item);
  });

  elements.addSillaButton.disabled = safeSillas.length >= maxSillas;
  elements.removeSillaButton.hidden = safeSillas.length <= 1;
}

function renderHolds(savedBags = {}) {
  const { mainHold } = getConfig();
  elements.holdGrid.innerHTML = "";

  getHoldIds().forEach((hold) => {
    const card = document.createElement("article");
    card.className = `hold-card${hold === mainHold ? " main-hold" : ""}`;
    card.dataset.holdCard = hold;
    card.innerHTML = `
      <div>
        <p class="hold-name">${hold}</p>
        <p class="hold-limit">${hold === mainHold ? "" : t("holdReference")}</p>
      </div>
      <label>
        <span>Bags</span>
        <input data-bag-input="${hold}" type="number" inputmode="numeric" min="0" step="1" placeholder="0">
      </label>
      <div class="auto-silla">
        <span>Sillas</span>
        <strong data-auto-silla="${hold}">0</strong>
      </div>
      <output data-weight-output="${hold}" class="hold-weight">0 kg</output>
    `;

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
    const validLrHold = getHoldIds().includes(row.lrHold) ? row.lrHold : "";
    const validRemovedHold = getHoldIds().includes(row.removedHold) ? row.removedHold : "";
    const card = document.createElement("article");
    card.className = "lmc-card";
    card.innerHTML = `
      <div class="lmc-card-main">
        <label class="field">
          <span>${t("lrLoaded")}</span>
          <input data-lmc-lr-qty type="number" inputmode="numeric" min="0" step="1" placeholder="0">
        </label>
        <label class="field">
          <span>${t("lrHold")}</span>
          <select data-lmc-lr-hold>
            <option value="">-</option>
            ${getHoldIds().map((hold) => `<option value="${hold}">${hold}</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>${t("removedBags")}</span>
          <input data-lmc-removed-qty type="number" inputmode="numeric" min="0" step="1" placeholder="0">
        </label>
        <label class="field">
          <span>${t("removedHold")}</span>
          <select data-lmc-removed-hold>
            <option value="">-</option>
            ${getHoldIds().map((hold) => `<option value="${hold}">${hold}</option>`).join("")}
          </select>
        </label>
      </div>
    `;

    card.querySelector("[data-lmc-lr-qty]").value = row.lrQty || "";
    card.querySelector("[data-lmc-lr-hold]").value = validLrHold;
    card.querySelector("[data-lmc-removed-qty]").value = row.removedQty || "";
    card.querySelector("[data-lmc-removed-hold]").value = validRemovedHold;
    elements.lmcList.appendChild(card);
  });

  elements.removeLmcButton.hidden = safeRows.length <= 1;
}

function numberFromInput(input) {
  const value = Number(String(input.value).replace(",", "."));
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function wholeNumberFromInput(input) {
  return Math.max(0, Math.floor(numberFromInput(input)));
}

function formatKg(value, decimals = 0) {
  return `${value.toLocaleString("pt-BR", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  })} kg`;
}

function roundedWeight(value) {
  return Math.round(value);
}

function filledHoldsCount(distribution) {
  return distribution.filter((item) => item.bags > 0).length;
}

function getBalanceHold(distribution) {
  const { mainHold } = getConfig();
  return distribution.reduce((current, item) => {
    if (!current || item.bags > current.bags) return item;
    if (item.bags === current.bags && item.hold === mainHold) return item;
    return current;
  }, null);
}

function setNotice(message, type = "") {
  elements.notice.className = `notice ${type}`.trim();
  elements.notice.textContent = message;
  document.body.classList.toggle("loadsheet-approved", type === "ok");
  elements.approvalBox.hidden = type !== "ok";
}

function applyLanguage() {
  document.documentElement.lang = currentLang === "es" ? "es" : "pt-BR";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  elements.languageTabs.forEach((button) => {
    button.classList.toggle("selected", button.dataset.lang === currentLang);
  });
  renderAircraft(getCurrentBagsState());
  renderSillas(getSillaFormState());
  calculate();
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
  elements.recalculatedAverage.textContent = recalculatedAverage > 0
    ? `${recalculatedAverage.toFixed(2).replace(".", ",")} kg/bag`
    : "0 kg/bag";

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
      sillaWeight: roundedWeight(holdSillas.reduce((sum, silla) => sum + silla.weight, 0)),
      exactWeight: bags * informedAverage,
      weight: roundedWeight(bags * informedAverage),
      overReference: bags > maxReferenceBags,
    };
  });

  const distributedBags = distribution.reduce((sum, item) => sum + item.bags, 0);
  const isDividingBags = filledHoldsCount(distribution) > 1;
  const averageWeight = hasWheelchairAdjustment && isDividingBags ? recalculatedAverage : informedAverage;

  distribution.forEach((item) => {
    item.exactWeight = item.bags * averageWeight;
    item.weight = roundedWeight(item.exactWeight);
  });

  const estimatedTotalWeight = roundedWeight(distributedBags * averageWeight);
  const canUseResidualWeight = totalWeight > 0 && distributedBags === totalBags;
  const balanceHold = canUseResidualWeight ? getBalanceHold(distribution) : null;

  if (balanceHold) {
    const otherHoldsWeight = distribution.reduce((sum, item) => {
      if (item.hold === balanceHold.hold) return sum;
      return sum + item.weight;
    }, 0);
    balanceHold.weight = Math.max(0, roundedWeight(totalWeight) - otherHoldsWeight);
  }

  const calculatedWeight = distribution.reduce((sum, item) => sum + item.weight, 0);
  const distributedSillas = distribution.reduce((sum, item) => sum + item.sillas, 0);
  const calculatedSillaWeight = distribution.reduce((sum, item) => sum + item.sillaWeight, 0);
  const calculatedCierreWeight = calculatedWeight + calculatedSillaWeight;

  elements.calculatedWeight.textContent = formatKg(calculatedWeight);
  elements.calculatedCierreWeight.textContent = formatKg(calculatedCierreWeight);

  const cierreWeightDiff = cierreWeight > 0 ? calculatedCierreWeight - roundedWeight(cierreWeight) : 0;
  if (!cierreWeight) {
    elements.generalTotalDiff.textContent = t("closeMissing");
  } else if (cierreWeightDiff === 0) {
    elements.generalTotalDiff.textContent = t("closed");
  } else if (cierreWeightDiff < 0) {
    elements.generalTotalDiff.textContent = `${t("missing")} ${formatKg(Math.abs(cierreWeightDiff))}`;
  } else {
    elements.generalTotalDiff.textContent = `${t("extra")} ${formatKg(cierreWeightDiff)}`;
  }

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
      const holdTotalWeight = item.weight + item.sillaWeight;
      getWeightOutput(item.hold).innerHTML = `<span>${formatKg(holdTotalWeight)}</span><small>${formatKg(item.weight)} bags + ${formatKg(item.sillaWeight)} ${item.sillas > 1 ? "sillas" : "silla"}</small>`;
    } else {
      getWeightOutput(item.hold).innerHTML = `<span>${formatKg(item.weight)}</span>`;
    }
  });

  const summaryLines = [
    currentAircraft,
    ...distribution.filter((item) => item.bags > 0 || item.sillas > 0).map((item) => {
      const sillaLabel = item.sillas > 1 ? "sillas" : "silla";
      const bagText = item.bags > 0 ? `${item.bags} bags / ${item.weight} kg` : "";
      const sillaText = item.sillas > 0 ? `${item.sillas} ${sillaLabel} / ${item.sillaWeight} kg` : "";
      return `${item.hold}: ${[bagText, sillaText].filter(Boolean).join(" + ")}`;
    }),
  ];
  elements.summary.textContent = summaryLines.length > 1 ? summaryLines.join("\n") : currentAircraft;

  if (wheelchairCount > cierreItems) {
    setNotice(t("sillaCountError"), "danger");
  } else if (wheelchairWeight > cierreWeight) {
    setNotice(t("sillaWeightError"), "danger");
  } else if (sillas.some((silla) => !silla.hold)) {
    setNotice(t("sillaHoldError"), "danger");
  } else if (distributedSillas !== wheelchairCount) {
    const diff = distributedSillas - wheelchairCount;
    const direction = diff > 0 ? t("more") : t("less");
    setNotice(t("sillaDistributionError").replace("{count}", Math.abs(diff)).replace("{direction}", direction), "danger");
  } else if (!totalBags) {
    setNotice(t("fillClose"));
  } else if (!averageWeight && isDividingBags) {
    setNotice(t("fillAverage"), "warn");
  } else if (distributedBags !== totalBags) {
    const diff = distributedBags - totalBags;
    const direction = diff > 0 ? t("more") : t("less");
    const weightDiff = totalWeight > 0 ? calculatedWeight - roundedWeight(totalWeight) : 0;
    const weightMessage = totalWeight > 0 && weightDiff !== 0
      ? t("calculatedWeightMismatch")
        .replace("{kg}", Math.abs(weightDiff))
        .replace("{direction}", weightDiff > 0 ? t("above") : t("below"))
      : "";
    setNotice(t("bagsDistributionError").replace("{count}", Math.abs(diff)).replace("{direction}", direction).replace("{extra}", weightMessage), "danger");
  } else if (cierreWeight > 0 && cierreWeightDiff !== 0) {
    const direction = cierreWeightDiff > 0 ? t("above") : t("below");
    setNotice(t("generalMismatch").replace("{kg}", Math.abs(cierreWeightDiff)).replace("{direction}", direction), "danger");
  } else if (isDividingBags && totalWeight > 0 && Math.abs(estimatedTotalWeight - totalWeight) > 1) {
    const diff = estimatedTotalWeight - totalWeight;
    const direction = diff > 0 ? t("above") : t("below");
    setNotice(t("partialMismatch").replace("{kg}", Math.abs(diff)).replace("{direction}", direction), "warn");
  } else if (distribution.some((item) => item.overReference)) {
    setNotice(t("overReference"), "warn");
  } else {
    setNotice(t("approved"), "ok");
  }

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
      const weightDelta = lrQty * 11;
      bagVariation += lrQty;
      weightVariation += weightDelta;
      holdBagChanges[row.lrHold] = (holdBagChanges[row.lrHold] || 0) + lrQty;
      holdChanges[row.lrHold] = (holdChanges[row.lrHold] || 0) + weightDelta;
    }

    if (removedQty && row.removedHold) {
      const weightDelta = removedQty * -13;
      bagVariation -= removedQty;
      weightVariation += weightDelta;
      holdBagChanges[row.removedHold] = (holdBagChanges[row.removedHold] || 0) - removedQty;
      holdChanges[row.removedHold] = (holdChanges[row.removedHold] || 0) + weightDelta;
    }
  });

  const bagPrefix = bagVariation > 0 ? "+" : "";
  const weightPrefix = weightVariation > 0 ? "+" : weightVariation < 0 ? "-" : "";
  const formattedWeight = formatKg(Math.abs(weightVariation));

  elements.lmcBagResult.textContent = `${bagPrefix}${bagVariation}`;
  elements.lmcWeightResult.textContent = `${weightPrefix}${formattedWeight}`;
  const holdLines = Object.entries(holdChanges).map(([hold, weight]) => {
    const bags = holdBagChanges[hold] || 0;
    const bagHoldPrefix = bags > 0 ? "+" : "";
    const prefix = weight > 0 ? "+" : weight < 0 ? "-" : "";
    return `${hold} ${bagHoldPrefix}${bags} / ${prefix}${formatKg(Math.abs(weight))}`;
  });
  elements.lmcSummary.textContent = holdLines.length
    ? ["LMC:", ...holdLines].join("\n")
    : `LMC: ${bagPrefix}${bagVariation} / ${weightPrefix}${formattedWeight}`;
}

function getCurrentBagsState() {
  return Object.fromEntries(getHoldIds().map((hold) => [hold, getBagInput(hold)?.value || ""]));
}

function saveState() {
  const state = {
    aircraft: currentAircraft,
    totalBags: elements.totalBags.value,
    totalWeight: elements.totalWeight.value,
    bagAverage: elements.bagAverage.value,
    wheelchairMode: elements.wheelchairMode.checked,
    sillas: getSillaFormState(),
    lang: currentLang,
    splitMode: elements.splitMode.checked,
    bagsByAircraft: {
      ...(JSON.parse(localStorage.getItem(storageKey) || "{}").bagsByAircraft || {}),
      [currentAircraft]: getCurrentBagsState(),
    },
    lmcRows: getLmcRows(),
  };
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function loadState() {
  const rawState = localStorage.getItem(storageKey);
  if (!rawState) return;

  try {
    const state = JSON.parse(rawState);
    currentAircraft = aircraftConfigs[state.aircraft] ? state.aircraft : "A319";
    currentLang = translations[state.lang] ? state.lang : "pt";
    elements.totalBags.value = state.totalBags || "";
    elements.totalWeight.value = state.totalWeight || "";
    elements.bagAverage.value = state.bagAverage || "";
    elements.wheelchairMode.checked = Boolean(state.wheelchairMode);
    elements.splitMode.checked = Boolean(state.splitMode);
    renderLmcRows(state.lmcRows || []);
    renderAircraft(state.bagsByAircraft?.[currentAircraft] || {});
    renderSillas(state.sillas || [{ weight: "", hold: "" }]);
  } catch {
    localStorage.removeItem(storageKey);
  }
}

function renderAircraft(savedBags = {}) {
  const { mainHold } = getConfig();
  elements.aircraftEyebrow.textContent = `Airbus ${currentAircraft}`;
  elements.distributionHint.textContent = t("distributionHint");
  elements.variantTabs.forEach((button) => {
    button.classList.toggle("selected", button.dataset.aircraft === currentAircraft);
  });
  renderHolds(savedBags);
  renderLmcRows(getLmcRows());
}

function updateMode() {
  elements.wheelchairFields.hidden = !elements.wheelchairMode.checked;

  if (!elements.wheelchairMode.checked) {
    renderSillas();
  } else if (!elements.sillaList.children.length) {
    renderSillas();
  }

  calculate();
}

async function copySummary() {
  try {
    await navigator.clipboard.writeText(elements.summary.textContent);
    elements.copyButton.textContent = t("copied");
    setTimeout(() => {
      elements.copyButton.textContent = t("copySummaryButton");
    }, 1300);
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
  renderLmcRows();
  renderAircraft();
  renderSillas();
  updateMode();
}

[
  elements.totalBags,
  elements.totalWeight,
  elements.bagAverage,
].forEach((input) => {
  input.addEventListener("input", calculate);
  input.addEventListener("change", calculate);
});

elements.holdGrid.addEventListener("input", calculate);
elements.holdGrid.addEventListener("change", calculate);
elements.splitMode.addEventListener("change", updateMode);
elements.wheelchairMode.addEventListener("change", updateMode);
elements.variantTabs.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.aircraft === currentAircraft) return;
    currentAircraft = button.dataset.aircraft;
    elements.totalBags.value = "";
    elements.totalWeight.value = "";
    elements.bagAverage.value = "";
    elements.wheelchairMode.checked = false;
    elements.splitMode.checked = false;
    renderLmcRows();
    renderAircraft();
    renderSillas();
    updateMode();
  });
});

elements.languageTabs.forEach((button) => {
  button.addEventListener("click", () => {
    currentLang = button.dataset.lang;
    saveState();
    applyLanguage();
  });
});

elements.wheelchairFields.addEventListener("input", calculate);
elements.wheelchairFields.addEventListener("change", calculate);
elements.wheelchairFields.addEventListener("click", (event) => {
  const button = event.target.closest("[data-hold-option]");
  if (!button) return;

  const picker = button.closest("[data-silla-picker]");
  const card = button.closest(".silla-card");
  const holdInput = card.querySelector("[data-silla-hold-value]");
  holdInput.value = button.dataset.holdOption;

  picker.querySelectorAll("[data-hold-option]").forEach((option) => {
    option.classList.toggle("selected", option === button);
  });

  calculate();
});

elements.lmcList.addEventListener("input", calculate);
elements.lmcList.addEventListener("change", calculate);
elements.addLmcButton.addEventListener("click", () => {
  renderLmcRows([...getLmcRows(), { lrQty: "", lrHold: "", removedQty: "", removedHold: "" }]);
  calculate();
});

elements.removeLmcButton.addEventListener("click", () => {
  const rows = getLmcRows();
  renderLmcRows(rows.slice(0, Math.max(1, rows.length - 1)));
  calculate();
});

elements.addSillaButton.addEventListener("click", () => {
  renderSillas([...getSillaFormState(), { weight: "", hold: "" }]);
  calculate();
});

elements.removeSillaButton.addEventListener("click", () => {
  const current = getSillaFormState();
  renderSillas(current.slice(0, Math.max(1, current.length - 1)));
  calculate();
});

elements.copyButton.addEventListener("click", copySummary);
elements.clearButton.addEventListener("click", clearAll);

renderAircraft();
renderSillas();
loadState();
applyLanguage();
renderAircraft(JSON.parse(localStorage.getItem(storageKey) || "{}").bagsByAircraft?.[currentAircraft] || {});
updateMode();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
