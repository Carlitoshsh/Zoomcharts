var idT

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

if (getUrlVars()["id"] !== undefined) {
    idT = getUrlVars()["id"]
}

var urlJSON = "http://10.23.228.153:9000/chart?id=" + idT
document.getElementById("linkjson").href = urlJSON

chart = new FacetChart({
    "series": [
        , {
            valueLabels: {
                enabled: true,
                position: "aboveValue",
                style: {
                    // textStyle: {
                    //     font: "9pt Arial"
                    // },
                    backgroundStyle: {
                        lineColor: "#ccc",
                        lineWidth: 1,
                        fillColor: "rgba(200,200,200,0.5)"
                    },
                    borderRadius: 2
                },
                contentsFunction: function (value) { return value.toFixed(0); }
            }
        }
    ],
    "container": "demo",
    "data": [
        {
            //"url": "https:\/\/zoomcharts.com\/data\/us-economy.json"
            "url": urlJSON
        }
    ],
    "toolbar": {
        "fullscreen": true,
        "enabled": true
    }, "events": {
        onClick: function (hoverSeries) {
            var valueID = hoverSeries.clickItem.data.yaID //label for label
            //console.log(valueID)
            document.getElementById("test").innerText = valueID
        }
    },
    "interaction": {
        "resizing": {
            "enabled": false
        }
    }, info: {
        advanced: {
            showHeader: false, // disable the built-in header
            contentsFunction: function (data, activeSeries, range) {
                var out = '';

                // get the name of the series that is currently hovered.
                var seriesName = activeSeries && activeSeries['name'] ? activeSeries['name'] : "";

                // retrieve the data item that is being hovered.
                var dataItem = chart.getActiveFacet().items.find(function (o) { return o.index === range[0] });

                // add the header (since the default was disabled above)
                var headerTxt = '<small>Nombre:</small> ' + dataItem.data.name + " " + seriesName;
                out += '<strong style="text-align:right">' + headerTxt + '</strong>';

                // First row
                //out += '<tr><td style="color:#FF7D7D;">That</td><td>' + "Something" + '</td></tr>';
                // if no stacks are used, it will contain a separate stack for each series.
                for (var stackIndex = 0; stackIndex < data.length; stackIndex++) {
                    var stack = data[stackIndex];

                    // add series "header" if there is more than one series defined in the stack
                    if (stack.name && stack.data.length > 1) {
                        out += '<h3>' + stack.name + '</h3>';
                    }

                    var relatedNames = dataItem.data.names.slice(0, -1).replace(/ /g, '</td></tr><tr><td>')
                    var edited = '<tr><td>' + relatedNames + '</td></tr>'


                    // each stack contains a list of series
                    for (var seriesIndex = 0; seriesIndex < stack.data.length; seriesIndex++) {
                        var series = stack.data[seriesIndex];

                        // use the same color as provided in the series configuration
                        var color = series.config.style.fillColor || series.config.style.lineColor;
                        out += '<tr><td style="';
                        out += 'color: ' + color + ',font-size:9px;';

                        // // when the user hovers on certain series value on the chart, it will be highlighted in the popup
                        // if (activeSeries && series.config.id === activeSeries.id) {
                        //     out += 'border-color: ' + color + '; font-weight: bold';
                        // }

                        // note that while it is easier to set just the inline style, those might not work if the 
                        // page contains Content-Security-Policy headers that disable such styles.
                        // in this case you can use two special attributes that will then be processed by the chart
                        // to set `style.color` and `style.borderColor`.
                        // 
                        // if (color) out += ` data-color=\"${color}\"`;
                        // if (activeSeries && series.config.id === activeSeries.id) out += ` data-selected`;

                        out += '">';
                        //out += series.name || stack.name;
                        out += '</td><td>';
                        out += edited
                        //out += '</td></tr>';
                    }
                }

                // add an extra row that displays the difference

                return '<table cellspacing="0">' + out + '</table>';
            }
        }
    }
})
