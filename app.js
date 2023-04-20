const labelEls = document.querySelectorAll(".label");
const inputEls = document.querySelectorAll(".input");
const warningEls = document.querySelectorAll(".error");
const ageEls = document.querySelectorAll(".age");
const btnel = document.querySelector(".btn");

const hideWarnings = function (i) {
  warningEls[i].classList.remove("warning_text");
  inputEls[i].classList.remove("warning_border");
  labelEls[i].classList.remove("warning_color");
};

const showWarnings = function (i, msg) {
  warningEls[i].classList.add("warning_text");
  inputEls[i].classList.add("warning_border");
  labelEls[i].classList.add("warning_color");
  warningEls[i].textContent = msg;
};

const showDateWarning = function (msg) {
  for (let i = 0; i < warningEls.length; i++) {
    inputEls[i].classList.add("warning_border");
    labelEls[i].classList.add("warning_color");
  }
  warningEls[0].classList.add("warning_text");
  warningEls[0].textContent = msg;
};

const resetWarnings = function () {
  for (let i = 0; i < warningEls.length; i++) {
    ageEls[i].textContent = "--";
    hideWarnings(i);
  }
};

const fillOutput = function (ageY, ageM, ageD) {
  // animated counter
  const speed = 200;
  const target = [ageY, ageM, ageD];

  for (let i = 0; i < ageEls.length; i++) {
    const updateCount = () => {
      const count = +ageEls[i].innerHTML || 0;
      const inc = target[i] / speed;

      if (count < target[i]) {
        ageEls[i].textContent = Math.ceil(count + inc);
        setTimeout(updateCount, 50);
      } else {
        ageEls[i].textContent = target[i];
      }
    };

    updateCount();
  }
};

for (let i = 0; i < inputEls.length; i++) {
  inputEls[i].addEventListener("input", () => {
    hideWarnings(i);
  });
}

function isValidDay(day, validDay) {
  let msg = "";
  if (day > 31 || day < 0) {
    msg = "Must be a valid day";
    showWarnings(0, msg);
    return false;
  } else if (validDay < day) {
    msg = "Must be a valid date";
    showDateWarning(msg);
    return false;
  } else if (day === 0) {
    msg = "This field is required";
    showWarnings(0, msg);
    return false;
  } else {
    return true;
  }
}

function isValideMonth(month) {
  let msg = "";
  if (month > 12 || month < 0) {
    msg = "Must be a valid month";
    showWarnings(1, msg);
    return false;
  } else if (month === 0) {
    msg = "This field is required";
    showWarnings(1, msg);
    return false;
  } else {
    return true;
  }
}

function isValidYear(year) {
  let msg = "";
  let y = new Date().getFullYear;
  if (year > y || year < 1900) {
    msg = "Must be a valid year";
    showWarnings(2, msg);
    return false;
  } else if (year === 0) {
    msg = "This field is required";
    showWarnings(2, msg);
    return false;
  } else {
    return true;
  }
}

btnel.addEventListener("click", () => {
  let day = Number(document.querySelector(".birth_day").value);
  let month = Number(document.querySelector(".birth_month").value);
  let year = Number(document.querySelector(".birth_year").value);
  const birthDate = new Date([year, month, day]);
  const maxMonthDays = new Date(year, month, 0);
  const currentDate = new Date();
  resetWarnings();

  if (
    isValidDay(day, maxMonthDays.getDate()) &&
    isValideMonth(month) &&
    isValidYear(year)
  ) {
    let ageY = currentDate.getFullYear() - birthDate.getFullYear();
    let ageM = currentDate.getMonth() - birthDate.getMonth();
    let ageD = currentDate.getDate() - birthDate.getDate();

    if (ageD < 0) {
      ageM--;
      ageD += new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate();
    }

    if (ageM < 0) {
      ageY--;
      ageM += 12;
    }

    if (ageY < 0) {
      let msg = "Please enter a valid year";
      showWarnings(2, msg);
    } else {
      fillOutput(ageY, ageM, ageD);
    }
  }
});
