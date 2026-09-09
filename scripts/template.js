// 1. 일반 노트 템플릿
function getNoteTemplate(note, index) {
    return `
        <div class="note-card">
            <small style="color: #4da6ff; font-weight: bold;">[${note.category || '기타'}]</small>
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <div class="button-box">
                <button onclick="changeStatus(${index}, 'archiv')">Archiv</button>
                <button onclick="changeStatus(${index}, 'trash')">Trash</button>
            </div>
        </div>
    `;
}

// 2. 보관함 노트 템플릿
function getArchivNoteTemplate(note, index) {
    return `
        <div class="note-card">
            <small style="color: #4da6ff; font-weight: bold;">[${note.category || '기타'}]</small>
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <div class="button-box">
                <button onclick="changeStatus(${index}, 'notes')">Unarchiv</button>
                <button onclick="changeStatus(${index}, 'trash')">Trash</button>
            </div>
        </div>
    `;
}

// 3. 휴지통 노트 템플릿
function getTrashNoteTemplate(note, index) {
    return `
        <div class="note-card">
            <small style="color: #888; font-weight: bold;">[${note.category || '기타'}]</small>
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <div class="button-box">
                <button onclick="changeStatus(${index}, 'notes')">Restore</button>
                <button onclick="deleteNotePermanently(${index})">Delete</button>
            </div>
        </div>
    `;
}