/* ==========================================================================
   희양양 연동점 - 인터랙션 및 프론트엔드 제어 스크립트
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. 헤더 스크롤 효과
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. 모바일 네비게이션 햄버거 메뉴 토글
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isOpened = navMenu.classList.contains('active');
    hamburger.innerHTML = isOpened 
      ? '<i class="fa-solid fa-xmark"></i>' 
      : '<i class="fa-solid fa-bars"></i>';
  });

  // 링크 클릭 시 모바일 메뉴 닫기
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  // 3. 메뉴 탭 전환 기능
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 액티브 클래스 초기화
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // 클릭한 탭 활성화
      btn.classList.add('active');
      const target = btn.getAttribute('data-target');
      document.getElementById(target).classList.add('active');
    });
  });

  // 4. 리뷰 키워드 차트 애니메이션 (Intersection Observer 활용)
  const statsSection = document.querySelector('#reviews');
  const statBars = document.querySelectorAll('.stat-bar-inner');

  // 각 바의 실제 목표 너비 백업
  const targetWidths = [];
  statBars.forEach(bar => {
    targetWidths.push(bar.style.width);
    bar.style.width = '0'; // 초기화
  });

  const observerOptions = {
    root: null,
    threshold: 0.2 // 20% 보일 때 실행
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statBars.forEach((bar, index) => {
          bar.style.width = targetWidths[index];
        });
        observer.unobserve(entry.target); // 한 번 실행 후 관찰 해제
      }
    });
  }, observerOptions);

  if (statsSection) {
    observer.observe(statsSection);
  }

  // 5. 온라인 예약 폼 처리 및 예약 성공 모달 제어
  const bookingForm = document.getElementById('bookingForm');
  const successModal = document.getElementById('successModal');
  const modalClose = document.getElementById('modalClose');
  const modalPhoneSpan = document.getElementById('modalPhone');

  // 당일 이전 날짜는 예약 불가능하도록 최소 날짜 설정
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today; // 기본값 오늘
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const guests = document.getElementById('guests').value;
      const seating = document.getElementById('seating').value;
      const requests = document.getElementById('requests').value.trim();

      if (!name || !phone || !date || !time || !guests) {
        alert('모든 필수 정보를 입력해 주세요.');
        return;
      }

      // 성공 모달에 연락처 정보 주입
      modalPhoneSpan.textContent = phone;

      // 모달 열기
      successModal.classList.add('active');

      // 예약 폼 리셋
      bookingForm.reset();
      if (dateInput) {
        dateInput.value = today;
      }
    });
  }

  // 모달 닫기
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      successModal.classList.remove('active');
    });
  }

  // 모달 외부 클릭 시 닫기
  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }



  // 7. 모바일 탭 가로 스크롤 화살표 힌트 제어
  const menuTabs = document.querySelector('.menu-tabs');
  const menuScrollCue = document.getElementById('menuScrollCue');

  if (menuTabs && menuScrollCue) {
    menuScrollCue.addEventListener('click', () => {
      menuTabs.scrollBy({
        left: 180,
        behavior: 'smooth'
      });
    });

    menuTabs.addEventListener('scroll', () => {
      if (menuTabs.scrollLeft > 15) {
        menuScrollCue.style.opacity = '0';
        menuScrollCue.style.pointerEvents = 'none';
      } else {
        menuScrollCue.style.opacity = '1';
        menuScrollCue.style.pointerEvents = 'auto';
      }
    });
  }
});
