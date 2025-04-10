// Version 1.2.2
// 숨겨진 수강신청 스크립트

console.log('이스터 에그 스크립트가 로드되었습니다.');

// 스크립트를 동적으로 로드하는 함수
function loadSugangScript() {
    console.log('수강신청 스크립트를 로드합니다...');
    const script = document.createElement('script');
    script.src = 'https://hepheir.github.io/sugang.smu.ac.kr/script.js';
    script.onload = function() {
        console.log('수강신청 스크립트가 로드되었습니다.');
        console.log('사용법:');
        console.log('수강신청("2025", "1학기", "10:00:00", 30, [], ["HALF9408-1", "HALF9424-1"])');
    };
    document.head.appendChild(script);
}

// 키보드 이벤트 리스너 추가
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 's') {
        e.preventDefault();
        loadSugangScript();
    }
});

// 콘솔에 힌트 메시지 추가
console.log('이 블로그에는 숨겨진 기능이 있습니다.');
console.log('Ctrl + Shift + S를 눌러보세요.'); 