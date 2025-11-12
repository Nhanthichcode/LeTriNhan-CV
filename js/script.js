document.addEventListener("DOMContentLoaded", () => {
  // --- PHẦN CODE ĐỔI THEME (ĐÃ CẬP NHẬT) ---
  const themeButtons = document.querySelectorAll(".theme-btn");
  // Đổi tên key trong localStorage cho rõ ràng
  const savedTheme = localStorage.getItem("tech-cv-theme") || "blue";

  // 1. Áp dụng theme đã lưu ngay khi tải trang
  document.body.dataset.theme = savedTheme;

  // 2. Lắng nghe sự kiện "click" trên các nút theme mới
  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const theme = button.dataset.theme; // Lấy tên theme từ nút
      document.body.dataset.theme = theme; // Áp dụng theme cho body
      localStorage.setItem("tech-cv-theme", theme); // Lưu lựa chọn
    });
  });
  // --- HẾT PHẦN CODE ĐỔI THEME ---

  // --- CODE MỚI: CHỨC NĂNG THU/GỌN (COLLAPSE) ---
  const sectionHeaders = document.querySelectorAll(".section-header");

  sectionHeaders.forEach((header) => {
    const button = header.querySelector(".toggle-btn");
    const contentId = button.getAttribute("aria-controls");
    const content = document.getElementById(contentId);

    if (content) {
      // Dùng chung 1 hàm xử lý cho cả click vào Header và Button
      const toggleContent = () => {
        const isExpanded = button.getAttribute("aria-expanded") === "true";

        button.setAttribute("aria-expanded", !isExpanded);
        content.classList.toggle("collapsed");

        if (isExpanded) {
          button.setAttribute("title", "Mở rộng");
        } else {
          button.setAttribute("title", "Thu gọn");
        }
      };

      // Thêm sự kiện click
      button.addEventListener("click", toggleContent);
      header.addEventListener("click", (e) => {
        // Chỉ kích hoạt nếu click vào H2 (không phải nút)
        if (e.target.tagName === "H2") {
          toggleContent();
        }
      });

      /* ===== THAY ĐỔI: Đã xóa code tự động đóng 2 mục cuối. ===== */
      /* ===== Tất cả các mục giờ sẽ mở theo mặc định của HTML. ===== */
    }
  });
  // --- HẾT CODE MỚI THU/GỌN ---

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
