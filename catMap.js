//promises//
var setBanner = function(message)
                {
                d3.select("#banner").text(message);
                }

//Promise which includes setup call//

/*var catDogPromise = d3.csv("catDogData.csv");
var humanPromise = d3.csv("Humans.csv");
var mapPromise = d3.json("custom.geo.json");*/

var mapPromise = d3.json("custom.geo.json");
         mapPromise.then(function(geoData)
                   {
                     console.log("here", geoData);
                     setBanner("Domestication of Cats and Dogs");
                     setUp(geoData);
                   }, 
                   function(err)
                   {
                     console.log("Failure is an option",err);
                     setBanner("Data has failed to load");
                   })

//csv promises including changing CSV strings to numbers//

var catDogPromise = d3.csv("catsDogData.csv"); 
      catDogPromise .then(function(data)
                   { data.forEach(function(d) {
                     d.dLon = +d.dLon;
                     d.dLat = +d.dLat;
                     d.cLon = +d.cLon;
                     d.cLat = +d.cLat;
                     console.log("here2", data);
                     dogSpots(data);
                     catSpots(data);
                   }), 
                   function(err)
                   {
                     console.log("Failure is an option",err);
                   }})

var humanPromise = d3.csv("Humans.csv");
      humanPromise .then(function(data)
                   { data.forEach(function(d) {
                     d.longitude = +d.longitude;
                     d.latitude = +d.latitude;
                     console.log("here3", data);
                     humanSpots(data)
                   }), 
                   function(err)
                   {
                     console.log("Failure is an option",err);
                   }})

//variables//

var screen  = {width: 1200, height: 750}
var margins = {top: 10, right: 50, bottom: 50, left: 25}

var width  = screen.width - margins.left - margins.right;
var height = screen.height - margins.top - margins.bottom;

var projectionType = d3.geoMollweide()
                       .center([0, 0])
                       .scale([250]) //scale can be adjusted//
                       .translate([width/2,height/2]);  //center of map to line up with center of projection//              

var path =   d3.geoPath()
               .projection(projectionType);

//draw map//

                   
var setUp = function(countries, features)
{
 var landBodies = d3.select("#map")
                    .selectAll("path")
                    .data(countries.features)
                    .enter()
                    .append("path")
                    .attr("d", path); //where d is the geoPath data//
            
                 return projectionType
    
//called in the mapPromise//
}

var dogSpots = function(data)
{
    var spots = d3.select("#map")
                  .selectAll("circle")
                  .data(data)
                  .enter()
                  .append("circle")
                  .attr("cx", function(d)
                       {
                        return projectionType([d.dLon, d.dLat])[0];
                       })
                  .attr("cy", function(d)
                        {
                         return projectionType([d.dLon, d.dLat])[1];
                        })
                  .attr("r", 20)
                  .style("fill", "yellow")
                  .style("stroke", "gray")
                  .style("stroke-width", 0.25)
                  .style("opacity", 0.75);
    
//called in the catDogPromise//
};


var catSpots = function(data)
{
    var spots = d3.select("#map")
                  .selectAll("circle")
                  .data(data)
                  .enter()
                  .append("circle")
                  .attr("cx", function(d)
                       {
                        return projectionType([d.cLon, d.cLat])[0];
                       })
                  .attr("cy", function(d)
                        {
                         return projectionType([d.cLon, d.cLat])[1];
                        })
                  .attr("r", 20)
                  .style("fill", "gray")
                  .style("stroke", "gray")
                  .style("stroke-width", 0.25)
                  .style("opacity", 0.75);
    
//called in the catDogPromise//
};


var humanSpots = function(data)
{
    var spots = d3.select("#map")
                  .selectAll("circle")
                  .data(data)
                  .enter()
                  .append("circle")
                  .attr("cx", function(d)
                       {
                        return projectionType([d.longitude, d.latitude])[0];
                       })
                  .attr("cy", function(d)
                        {
                         return projectionType([d.longitude, d.latitude])[1];
                        })
                  .attr("r", 10)
                  .style("fill", "black")
                  .style("stroke", "gray")
                  .style("stroke-width", 0.25)
                  .style("opacity", 0.75);
    
//called in the humanPromise//
};

              
