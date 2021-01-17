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
    })

}(jQuery))