// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('header nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            // Thay đổi biểu tượng menu (tùy chọn)
            if (nav.classList.contains('active')) {
                menuToggle.innerHTML = '✕'; // Biểu tượng đóng
                menuToggle.setAttribute('aria-label', 'Đóng menu');
            } else {
                menuToggle.innerHTML = '☰'; // Biểu tượng mở
                menuToggle.setAttribute('aria-label', 'Mở menu');
            }
        });
    }

    // Smooth scrolling cho các link anchor (menu)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Đóng menu mobile sau khi click (nếu đang mở)
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.innerHTML = '☰';
                    menuToggle.setAttribute('aria-label', 'Mở menu');
                }
            }
        });
    });

    // Xử lý form liên hệ (ví dụ đơn giản)
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Ngăn chặn gửi form mặc định

            // Lấy dữ liệu form (ví dụ)
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Kiểm tra đơn giản (bạn nên có validation kỹ hơn)
            if (!name || !email || !message) {
                formMessage.textContent = 'Vui lòng điền đầy đủ thông tin.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                return;
            }

            // Giả lập gửi form thành công
            // Trong thực tế, bạn sẽ gửi dữ liệu này đến server bằng AJAX/Fetch API
            console.log('Form submitted:', { name, email, message });

            formMessage.textContent = 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';

            contactForm.reset(); // Xóa nội dung form

            // Ẩn thông báo sau vài giây
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }

    // Active link menu khi scroll (tùy chọn nâng cao)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav ul li a');

    function changeLinkState() {
        let index = sections.length;

        while(--index && window.scrollY + 100 < sections[index].offsetTop) {} // +100 là offset
        
        navLinks.forEach((link) => link.classList.remove('active'));
        // Kiểm tra xem navLinks[index] có tồn tại không trước khi thêm class 'active'
        if(navLinks[index]) {
            navLinks[index].classList.add('active');
        }
    }

    // Gọi lần đầu để set active link nếu trang được tải ở một section cụ thể
    if (sections.length > 0 && navLinks.length > 0) {
        changeLinkState(); 
        window.addEventListener('scroll', changeLinkState);
    }

});
