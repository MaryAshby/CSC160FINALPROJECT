//Setting up h1 to change in case of failure to load .json file//

var setBanner = function(message)
                {
                d3.select("#banner").text(message);
                }

//Promise which includes setup call//

var dogPromise = d3.json("PUT IN DATA.json");
var catPromise = d3.json("PUT IN DATA.json");
var humanPromise = d3.json("PUT IN DATA.json");
var mapPromise = d3.json("custom.geo.json");

Promise.all([dogPromise, catPromise, humanPromise])
       .then(function(data)
                   {
                     console.log("here");
                     setBanner("Domestication of Cats and Dogs");
                     setup(data);
                   }, 
                   function(err)
                   {
                   console.log("WWHHHHHYYYYYYYYYYY won't it work?",err);
                   setBanner("Data has failed to load");
                   })

//Over all screen size//

var screen = {width: 750, height: 550}
var margins = {top: 10, right: 50, bottom: 50, left: 25}

//map info//

projections = d3.geoMollweide()




     
