// Version 1.2.2
// 숨겨진 수강신청 스크립트

console.log('이스터 에그 스크립트가 로드되었습니다.');

// 수강신청 함수 정의
window.수강신청 = function(연도, 학기, 시작_시간, 시도_횟수, 수강취소_학수번호_목록, 수강신청_학수번호_목록) {
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

    function generateAuthParams(학수번호_코드) {
        const [학수번호, 분반] = 학수번호_코드.split('-');
        const strSchYear = `${연도}`;
        const strsmtRcd = SEMESTER_RECORDS[학기];
        const strSesRcd = SESSION_RECORD;
        const strSbjNo = 학수번호;
        const strDivcls = 분반;
        return [
            '_AUTH_MENU_KEY=',
            `%40d1%23strSchYear=${strSchYear}`,
            `%40d1%23strSmtRcd=${strsmtRcd}`,
            `%40d1%23strSesRcd=${strSesRcd}`,
            '%40d1%23strEstDeptCd=00246',
            '%40d1%23strEstShyr=3',
            `%40d1%23strSbjNo=${strSbjNo}`,
            `%40d1%23strDivcls=${strDivcls}`,
            '%40d1%23strReTlsnSchYear=',
            '%40d1%23strReTlsnSmtRcd=',
            '%40d1%23strReTlsnSesRcd=',
            '%40d1%23strReTlsnSbjNo=',
            '%40d%23=%40d1%23',
            '%40d1%23=dmParamAply',
            '%40d1%23tp=dm',
            '',
        ].join('&');
    }

    async function utilFetchJson(url, method, headers, body) {
        const response = await fetch(url, { method, headers, body });
        const json = await response.json();
        console.log(response.status, JSON.stringify(json));
        return json;
    }

    async function tryOnce() {
        for (const 학수번호_코드 of 수강취소_학수번호_목록) {
            await utilFetchJson(
                API_UcrTlsn_cncl,
                'POST',
                DEFAULT_HEADERS,
                generateAuthParams(학수번호_코드)
            );
        }
        for (const 학수번호_코드 of 수강신청_학수번호_목록) {
            await utilFetchJson(
                API_UcrTlsn_tlsnAplyDirect,
                'POST',
                DEFAULT_HEADERS,
                generateAuthParams(학수번호_코드)
            );
        }
    }

    async function tryMultiple() {
        console.log('수강신청을 시작합니다...');
        window.tries = 시도_횟수;
        window.tried = 0;
        
        const interval = setInterval(async () => {
            window.tries--;
            window.tried++;
            
            console.log(`시도 ${window.tried}회차 시작!`);
            await tryOnce();
            console.log(`시도 ${window.tried}회차 종료!`);
            
            if (window.tries <= 0) {
                clearInterval(interval);
                console.log('모든 시도가 종료되었습니다.');
            }
        }, INTERVAL_DELAY_MS);
    }

    const startTime = new Date();
    const [hour, minute, second] = 시작_시간.split(':').map(Number);
    startTime.setHours(hour, minute, second, 0);
    
    const timeToWait = startTime - new Date();
    if (timeToWait > 0) {
        console.log(`${시작_시간}에 수강신청을 시작하도록 예약되었습니다.`);
        setTimeout(tryMultiple, timeToWait);
    } else {
        tryMultiple();
    }
};

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
        console.log('수강신청 스크립트가 활성화되었습니다.');
        console.log('사용법:');
        console.log('수강신청("2025", "1학기", "10:00:00", 30, [], ["HALF9408-1", "HALF9424-1"])');
        inputBuffer = ''; // 버퍼 초기화
    }
});

// 콘솔에 힌트 메시지 추가
console.log('이 블로그에는 숨겨진 기능이 있습니다.');
console.log('특정 단어를 입력해보세요. (힌트: 6글자)'); 