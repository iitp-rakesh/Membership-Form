// Helpers
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => [...parent.querySelectorAll(sel)];

const form = $("#membershipForm");
const agreeCheck = $("#agreeCheck");
const payBtn = $("#payBtn");
const hint = $("#formHint");

// Update file name UI + validate max size 1MB
function bindFileInput(fileId) {
  const input = document.getElementById(fileId);
  const nameEl = document.querySelector(`[data-file="${fileId}"]`);

  input.addEventListener("change", () => {
    if (!input.files || !input.files[0]) {
      nameEl.textContent = "No File Chosen";
      input.dataset.ok = "0";
      togglePayButton();
      return;
    }

    const file = input.files[0];
    nameEl.textContent = file.name;

    const maxBytes = 1 * 1024 * 1024; // 1MB
    if (file.size > maxBytes) {
      input.value = "";
      nameEl.textContent = "File too large (max 1MB)";
      input.dataset.ok = "0";
      nameEl.style.color = "#D32F2F";
    } else {
      input.dataset.ok = "1";
      nameEl.style.color = "";
    }
    togglePayButton();
  });
}

["file1", "file2", "file3"].forEach(bindFileInput);

// Field validation UI
function markField(fieldEl, ok) {
  if (!fieldEl) return;
  fieldEl.classList.toggle("invalid", !ok);
}

function validateFormUI() {
  let ok = true;

  // Required inputs/selects/textareas
  const requiredControls = $$("input[required], select[required], textarea[required]", form);

  requiredControls.forEach((control) => {
    // file inputs handled separately
    if (control.type === "file") return;

    let valid = true;

    if (control.tagName === "SELECT") {
      valid = !!control.value;
    } else if (control.type === "email") {
      valid = control.value.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(control.value.trim());
    } else {
      valid = control.value.trim().length > 0;
    }

    const wrapper = control.closest(".field");
    markField(wrapper, valid);
    if (!valid) ok = false;
  });

  // Files required + size ok
  const fileOk =
    ($("#file1").dataset.ok === "1") &&
    ($("#file2").dataset.ok === "1") &&
    ($("#file3").dataset.ok === "1");

  if (!fileOk) ok = false;

  return ok;
}

function togglePayButton() {
  const isValid = validateFormUI();
  const agreed = agreeCheck.checked;

  payBtn.disabled = !(isValid && agreed);

  if (payBtn.disabled) {
    hint.textContent = agreed
      ? "Please fill required fields and upload valid files (max 1MB)."
      : "Please fill required fields and accept the agreement.";
  } else {
    hint.textContent = "All set! You can proceed to payment.";
  }
}

// Live validation
form.addEventListener("input", togglePayButton);
form.addEventListener("change", togglePayButton);
agreeCheck.addEventListener("change", togglePayButton);

// Submit (demo)
form.addEventListener("submit", (e) => {
  e.preventDefault();

  togglePayButton();
  if (payBtn.disabled) {
    // bring first invalid field into view
    const firstInvalid = $(".field.invalid", form);
    if (firstInvalid) firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  // Collect values (example)
  const data = new FormData(form);

  // Demo success message (replace with your payment flow)
  payBtn.textContent = "Processing...";
  payBtn.disabled = true;

  setTimeout(() => {
    alert("Form validated successfully ✅\nProceed to your payment gateway now.");
    payBtn.textContent = "Proceed to Payment";
    togglePayButton();
  }, 700);
});

// Initial state
togglePayButton();
