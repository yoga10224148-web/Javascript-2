// =============================================================
// LAB 2 - nilai.js
// LOGIKA PERHITUNGAN NILAI MAHASISWA
// =============================================================

// Menghitung nilai akhir:
// Tugas 30%, UTS 30%, UAS 40%
function hitungNilaiAkhir(tugas, uts, uas) {
  return Math.round((tugas * 0.3 + uts * 0.3 + uas * 0.4) * 10) / 10;
}

// Menentukan grade mahasiswa
function tentukanGrade(nilai) {
  if (nilai >= 85) return 'A';
  if (nilai >= 70) return 'B';
  if (nilai >= 55) return 'C';
  if (nilai >= 40) return 'D';
  return 'E';
}

// Membuat rekap data mahasiswa
function buatRekap(daftar) {
  return daftar.map((m) => {
    const nilaiAkhir = hitungNilaiAkhir(m.tugas, m.uts, m.uas);

    return {
      ...m,
      nilaiAkhir,
      grade: tentukanGrade(nilaiAkhir),
      lulus: nilaiAkhir >= 55
    };
  });
}

// Menghitung rata-rata nilai akhir
function hitungRataRata(rekap) {
  if (rekap.length === 0) return 0;

  const total = rekap.reduce((jumlah, m) => jumlah + m.nilaiAkhir, 0);

  return Math.round((total / rekap.length) * 10) / 10;
}

// Mencari mahasiswa dengan nilai tertinggi
function cariTertinggi(rekap) {
  if (rekap.length === 0) return null;

  return rekap.reduce((tertinggi, m) =>
    m.nilaiAkhir > tertinggi.nilaiAkhir ? m : tertinggi
  );
}

// Menghitung jumlah mahasiswa berdasarkan grade
function hitungDistribusiGrade(rekap) {
  const distribusi = { A: 0, B: 0, C: 0, D: 0, E: 0 };

  for (const m of rekap) {
    distribusi[m.grade]++;
  }

  return distribusi;
}

// Mencari mahasiswa berdasarkan nama
function cariMahasiswa(rekap, kataKunci) {
  const keyword = kataKunci.trim().toLowerCase();

  return rekap.filter((m) =>
    m.nama.toLowerCase().includes(keyword)
  );
}

// ---- Validasi input mahasiswa baru ----
function validasiMahasiswa(input) {
  const errors = [];

  if (typeof input.nim !== 'string' || !/^\d{7}$/.test(input.nim)) {
    errors.push('NIM harus 7 digit angka');
  }

  if (typeof input.nama !== 'string' || input.nama.trim().length < 3) {
    errors.push('Nama minimal 3 karakter');
  }

  for (const kolom of ['tugas', 'uts', 'uas']) {
    const n = input[kolom];

    if (typeof n !== 'number' || !Number.isFinite(n) || n < 0 || n > 100) {
      errors.push(`Nilai ${kolom} harus angka 0-100`);
    }
  }

  return errors;
}