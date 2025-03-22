document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.querySelector("tbody");
  const addButton = document.getElementById("ButtonTambah");

  // Ambil data dari localStorage atau buat array kosong jika belum ada data
  let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

  // Fungsi render data ke tabel
  function renderTable() {
    tableBody.innerHTML = ""; // Bersihkan isi tabel sebelum render ulang
    teachers.forEach((teacher, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${teacher.nip}</td>
        <td>${teacher.nama}</td>
        <td>${teacher.email}</td>
        <td>${teacher.password}</td>
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
        teachers.splice(index, 1);
        localStorage.setItem("teachers", JSON.stringify(teachers));
        renderTable();
      });
    });

    // Tambahkan event listener ke tombol edit
    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        const teacher = teachers[index];
        const newNIP = prompt("Edit NIP:", teacher.nip);
        const newNama = prompt("Edit Nama Guru:", teacher.nama);
        const newEmail = prompt("Edit Email:", teacher.email);
        const newPassword = prompt("Edit Password:", teacher.password);

        if (newNIP && newNama && newEmail && newPassword) {
          teachers[index] = {
            nip: newNIP,
            nama: newNama,
            email: newEmail,
            password: newPassword,
          };
          localStorage.setItem("teachers", JSON.stringify(teachers));
          renderTable();
        } else {
          alert("Data tidak boleh kosong!");
        }
      });
    });
  }

  // Tambahkan event untuk tombol tambah data
  addButton.addEventListener("click", function () {
    const nip = prompt("Masukkan NIP:");
    const nama = prompt("Masukkan Nama Guru:");
    const email = prompt("Masukkan Email:");
    const password = prompt("Masukkan Password:");

    if (nip && nama && email && password) {
      teachers.push({ nip, nama, email, password });
      localStorage.setItem("teachers", JSON.stringify(teachers));
      renderTable();
    } else {
      alert("Data tidak boleh kosong!");
    }
  });

  // Render tabel saat halaman dimuat
  renderTable();
});
