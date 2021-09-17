$(function(){
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "Crude Oil Reserves vs Production, 2016"
        },
        axisY: {
            title: "Billions of Barrels",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC"
        },
        axisY2: {
            title: "Millions of Barrels/day",
            titleFontColor: "#C0504E",
            lineColor: "#C0504E",
            labelFontColor: "#C0504E",
            tickColor: "#C0504E"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor:"pointer",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "column",
            name: "confirmados",
            legendText: "Casos confirmados",
            showInLegend: true,
            dataPoints:[
                { label: "Saudi", y: 266.21 },
                { label: "Venezuela", y: 302.25 },
                { label: "Iran", y: 157.20 },
                { label: "Iraq", y: 148.77 },
                { label: "Kuwait", y: 101.50 },
                { label: "UAE", y: 97.8 }
            ]
        },
        {
            type: "column",
            name: "recuperados",
            legendText: "Casos recuperados",
            axisYType: "secondary",
            showInLegend: true,
            dataPoints:[
                { label: "Saudi", y: 10.46 },
                { label: "Venezuela", y: 2.27 },
                { label: "Iran", y: 3.99 },
                { label: "Iraq", y: 4.45 },
                { label: "Kuwait", y: 2.92 },
                { label: "UAE", y: 3.1 }
            ]
        }]
    });
    chart.render();

    console.log(chart);

    function toggleDataSeries(e) {
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }

    let consultaAPI = async () => {
        let respuesta = await fetch('http://localhost:3000/api/total',{
            headers:{
                Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwibmFtZSI6IkdsZW5uYSBSZWljaGVydCIsInVzZXJuYW1lIjoiRGVscGhpbmUiLCJpYXQiOjE2MjkyMTIzOTd9.UXN50x6d82YKFeSLohAF0LMbXkAtr4lszPzP9rEzaGo`
            }
        });
        let datos = await respuesta.json();

        let confirmados = [];
        let recuperados = [];
        for(i= 0; i < 4; i++){
            confirmados.push({
                label: datos.data[i].location,
                y: datos.data[i].confirmed
            })

            recuperados.push({
                label: datos.data[i].location,
                y: datos.data[i].deaths
            })
        }
        chart.options.data[0].dataPoints = confirmados;
        chart.options.data[1].dataPoints = recuperados;
        chart.render();
    }

    consultaAPI();
})
