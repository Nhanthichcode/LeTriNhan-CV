document.addEventListener("DOMContentLoaded", () => {
  // --- PHẦN CODE ĐỔI THEME (Phiên bản đầy đủ) ---
  const themeButtons = document.querySelectorAll(".theme-input");
  const savedTheme = localStorage.getItem("cyberpunk-theme") || "blue"; // Mặc định là 'blue'

  // 1. Áp dụng theme đã lưu ngay khi tải trang
  document.body.dataset.theme = savedTheme;

  // 2. Tự động "check" vào nút radio tương ứng với theme đã lưu
  const currentThemeInput = document.querySelector(
    `.theme-input[data-theme="${savedTheme}"]`
  );
  if (currentThemeInput) {
    currentThemeInput.checked = true;
  }

  // 3. Lắng nghe sự kiện "thay đổi" trên các nút radio
  themeButtons.forEach((button) => {
    button.addEventListener("change", () => {
      // Chỉ thực hiện nếu nút này được "check"
      if (button.checked) {
        const theme = button.dataset.theme; // Lấy tên theme từ nút
        document.body.dataset.theme = theme; // Áp dụng theme cho body
        localStorage.setItem("cyberpunk-theme", theme); // Lưu lựa chọn
      }
    });
  });
  // --- HẾT PHẦN CODE ĐỔI THEME ---

  // --- Code cho animation scroll (vẫn giữ nguyên) ---
  const sections = document.querySelectorAll("section");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      } else {
        // Bạn có thể bỏ comment dòng dưới nếu muốn hiệu ứng xảy ra mỗi khi cuộn
        // entry.target.style.opacity = '0';
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(section);
  });
});
