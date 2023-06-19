(function () {
  /* ========= sidebar toggle ======== */
  const sidebarNavWrapper = document.querySelector(".sidebar-nav-wrapper");
  const mainWrapper = document.querySelector(".main-wrapper");
  const menuToggleButton = document.querySelector("#menu-toggle");
  const menuToggleButtonIcon = document.querySelector("#menu-toggle i");
  const overlay = document.querySelector(".overlay");

  menuToggleButton.addEventListener("click", () => {
    sidebarNavWrapper.classList.toggle("active");
    overlay.classList.add("active");
    mainWrapper.classList.toggle("active");

    if (document.body.clientWidth > 1200) {
      if (menuToggleButtonIcon.classList.contains("lni-chevron-left")) {
        menuToggleButtonIcon.classList.remove("lni-chevron-left");
        menuToggleButtonIcon.classList.add("lni-menu");
      } else {
        menuToggleButtonIcon.classList.remove("lni-menu");
        menuToggleButtonIcon.classList.add("lni-chevron-left");
      }
    } else {
      if (menuToggleButtonIcon.classList.contains("lni-chevron-left")) {
        menuToggleButtonIcon.classList.remove("lni-chevron-left");
        menuToggleButtonIcon.classList.add("lni-menu");
      }
    }
  });
  overlay.addEventListener("click", () => {
    sidebarNavWrapper.classList.remove("active");
    overlay.classList.remove("active");
    mainWrapper.classList.remove("active");
  });

  const getTaskNo = () =>
    window.location.href.split("eulerTasks/")[1].charAt(0);

  document.getElementById("submit-btn").onclick = () => {
    const paramsHTML = document.getElementsByTagName("input");

    const paramsVal = [...paramsHTML].map((e) => e.value);

    const isValidData = paramsVal.every((input) => input);
    const isNumber = paramsVal.every((input) => !isNaN(input));
    const isPositive = paramsVal.every((input) => parseFloat(input) >= 1);
    const taskNo = getTaskNo();
    if (
      (isValidData && isNumber && isPositive) ||
      (taskNo == "6" && isValidData && isNumber)
    ) {
      console.log("taskNo", taskNo);
      const newUrl =
        "/eulerTasks/" + taskNo + "?input=[" + [...paramsVal] + "]";
      console.log("url", newUrl);
      console.log("paramElems", paramsVal);
      window.location.href = newUrl;
    } else {
      alert("Please enter Valid Positive Numbers");
    }
  };
})();
