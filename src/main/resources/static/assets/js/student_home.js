$(document).ready(function(){
     if(($.cookie("studId") != null) && ($.cookie("studName") != null) && ($.cookie("studSem") !=null)){
                var studId =$.cookie("studId");
                var studName=$.cookie("studName");
                var studSem=$.cookie("studSem");
                $("#studName").text(studName);


            }

});//close of document ready