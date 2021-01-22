(function () {
    jQuery(document).ready(function ($) {
        $(document).on('submit', '#addNewMaterial-form', function (e) {
            e.preventDefault();
            var r = confirm("check the material again!");
            if (r) {
                let m_name = $('#m_name').val();
                let m_amount = $('#m_amount').val();
                let m_cost = $('#m_cost').val();
                $.ajax({
                    type: 'POST',
                    url: '/qs/estimation/addNewM',
                    data: {
                        'm_name': m_name,
                        'm_amount': m_amount,
                        'm_cost': m_cost,
                    },
                    success: function (response) {
                        if(response.err!==""){
                        $('#err_msg').append(`<div class="alert alert-danger" role="alert">${response.err}</div>`) 
                        // alert(response.err);
                        return
                        }
                        console.log(response);
                        if (response.result === 'redirect') {
                            //redirecting
                            let baseurl = window.location.origin;
                            console.log(baseurl);
                            baseurl = baseurl + '/qs/';
                            let url = baseurl + response.url;
                            window.location.replace(url);
                        }
                    },
                    error: function (res) {
                    }
                });
            }

        });
        
        $(document).on('click', '#btn-add', function (e) {
            e.preventDefault();
            var r = confirm("check again!");
            if (r) {
                // let project_select = $('#project_select').val();
                let material_select = $('#material_select').val();
                let material_quantity = $('#quantity_enter').val();
                
                $.ajax({
                    type: 'POST',
                    url: '/qs/estimation/addNewestimateMaterial',
                    data: {
                        'material_select': material_select,
                        'material_quantity': material_quantity,
                    },
                    success: function (response) {
                        if(response.err!==""){
                        $('#err_msg0').append(`<div class="alert alert-danger" role="alert">${response.err}</div>`) 
                        // alert(response.err);
                        return
                        }
                        console.log(response);
                        if (response.result === 'redirect') {
                            //redirecting
                            let baseurl = window.location.origin;
                            console.log(baseurl);
                            baseurl = baseurl + '/qs/';
                            let url = baseurl + response.url;
                            window.location.replace(url);
                        }
                    },
                    error: function (res) {
                    }
                });
            
            }

        });

        $(document).on('click', '#btn-remove', function (e) {
            e.preventDefault();
            var r = confirm("delete!");
            if (r) {
                // let project_select = $('#project_select').val();
                let material_select = $('#material_select').val();
                let material_quantity = $('#quantity_enter').val();
                
                $.ajax({
                    type: 'DELETE',
                    url: '/qs/estimation/addNewestimateMaterial',
                    data: {
                        'material_select': material_select,
                        'material_quantity': material_quantity,
                    },
                    success: function (response) {
                        if(response.err!==""){
                        $('#err_msg0').append(`<div class="alert alert-danger" role="alert">${response.err}</div>`) 
                        // alert(response.err);
                        return
                        }
                        console.log(response);
                        if (response.result === 'redirect') {
                            //redirecting
                            let baseurl = window.location.origin;
                            console.log(baseurl);
                            baseurl = baseurl + '/qs/';
                            let url = baseurl + response.url;
                            window.location.replace(url);
                        }
                    },
                    error: function (res) {
                    }
                });
            
            }

        });


    })
}(jQuery))


// $(document).ready(function(){

//     $('form').on('submit', function(){
  
//         var item = $('form input');
//         var todo = {item: item.val()};
  
//         $.ajax({
//           type: 'POST',
//           url: '/todo',
//           data: todo,
//           success: function(data){
//             //do something with the data via front-end framework
//             location.reload();
//           }
//         });
  
//         return false;
  
//     });
  
//     $('li').on('click', function(){
//         var item = $(this).text().replace(/ /g, "-");
//         $.ajax({
//           type: 'DELETE',
//           url: '/todo/' + item,
//           success: function(data){
//             //do something with the data via front-end framework
//             location.reload();
//           }
//         });
//     });
  
//   });