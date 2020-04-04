$(document).ready(function(){
$.ajax({
            type : "GET",
            url : "http://localhost:8080/semester,
            headers : {
                "Content-Type" : "application/json"
            },
            success : function(data) {
                populateTable('searchresults',data);
            },
            error : function(data) {
            }
        });
});