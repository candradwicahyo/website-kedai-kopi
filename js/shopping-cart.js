window.addEventListener('DOMContentLoaded', () => {
  
  let tasks = [];
  
  // tombol add to cart
  const boxContainer = document.querySelector('.box-container');
  const buttonCart = document.querySelectorAll('.button-cart');
  buttonCart.forEach(button => {
    button.addEventListener('click', function() {
      // dapatkan element card 
      const card = this.parentElement;
      // jadikan isi dari nama produk, harga produk dan gambar produk menjadi sebuah objek
      const item = {
        nama: setName(card.querySelector('.nama-produk').textContent),
        harga: parseFloat(card.querySelector('.harga-produk').textContent),
        gambar: card.querySelector('.gambar-produk').src
      };
      // masukkan isi variabel "item" kedalam variabel "tasks"
      tasks.unshift(item);
      // simpan isi variabel "tasks" kedalam localstorage
      saveToLocalstorage();
      // render isi variabel "item" menjadi element HTML dan tampilkan element tersebut
      showUI(item);
      // tampilkan pesan bahwa produk yang ditekan sudah dimasukkan ke keranjang belanjaan
      alerts('success', 'produk sudah dimasukkan kedalam keranjang belanja');
      // update total biaya yang harus dibayarkan
      updateTotalCost();
      // load atau muat data yang ada didalam localstorage
      loadData();
    });
  });
  
  function setName(param) {
    // jika panjang karakter melebihi angka 20, maka batasi teks tersebut
    return param.length > 20 ? `${param.substring(0, 20)}...` : param;
  }
  
  function saveToLocalstorage() {
    /*
      parsing isi variabel "tasks" menjadi string JSON dengan fungsi JSON.stringify() lalu masukkan
      hasilnya kedalam localstorage dengan nama "shopping-cart"
    */
    localStorage.setItem('shopping-cart', JSON.stringify(tasks));
  }
  
  function showUI(data, index = 0) {
    // render isi parameter "data" menjadi element HTML
    const result = renderElement(data, index);
    // tampilkan element HTML
    boxContainer.insertAdjacentHTML('beforeend', result);
  }
  
  function renderElement({nama, harga, gambar}, index) {
    /*
      saya menggunakan plugin atau library fontawesome dibagian icon untuk menghapus data
      dikarenakan pada saat menggunakan feather-icon, icon tersebut tidak muncul
    */
    return `
      <div class="box">
        <div class="box-wrapper">
          <img src="${gambar}" width="100" alt="gambar produk" class="image">
          <div class="text-wrapper">
            <h4>${nama}</h4>
            <span>${harga}</span>
          </div>
        </div>
        <i class="fa-solid fa-trash-alt btn-delete" data-id="${index}"></i>
      </div>
    `;
  }
  
  function alerts(type, text) {
    // plugin / library sweetalert2
    swal.fire ({
      icon: type,
      title: 'Alert',
      text: text
    });
  }
  
  function loadData() {
    // bersihkan isi element "boxContainer"
    boxContainer.innerHTML = '';
    // ambil data yang ada di localstorage 
    const data = localStorage.getItem('shopping-cart');
    /*
      jika variabel "data" menghasilkan boolean true maka didalam localstorage ada data, jika didalam localstorage ada data
      maka parsing data tersebut menjadi JSON lalu ubah isi variabel "tasks" dengan data localstorage yang sudah diparsing.
      tapi jika tidak ada data, maka ubah isi variabel "tasks" dengan array kosong saja
    */
    tasks = (data) ? JSON.parse(data) : [];
    // looping variabel "tasks"
    tasks.forEach((task, index) => {
      // dapatkan semua data yang ada dan dapatkan juga index dari data tersebut
      showUI(task, index);
      // update total biaya yang harus dibayarkan
      updateTotalCost();
    });
  }
  
  // jalankan fungsi loadData() supaya ketika halaman sudah dimuat, data yang sudah di inputkan akan tampil
  loadData();
  
  function updateTotalCost() {
    // ambil isi dari variabel "tasks" yang memiliki property dengan nama "harga"
    // map mengembalikan array baru sedangkan foreach tidak
    // 0 adalah hasil default apabila tidak ada data yang bisa dijumlahkan
    const result = tasks.map(task => task.harga).reduce((total, num) => total += num, 0); 
    // jakankan fungsi setValue()
    setValue(result);
  }
  
  function setValue(result) {
    const price = document.querySelector('.price');
    price.textContent = result;
  }
  
  // event hapus data di keranjang belanja 
  window.addEventListener('click', event => {
    // jika element yang ditekan memiliki class "btn-delete"
    if (event.target.classList.contains('btn-delete')) {
      // ambil isi dari atribut "data-id" pada element yang ditekan
      const id = event.target.dataset.id;
      // jalankan fungsi deleteData()
      deleteData(id);
    }
  });
  
  function deleteData(index) {
    // plugin atau librsry dsri sweetalert2
    swal.fire ({
      icon: 'info',
      title: 'anda yakin?',
      text: 'anda yakin ingin menghapus list data ini?',
      showCancelButton: true
    })
    .then(response => {
      // jika menekan tombol ok atau yes
      if (response.isConfirmed) {
        // hapus element array di index yang sesuai dengan parameter "index"
        tasks.splice(index, 1);
        // simpan perubahan tersebut kedalam localstorage
        saveToLocalstorage();
        // beri pesan bahwa "data berhasil dihapus"
        alerts('success', 'data berhasil dihapus!');
        // update total biaya yang harus dibayarkan
        updateTotalCost();
        // load atau muat data yang ada didalam localstorage
        loadData();
      }
    });
  }
  
});