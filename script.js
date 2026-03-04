document.addEventListener('DOMContentLoaded', () => {
    // 獲取所有頁籤按鈕與內容容器
    initTabs('showcase-tabs', '.pill-tab-btn', '.tab-pane');
    initTabs('concept-tabs', '.pill-tab-btn', '.concept-pane');

    // 通用的頁籤切換邏輯
    function initTabs(containerId, buttonSelector, paneSelector) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container with ID "${containerId}" not found.`);
            return;
        }

        const buttons = container.querySelectorAll(buttonSelector);
        const parentSection = container.closest('section') || container.parentElement;
        const panes = parentSection.querySelectorAll(paneSelector);

        if (buttons.length === 0) {
            console.warn(`No buttons found with selector "${buttonSelector}" in container "${containerId}".`);
            return;
        }

        buttons.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`Tab clicked: ${btn.textContent} (Tab ID: ${btn.dataset.tab})`);

                // 1. 移除該容器內所有按鈕的 active
                buttons.forEach(b => b.classList.remove('active'));

                // 2. 隱藏該區塊內所有的 panes
                panes.forEach(p => {
                    p.classList.remove('active');
                    p.style.display = 'none'; // 強制隱藏
                });

                // 3. 為當前按鈕添加 active
                btn.classList.add('active');

                // 4. 顯示對應的內容
                let targetPane;
                if (btn.dataset.tab) {
                    targetPane = document.getElementById(btn.dataset.tab);
                } else {
                    targetPane = panes[index];
                }

                if (targetPane) {
                    targetPane.classList.add('active');
                    targetPane.style.display = 'block'; // 強制顯示
                } else {
                    console.error(`Target pane not found for button:`, btn);
                }
                // 5. 切換時僅暫停被隱藏區塊內的影片，不影響全局自動播放的影片（如狗狗分鏡）
                panes.forEach(p => {
                    p.querySelectorAll('video').forEach(v => v.pause());
                });
            });
        });
        panes.forEach(p => {
            if (!p.classList.contains('active')) {
                p.style.display = 'none';
            } else {
                p.style.display = 'block';
            }
        });
    }

    // 當滾動時改變 Header 的陰影效果
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // 平滑滾動至錨點
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
