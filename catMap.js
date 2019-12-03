//promises//
var setBanner = function(message)
                {
                d3.select("#banner").text(message);
                }

//Promise which includes setup call//

var mapPromise = d3.json("geoinfo.json")
           mapPromise.then(function(countries, geoData)
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
                return dogSpots(data), catSpots(data), humanSpots(data);
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

var width  = 1200;
var height = 750;

var projectionType = d3.geoMollweide()
                       .center([0, 0])
                       .scale([225]) //scale can be adjusted//
                       .translate([width/2,height/2]);  //center of map to line up with center of projection//            

var path =   d3.geoPath(projectionType);

var graticule = d3.geoGraticule();


var setUp = function(countries)
                {
                    d3.select("svg")
                      .selectAll("path")
                      .data(countries.features)
                      .enter()
                      .append("path")
                      .attr("d", path) //where d is the geoPath data//   
                      .append("g")
                      .attr("id","map")
                      .append("title")
                      .attr("id", "lLabel")
                      .text(function(d)
                                   {
                                    return ("Breeds: " + d.admin)      //CHANGE TO NAMES OF BREEDS//   
                                   })
                    d3.select("svg")
                    .append("path")
                        .datum(graticule)
                        .attr("class", "graticule")
                        .attr("d", path);
                    d3.select("svg")
                    .append("path")
                    .datum(graticule.outline)
                    .attr("class", "outline")
                    .attr("d", path);
    
console.log("land", countries.features);
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
                            .attr("r", 5)
                            .style("fill", "#fcf340")
                            .style("stroke", "#fcf340")
                            .style("stroke-width", 0.75)
                            .style("opacity",1)
                            .append("title")
                            .attr("id", "dLabel")
                            .text(function(d)
                                  { 
                                   return "Dog Breed: " + d.dBreed
                                  });
    
console.log("Who let the dogs out", data);
    
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
                  .attr("r",4)
                  .style("fill", "#0310ea")
                  .style("stroke", "#0310ea")
                  .style("stroke-width", 0.75)
                  .style("opacity", 1)
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
                  .style("opacity", 1)
                  .append("title")
                  .text(function(d)
                     {
                        return ("Human: ")         
                     })
console.log("only human", data);
};



//migration lines//

var route = {
  type: "LineString",
  coordinates: [
    [31.791702,-7.09262],  [26.086466,-28.766591]
  ]
};

var humanLines = function(data)
                 {
                 d3.select("svg")
                      .selectAll("path")
                      .data(data[2])
                      .enter()
                      .append("path")
                      .attr("d", style("stroke-width", 7))
			          .attr('d', function(d) 
                           {
				            return path 
				               type:"LineString",
				               coordinates [[+d.hLon, +d.hLat][0],[+d.hLon, +d.hLat][1]]
                            })
                      .append("g")
                      .attr("id","map")
                      .append("title")
                      .text(function(d)
                                   {
                                    return ("mtDNA Human Migration"+ d.hName)         
                                   })};
    
console.log("this is the end");
 
