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

// 입력된 문자열을 저장할 버퍼
let inputBuffer = '';
const secretCode = 'sugang';

// 키보드 이벤트 리스너 추가
document.addEventListener('keypress', function(e) {
    inputBuffer += e.key.toLowerCase();
    
    // 버퍼가 너무 길어지면 마지막 6글자만 유지
    if (inputBuffer.length > 6) {
        inputBuffer = inputBuffer.slice(-6);
    }
    
    // secretCode와 일치하면 스크립트 로드
    if (inputBuffer === secretCode) {
        loadSugangScript();
        inputBuffer = ''; // 버퍼 초기화
    }
});

// 콘솔에 힌트 메시지 추가
console.log('이 블로그에는 숨겨진 기능이 있습니다.');
console.log('특정 단어를 입력해보세요. (힌트: 6글자)'); 