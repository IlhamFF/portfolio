document.addEventListener('DOMContentLoaded', () => {

    //==================================================
    // 1. KELAS UTAMA APLIKASI
    //==================================================
    class SnapMasterApp {
        constructor() {
            this.initLenis();
            this.initNavbar();
            this.initAnimations();
            this.initModals();
            this.initCoverflowCarousel(); 
            this.initVideoAutoplay(); 
            setTimeout(() => {
                this.resolveScrollConflicts();
            }, 500);
            
            this.setCurrentYear();
            
            console.log('SnapMaster App Initialized');
        }

        // Inisialisasi Smooth Scroll (Lenis)
        initLenis() {
            this.lenis = new Lenis({
                // Tambahkan opsi untuk mencegah konflik dengan Swiper
                prevent: (node) => {
                    return node.classList.contains('swiper-container') || 
                           node.classList.contains('coverflow-carousel');
                }
            });
            
            gsap.ticker.add((time) => {
                this.lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        }

        // Inisialisasi Navbar dan Scroll Progress
        initNavbar() {
            this.navbar = document.getElementById('navbar');
            this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            this.mobileNav = document.getElementById('mobile-nav');
            this.scrollProgress = document.getElementById('scroll-progress');

            // Event Listener untuk tombol menu mobile
            this.mobileMenuToggle?.addEventListener('click', () => this.toggleMobileMenu());
            
            // PERBAIKAN: Menggunakan GSAP ScrollTrigger untuk mengontrol navbar
            ScrollTrigger.create({
                start: "top top-=-100",
                onUpdate: self => {
                    if (self.direction === 1) { 
                        gsap.to(this.navbar, { y: '-100%', duration: 0.4, ease: 'power2.out' });
                    } else {
                        gsap.to(this.navbar, { y: '0%', duration: 0.4, ease: 'power2.out' });
                    }
                }
            });

            // Listener terpisah untuk mengubah background saat scroll
            this.lenis.on('scroll', (e) => {
                if (this.scrollProgress) {
                    const progress = e.scroll / e.limit;
                    this.scrollProgress.style.width = `${progress * 100}%`;
                }
                
                if (e.scroll > 50) {
                    this.navbar.classList.add('bg-[rgba(10,14,20,0.9)]');
                } else {
                    this.navbar.classList.remove('bg-[rgba(10,14,20,0.9)]');
                }
            });
        }
        
        // Logika untuk buka/tutup menu mobile
        toggleMobileMenu() {
            const lines = this.mobileMenuToggle.querySelectorAll('.hamburger-line');
            const isMenuOpen = this.mobileNav.style.maxHeight && this.mobileNav.style.maxHeight !== "0px";

            if (isMenuOpen) {
                this.mobileNav.style.maxHeight = "0px";
                document.body.style.overflow = '';
                lines[0].style.transform = 'rotate(0)';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'rotate(0)';
            } else {
                this.mobileNav.style.maxHeight = this.mobileNav.scrollHeight + "px";
                document.body.style.overflow = 'hidden';
                lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            }
        }
        
        // Inisialisasi semua animasi GSAP
        initAnimations() {
            // Animasi Hero Section saat halaman dimuat
            gsap.from(".hero-title-line", { 
                duration: 1, 
                y: 100, 
                opacity: 0, 
                stagger: 0.2, 
                ease: "power3.out", 
                delay: 0.5 
            });
            gsap.from(".hero-title-accent", { 
                duration: 1, 
                y: 100, 
                opacity: 0, 
                ease: "power3.out", 
                delay: 1 
            });
            gsap.from("p.text-lg", { 
                duration: 1, 
                y: 50, 
                opacity: 0, 
                ease: "power3.out", 
                delay: 1.2 
            });
            gsap.from(".mt-10 button", { 
                duration: 1, 
                y: 50, 
                opacity: 0, 
                stagger: 0.2, 
                ease: "power3.out", 
                delay: 1.4 
            });
            gsap.from(".mt-20 > div", { 
                duration: 1, 
                y: 50, 
                opacity: 0, 
                stagger: 0.2, 
                ease: "power3.out", 
                delay: 1.6 
            });

            // Efek parallax pada Hero Section
            gsap.to("#hero-content-wrapper", {
                scrollTrigger: {
                    trigger: "#home",
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                    // Tambahkan refresh priority untuk menghindari konflik
                    refreshPriority: -1
                },
                y: 300,
                opacity: 0.2
            });

            // Animasi untuk elemen yang muncul saat di-scroll
            document.querySelectorAll('[data-anim="fade-up"]').forEach(el => {
                // Skip jika element atau parent memiliki data-no-parallax
                if (el.closest('[data-no-parallax]')) return;
                
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none none",
                        refreshPriority: -1
                    },
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            });
        }
        
        // Inisialisasi Coverflow Carousel
        initCoverflowCarousel() {
            // Tunggu DOM selesai load
            setTimeout(() => {
                const swiperWrapper = document.querySelector('.coverflow-carousel .swiper-wrapper');
                if (!swiperWrapper) {
                    console.log('Swiper wrapper not found');
                    return;
                }

                const totalImages = 12; 
                for (let i = 1; i <= totalImages; i++) {
                    const slide = document.createElement('div');
                    slide.classList.add('swiper-slide');
                    slide.style.backgroundImage = `url('images/portfolio/photo- (${i}).jpg')`;
                    
                    const img = new Image();
                    img.src = `images/portfolio/photo-${i}.jpg`;
                    img.onerror = () => {
                        slide.style.backgroundImage = `url('https://placehold.co/640x960/0a0e14/00e676?text=Image+${i}')`;
                        slide.textContent = `Image ${i}`;
                    };

                    swiperWrapper.appendChild(slide);
                }

                // Inisialisasi Swiper setelah slides ditambahkan
                this.swiper = new Swiper('.coverflow-carousel', {
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    loop: true,
                    coverflowEffect: {
                        rotate: 15,
                        stretch: 80,
                        depth: 200,
                        modifier: 1.5,
                        slideShadows: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    // Tambahkan event untuk refresh ScrollTrigger setelah Swiper siap
                    on: {
                        init: function () {
                            console.log('Swiper initialized');
                            // Refresh ScrollTrigger setelah Swiper selesai render
                            setTimeout(() => {
                                ScrollTrigger.refresh();
                            }, 100);
                        }
                    }
                });
            }, 100);
        }
        
        resolveScrollConflicts() {
            // Disable ScrollTrigger saat user berinteraksi dengan Swiper
            const carouselElement = document.querySelector('.coverflow-carousel');
            if (carouselElement && this.swiper) {
                carouselElement.addEventListener('mouseenter', () => {
                    ScrollTrigger.getAll().forEach(trigger => trigger.disable());
                });
                
                carouselElement.addEventListener('mouseleave', () => {
                    ScrollTrigger.getAll().forEach(trigger => trigger.enable());
                });
                
                // Untuk touch devices
                carouselElement.addEventListener('touchstart', () => {
                    ScrollTrigger.getAll().forEach(trigger => trigger.disable());
                });
                
                carouselElement.addEventListener('touchend', () => {
                    setTimeout(() => {
                        ScrollTrigger.getAll().forEach(trigger => trigger.enable());
                    }, 300);
                });
            }
        }

        l
        // Inisialisasi Video Autoplay
        initVideoAutoplay() {
            console.log('Initializing video autoplay...');
            
            const videos = document.querySelectorAll('.video-autoplay');
            const videoControls = document.querySelectorAll('.video-control');
            
            // Setup Intersection Observer untuk autoplay
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const video = entry.target;
                    const videoItem = video.closest('.group');
                    const spinner = videoItem?.querySelector('.loading-spinner');
                    
                    if (entry.isIntersecting) {
                        // Show loading spinner
                        spinner?.classList.remove('opacity-0');
                        spinner?.classList.add('opacity-100');
                        
                        // Play video when in viewport
                        video.play().then(() => {
                            // Hide loading spinner
                            spinner?.classList.add('opacity-0');
                            spinner?.classList.remove('opacity-100');
                        }).catch(err => {
                            console.log('Autoplay prevented:', err);
                            spinner?.classList.add('opacity-0');
                            spinner?.classList.remove('opacity-100');
                        });
                    } else {
                        // Pause when out of viewport
                        video.pause();
                    }
                });
            }, {
                threshold: 0.5 // Video must be 50% visible
            });
            
            // Observe all videos
            videos.forEach(video => {
                videoObserver.observe(video);
                
                // Add loading state handler
                const videoItem = video.closest('.group');
                const spinner = videoItem?.querySelector('.loading-spinner');
                
                video.addEventListener('loadstart', () => {
                    spinner?.classList.remove('opacity-0');
                    spinner?.classList.add('opacity-100');
                });
                
                video.addEventListener('canplay', () => {
                    spinner?.classList.add('opacity-0');
                    spinner?.classList.remove('opacity-100');
                });
            });
            
            // Setup play/pause controls
            videoControls.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const videoItem = button.closest('.group');
                    const video = videoItem.querySelector('video');
                    const playIcon = button.querySelector('.play-icon');
                    const pauseIcon = button.querySelector('.pause-icon');
                    
                    if (video.paused) {
                        video.play();
                        playIcon.classList.add('hidden');
                        pauseIcon.classList.remove('hidden');
                    } else {
                        video.pause();
                        playIcon.classList.remove('hidden');
                        pauseIcon.classList.add('hidden');
                    }
                });
            });
            
            // Update button states when video plays/pauses
            videos.forEach(video => {
                const videoItem = video.closest('.group');
                const button = videoItem?.querySelector('.video-control');
                const playIcon = button?.querySelector('.play-icon');
                const pauseIcon = button?.querySelector('.pause-icon');
                
                video.addEventListener('play', () => {
                    playIcon?.classList.add('hidden');
                    pauseIcon?.classList.remove('hidden');
                });
                
                video.addEventListener('pause', () => {
                    playIcon?.classList.remove('hidden');
                    pauseIcon?.classList.add('hidden');
                });
            });
            
            // Optional: Add video preview on hover
            videos.forEach(video => {
                const videoItem = video.closest('.group');
                
                videoItem?.addEventListener('mouseenter', () => {
                    if (video.paused) {
                        video.currentTime = 0;
                        video.play();
                    }
                });
                
                videoItem?.addEventListener('mouseleave', () => {
                    // Keep playing if user manually started it
                    const pauseIcon = videoItem.querySelector('.pause-icon');
                    if (pauseIcon?.classList.contains('hidden')) {
                        video.pause();
                        video.currentTime = 0;
                    }
                });
            });
        }
        // Inisialisasi fungsi untuk modal
        initModals() {
            this.consultationModal = document.getElementById('consultation-modal');
            this.modalContent = this.consultationModal?.querySelector('.modal-content-area');

            // Menutup modal jika klik di luar area konten
            this.consultationModal?.addEventListener('click', (e) => {
                if (e.target === this.consultationModal) {
                    this.closeConsultationModal();
                }
            });
        }
        
        openConsultationModal() {
            if (!this.consultationModal) return;
            
            this.consultationModal.classList.remove('opacity-0', 'pointer-events-none');
            gsap.to(this.modalContent, { 
                duration: 0.4, 
                scale: 1, 
                opacity: 1, 
                ease: "power3.out" 
            });
            document.body.style.overflow = 'hidden';
        }
        
        closeConsultationModal() {
            if (!this.modalContent) return;
            
            gsap.to(this.modalContent, { 
                duration: 0.4, 
                scale: 0.95, 
                opacity: 0, 
                ease: "power3.in", 
                onComplete: () => {
                    this.consultationModal.classList.add('opacity-0', 'pointer-events-none');
                    document.body.style.overflow = '';
                }
            });
        }
        
        // Fungsi utilitas untuk scroll ke section
        scrollToSection(sectionId) {
            this.lenis.scrollTo(sectionId, { offset: -80 });
        }
        
        // Fungsi utilitas untuk set tahun di footer
        setCurrentYear() {
            const yearElement = document.getElementById('current-year');
            if (yearElement) {
                yearElement.textContent = new Date().getFullYear();
            }
        }
    }

    //==================================================
    // 2. INISIALISASI APLIKASI & FUNGSI GLOBAL
    //==================================================
    const app = new SnapMasterApp();

    window.scrollToSection = (sectionId) => app.scrollToSection(sectionId);
    window.openConsultationModal = () => app.openConsultationModal();
    window.closeConsultationModal = () => app.closeConsultationModal();
    window.closeMobileMenu = () => {
        if(app.mobileNav?.style.maxHeight && app.mobileNav.style.maxHeight !== "0px") {
            app.toggleMobileMenu();
        }
    };
    
    // Refresh ScrollTrigger saat resize window
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
});