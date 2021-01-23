
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
                        // alert(response);
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
                // let material_select = $('#material_select').val();
                // let material_quantity = $('#quantity_enter').val();
                
                $.ajax({
                    type: 'DELETE',
                    url: '/qs/estimation/deleteNewestimateMaterial',
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

        $(document).on('submit', '#estimate_form', function (e) {
            e.preventDefault();
            var r = confirm("check the material again!");
            if (r) {
                let p_name = $('#project_select').val();
                // let m_amount = $('#m_amount').val();
                // let m_cost = $('#m_cost').val();
                $.ajax({
                    type: 'POST',
                    url: '/qs/estimation/saveNewEstimate',
                    data: {
                        'p_name': p_name,
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



        $(document).on('submit', '#view_project_form', function (e) {
            e.preventDefault();
                let from_date = $('#from_date').val();
                let to_date = $('#to_date').val();

                $.ajax({
                    type: 'POST',
                    url: '/qs/createProject/viewProject',
                    data: {
                        'from_date': from_date,
                        'to_date' :to_date,
                    },
                    success: function (response) {
                        if(response.err!==""){
                        $('#err_msg5').html(`<div class="alert alert-danger" role="alert">${response.err}</div>`);
                        } else {
                            // console.log(response);
                            viewProjects = response.viewProjects;
                            if (viewProjects.length === 0) {
                                $('#err_msg5').html(`<div class="alert alert-danger" role="alert">no projects created</div>`);
                            } else {
                                var table = `
                            <table class="table table-bordered">
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Project Name</th>   
                                <th>Started Date</th>
                              </tr>
                            </thead>
                            <tbody>`;
                            $.each(viewProjects, function (num,viewProject) {
                                table += `
                                <tr>
                                    <td>${viewProject.p_id}</td>
                                    <td>${viewProject.name}</td>
                                    <td>${viewProject.to_char}</td>
                                </tr>
                                `;
                            });
                            table += ` </tbody>
                                        </table>`;

                            $('#date_project_view').html(table);
                            $('#err_msg5').attr("style", 'display:none');
                            }
                        }
                    },
                    error: function (res) {
                    }
                });

        });
        
        $(document).on('submit', '#create_project_form', function (e) {
            e.preventDefault();
            var r = confirm("check the project details again!");
            if (r) {
                let p_name = $('#p_name').val();
                let p_startDate = $('#p_startDate').val();
                let p_duration = $('#p_duration').val();
                // var d = new Date();
                // var today = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
                // // alert(today);
                // // alert(p_startDate);
                // if (Date.parse(p_startDate)<=Date.parse(today)){
                //     $('#create_p_err_msg').html(`<div class="alert alert-danger" role="alert">Date should be future date</div>`) ;
                //    return;
                // }
                $.ajax({
                    type: 'POST',
                    url: '/qs/createProject/saveNewProject',
                    data: {
                        'p_name': p_name,
                        'p_startDate' :p_startDate,
                        'p_duration' : p_duration,
                    },
                    success: function (response) {
                        if(response.err!==""){
                        $('#create_p_err_msg').html(`<div class="alert alert-danger" role="alert">${response.err}</div>`) 
                        // alert(response.err);
                        return
                        }
                        // console.log(response);
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
