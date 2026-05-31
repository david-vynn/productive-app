// Gunakan event 'pagehide' karena lebih reliabel daripada 'beforeunload' di mobile/Chrome baru
window.addEventListener('pagehide', () => {
    sessionStorage.setItem('scrollPos', window.scrollY);
});

// Gunakan 'DOMContentLoaded' agar lebih cepat dari 'load'
window.addEventListener('DOMContentLoaded', () => {
    const scrollPos = sessionStorage.getItem('scrollPos');
    if (scrollPos) {
        // Beri sedikit delay (100ms) untuk memastikan browser sudah merender konten
        setTimeout(() => {
            window.scrollTo(0, parseInt(scrollPos));
        }, 100);
    }
});

// 1. Ambil elemen dari HTML
const taskInput = document.getElementById('taskInput')
const addBtn = document.getElementById('addBtn')
const taskList = document.getElementById('taskList')

// 2. Simpan semua tugas di sini
let tasks = []

// 3. Jalankan fungsi ini saat tombol di klik
addBtn.addEventListener('click', function() {
    const taskText = taskInput.value

    // Cek kalau input kosong
    if (taskText === '') {
        alert('Tulis tugasnya dulu!')
        return
    }

    // Tambah tugas ke array
    tasks.push({ text: taskText, done: false})

    // Kosongkan Input
    taskInput.value = ''

    // Tampilkan ulang semua tugas
    renderTasks()
})

// 4. Fungsi untuk tampilkan tugas ke layar
function renderTasks() {
  taskList.innerHTML = ''

  tasks.forEach(function(task, index) {
    taskList.innerHTML += `
      <li class="${task.done ? 'done' : ''}">
        <span onclick="toggleTask(${index})">${task.text}</span>
        <button onclick="deleteTask(${index})">Hapus</button>
      </li>
    `
  })
}

// 5. Fungsi hapus tugas
function deleteTask(index) {
    tasks.splice(index, 1)
    renderTasks()
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done
  renderTasks()
}

// TIMER
let timeLeft = 25 * 60 // 25 menit dalam detik
let timerInterval = null

const timerDisplay = document.getElementById('timerDisplay')
const startBtn = document.getElementById('startBtn')
const pauseBtn = document.getElementById('pauseBtn')
const resetBtn = document.getElementById('resetBtn')

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  timerDisplay.textContent = 
    String(minutes).padStart(2, '0') + ':' + 
    String(seconds).padStart(2, '0')
}

startBtn.addEventListener('click', function() {
  if (timerInterval) return // cegah double start
  timerInterval = setInterval(function() {
    if (timeLeft <= 0) {
      clearInterval(timerInterval)
      timerInterval = null
      alert('Waktu habis! Istirahat dulu 🎉')
      return
    }
    timeLeft--
    updateDisplay()
  }, 1000)
})

pauseBtn.addEventListener('click', function() {
  clearInterval(timerInterval)
  timerInterval = null
})

resetBtn.addEventListener('click', function() {
  clearInterval(timerInterval)
  timerInterval = null
  timeLeft = 25 * 60
  updateDisplay()
})

// NOTES
const noteTitleInput = document.getElementById('noteTitleInput')
const noteContentInput = document.getElementById('noteContentInput')
const saveNoteBtn = document.getElementById('saveNoteBtn')
const noteList = document.getElementById('noteList')

let note = []

saveNoteBtn.addEventListener('click', function() {
  const titleText = noteTitleInput.value
  const contentText = noteContentInput.value

  if (titleText === '' || contentText === '') {
    alert('Judul dan isi catatan harus diisi!')
    return
  }

  note.push({ title: titleText, content: contentText })

  noteTitleInput.value = ''
  noteContentInput.value = ''

  renderNotes()
})

function renderNotes() {
  noteList.innerHTML = ''

  note.forEach(function(note, index) {
    noteList.innerHTML += `
      <li>
        <div>
          <span class="note-title">${note.title}</span>
          <p class="note-content">${note.content}</p>
        </div>
        <button onclick="deleteNote(${index})">Hapus</button>
      </li>
    `
  })
}

function deleteNote(index) {
  note.splice(index, 1)
  renderNotes()
}