$(document).ready(function () {
    doRequestDisplayProduct();

});



var doRequestDisplayProduct = () => {

    $.ajax({
        type: "POST",
        url: "./routes/router.php",
        data: { choice: 'DisplayProductAdmin', },

        success: function (data) {
            var json = JSON.parse(data);
            var str = "";
            let product = 1;

            json.sort(function (a, b) {
                var dateA = new Date(a.created);
                var dateB = new Date(b.created);
                return dateB - dateA;
            });
            json.reverse();


            json.forEach(element => {

                var textColor = element.stock === "Available" ? 'text-success' : 'text-danger';

                str += '<div class="col-12 col-md-12 col-lg-3 mb-2">';
                str += '<div class="card text-center pb-2">';
                str += '<div class="card-body">';
                str += '<h3 class="card-title">' + element.pname + '</h3>';
                str += '<div class="img-area mb-4 text-center">';
                str += '<img class="fish object-fit-cover" alt="" src="./uploads/productImage/' + element.img + '">';
                str += '<div class="overlay">';
                str += '<button product_id="' + element.product_id +'" class="btn btn-secondary btn-sm btn-ldesc">View Details</button>';
                str += '</div>';
                str += '</div>';
                str += '<p class="price fw-bold text-decoration-none"><i class="fa-sharp fa-solid fa-peso-sign"></i>' + element.p_price + '/kg' + '</p>';
                str += '<p class="' + textColor + '">' + element.stock + '</p>';
                str += '<div class="buttonssss">';
                if (element.stock === "Available") {
                    str += '<button  class="btn-order mt-3 mx-2"><a class="text-decoration-none text-white" href="pages/customer/login.php">Purchase</a></button>';
                    str += '<button  class="btn-reserve mt-3 mx-2"><a class="text-decoration-none text-white" href="pages/customer/login.php">Reserve</a></button>';
                }
                str += '</div>';
                str += '</div>';
                str += '</div>';
                str += '</div>';

                product++;

            });
            $('#DisplayProducts').append(str);

            $(document).on('click', '.btn-ldesc', function () {
                viewProdId = $(this).attr("product_id");
                ldesc(viewProdId)
            $('#productModal').modal('show');
            });


        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });


}
var ldesc =(viewProdId)=>{
    $.ajax({
        type: "POST",
        url: "./routes/router.php",
        data: { choice: 'landingdesc',viewProdId: viewProdId },
        success: function (data) {
        var json = JSON.parse(data); 
        str = "";

        $('#viewDesc').empty();
        
        json.forEach(e => {
            str += '<div>'+e.p_desc+'</div>';
        });
        $('#viewDesc').append(str);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
};

// var searchProducts = () => {
//     var searchQuery = $('#searchInput').val();
//     var container = $('#DisplayProducts');

//     $.ajax({
//         type: "POST",
//         url: "./routes/router.php",
//         data: { choice: 'DisplayProduct' },
//         success: function (data) {
//             console.log(data);
//             try {
//                 var json = JSON.parse(data);
//                 json.sort(function (a, b) {
//                     var dateA = new Date(a.created);
//                     var dateB = new Date(b.created);
//                     return dateB - dateA;
//                 });
//                 json.reverse();
//                 container.empty();
//                 if (searchQuery === '') {
//                     json.forEach(function (e) {
//                         displaySearch(container, e);
//                     });
//                 } else {
//                     var filteredData = json.filter(function (e) {
//                         return (
//                             e.pname.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                             e.stock.toString().toLowerCase().includes(searchQuery.toLowerCase())
//                         );
//                     });

//                     if (filteredData.length === 0) {
//                         container.append("<p>No matching products found.</p>");
//                     } else {
//                         filteredData.forEach(function (e) {
//                             displaySearch(container, e);
//                         });
//                     }
//                 }
//             } catch (error) {
//                 console.error("Error parsing JSON data: " + error);
//             }
//         },
//         error: function (xhr, ajaxOptions, thrownError) {
//             alert("An error occurred: " + thrownError);
//         }
//     });
// }

// function displaySearch(container, e) {

//     var textColor = e.stock === "Available" ? 'text-success' : 'text-danger';

//     str = ''
//     str += '<div class="col-12 col-md-12 col-lg-4 mb-2">';
//     str += '<div class="card text-center pb-2">';
//     str += '<div class="card-body">';
//     str += '<h3 class="card-title">' + e.pname + '</h3>';
//     str += '<div class="img-area mb-4 text-center">';
//     str += '<img class="fish" alt="" src="./uploads/productImage/' + e.img + '">';
//     str += '</div>';
//     str += '<p class="price text-decoration-none"><i class="fa-sharp fa-solid fa-peso-sign"></i>' + e.p_price + '/kg' + '</p>';
//     str += '<p class="' + textColor + '">' + e.stock + '</p>';
//     str += '<div class="buttonssss">';
//     if (e.stock === "Available") {
//         str += '<button data-bs-toggle="modal" data-bs-target="#order" class="btn-order mt-3 mx-2">Order</button>';
//         str += '<button data-bs-toggle="modal" data-bs-target="#reserve" class="btn-reserve mt-3 mx-2">Reserve</button>';
//     }
//     str += '</div>';
//     str += '</div>';
//     str += '</div>';
//     str += '</div>';

//     container.append(str);
// }
