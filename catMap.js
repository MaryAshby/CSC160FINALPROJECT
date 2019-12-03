//promises//
var setBanner = function(message)
                {
                d3.select("#banner").text(message);
                }

         
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

                   
var setUp = function(countries)
{
 var landBodies = d3.select("#gbu")
                    .selectAll("path")
                .append("path")
                    .attr("width",screen.width)
                    .attr("height",screen.height)
                    .data(countries.features)
                    .enter()
                    .append("g")
                    
                    .attr("id","map")
                    .attr("d", path) //where d is the geoPath data//                  
                    .append("title")
                    .text(function(d)
                        {
                        return ("Breeds: " + d.admin)      //CHANGE TO NAMES OF BREEDS//   
                        });
    
console.log("land");
    
//called in the Promise//
}

var dogSpots = function(data)
{
    var spots = d3.select("svg")
                  .attr("width",screen.width)
                  .attr("height",screen.height)
                  .append("g")
                  .attr("id","dog")
                  .selectAll("circle")
                  .data(data)
                  .enter()
                  .append("circle")
                  .attr("cx", function(d)
                       {
                        return projectionType([+d.dLon, +d.dLat])[0];
                       })
                  .attr("cy", function(d)
                        {
                         return projectionType([+d.dLon, +d.dLat])[1];
                        })
                  .attr("r", 3)
                  .style("fill", "#fcf340")
                  .style("stroke", "#fcf340")
                  .style("stroke-width", 0.75)
                  .style("opacity",1)
                  .append("title")
                  .text(function(d)
                       { 
                        return "Dog Breed: " + d.dBreed
                        });
    
console.log("Who let the dogs out");
    
//called in the Promise//
};


var catSpots = function(data)
{
    var spots = d3.select("#svg")
                  .attr("width",screen.width)
                  .attr("height",screen.height)
                  .append("g")
                  .attr("id","cat")
                  .selectAll("circle")
                  .data(data)
                  .enter()
                  .append("circle")
                  .attr("cx", function(d)
                       {
                        return projectionType([+d.cLon + 2, +d.cLat + 2])[0];
                       })
                  .attr("cy", function(d)
                        {
                         return projectionType([+d.cLon +2, +d.cLat +2])[1];
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
    
console.log("Puuurrrrrffffeccccttttt");
   
//called in the Promise//
};


var humanSpots = function(data)
{
    var spots = d3.select("#svg")
                  .attr("width",screen.width)
                  .attr("height",screen.height)
                  .append("g")
                  .attr("id","human")
                  .selectAll("circle")
                  .data(data)
                  .enter()
                  .append("circle")
                  .attr("cx", function(d)
                       {
                        return projectionType([+d.hLon, +d.hLat])[0];
                       })
                  .attr("cy", function(d)
                        {
                         return projectionType([+d.hLon, +d.hLat])[1];
                        })
                  .attr("r", 3)
                  .style("fill", "#7fff00")
                  .style("stroke", "#7fff00")
                  .style("stroke-width", 0.75)
                  .style("opacity", 1)
                  .append("title")
                  .text(function(d)
                     {
                        return ("Human: " + d.hName)         
                     }); 
    return spots;
    
console.log("only human", data);
    
//called in the Promise//
};

var callAll = function(data)
               {
                return dogSpots(data), catSpots(data), humanSpots(data);
               }

//migration lines//
/*var svg = d3.select("#human").append("svg")
    .attr("width", width)
    .attr("height", height);

var cook = {"type": "LineString", "coordinates": [[-4.1397, 50.3706], [-43.2436, -22.9083] , [-67.2717, -55.9797] , [-149.4500, -17.6667], [172.1936, -41.4395] ,[151.1667, -34] , [147.70, -18.3] ,[106.7, -6], [18.4719, -34.3], [-5,-15], [-25.6, 37.7],[-4.1397, 50.3706]] }

svg.selectAll(".geojson").data([cook])
.enter()
.append("path")
.attr("class","geojson")
.attr("d", path);


/*
var drawCat = function(catRoutes) 
              {				
	 var cMigPath = d3.select("#container")
                     .selectAll(".catRoute")
			         .data(routes)
			         .enter()
			         .append("path")
			         .attr("class","route")
			         .style("stroke-width", 7)
			         .attr('d', function(d) 
                           {
				            return path 
				               type:"LineString",
				               coordinates [[+d.cLon, +d.cLat],[+d.cMigLon, +d.cMigLat]]
                            })}
               
*/
//Set up starts and destinations//   

//console.log(path(link));

//Promise which includes setup call//

var mapPromise = d3.json("custom.geo.json");

var dogPromise = d3.csv("Dogs.csv"); 
        
var humPromise = d3.csv("human.csv"); 
      
var catPromise = d3.csv("Cats.csv"); 
       
Promise.all([mapPromise, dogPromise, humPromise, catPromise])
       .then(function(data)
                   {
                     setBanner("Domestication of Cats and Dogs"); 
                     callAll(data);
console.log("here", data);         
                   }, 
                   function(err)
                   {
                     console.log("Failure is an option",err);
                     setBanner("Data has failed to load");
                   })
   
     
console.log("this is the end");
 
