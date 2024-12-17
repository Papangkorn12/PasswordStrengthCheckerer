const texts = {
    en: {
      title: "Make your account",
      usernamePlaceholder: "Enter your username",
      passwordPlaceholder: "Enter your password",
      feedbackWeak: "Weak Password",
      feedbackModerate: "Moderate Password",
      feedbackStrong: "Strong Password",
      resultEmpty: "Please fill in both username and password!",
      resultWeak: "Password is too weak. Please try again.",
      resultSuccess: "Success!",
      tipsTitle: "Tips for creating a strong password:",
      tipsList: [
        "Use at least 12 characters.",
        "Include uppercase and lowercase letters.",
        "Add numbers (0-9).",
        "Use special characters (e.g., !@#$%^&*).",
        "Avoid using personal information or common words.",
      ],
    },
    th: {
      title: "สร้างบัญชีของคุณ",
      usernamePlaceholder: "กรอกชื่อผู้ใช้ของคุณ",
      passwordPlaceholder: "กรอกรหัสผ่านของคุณ",
      feedbackWeak: "รหัสผ่านอ่อนเกินไป",
      feedbackModerate: "รหัสผ่านปานกลาง",
      feedbackStrong: "รหัสผ่านแข็งแรง",
      resultEmpty: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน!",
      resultWeak: "รหัสผ่านอ่อนเกินไป กรุณาลองใหม่.",
      resultSuccess: "สำเร็จ!",
      tipsTitle: "เคล็ดลับสำหรับการสร้างรหัสผ่านที่ปลอดภัย:",
      tipsList: [
        "ใช้ความยาวอย่างน้อย 12 ตัวอักษร.",
        "ผสมตัวอักษรใหญ่และเล็ก.",
        "เพิ่มตัวเลข (0-9).",
        "ใส่อักขระพิเศษ (เช่น !@#$%^&*).",
        "หลีกเลี่ยงข้อมูลส่วนตัวหรือคำที่เดาได้ง่าย.",
      ],
    },
  };
  
  let currentLanguage = "en";
  
  function switchLanguage() {
    const lang = document.getElementById("language").value;
    currentLanguage = lang;
  
    document.getElementById("title").textContent = texts[lang].title;
    document.getElementById("username").placeholder = texts[lang].usernamePlaceholder;
    document.getElementById("password").placeholder = texts[lang].passwordPlaceholder;
    document.getElementById("tips-title").textContent = texts[lang].tipsTitle;
  
    const tipsList = document.getElementById("tips-list");
    tipsList.innerHTML = "";
    texts[lang].tipsList.forEach((tip) => {
      const li = document.createElement("li");
      li.textContent = tip;
      tipsList.appendChild(li);
    });
  }
  
  const password = document.getElementById("password");
  const feedback = document.getElementById("feedback");
  const strengthBar = document.getElementById("strength");
  const submitBtn = document.getElementById("submit-btn");
  const result = document.getElementById("result");
  const tipsContainer = document.getElementById("password-tips");
  
  let strength = 0;
  
  password.addEventListener("input", () => {
    const value = password.value;
    strength = 0;
  
    if (value.length >= 12) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[a-z]/.test(value)) strength++;
    if (/\d/.test(value)) strength++;
    if (/[\W_]/.test(value)) strength++;
  
    // เปลี่ยนสีหลอดตามระดับความแข็งแกร่ง
    if (strength <= 2) {
      feedback.textContent = texts[currentLanguage].feedbackWeak;
      feedback.style.color = "red";
      strengthBar.style.width = "20%";
      strengthBar.style.backgroundColor = "red"; // สีแดง
    } else if (strength === 3) {
      feedback.textContent = texts[currentLanguage].feedbackModerate;
      feedback.style.color = "orange";
      strengthBar.style.width = "60%";
      strengthBar.style.backgroundColor = "yellow"; // สีเหลือง
    } else if (strength >= 4) {
      feedback.textContent = texts[currentLanguage].feedbackStrong;
      feedback.style.color = "green";
      strengthBar.style.width = "100%";
      strengthBar.style.backgroundColor = "green"; // สีเขียว
    }
  });
  
  
  submitBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const passwordValue = password.value;
  
    if (!username || !passwordValue) {
      result.textContent = texts[currentLanguage].resultEmpty;
      result.style.color = "red";
      tipsContainer.style.display = "none";
    } else if (strength >= 4) {
      result.textContent = texts[currentLanguage].resultSuccess;
      result.style.color = "green";
      tipsContainer.style.display = "none";
    } else {
      result.textContent = texts[currentLanguage].resultWeak;
      result.style.color = "red";
      tipsContainer.style.display = "block";
    }
  });
  
  // Set initial language
  switchLanguage();
  