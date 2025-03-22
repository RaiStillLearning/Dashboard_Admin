document.addEventListener("DOMContentLoaded", function () {
  const buttonTambah = document.getElementById("ButtonTambah");
  const tableBody = document.querySelector(".table tbody");
  let counter = 1; // Untuk nomor urut mata pembelajaran

  buttonTambah.addEventListener("click", function () {
    const mataPelajaran = prompt("Masukkan nama mata pelajaran:");

    if (mataPelajaran && mataPelajaran.trim() !== "") {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${counter}</td>
        <td>${mataPelajaran}</td>
        <td>
          <button class="btn btn-danger btn-sm delete-btn">Hapus</button>
        </td>
      `;
      tableBody.appendChild(newRow);
      counter++;
    }
  });

  // Event listener untuk tombol hapus
  tableBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
      event.target.closest("tr").remove();
    }
  });
});
