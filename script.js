document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const resultArea = document.getElementById('result-area');
    const resultCountBadge = document.getElementById('result-count');

    // Inputs
    const inputPrefix = document.getElementById('prefix');
    const inputLength = document.getElementById('length');
    const inputCount = document.getElementById('count');
    const checkNumbers = document.getElementById('use-numbers');
    const checkUpper = document.getElementById('use-upper');
    const checkLower = document.getElementById('use-lower');
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Constants
    const CHAR_SETS = {
        numbers: '0123456789',
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lower: 'abcdefghijklmnopqrstuvwxyz'
    };

    // Main Generation Function
    function generateCodes() {
        const prefix = inputPrefix.value.trim();
        const length = parseInt(inputLength.value) || 16;
        const count = parseInt(inputCount.value) || 10;

        // Validation
        if (!checkNumbers.checked && !checkUpper.checked && !checkLower.checked) {
            alert('请至少选择一种字符类型（数字、大写或小写）');
            return;
        }

        if (count > 50000) {
            if (!confirm('生成数量较大，可能会导致浏览器短暂卡顿，是否继续？')) {
                return;
            }
        }

        // Build Character Pool
        let pool = '';
        if (checkNumbers.checked) pool += CHAR_SETS.numbers;
        if (checkUpper.checked) pool += CHAR_SETS.upper;
        if (checkLower.checked) pool += CHAR_SETS.lower;

        // Optimizations
        const poolLength = pool.length;
        // Generation Loop (with de-duplication)
        const codes = new Set();
        let safetyCounter = 0;
        const maxAttempts = count * 2;

        // Buffer for random values to reduce allocation overhead
        const randomBuffer = new Uint32Array(length);

        while (codes.size < count) {
            window.crypto.getRandomValues(randomBuffer);
            let randomPart = '';

            for (let j = 0; j < length; j++) {
                // High-precision method to map 32-bit random int to pool index
                // Provides uniform distribution better than simple modulo
                const index = Math.floor((randomBuffer[j] / (0xffffffff + 1)) * poolLength);
                randomPart += pool[index];
            }

            codes.add(prefix + randomPart);

            safetyCounter++;
            if (safetyCounter > maxAttempts) {
                console.warn('Cannot generate requested number of unique codes with current settings.');
                break;
            }
        }

        // Output Result
        resultArea.value = Array.from(codes).join('\n');

        // Update UI
        updateCountBadge(count);
        enableCopyButton();
    }

    // UI Helpers
    function updateCountBadge(count) {
        resultCountBadge.textContent = `${count}`;
        resultCountBadge.classList.remove('hidden');
    }

    function enableCopyButton() {
        copyBtn.disabled = false;
        // Reset to default state
        copyBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>复制全部</span>
        `;
        copyBtn.classList.remove('success');
    }

    // Copy Functionality
    copyBtn.addEventListener('click', async () => {
        if (!resultArea.value) return;

        try {
            await navigator.clipboard.writeText(resultArea.value);

            // Visual Feedback
            const originalContent = copyBtn.innerHTML;
            copyBtn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span>已复制</span>
            `;
            copyBtn.classList.add('success');

            setTimeout(() => {
                copyBtn.innerHTML = originalContent;
                copyBtn.classList.remove('success');
            }, 2000);

        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert('复制失败，请手动复制');
        }
    });

    // Attach Event Listener
    generateBtn.addEventListener('click', generateCodes);

    // --- Theme Logic ---
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        if (newTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    }

    themeToggleBtn.addEventListener('click', toggleTheme);

    // Listen for system changes if no preference saved
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
        }
    });

    // Initialize
    initTheme();
});
