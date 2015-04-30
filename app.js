var cityData = null;
var cityHtml = null;

$(document).ready(function () {

    console.log(cityData, cityHtml);

    $(".get-info-btn").on('click', function(){
        console.log("clicked!");
        if(cityHtml === null) {
            console.log("send first request, got data");
            $.get('template.html', function (data) {
                cityHtml = data;
            });
        }else {
            console.log("You already got the html");
        }
        $.get('data.json', function(data){
            console.log("second request");
            if (cityData === null) {
                cityData = data;
                for (i=0; i<cityData.locations.length; i++) {
                    $("#more-stuff").append(cityHtml);
                    $("#more-stuff").children().last().prepend("<img src='"+cityData.locations[i].image +"'>");
                    $("#more-stuff").find(".location-name").last().append("<strong>Name: </strong>" + cityData.locations[i].name);
                    $("#more-stuff").find(".location-population").last().append("<strong>Population: </strong>" + cityData.locations[i].population);
                    $("#more-stuff").find(".location-area").last().append("<strong>Area: </strong>" + cityData.locations[i].area);
                    $("#more-stuff").find(".location-monsters").last().append("<strong>Monsters: </strong>" + cityData.locations[i].monsters);
                }
                console.log("data is", cityData);
            } else {
                console.log("Data is already set");
            }
        });
    });

    $("#more-stuff").on('click', '.btn', function(){
        $(this).parent().parent().fadeOut("slow", function(){
            $(this).remove();
        });
    });

});