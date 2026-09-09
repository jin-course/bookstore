// ==========================================
// 1. 객체 배열 데이터 구조 (category 속성 추가)
// ==========================================
let allNotes = [
    { title: "Ba", content: "banana", status: "notes", category: "쇼핑" },
    { title: "Aufgabe", content: "rasen mähen", status: "notes", category: "일상" },
    { title: "휴지통 샘플", content: "버려진 노트", status: "trash", category: "공부" }
];

// ==========================================
// 2. 초기화 및 통합 렌더링 함수
// ==========================================
function init() {
    loadFromLocalStorage();
    render();
}

function render() {
    renderFilteredList(allNotes);
}

function renderFilteredList(notesList) {
    let contentRef = document.getElementById('content');
    let archivRef = document.getElementById('archiv_content');
    let trashRef = document.getElementById('trash_content');

    contentRef.innerHTML = "";
    archivRef.innerHTML = "";
    trashRef.innerHTML = "";

    for (let i = 0; i < notesList.length; i++) {
        let note = notesList[i];
        let originalIndex = allNotes.indexOf(note);

        if (note.status === 'notes') {
            contentRef.innerHTML += getNoteTemplate(note, originalIndex);
        } else if (note.status === 'archiv') {
            archivRef.innerHTML += getArchivNoteTemplate(note, originalIndex);
        } else if (note.status === 'trash') {
            trashRef.innerHTML += getTrashNoteTemplate(note, originalIndex);
        }
    }
}

// ==========================================
// 3. 검색 및 카테고리 필터링 기능 (다중 필터)
// ==========================================
function filterNotes() {
    let searchInput = document.getElementById('search_input').value.toLowerCase();
    let selectedCategory = document.getElementById('category_filter').value;

    let filtered = allNotes.filter(note => {
        // 1. 검색어 일치 여부 확인
        let titleMatch = note.title.toLowerCase().includes(searchInput);
        let contentMatch = note.content.toLowerCase().includes(searchInput);
        let matchesSearch = titleMatch || contentMatch;

        // 2. 카테고리 일치 여부 확인 ('all'이거나 선택된 카테고리와 같을 때)
        let matchesCategory = (selectedCategory === 'all') || (note.category === selectedCategory);

        // 검색어와 카테고리를 모두 만족해야 화면에 표시
        return matchesSearch && matchesCategory;
    });

    renderFilteredList(filtered);
}

// ==========================================
// 4. 노트 추가 기능
// ==========================================
function addNote() {
    let titleInput = document.getElementById('note_input_title');
    let contentInput = document.getElementById('note_input');
    let categoryInput = document.getElementById('note_input_category');

    if (titleInput.value === "" || contentInput.value === "") return;

    // 객체에 category 속성을 추가하여 저장합니다.
    allNotes.push({
        title: titleInput.value,
        content: contentInput.value,
        status: 'notes',
        category: categoryInput.value
    });

    titleInput.value = "";
    contentInput.value = "";

    saveToLocalStorage();
    render();
}

// ==========================================
// 5. 상태 변경 및 영구 삭제 기능
// ==========================================
function changeStatus(index, newStatus) {
    allNotes[index].status = newStatus;
    saveToLocalStorage();
    render();
}

function deleteNotePermanently(index) {
    allNotes.splice(index, 1);
    saveToLocalStorage();
    render();
}

// ==========================================
// 6. 로컬 스토리지 연동 기능
// ==========================================
function saveToLocalStorage() {
    localStorage.setItem('allNotesData', JSON.stringify(allNotes));
}

function loadFromLocalStorage() {
    let savedData = localStorage.getItem('allNotesData');
    if (savedData) {
        allNotes = JSON.parse(savedData);
    }
}