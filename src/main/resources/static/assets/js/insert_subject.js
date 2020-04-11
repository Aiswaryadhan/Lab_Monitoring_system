$(document).ready(function(){
    var len;
    var subId;
    var subName;
    $("#txtSubId").prop('disabled',false);
    $("#btnInsertSub").prop('disabled',false);
    $("#btnUpdateSub").prop('disabled',true);
    $("#btnDeleteSub").prop('disabled',true);
    $("#txtSubId").blur(function(){
                    subId = $('#txtSubId').val();
                    if(subId=='')
                    {
                          $('#error_sub_id').slideDown();
                          $('#error_sub_id').html('Please provide valid Id');
                          status = 1;
                          return false;
                    }
                    else
                    {
                          $('#error_sub_id').slideUp();
                          status = 0;
                    }
    });

    $("#txtSubName").blur(function(){
                        subName = $('#txtSubName').val();
                        if(subName=='')
                        {
                              $('#error_sub_name').slideDown();
                              $('#error_sub_name').html('Please provide valid Subject');
                              status = 1;
                              return false;
                        }
                        else
                        {
                              $('#error_sub_name').slideUp();
                              status = 0;
                        }
        });

    $("#txtSubId").keypress(function (e) {
                var keyCode = e.keyCode || e.which;

                //Regex for Valid Characters i.e. Alphabets and Numbers.
                var regex = /^[A-Za-z0-9\s]+$/;

                //Validate TextBox value against the Regex.
                var isValid = regex.test(String.fromCharCode(keyCode));
                if (!isValid) {
                    $("#error_sub_id").html("Only Alphabets and Numbers allowed.");
                }
                else
                {
                     $("#error_sub_id").html("");
                }

                return isValid;
    });

    $("#txtSubName").keypress(function (e) {
                    var keyCode = e.keyCode || e.which;

                    //Regex for Valid Characters i.e. Alphabets and Numbers.
                    var regex = /^[A-Za-z0-9\s]+$/;

                    //Validate TextBox value against the Regex.
                    var isValid = regex.test(String.fromCharCode(keyCode));
                    if (!isValid) {
                        $("#error_sub_name").html("Only Alphabets and Numbers allowed.");
                    }
                    else
                    {
                         $("#error_sub_name").html("");
                    }

                    return isValid;
    });

    $.ajax({
               type: "GET",
               url: 'http://localhost:8080/subject/getAll',
               success: function (data) {
                                           len = data.length;
                                           var txt = "";
                                           if(len > 0){
                                                     for(var i=0;i!=len;i++){
                                                          if(data[i].id)
                                                          txt += "<tr><td>"+(i+1)+"</td><td>"+data[i].id+"</td><td>"+data[i].name+"</td></tr>";
                                                     }
                                                     if(txt != ""){
                                                                   $('#listSubject').append(txt).removeClass("hidden");
                                                     }
                                           }
                                           else
                                           {
                                                alert("Null");
                                           }
               }

    });
    $("#btnInsertSub").click(function(){
        subId=$("#txtSubId").val();
        subName=$("#txtSubName").val();
        if(subId==''){
               $('#error_sub_id').slideDown();
               $('#error_sub_id').html('Please provide valid ID');
               status = 1;
               return false;
        }
        else if(subName==''){
               $('#error_sub_name').slideDown();
               $('#error_sub_name').html('Please provide valid Subject');
               status = 1;
               return false;
        }
        else{
               $('#error_sub_id').slideUp();
               $('#error_sub_name').slideUp();
               status = 0;
               var subData = {
                                 'id': subId,
                                 'name': subName
               };
               var aJson = JSON.stringify(subData);
               $.ajax({
                         type: "POST",
                         url: 'http://localhost:8080/subject/insert',
                         headers: {
                                       "Content-Type": "application/json"
                         },
                         data:aJson,
                         success: function (data) {
                                       alert("Successfully Inserted");
                                       $("#txtSubId").val('');
                                       $("#txtSubName").val('');
                                       $("#listSubject tr").remove();
                                       $.ajax({
                                                   type: "GET",
                                                   url: 'http://localhost:8080/subject/getAll',
                                                   success: function (data) {
                                                                                 len = data.length;
                                                                                 var txt = "";
                                                                                 if(len > 0){
                                                                                                 for(var i=0;i!=len;i++){
                                                                                                        if(data[i].id)
                                                                                                          txt += "<tr><td>"+(i+1)+"</td><td>"+data[i].id+"</td><td>"+data[i].name+"</td></tr>";
                                                                                                 }
                                                                                                 if(txt != ""){
                                                                                                                $('#listSubject').append(txt).removeClass("hidden");
                                                                                                 }
                                                                                 }
                                                                                 else
                                                                                {
                                                                                        alert("Null");
                                                                                }
                                                   }
                                       });
                         }
               });

        }
    });
    $('#listSubject').on( 'click', 'tr', function () {
                            if ( $(this).hasClass('highlighted') ){
                     	                $(this).removeClass('highlighted');
      						}
                     		else{
                     			        $('tr.highlighted').removeClass('highlighted');
                     					$(this).addClass('highlighted');
                     		}
                     		var tableData = $(this).children("td").map(function() {
                     														           return $(this).text();
                     		}).get();
                            $("#txtSubName").val(tableData[2])
                            $("#txtSubId").val(tableData[1])
                            $("#txtSubId").prop('disabled',true);
                            $("#btnInsertSub").prop('disabled',true);
                            $("#btnUpdateSub").prop('disabled',false);
                            $("#btnDeleteSub").prop('disabled',false);
    });
    $("#btnUpdateSub").click(function(){
                          subId=$("#txtSubId").val();
                          subName=$("#txtSubName").val();
                          if(subId==''){
                                         $('#error_sub_id').slideDown();
                                         $('#error_sub_id').html('Please provide valid ID');
                                         status = 1;
                                         return false;
                          }
                          else if(subName==''){
                                         $('#error_sub_name').slideDown();
                                         $('#error_sub_name').html('Please provide valid Subject');
                                         status = 1;
                                         return false;
                          }
                          else{
                                         $('#error_sub_id').slideUp();
                                         $('#error_sub_name').slideUp();
                                         var semData = {
                                                            'name': subName
                                         };
                                         var aJson = JSON.stringify(semData);
                                         $.ajax({
                                                       type: "POST",
                                                       url: 'http://localhost:8080/subject/update/'+subId,
                                                       headers: {
                                                                   "Content-Type": "application/json"
                                                       },
                                                       data:aJson,
                                                       success: function (data) {
                                                                                    alert("Updation Successful");
                                                                                    $("#txtSubId").val('');
                                                                                    $("#txtSubName").val('');
                                                                                    $("#txtSubId").prop('disabled',false);
                                                                                    $("#btnInsertSub").prop('disabled',false);
                                                                                    $("#btnUpdateSub").prop('disabled',true);
                                                                                    $("#btnDeleteSub").prop('disabled',true);
                                                                                    $("#listSubject tr").remove();
                                                                                    $.ajax({
                                                                                                 type: "GET",
                                                                                                 url: 'http://localhost:8080/subject/getAll',
                                                                                                 success: function (data) {
                                                                                                                               len = data.length;
                                                                                                                               var txt = "";
                                                                                                                               if(len > 0){
                                                                                                                                                for(var i=0;i!=len;i++){
                                                                                                                                                                     if(data[i].id)
                                                                                                                                                                          txt += "<tr><td>"+(i+1)+"</td><td>"+data[i].id+"</td><td>"+data[i].name+"</td></tr>";
                                                                                                                                                }
                                                                                                                                                if(txt != ""){
                                                                                                                                                                $('#listSubject').append(txt).removeClass("hidden");
                                                                                                                                                }
                                                                                                                               }
                                                                                                                               else
                                                                                                                               {
                                                                                                                                    alert("Null");
                                                                                                                               }
                                                                                                   }

                                                                                    });
                                                       }

                                         });
                          }
    });
    $("#btnDeleteSub").click(function(){
                    subId=$("#txtSubId").val();
                    subName=$("#txtSubName").val();
                    $.ajax({
                               type: "POST",
                               url: 'http://localhost:8080/subject/delete/'+subId,
                               success: function (data) {
                                                            alert("Deletion Successful");
                                                            $("#txtSubId").val('');
                                                            $("#txtSubName").val('');
                                                            $("#txtSubId").prop('disabled',false);
                                                            $("#btnInsertSub").prop('disabled',false);
                                                            $("#btnUpdateSub").prop('disabled',true);
                                                            $("#btnDeleteSub").prop('disabled',true);
                                                            $("#listSubject tr").remove();
                                                            $.ajax({
                                                                       type: "GET",
                                                                       url: 'http://localhost:8080/subject/getAll',
                                                                       success: function (data) {
                                                                                                       len = data.length;
                                                                                                       var txt = "";
                                                                                                       if(len > 0){
                                                                                                                     for(var i=0;i!=len;i++){
                                                                                                                                      if(data[i].id)
                                                                                                                                           txt += "<tr><td>"+(i+1)+"</td><td>"+data[i].id+"</td><td>"+data[i].name+"</td></tr>";
                                                                                                                     }
                                                                                                                     if(txt != ""){
                                                                                                                                      $('#listSubject').append(txt).removeClass("hidden");
                                                                                                                     }
                                                                                                       }
                                                                                                       else{
                                                                                                               alert("Null");
                                                                                                       }
                                                                       }

                                                            });
                               }
                    });

    });
});