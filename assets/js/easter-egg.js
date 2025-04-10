// Version 1.2.2
// 숨겨진 수강신청 스크립트

(function() {
    // 스크립트가 이미 로드되었는지 확인
    if (window.smuSugangScriptLoaded) return;
    window.smuSugangScriptLoaded = true;

    // 코드를 보여주는 함수
    function showCode() {
        const code = `// Version 1.2.2

function 수강신청(연도, 학기, 시작_시간, 시도_횟수, 수강취소_학수번호_목록, 수강신청_학수번호_목록) {
    const INTERVAL_DELAY_MS = 200;
    const DEFAULT_HEADERS = {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };
    const SESSION_RECORD = 'CMN111.0000';
    const SEMESTER_RECORDS = {
        '1학기': 'CMN002.0010',
        '하계 계절수업': 'CMN002.0011',
        '하계 특별학기(A)': 'CMN002.0012',
        '2학기': 'CMN002.0020',
        '동계 계절수업': 'CMN002.0021',
    };
    const API_UcrTlsn_cncl = 'https://sugang.smu.ac.kr/UcrTlsn/cncl.do';
    const API_UcrTlsn_tlsnAplyDirect = 'https://sugang.smu.ac.kr/UcrTlsn/tlsnAplyDirect.do';

    // ... (나머지 코드는 생략)
}`;

        console.log('%c수강신청 스크립트 코드:', 'color: #666; font-style: italic;');
        console.log('%c' + code, 'color: #666; font-family: monospace; white-space: pre;');
        console.log('%c사용법:', 'color: #666; font-style: italic;');
        console.log('%c수강신청("2025", "1학기", "10:00:00", 30, [], ["HALF9408-1", "HALF9424-1"])', 'color: #666; font-style: italic;');
    }

    // 스크립트를 동적으로 로드하는 함수
    function loadScript() {
        const script = document.createElement('script');
        script.src = 'https://hepheir.github.io/sugang.smu.ac.kr/script.js';
        script.onload = function() {
            console.log('%c수강신청 스크립트가 로드되었습니다.', 'color: #666; font-style: italic;');
            showCode();
        };
        document.head.appendChild(script);
    }

    // 특정 키 조합을 감지하는 함수
    function checkKeyCombination(e) {
        // Ctrl + Shift + S를 감지
        if (e.ctrlKey && e.shiftKey && e.key === 's') {
            e.preventDefault();
            loadScript();
        }
        // Ctrl + Alt + C를 감지 (코드 보기)
        if (e.ctrlKey && e.altKey && e.key === 'c') {
            e.preventDefault();
            showCode();
        }
    }

    // 키보드 이벤트 리스너 추가
    document.addEventListener('keydown', checkKeyCombination);

    // 콘솔에 힌트 메시지 추가 (매우 은밀하게)
    console.log('%c이 블로그에는 숨겨진 기능이 있습니다.', 'color: #666; font-style: italic;');
    console.log('%c키보드 단축키를 찾아보세요.', 'color: #666; font-style: italic;');
})(); 