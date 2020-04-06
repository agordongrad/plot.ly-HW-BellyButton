// Create a function to plot data
function dataPlot(id) {
    d3.json("Data/samples.json").then((data)=> {
        console.log(data)
  
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)
        
        
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
        console.log(samples);
  
        
        var sampValue = samples.sampleValues.slice(0, 10).reverse();
  
    
        var otuTop = (samples.otuIds.slice(0, 10)).reverse();
        
       
        var otuId = otuTop.map(d => "OTU " + d)
  
      //   console.log(`OTU IDS: ${otuId}`)
  
  
      //  Need to get top ten otu labels      
        var labels = samples.otuLabels.slice(0, 10);
  
      //   console.log(`Sample Values: ${sampValue}`)
      //   console.log(`Id Values: ${otuTop}`)
      // Use trace to create a variable for plot
        var trace = {
            x: sampValue,
            y: otuId,
            text: labels,
            marker: {
              color: 'rgb(142,124,195)'},
            type:"bar",
            orientation: "h",
        };
  
        // Create your data variables
        var data = [trace];
  
        // Layout for plots
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
  
        // Use plotly to create the plot bar
        Plotly.myPlot("bar", data, layout);
  
        //console.log(`ID: ${samples.otuIds}`)
      
        
        var myTrace = {
            x: samples.otuIds,
            y: samples.sampleValues,
            mode: "markers",
            marker: {
                size: samples.sampleValues,
                color: samples.otuIds
            },
            text: samples.otuLabels
  
        };
  
        // Create variable to set bubble plot layout
        var layoutBubble = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
  
        // Data Variables 
        var myDatabubble = [myTrace];
  
       // Bubble plot
        Plotly.myPlot("bubble", myDatabubble, layoutBubble); 
  
        
  
        var guageChart = [
          {
          domain: { x: [0, 1], y: [0, 1] },
          value: parseFloat(wfreq),
          title: { text: `Weekly Washing Frequency ` },
          type: "indicator",
          
          mode: "gauge+number",
          gauge: { axis: { range: [null, 9] },
                   steps: [
                    { range: [0, 2], color: "yellow" },
                    { range: [2, 4], color: "cyan" },
                    { range: [4, 6], color: "teal" },
                    { range: [6, 8], color: "lime" },
                    { range: [8, 9], color: "green" },
                  ]}
              
          }
        ];
        var myLayout = { 
            width: 700, 
            height: 600, 
            margin: { t: 20, b: 40, l:100, r:100 } 
          };
        Plotly.myPlot("gauge", guageChart, myLayout);
      });
  }  

function getmyData(id) {
    // Read in the json file for data
    d3.json("Data/samples.json").then((data)=> {
        
        
        var metadata = data.metadata;

        console.log(metadata)

        
        var myResult = metadata.filter(meta => meta.id.toString() === id)[0];

        // Use demographic panel to input data
        var demoGraphic = d3.select("#sample-metadata");
        
        demoGraphic.html("");

        // Append the gathered info to panel after collecting demographic data.
        Object.entries(myResult).forEach((key) => {   
                demoGraphic.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// Creating a function for the change
function optionChanged(id) {
    getPlot(id);
    getmyData(id);
}

// Creating function for data rendering
function init() {
    // Dropdown Menu creation 
    var dropDown = d3.select("#selDataset");

    // read the data 
    d3.json("Data/samples.json").then((data)=> {
        console.log(data)

       
        data.names.forEach(function(name) {
            dropDown.append("option").text(name).property("value");
        });

        // Use functions created earlier to show data and plots on page
        getPlot(data.names[0]);
        getmyData(data.names[0]);
    });
}

init();
