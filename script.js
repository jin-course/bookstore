/**
 * [메인 로직 파일]
 * 이벤트 처리(클릭 동작 등) 및 초기 실행을 담당하는 곳입니다.
 */

/**
 * 좋아요 버튼을 눌렀을 때 실행되는 함수
 * @param {number} index - 클릭된 책의 배열 인덱스 번호
 */
function toggleLike(index) {
    // 1. 인덱스를 이용해 books 배열에서 해당 책 데이터 가져오기
    let book = books[index];

    // 2. 조건문: 현재 liked 상태에 따라 토글(전환) 처리
    if (book.liked) {
        // 이미 좋아요 상태였으면 -> 좋아요 취소 (-1 및 false 변경)
        book.likes--;
        book.liked = false;
    } else {
        // 좋아요가 안 눌려있었으면 -> 좋아요 추가 (+1 및 true 변경)
        book.likes++;
        book.liked = true;
    }

    // 3. 변경된 데이터(좋아요 수, 하트 모양)를 화면에 반영하기 위해 다시 렌더링
    renderBooks();
}

/**
 * 웹 페이지가 처음 로드될 때 실행되는 초기화 함수
 */
function init() {
    renderBooks(); // 시작하자마자 책 목록 렌더링
}

// 페이지 로드 시 init 함수 실행
init();
