document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.querySelector("tbody");
  const addButton = document.getElementById("ButtonTambah");

  // Ambil data dari localStorage atau buat array kosong jika belum ada data
  let students = JSON.parse(localStorage.getItem("students")) || [];

  // Fungsi render data ke tabel
  function renderTable() {
    tableBody.innerHTML = ""; // Bersihkan isi tabel sebelum render ulang
    students.forEach((student, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${student.nis}</td>
        <td>${student.nisn}</td>
        <td>${student.nama}</td>
        <td>
          <button class="btn btn-sm btn-warning edit-btn" data-index="${index}">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    // Tambahkan event listener ke tombol hapus
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        renderTable();
      });
    });

    // Tambahkan event listener ke tombol edit
    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        const student = students[index];
        const newNIS = prompt("Edit NIS:", student.nis);
        const newNISN = prompt("Edit NISN:", student.nisn);
        const newNama = prompt("Edit Nama Peserta Didik:", student.nama);

        if (newNIS && newNISN && newNama) {
          students[index] = { nis: newNIS, nisn: newNISN, nama: newNama };
          localStorage.setItem("students", JSON.stringify(students));
          renderTable();
        } else {
          alert("Data tidak boleh kosong!");
        }
      });
    });
  }

  // Tambahkan event untuk tombol tambah data
  addButton.addEventListener("click", function () {
    const nis = prompt("Masukkan NIS:");
    const nisn = prompt("Masukkan NISN:");
    const nama = prompt("Masukkan Nama Peserta Didik:");

    if (nis && nisn && nama) {
      students.push({ nis, nisn, nama });
      localStorage.setItem("students", JSON.stringify(students));
      renderTable();
    } else {
      alert("Data tidak boleh kosong!");
    }
  });

  // Render tabel saat halaman dimuat
  renderTable();
});
