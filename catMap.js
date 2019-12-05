//promises//
var setBanner = function(message)
                {
                d3.select("#banner").text(message);
                }

//Promise which includes setup call//

var mapPromise = d3.json("geofile.json")
           mapPromise.then(function(countries)
                   {
                     console.log("Map here",countries);
                     setUp(countries);
                   }, 
                   function(err)
                   {
                   console.log("Map Error",err);
                   })

var dogPromise = d3.csv("Dog.csv"); 
        
var humPromise = d3.csv("human.csv"); 
      
var catPromise = d3.csv("Cat.csv");

var callAll = function(data)
               {
                return dogSpots(data), catSpots(data), humanSpots(data), legend(data);
               }
       
Promise.all([dogPromise, catPromise, humPromise])
       .then(function(data)
                   {
                     setBanner("Domestication of Cats and Dogs");        
                     callAll(data);
	                 console.log("Spots here", data);         
                   }, 
                   function(err)
                   {
                     console.log("Failure is an option",err);
                     setBanner("Data has failed to load");
                   })
     
         
//variables//
var screen = {width: 1400, height: 800}

var width = screen.width;
var height = screen.height;

var projectionType = d3.geoMollweide()
                       .center([40, -25]) //look at alignment issues of globe here//
                       .scale([180]) //scale can be adjusted//
                       .translate([width/2,height/2]);  //center of map to line up with center of projection//            

var path =   d3.geoPath(projectionType);

var graticule = d3.geoGraticule();


//data drawing//
            
var setUp = function(countries)
                {
                    d3.select("svg")
                      .append("path")
                      .datum(graticule)
                      .attr("id", "graticule")
                      .attr("d", path);
                   /* d3.select("svg")
                      .append("path")
                      .datum(graticule.outline)
                      .attr("id", "outline")
                      .attr("d", path);*/
                    d3.select("svg")
                      .attr("width", width)
                      .attr("height", height)
                      .attr("transform","translate(0,0)") 
                    d3.select("svg")
                      .selectAll("path")
                      .data(countries.features)
                      .enter()
                      .append("path")
                      .attr("d", path) //where d is the geoPath data//
                     /* .append("title")
                    .text(function(d)
                                   {
                                    return ("Breeds: " + d.admin)      //CHANGE TO NAMES OF BREEDS//   
                                   })*/
                    
//console.log("land", countries.features);
               }

var dogSpots = function(data)
                {
                    d3.select("svg")
                      .selectAll("circle")
                      .data(data[0])
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
                            .style("opacity",0.75)
                            .append("title")
                            .attr("id", "dLabel")
                            .text(function(d)
                                  { 
                                   return "Dog Breed: " + d.dBreed
                                  });
    
//console.log("Who let the dogs out", data);
    
                };


var catSpots = function(data)
{
    var spots = d3.select("svg")
                  .append("g")
                  .attr("id","cat")
                  .selectAll("circle")
                  .data(data[1])
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
                  .attr("r",3)
                  .style("fill", "#0310ea")
                  .style("stroke", "#0310ea")
                  .style("stroke-width", 0.75)
                  .style("opacity", 0.75)
                  .append("title")
                  .text(function(d)
                     {
                        return ("Cat Breed: " + d.cBreed)           
                     })
                  ;
    
console.log("Puuurrrrrffffeccccttttt");
};


var humanSpots = function(data)
{
    var spots = d3.select("svg")
                  .append("g")
                  .attr("id","human")
                  .selectAll("circle")
                  .data(data[2])
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
                  .style("opacity", 0.75)
                  .append("title")
                  .text(function(d)
                     {
                        return ("Human: " + d.hName)         
                     })
};

/*//zoom//

//zoom variables//

var zoom = d3.behavior.zoom()              
             .translate([0,0])
             .scale(1)
             .scaleExtent([1,8])
             .on("zoom", zoomed);

var zmap = d3.select("svg")
             .append("rect")
             .attr("id", "zmap")
             .attr("width", width)
             .attr("height", height)
             .call(zoom) 


var zoomed = function(d)
                {
                 features.attr("transform", "translate("+ d3.event.translate +")scale(" + d3.event.scale + ")");
                 features.select(".subregion").style("stroke-width", 1.5 / d3.event.scale + "px");    
                }
                */

//make Legend/
var labels = ["Human", "Dog", "Cat"]

var color = ["#7fff00", "#fcf340", "0310ea"]

var size = 20

var legend = function(data)
{
             d3.select("#legend")
               .selectAll("circle")
               .data(color)
               .enter()
               .append("circle")
               .attr("cx", 10)
               .attr("cy", function(d,i){return 10 + i*(size+10)})
               .attr("r", 10)
               .style("fill", function(d){return d})

             d3.select("#legend")
               .selectAll("labels")
               .data(labels)
               .enter()
               .append("text")
               .attr("x", 25)
               .attr("y", function(d,i){ return 10 + i*32})
               .style("fill", "darkgray")
               .text(function(d){ return d})
               .attr("text-anchor", "left")
               .style("alignment-baseline", "middle");


}

console.log("this is the end");
 
