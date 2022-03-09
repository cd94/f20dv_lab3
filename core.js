let locations = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv';
let vaccinations = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/';

const dropdownContainer = d3.select("body")
    .append("div")
    .attr("id","dropdown-container")

let worldData = new Map();

console.log("Building Data...")

d3.csv(locations, function(data) {
	return data;

}).then(function(data){

    //Loading data and creating relevant data structures

    let countryData = [];
    let totalData = [];

    let isoCode = "AFG";

    for(let i = 0; i<data.length; i++){
        countryData = data[i];
        if(data[i].iso_code == isoCode){
            totalData.push(countryData);
        } else{
            worldData.set(isoCode,totalData)
            isoCode = data[i].iso_code
            totalData = []
            totalData.push(countryData)
        }
        
    }

    let locs = [];

    worldData.forEach((value,key)=>locs.push(key))

    console.log("Ready...")

//    // Creating dropdown

//     var dropdown = d3.select("#dropdown-container")
//         .append("select")
//         .attr("class","selection")
//         .attr("id","dropdown")
//         .attr("name","country-list");

//     var options = dropdown.selectAll("option")
//         .data(locs)
//         .enter()
//         .append("option")

    
//     options.text(d=>{ return worldData.get(d)[0].location;})
//             .attr("value",d=>{return d;});


//     d3.select("select")
//         .on("change",d=>{ var selected = d3.select("#dropdown").node().value; onSelection(selected);})

    let iso = "GBR";

    initialise(iso)
    
});

function initialise(iso){
    totalCases = [];
    let prevValue = 0;

    for(let i = 0; i<worldData.get(iso).length;i++){
        let totalVacc = parseInt(worldData.get(iso)[i].total_vaccinations);
        if(isNaN(totalVacc)){
            totalVacc = prevValue;
        }   
        totalCases.push({x:i,y:totalVacc});
        prevValue = totalVacc;
}   
    drawChart(totalCases, worldData.get(iso)[0].location)
}


function onSelection(iso){
    console.log(iso)
    console.log(worldData.get(iso));

    totalCases = [];
    //totalCasesStacked = [];
    prevValue = 0;

    for(let i = 0; i<worldData.get(iso).length;i++){

        let totalVacc = parseInt(worldData.get(iso)[i].total_vaccinations);
       
        if(isNaN(totalVacc)){
            totalVacc = prevValue;
        }

        totalCases.push({x:i,y:totalVacc});

        prevValue = totalVacc;
    }
    updateChart(totalCases, worldData.get(iso)[0].location);
    
}

function changeSelected(iso){
    console.log(worldData.get(iso)[0].location);

    d3.select('#dropdown').property('value', worldData.get(iso)[0].location);
}


