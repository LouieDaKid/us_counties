// https://www.highcharts.com/maps/demo/us-counties
import data from './data.json';

var countiesMap = Highcharts.geojson(Highcharts.maps['countries/us/us-all-all']),
    lines = Highcharts.geojson(Highcharts.maps['countries/us/us-all-all'], 'mapline'),
    options;

// Add state acronym for tooltip
Highcharts.each(countiesMap, function (mapPoint) {
    mapPoint.name = mapPoint.name + ', ' + mapPoint.properties['hc-key'].substr(3, 2);
});

options = {
    chart: {
        borderWidth: 1,
        marginRight: 50 // for the legend
    },

    title: {
        text: 'US Counties'
    },

    mapNavigation: {
        enabled: true
    },

    plotOptions: {
        mapline: {
            showInLegend: false,
            enableMouseTracking: false
        }
    },

    series: [
        {
            mapData: countiesMap,
            data: data,
            joinBy: ['hc-key', 'code'],
            name: '',
            tooltip: {
                valueSuffix: '%'
            },
            borderWidth: 0.5,
            states: {
                hover: {
                    color: '#a4edba'
                }
            }
        },
        {
            type: 'mapline',
            name: 'State borders',
            data: [lines[0]],
            color: 'white'
        },
        {
            type: 'mapline',
            name: 'Separator',
            data: [lines[1]],
            color: 'gray'
        }
    ]
};

// Instantiate the map
$('#container').highcharts('Map', options);
