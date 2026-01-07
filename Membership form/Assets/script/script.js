// Helpers
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => [...parent.querySelectorAll(sel)];

const form = $("#membershipForm");
const agreeCheck = $("#agreeCheck");
const agreeError = $("#agreeError");
const payBtn = $("#payBtn");
const hint = $("#formHint");

const MAX_BYTES = 1 * 1024 * 1024; // 1MB

function markField(fieldEl, ok) {
  if (!fieldEl) return;
  fieldEl.classList.toggle("invalid", !ok);
}

function setAgreeError(message) {
  if (!agreeError) return;
  agreeError.textContent = message || "";
}

function bindFileInput(fileId) {
  const input = document.getElementById(fileId);
  const nameEl = document.querySelector(`[data-file="${fileId}"]`);
  if (!input || !nameEl) return;

  // initial state
  input.dataset.ok = "0";

  input.addEventListener("change", () => {
    const file = input.files && input.files[0];

    if (!file) {
      nameEl.textContent = "No File Chosen";
      nameEl.style.color = "";
      input.dataset.ok = "0";
      togglePayButton();
      return;
    }

    // show name
    nameEl.textContent = file.name;

    // validate size
    if (file.size > MAX_BYTES) {
      input.value = "";
      nameEl.textContent = "File too large (max 1MB)";
      nameEl.style.color = "#D32F2F";
      input.dataset.ok = "0";
    } else {
      nameEl.style.color = "";
      input.dataset.ok = "1";
    }

    togglePayButton();
  });
}

["file1", "file2", "file3"].forEach(bindFileInput);

function validateFormUI() {
  if (!form) return false;

  let ok = true;

  const requiredControls = $$(
    "input[required]:not([type='file']), select[required], textarea[required]",
    form
  );

  requiredControls.forEach((control) => {
    let valid = true;

    if (control.tagName === "SELECT") {
      valid = !!control.value;
    } else if (control.type === "email") {
      const v = control.value.trim();
      valid = v.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    } else if (control.type === "checkbox") {
      valid = control.checked;
    } else {
      valid = control.value.trim().length > 0;
    }

    markField(control.closest(".field"), valid);
    if (!valid) ok = false;
  });

  // file validation
  const f1 = $("#file1");
  const f2 = $("#file2");
  const f3 = $("#file3");

  if (f1 && f2 && f3) {
    const fileOk = f1.dataset.ok === "1" && f2.dataset.ok === "1" && f3.dataset.ok === "1";
    if (!fileOk) ok = false;
  }

  return ok;
}

function togglePayButton() {
  const isValid = validateFormUI();
  const agreed = !!(agreeCheck && agreeCheck.checked);

  if (payBtn) payBtn.disabled = !(isValid && agreed);

  if (hint) {
    if (!isValid) {
      hint.textContent = "Please fill required fields and upload valid files (max 1MB).";
    } else if (!agreed) {
      hint.textContent = "Please accept the agreement to continue.";
    } else {
      hint.textContent = "All set! You can proceed to payment.";
    }
  }

  // live error clear
  if (!agreed) setAgreeError("");
}

if (form) {
  form.addEventListener("input", togglePayButton);
  form.addEventListener("change", togglePayButton);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isValid = validateFormUI();
    const agreed = !!(agreeCheck && agreeCheck.checked);

    if (!agreed) {
      setAgreeError("Please accept the agreement to continue.");
      $(".agree")?.scrollIntoView({ behavior: "smooth", block: "center" });
      togglePayButton();
      return;
    }

    if (!isValid) {
      togglePayButton();
      $(".field.invalid", form)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // success demo
    payBtn.textContent = "Processing...";
    payBtn.disabled = true;

    setTimeout(() => {
      alert("Form validated successfully ✅\nProceed to your payment gateway now.");
      payBtn.textContent = "Proceed to Payment";
      togglePayButton();
    }, 700);
  });
}

agreeCheck?.addEventListener("change", () => {
  setAgreeError("");
  togglePayButton();
});

// initial
togglePayButton();
