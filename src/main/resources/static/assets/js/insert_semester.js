$(document).ready(function(){
    $.ajax({
               type: "POST",
               url: 'http://localhost:8080/semester/getAll',
               success: function (data) {
                                           len = data.length;
                                           var txt = "";
                                           if(len > 0){
                                                     for(var i=0;i!=len;i++){
                                                          var arr=data[i].split(",");
                                                          studId=arr[0];
                                                          txt += "<tr><td>"+arr[0]+"</td><td>"+arr[1]+"</td></tr>";
                                                     }
                                                     if(txt != ""){
                                                                   $('#listSemester').append(txt).removeClass("hidden");
                                                     }
                                           }
                                           else
                                           {
                                                alert("Null");
                                           }
               }

    });
});