//promises//
var setBanner = function(message)
                {
                d3.select("#banner").text(message);
                }

//Promise which includes setup call//

var mapPromise = d3.json("custom.geo.json");
         mapPromise.then(function(geoData)
                   {
//console.log("map data loaded");
                     setBanner("Domestication of Cats and Dogs");
                     setUp(geoData);
                   }, 
                   function(err)
                   {
                     console.log("Failure is an option",err);
                     setBanner("Data has failed to load");
                   })

//csv promises including changing CSV strings to numbers//

var humPromise = d3.csv("human.csv"); 
      humPromise .then(function(data)
                   { data.forEach(function(d) {
                     d.hLon = +d.hLon;
                     d.hLat = +d.hLat;
                       
//console.log("humans have loaded");
                       
                     humanSpots(data);
                   }), 
                   function(err)
                   {
                     console.log("Failure is an option",err);
                   }})

var catDogPromise = d3.csv("catDog.csv"); 
         catDogPromise.then(function(data)
                   { 
                    data.forEach(function(d) 
                    {
                     d.dLon = +d.dLon;
                     d.dLat = +d.dLat;
                     d.cLon = +d.cLon;
                     d.cLat = +d.cLat;
                       
// console.log("mammals have loaded");
                       
                     dogSpots(data);
                     catSpots(data);
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
                       .scale([225]) //scale can be adjusted//
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
    var spots = d3.select("#dog")
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
                  .attr("r", 5)
                  .style("fill", "#fcf340")
                  .style("stroke", "#fcf340")
                  .style("stroke-width", 0.75)
                  .style("opacity",1)
                  .append("title")
                  .text(function(d)
                       { 
                        return "Dog Breed: " + d.dBreed
                        });
    
// console.log("Who let the dogs out");
    
//called in the catDogPromise//
};


var catSpots = function(data)
{
    var spots = d3.select("#cat")
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
                  .attr("r",4)
                  .style("fill", "#0310ea")
                  .style("stroke", "#0310ea")
                  .style("stroke-width", 0.75)
                  .style("opacity", 1)
                  .append("title")
                  .text(function(d)
                     {
                        return ("Cat Breed: " + d.cBreed)           
                     });
    
// console.log("Puuurrrrrffffeccccttttt");
   
//called in the humCatDogPromise//
};


var humanSpots = function(data)
{
    var spots = d3.select("#human")
                  .selectAll("circle")
                  .data(data)
                  .enter()
                  .append("circle")
                  .attr("cx", function(d)
                       {
                        return projectionType([d.hLon, d.hLat])[0];
                       })
                  .attr("cy", function(d)
                        {
                         return projectionType([d.hLon, d.hLat])[1];
                        })
                  .attr("r", 4)
                  .style("fill", "#7fff00")
                  .style("stroke", "#7fff00")
                  .style("stroke-width", 0.75)
                  .style("opacity", 1)
                  .append("title")
                  .text(function(d)
                     {
                        return ("Human: " + d.hName)         
                     }); 
    
    
//console.log("only human", data);
    
//called in the humPromise//
};

//migration lines//

//Set up starts and destinations//

 
var cMigArray={type:"LineString", coordinates: [[2.213749,46.227638],[138.252924,36.204824]]};
       
          
console.log("lines");        
           
 
 var cMig =  d3.select("#cat")
               .selectAll("path")
               .data(cMigArray)
               .enter()
               .append("path")
               .attr("d", path(cMigArray))
               .style("fill", "none")
               .style("stroke", "orange")
               .style("stroke-width", 7);
                     
                     /*function(d) 
                     {
                   return path(d.arcs)
               });*/
 
 console.log("this is the end");
 
