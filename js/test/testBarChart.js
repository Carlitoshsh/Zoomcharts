chart= new FacetChart({
    "series": [
        {
            "name": "GDP by industry, $",
            "data": {
                "aggregation": "sum"
            },
            "style": {
                "fillColor": "#2fc32f"
            }
        }
    ],
    "container": "demo",
    "data": [
        {
            "url": "https:\/\/zoomcharts.com\/data\/us-economy.json"
        }
    ],
    "toolbar": {
        "fullscreen": true,
        "enabled": true
    },
    "interaction": {
        "resizing": {
            "enabled": false
        }
    }
})
