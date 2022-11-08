import Plot from 'react-plotly.js';
import Plotly from 'plotly.js-mapbox-dist'


function Mapp(){
{
    return (
        <Plot
          data={[{
                      lat: 38, 
                      lon: -90,
                      type: 'scattermapbox',
                      mode: 'markers',
                      marker: {color: 'red', size:10}
                    }
                  ]}
          layout={{ 
                  width: 1000, 
                  height: 800, 
                  title: 'A Fancy Plot', 
                  margin: {'l': 0, 't': 0, 'b': 0, 'r': 0},
                  mapbox: { 
                    style: "stamen-terrain",
                    center: { lat: 38, lon: -90 }, 
                    zoom: 10 }
              } }
        />
      );
    }
}

export default Mapp;




// function Mapp(){

//     var data=[{
//           lat: 38, 
//           lon: -90,
//           type: 'scattermapbox',
//           mode: 'markers',
//           marker: {color: 'red', size:10}
//         }
//       ]
    
//     var layout={ 
//       width: 1000, 
//       height: 800, 
//       title: 'A Fancy Plot', 
//       margin: {'l': 0, 't': 0, 'b': 0, 'r': 0},
//       mapbox: { 
//         style: "stamen-terrain",
//         center: { lat: 38, lon: -90 }, 
//         zoom: 10 }
//     };

//     Plotly.newPlot("myMapp",data,layout);

// }

// export default Mapp;


