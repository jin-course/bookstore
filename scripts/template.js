/**
 * [템플릿 파일]
 * HTML 구조를 생성하는 함수들을 모아두는 곳입니다.
 */

/**
 * 책 1개의 데이터를 받아 HTML 카드 형태로 만들어주는 함수
 * @param {Object} singleBook - db.js에서 가져온 책 1개의 데이터 객체
 * @param {number} i - 해당 책의 배열 인덱스 번호 (몇 번째 책인지 알려줌)
 * @returns {string} - 완성된 HTML 문자열
 */
function getBookTemplate(singleBook, i) {
    // 삼항 연산자: liked 상태가 true면 빨간 하트, false면 흰 하트
    let likeIcon = singleBook.liked ? '❤️' : '🤍';

    return `
        <div class="book-card">
            <h2>${singleBook.name}</h2>
            <p>저자: ${singleBook.author}</p>
            
            <!-- 좋아요 영역: 버튼 클릭 시 해당 책의 인덱스(i)를 toggleLike 함수로 전달 -->
            <p>
                <button onclick="toggleLike(${i})">${likeIcon}</button>
                <span>${singleBook.likes}</span>
            </p>
        </div>
    `;
}

/**
 * 전체 책 목록을 화면에 출력(렌더링)하는 함수
 */
function renderBooks() {
    // 1. HTML에서 책들을 넣을 컨테이너 요소 가져오기
    let contentRef = document.getElementById('content');
    
    // 2. 누적해서 합쳐줄 빈 문자열 변수 준비
    let booksHTML = '';

    // 3. books 배열 전체를 돌면서 각 책의 HTML을 조립
    for (let i = 0; i < books.length; i++) {
        // getBookTemplate 함수를 호출하면서 (책 데이터, 인덱스 번호) 전달
        booksHTML += getBookTemplate(books[i], i);
    }

    // 4. 조립 완료된 전체 HTML을 화면에 최종 주입
    contentRef.innerHTML = booksHTML;
}