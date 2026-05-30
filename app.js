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