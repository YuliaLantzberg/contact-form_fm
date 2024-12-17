const submitBtn = document.querySelector(".btn");
const first_name = document.querySelector(".first_name");
const last_name = document.querySelector(".last_name");
const email = document.querySelector(".email");
const messageEl = document.getElementById("msg");
const queryTypes = document.querySelectorAll(".queries__type");
const queryTypeField = document.getElementById("queries");
const consentCheckbox = document.getElementById("consent");
const toastBar = document.querySelector(".toast");
const error_messages = document.querySelectorAll(".form__error-msg");

const errors = {
	EMPTY: "This field is required",
	EMAIL: "Please enter a valid email address",
	QUERY: "Please select a query type",
	CONSENT: "To submit this form, please consent to being contacted",
};
const ENTER = "Enter";

function displayError(inputEl, error) {
	error_messages.forEach((er) => {
		if (er.getAttribute("aria-labelledby") === inputEl.id) {
			er.textContent = error;
			er.style.visibility = "visible";
		}
	});
	inputEl.classList.add("error");
	inputEl.focus();
}

function isEmailValid(emailStr) {
	const isValidEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return isValidEmailRegex.test(emailStr);
}

function isQueriesType() {
	let isChecked = false;
	queryTypes.forEach((type) => {
		if (!isChecked) {
			isChecked = type.classList.contains("active");
		}
	});
	return isChecked;
}

function resetErrors() {
	error_messages.forEach((err_msg) => {
		err_msg.style.visibility = "hidden";
	});
	const errorEl = document.querySelector(".error");
	if (errorEl) errorEl.classList.remove("error");
}

function submitHandler(e) {
	e.preventDefault();
	let error = "";
	let inputEl = null;
	resetErrors();
	if (
		!first_name.value ||
		!last_name.value ||
		!email.value ||
		!messageEl.value
	) {
		error = errors.EMPTY;
		if (!first_name.value) {
			inputEl = first_name;
		} else if (!last_name.value) {
			inputEl = last_name;
		} else if (!email.value) {
			inputEl = email;
		} else if (!messageEl.value) {
			inputEl = messageEl;
		}
	} else if (email.value && !isEmailValid(email.value)) {
		inputEl = email;
		error = errors.EMAIL;
	} else if (!isQueriesType()) {
		inputEl = queryTypeField;
		error = errors.QUERY;
	} else if (!consentCheckbox.checked) {
		inputEl = consentCheckbox;
		error = errors.CONSENT;
	}
	if (error) {
		displayError(inputEl, error);
	} else {
		toastBar.classList.add("show");
		// After 5 seconds, remove the show class from DIV
		setTimeout(function () {
			toastBar.classList.remove("show");
		}, 5000);
	}
}

function queryTypesHandler(e) {
	e.preventDefault();
	const checkedType = e.currentTarget.querySelector("input");

	checkedType.checked = true;
	queryTypes.forEach((type) => {
		if (type.id === e.currentTarget.id) type.classList.add("active");
		else type.classList.remove("active");
	});
}

function consentCheckboxHandler(e) {
	e.preventDefault();
	if (e.key === ENTER) {
		consentCheckbox.checked = true;
	}
}

submitBtn.addEventListener("click", submitHandler);
submitBtn.addEventListener("keydown", (e) => {
	if (e.key === ENTER) submitHandler(e);
	return;
});

queryTypes.forEach((type) => {
	type.addEventListener("click", queryTypesHandler);
	type.addEventListener("keydown", (e) => {
		if (e.key === ENTER) queryTypesHandler(e);
		return;
	});
});

consentCheckbox.addEventListener("keydown", (e) => {
	if (e.key === ENTER) consentCheckboxHandler(e);
	return;
});
