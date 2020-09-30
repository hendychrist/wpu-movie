function searchMovie(){
     //Setiap search button diClick kosongin dlu req > Tampilin yang baru 
     $('#movie-list').html('');

     $.ajax({
         url: 'https://omdbapi.com',
         type: 'get', // Methodnya mau apa GET || DELETE || PUSH 
         dataType: 'json', // Kembalian nya mau bentuk apa XML || JSON
         data: {
             'apikey' : '22e3a6f6',
             's': $('#search-input').val() // Jquery [$] cariin element yang namanya search input .() lalu ambil valuenya .val()
         },
         //Jika sukses apa yang dilakukan
         success: function(result){
             // Jika data berhasil diambil maka 
             if ( result.Response == "True" ){
 
                 let movies = result.Search;
                 // console.log(movies);
 
                 // Setiap datanya akan dimasukan kedalam Movie List
                 $.each(movies, function(i,data){
                     // imgnya kita akan ambil langsung poster pada JSON
                     $('#movie-list').append(`
                     <div class="col-md-4">
                         <div class="col mb-3">
                             <img src="` + data.Poster + `" class="card-img-top" alt="...">
                             <div class="card-body">
                                <h5 class="card-title"> ` + data.Title + ` </h5>
                                <h6 class="card-subtitle mb-2 text-muted"> ` + data.Year + ` </h6>
                                <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="` + data.imdbID + `"> See Detail </a>
                             </div>
                         </div>
                     </div>
                     `); // Close append
                 });
 
                 // Setelah sukses diText-Field pada search value menghilang
                 $('#search-input').val('');
  
             }else{ // Jika tidak berasil || tidak ada data
                 $('#movie-list').html(`
                 <div class="col">
                    <h1 class="text-center">` + result.Error + `</h1>
                 </div>
                      `)
             }
         }
 
     });
}// Close function searchMovie

$('#search-button').on('click', function() {
    searchMovie();
});

 // Tidak harus mengclik tombol enterpun Menjalankan Search 
 $('#search-input').on('keyup', function(e) {
     if (e.keyCode === 13 ) {
         searchMovie()
     }
 })

 //Event banding utuk menampilkan detail movie yang diambil lagi dari API JSON
 $('#movie-list').on('click', '.see-detail' , function() {
   
    // get Koneksi ke API dengan ajax 
    $.ajax({
        url: 'https://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data:{
            'apikey' : '22e3a6f6',
            'i' : $(this).data('id')
        },

        success: function(movie){
            if(movie.Response == "True"){

                // Didalam modal-body menggunakan ajax Kita menyimpan HTML GRID
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">

                            <!-- Kiri -->
                            <div class="col-md-4">
                                <img src="`+ movie.Poster +`" class="img-fluid" >
                            </div>

                            <!-- Kanan -->
                            <div class="col-md-8">

                                <!-- List Group Boostrap -->
                                <ul class="list-group">
                                    <li class="list-group-item"> <h3> `+ movie.Title +` </h3> </li>
                                    <li class="list-group-item">  Released : `+ movie.Released +`  </li>
                                    <li class="list-group-item">  Genre  : `+ movie.Genre +`  </li>
                                    <li class="list-group-item">  Director  : `+ movie.Director +`  </li>
                                    <li class="list-group-item">  Actors  : `+ movie.Actors +`  </li>
                                </ul>

                            </div>

                        </div>
                    </div>
                `);

            }
        }

    });

 });