//below is testing//
var setBanner = function(message)
                {
                d3.select("#banner").text(message);
                }

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
        
}
    
            


/* KEEP FOR FINAL PROJECT
//Setting up h1 to change in case of failure to load .json file//

var setBanner = function(message)
                {
                d3.select("#banner").text(message);
                }

//Promise which includes setup call//

var dogPromise = d3.csv("");
var catPromise = d3.csv("");
var humanPromise = d3.csv("");
var mapPromise = d3.json("custom.geo.json");

Promise.all([dogPromise, catPromise, humanPromise, mapPromise])
       .then(function(geoData)
                   {
                     console.log("here");
                     setBanner("Domestication of Cats and Dogs");
                     setUp(geoData);
                   }, 
                   function(err)
                   {
                     console.log("Failure is an option",err);
                     setBanner("Data has failed to load");
                   })
                   

//Over all screen size//

var screen  = {width: 1200, height: 600}
var margins = {top: 10, right: 50, bottom: 50, left: 25}


//map info// 

var setUp = function(features)
             {      
               d3.select("svg")
                 .selectAll("path")
                 .data(".geometry.coordinates")
                 .enter()
                 .append("g")
                 .attr("id","map")
                 .append("path")
                 .attr("d", path)
                 .style("fill", "gray");	
                 
                 
var width  = screen.width - margins.left - margins.right;
var height = screen.height - margins.top - margins.bottom;
                 

//drawing lines of map//

    
var projectionType = d3.geoMollweide()                
         
var path =   d3.geoPath()
               .projection(projectionType)
               .scale(165)
               .translate([width/2, height/2]);
            
                 
         return path(features, cScale);
                
console.log("made it");
         
             };

var drawMap = function (features, cScale, position)
{
    var map = d3.select("#map")
                .selectAll("circle")
                .data(dogs[position].location)
                .transition()
                .duration(1000)
                .attr("fill", )
}


//layers//

Map({
  target: "#map",
  layers: [
      base VectorLayer({
      source: mapPromise()
      })
  ],
    [
    dog VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: './data/countries.json'
      })
    })
  ],
    [
    cat VectorLayer({
    source: 
})
    ],
    [
    human VectorLayer({
    source:
})
    ],
    
//start in center of screen/map//
    
  view: View({
    center: [0, 0],
    zoom: 2
  })
});

/*
//to add points//

var humanPoint{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
         long, lat
        ]}}]}

var dogPoint{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
         long,lat
        ]}}]}

var catPoint{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          long, lat
        ]}}]}


//to add lines//

var humanMigration{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            Long1,
            Lat1
          ],
          [
            Long2,
            Lat2
          ]]}}]}

var dogMigration{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            Long1,
            Lat1
          ],
          [
            Long2,
            Lat2
          ]]}}]}

var catMigration{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            Long1,
            Lat1
          ],
          [
            Long2,
            Lat2
          ]]}}]}

*/
     
