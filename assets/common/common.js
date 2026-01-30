// 全局配置
const GLOBAL_CONFIG = {
    // 在一起的日期：2026年1月28日（月份-1）
    loveStartDate: new Date(2026, 0, 28),
    // 纪念日配置（只保留两个）
    anniversaries: [
        { id: 'anniversary1', name: '在一起', date: new Date(2026, 0, 28) },
        { id: 'anniversary2', name: '宝贝的生日', date: new Date(2005, 10, 5) }
    ],
    // 加密默认密钥
    defaultSecretKey: "20251123"
};

// 页面加载完成后隐藏加载动画，显示页面
window.addEventListener('DOMContentLoaded', () => {
    // 模拟加载延迟（体验更好）
    setTimeout(() => {
        const loadingContainer = document.getElementById('loadingContainer');
        loadingContainer.classList.add('hidden');
        document.body.classList.add('loaded');
    }, 800);

    // 初始化所有页面通用功能
    initCommonFunctions();
});

// 通用功能初始化
function initCommonFunctions() {
    // 计算在一起天数（所有页面可调用）
    calculateLoveDays();
    // 计算纪念日倒计时（纪念日页面调用）
    if (document.getElementById('anniversary1')) {
        calculateAnniversary();
        setInterval(calculateAnniversary, 1000);
    }
    // 初始化滚动动画
    if (window.ScrollReveal) {
        initScrollReveal();
    }
}

// 计算在一起的天数
function calculateLoveDays() {
    const daysCounter = document.getElementById('daysCounter');
    if (!daysCounter) return;

    const now = new Date();
    const diffTime = now - GLOBAL_CONFIG.loveStartDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    // 确保天数不为负数
    const displayDays = diffDays < 0 ? 0 : diffDays;
    daysCounter.querySelector('span').textContent = displayDays;
    // 每秒更新
    setInterval(() => {
        const now = new Date();
        const diffTime = now - GLOBAL_CONFIG.loveStartDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const displayDays = diffDays < 0 ? 0 : diffDays;
        daysCounter.querySelector('span').textContent = displayDays;
    }, 1000);
}

// 计算纪念日倒计时
function calculateAnniversary() {
    const now = new Date();
    GLOBAL_CONFIG.anniversaries.forEach(item => {
        const anniversaryEl = document.getElementById(item.id);
        if (!anniversaryEl) return;

        // 今年的纪念日
        let nextAnniversary = new Date(now.getFullYear(), item.date.getMonth(), item.date.getDate());
        // 如果今年的已过，算明年的
        if (nextAnniversary < now) {
            nextAnniversary = new Date(now.getFullYear() + 1, item.date.getMonth(), item.date.getDate());
        }
        // 计算天数差
        const diffTime = nextAnniversary - now;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        anniversaryEl.textContent = diffDays;
    });
}

// 滚动渐入动画初始化
function initScrollReveal() {
    ScrollReveal().reveal('.reveal-item', {
        delay: 100,
        distance: '20px',
        easing: 'ease-in-out',
        origin: 'bottom',
        interval: 200
    });
}

// 加密/解密函数（悄悄话页面用）
function encrypt(text, key) {
    if (!text || !key) return '';
    const mixed = text + '|' + key;
    return btoa(unescape(encodeURIComponent(mixed)));
}

function decrypt(encoded, key) {
    if (!encoded || !key) return '';
    try {
        const decoded = decodeURIComponent(escape(atob(encoded)));
        const [text, savedKey] = decoded.split('|');
        return savedKey === key ? text : '密钥错误！';
    } catch (e) {
        return '解密失败！';
    }
}

// 照片放大预览通用函数
function initPhotoPreview() {
    const photos = document.querySelectorAll('.photo-preview');
    photos.forEach(photo => {
        photo.addEventListener('click', () => {
            const preview = document.createElement('div');
            preview.className = 'fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4';
            preview.innerHTML = `
                <img src="${photo.src}" alt="预览" class="max-w-full max-h-full object-contain">
                <button class="absolute top-4 right-4 text-white text-2xl">&times;</button>
            `;
            document.body.appendChild(preview);
            // 关闭预览
            preview.querySelector('button').addEventListener('click', () => preview.remove());
            preview.addEventListener('click', (e) => {
                if (e.target === preview) preview.remove();
            });
        });
    });
}



