// Nama : Rinaldi Ihsan Setiawan

// panggil fungsi readline
const readline = require('./readline');
//  panggil fungsi untuk menyimpan database sementara
const databaseKontak = require('./storage');

// buat object kosong untuk menampung inputan
let objectKontak = {
  nama: '',
  nomorHp: '',
};

function viewMenu() {
  //fungsi untuk menampilkan halaman menu
  console.log('Selamat Datang Di Aplikasi Kontak !');
  console.log('====================================\n');
  console.log('Main Menu :\n');
  console.log('1.Tambah Data \n');
  console.log('2.Lihat Data \n');
  console.log('3.Reset Data \n');
  console.log('4.Cari Data \n');
  console.log('5.Hapus Data \n');
  console.log('99.Keluar \n');
  readline.question(`Silahkan Masukan Pilihan Anda  : `, (input) => {
    mainMenu(Number(input));
  });
}

function mainMenu(pilihan) {
  // fungsi untuk mengatur pilihan menu
  switch (pilihan) {
    case 1:
      simpan();
      break;
    case 2:
      lihatData();
      break;
    case 3:
      resetData();
      break;
    case 4:
      pencarianData();
      break;
    case 5:
      hapusData();
      break;
    case 99:
      keluar();
      break;
    default:
      console.log('Pilihan Tidak Valid !');
      readline.close();
      break;
  }
}

const kembali = () => {
  readline.question('Apakah Anda Ingin Kembali Ke Main Menu? (y/n) : ', (pilihan) => {
    if (pilihan === 'y') {
      viewMenu();
    } else {
      readline.close();
    }
  });
};

const simpan = () => {
  console.log('Silahkan Masukan Data ! : ');

  readline.question('Nama : ', (nama) => {
    if (!isNaN(nama)) {
      console.log('inputan harus berupa string!');
      kembali();
    } else {
      objectKontak.nama = nama;
      console.log(`Haloo ${nama} `);
      ambilInputanNomor();
    }
  });
};

const ambilInputanNomor = () => {
  readline.question('Nomor Handphone : ', (nomor) => {
    if (isNaN(nomor)) {
      console.log('inputan harus berupa angka !');
      kembali();
    }

    const nomorSudahAda = databaseKontak.some((Kontak) => Kontak.nomorHp === nomor);

    if (nomorSudahAda) {
      console.log('Nomor Handphone sudah ada dalam data.');
      kembali();
    } else {
      objectKontak.nomorHp = nomor;
      databaseKontak.push(Object.assign({}, objectKontak));
      console.log(`Nomor Handphone : ${nomor}`);
      kembali();
    }
  });
};

const lihatData = () => {
  console.table(databaseKontak);
  kembali();
};

const resetData = () => {
  databaseKontak.splice(0, databaseKontak.length);
  console.log('Data telah direset !');
  kembali();
};

const pencarianData = () => {
  readline.question('Masukkan nama atau huruf yang dicari : ', (nama) => {
    const data = databaseKontak.filter((Kontak) => {
      return Kontak.nama.toLowerCase().includes(nama.toLowerCase());
    });

    if (data.length > 0) {
      console.table(data);
    } else {
      console.log('Data tidak ditemukan !');
    }

    kembali();
  });
};

const hapusData = () => {
  readline.question('Masukan Indeks Data Yang Ingin Dihapus : ', (indexData) => {
    if (indexData < 0 || indexData >= databaseKontak.length) {
      console.log('Indeks Data Tidak Valid !');
    } else {
      const deletedItem = databaseKontak.splice(indexData, 1);
      console.log(`Data dengan nama ${deletedItem[0].nama} berhasil dihapus dari database!`);
    }
    kembali();
  });
};

const keluar = () => {
  console.log('Terima Kasih Sudah Menggunakan Aplikasi Kami ✨');
  readline.close();
};

viewMenu(); // panggil fungsi view menu untuk pertama kali

// maaf ya mas function nya saya ubah jadi arrow function, biar lebih enak dibaca hehe
