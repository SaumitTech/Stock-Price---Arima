function adddet(x) {
    $("#" + x).show();
  }
  
  function removedet(x) {
    $("#" + x).hide();
  }






$("#crs").hide();
$("#xv").hide();
$("#yv").hide();
$("#yv0").hide();
$("#tweet").hide();
var xv = $("#xv").val();
var yv = $("#yv").val();
console.log(xv);
console.log("ninnvsnunveuronvoinfggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg");
console.log(yv);
function myFunction() {
    $(".search").hide();
    $(".cross").show();
}
function myFunction1() {
    $(".cross").hide();
    $(".search").show();
    document.getElementById("sbox").value = "";
    console.log(document.getElementById("sbox").value);
  }
//   $(".neo").hover(function(){
//     $(this).css("border-bottom", "3px solid yellow");
//     }, function(){
//     $(this).css("border-bottom", "3px solid pink");
//   });

// $(".neo").hover(function() {
//     var elem = document.getElementById("bottom");   
//     var pos = 0;
//     var id = setInterval(frame, 5);
//     function frame() {
//       if (pos == 250) {
//         clearInterval(id);
//       } else {
//         pos++; 
//         elem.style.top = pos + "px"; 
//         elem.style.left = pos + "px"; 
//       }
//     }
//   });
current();
$("#futurech").hide();
$("#sentimentsch").hide();
function current() {
    $("#currentch").show();
    $("#futurech").hide();
    $("#sentimentsch").hide();
    var xv1 = $("#xv").val();
    var yv01 = $("#yv0").val();
    var yv1 = $("#yv").val();
    var xv = xv1.split(",");
    var yv0 = yv01.split(",");
    var yv = yv1.split(",");
    xv[0] = xv[0].substring(1);
    yv[0] = yv[0].substring(1);
    yv0[0] = yv0[0].substring(1);

    console.log(typeof(xv),typeof(yv0)),typeof(yv);
    console.log(xv);
    console.log(yv0);
    console.log(yv);
    var ohlc = [],
        volume = [],
        dataLength = xv.length,
        i = 0;

    for (i; i < dataLength; i += 1) {

        volume.push([
            parseFloat(xv[i]), // the date
            parseFloat(yv0[i])
            // the volume
        ]);
        ohlc.push([
        parseFloat(xv[i]), // the date
            
            parseFloat(yv[i]) // the volume
        ]);
    }

    console.log(volume);


    var seriesOptions = [],
    seriesCounter = 0,
    names = ['Stock Price'];




    function createChart() {
    Highcharts.stockChart('currentch', {
        yAxis: [{
            labels: {
                align: 'left'
            },
            height: '100%',
            resize: {
                enabled: true
            }
        }],
        tooltip: {
            shape: 'square',
            headerShape: 'callout',
            borderWidth: 0,
            shadow: false,
            positioner: function (width, height, point) {
                var chart = this.chart,
                    position;

                if (point.isHeader) {
                    position = {
                        x: Math.max(
                            // Left side limit
                            chart.plotLeft,
                            Math.min(
                                point.plotX + chart.plotLeft - width / 2,
                                // Right side limit
                                chart.chartWidth - width - chart.marginRight
                            )
                        ),
                        y: point.plotY
                    };
                } else {
                    position = {
                        x: point.series.chart.plotLeft,
                        y: point.series.yAxis.top - chart.plotTop
                    };
                }

                return position;
            }
        },
        series: seriesOptions
        ,
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 800
                },
                chartOptions: {
                    rangeSelector: {
                        inputEnabled: false
                    }
                }
            }]
        }
    });
    }

    for (i = 0; i < names.length; i++) {
    name = names[i];
    if (i==0) {
    data = volume;
    }
    if (i==1) {
    data = ohlc;
    }
    seriesOptions[i] = {
        name: name,
        data: data
    };
    }

    createChart();
}




function future() {
    $("#futurech").show();
    $("#currentch").hide();
    $("#sentimentsch").hide();
    // split the data set into ohlc and volume
    // var xv = [1527811200000, 1528070400000, 1528156800000, 1528243200000, 1528329600000, 1528416000000, 1528675200000, 1528761600000, 1528848000000, 1528934400000, 1529020800000, 1529280000000, 1529366400000, 1529452800000, 1529539200000, 1529625600000, 1529884800000, 1529971200000, 1530057600000, 1530144000000, 1530230400000, 1530489600000, 1530576000000, 1530748800000, 1530835200000, 1531094400000, 1531180800000, 1531267200000, 1531353600000, 1531440000000, 1531699200000, 1531785600000, 1531872000000, 1531958400000, 1532044800000, 1532304000000, 1532390400000, 1532476800000, 1532563200000, 1532649600000, 1532908800000, 1532995200000, 1533081600000, 1533168000000, 1533254400000, 1533513600000, 1533600000000, 1533686400000, 1533772800000, 1533859200000, 1534118400000, 1534204800000, 1534291200000, 1534377600000, 1534464000000, 1534723200000, 1534809600000, 1534896000000, 1534982400000, 1535068800000, 1535328000000, 1535414400000, 1535500800000, 1535587200000, 1535673600000, 1536019200000, 1536105600000, 1536192000000, 1536278400000, 1536537600000, 1536624000000, 1536710400000];
    // var yv0 = [99.27999877929688, 101.26000213623048, 102.0, 102.4800033569336, 102.6500015258789, 101.08999633789062, 101.01000213623048, 101.0999984741211, 101.72000122070312, 101.6500015258789, 101.51000213623048, 100.01000213623048, 99.6500015258789, 101.37000274658205, 102.08000183105469, 100.41000366210938, 100.0, 98.81999969482422, 99.58000183105469, 97.37999725341795, 98.93000030517578, 98.0999984741211, 100.4800033569336, 99.5, 99.88999938964844, 101.6500015258789, 102.0, 101.1500015258789, 102.7699966430664, 104.37000274658205, 105.4000015258789, 104.61000061035156, 105.94000244140624, 104.93000030517578, 108.08000183105469, 106.3000030517578, 108.56999969482422, 107.95999908447266, 110.73999786376952, 110.18000030517578, 107.19000244140624, 106.48999786376952, 106.02999877929688, 105.4000015258789, 107.8000030517578, 108.12000274658205, 108.55999755859376, 109.33000183105469, 109.70999908447266, 109.41999816894531, 109.23999786376952, 108.55999755859376, 108.48999786376952, 108.3000030517578, 107.36000061035156, 107.51000213623048, 106.91999816894531, 105.8499984741211, 107.1500015258789, 107.66999816894531, 109.2699966430664, 109.94000244140624, 110.4499969482422, 111.66999816894531, 111.69000244140624, 110.8499984741211, 111.01000213623048, 108.25, 108.2300033569336, 108.83999633789062, 108.9000015258789, 111.43000030517578];
    // var yv =[99.58569374296464, 99.80757176117409, 99.76453824761019, 99.86846298843561, 100.25504419174534, 100.30369767948183, 100.18270411173691, 100.64237037694276, 100.84862932132786, 100.81657453221686, 100.92159719002528, 101.09892139358728, 101.41576972348867, 101.64082925684421, 101.60097725842643, 101.70808351439794, 102.09784623285377, 102.14968123573635, 102.03186918313752, 102.49471696348947, 102.70415742302066, 102.67528414905576, 102.78348832201026, 102.96399404071833, 103.28402388576582, 103.51226493426745, 103.47559445099574, 103.58588222211336, 103.97882645571528, 104.03384297374396, 103.91921243629122, 104.38524173178925, 104.59786370646654, 104.57217194764772, 104.68355763574831, 104.86724486960249, 105.19045622979606, 105.42187879344378, 105.38838982531817, 105.50185911158187, 105.89798486032987, 105.95618289350463, 105.84473387119799, 106.31394468184212, 106.52974817166549, 106.50723792799276, 106.62180513123946, 106.80867388023972, 107.13506675557939, 107.36967083437321, 107.3393633813937, 107.45601418280349, 107.85532144669759, 107.91670099501845, 107.80843348785788, 108.28082581364811, 108.49981081861758, 108.48048209009094, 108.59823080848372, 108.78828107263007, 109.11785546311582, 109.35564105705572, 109.32851511922229, 109.44834743577817, 109.85083621481837, 109.91539727828531, 109.81031128627085, 110.28588512720715, 110.5080516473227, 110.49190443394215, 110.61283466748102, 110.80606644677347];
    var xv1 = $("#xv").val();
    var yv01 = $("#yv0").val();
    var yv1 = $("#yv").val();
    var xv = xv1.split(",");
    var yv0 = yv01.split(",");
    var yv = yv1.split(",");
    xv[0] = xv[0].substring(1);
    yv[0] = yv[0].substring(1);
    yv0[0] = yv0[0].substring(1);

    console.log(typeof(xv),typeof(yv0)),typeof(yv);
    console.log(xv);
    console.log(yv0);
    console.log(yv);
    var ohlc = [],
        volume = [],
        dataLength = xv.length,
        i = 0;

    for (i; i < dataLength; i += 1) {

        volume.push([
            parseFloat(xv[i]), // the date
            parseFloat(yv0[i])
            // the volume
        ]);
        ohlc.push([
        parseFloat(xv[i]), // the date
            
            parseFloat(yv[i]) // the volume
        ]);
    }

    console.log(volume);


    var seriesOptions = [],
    seriesCounter = 0,
    names = ['Stock Price','Prediction'];




    function createChart() {
    Highcharts.stockChart('futurech', {
        yAxis: [{
            labels: {
                align: 'left'
            },
            height: '100%',
            resize: {
                enabled: true
            }
        }],
        tooltip: {
            shape: 'square',
            headerShape: 'callout',
            borderWidth: 0,
            shadow: false,
            positioner: function (width, height, point) {
                var chart = this.chart,
                    position;

                if (point.isHeader) {
                    position = {
                        x: Math.max(
                            // Left side limit
                            chart.plotLeft,
                            Math.min(
                                point.plotX + chart.plotLeft - width / 2,
                                // Right side limit
                                chart.chartWidth - width - chart.marginRight
                            )
                        ),
                        y: point.plotY
                    };
                } else {
                    position = {
                        x: point.series.chart.plotLeft,
                        y: point.series.yAxis.top - chart.plotTop
                    };
                }

                return position;
            }
        },
        series: seriesOptions
        ,
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 800
                },
                chartOptions: {
                    rangeSelector: {
                        inputEnabled: false
                    }
                }
            }]
        }
    });
    }

    for (i = 0; i < names.length; i++) {
    name = names[i];
    if (i==0) {
    data = volume;
    }
    if (i==1) {
    data = ohlc;
    }
    seriesOptions[i] = {
        name: name,
        data: data
    };
    }

    createChart();
}



// tweeter


function sentiments() {
    $("#currentch").hide();
    $("#futurech").hide();
    $("#sentimentsch").show();

    // var xv1 = $("#xv").val();
    // var yv01 = $("#yv0").val();
    // var yv1 = $("#yv").val();
    // var xv = xv1.split(",");
    // var yv0 = yv01.split(",");
    // var yv = yv1.split(",");
    // xv[0] = xv[0].substring(1);
    // yv[0] = yv[0].substring(1);
    // yv0[0] = yv0[0].substring(1);


    var twee0 = $("#tweet").val();
    console.log(twee0);
    var twee1 = twee0.split(",");
    var postwe = parseInt(twee1[0].substring(1));
    var negtwe = parseInt(twee1[1]);
    var neutwe = parseInt(twee1[2].substring(0,twee1[2].length - 1));
    console.log(postwe,negtwe,neutwe);

    Highcharts.chart('sentimentsch', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: "People's sentiment: "
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Positive Sentiment',
                y: postwe,
            }, {
                name: 'Negative sentiments',
                y: negtwe
            }, {
                name: 'Neutral sentiments',
                y: neutwe
            }]
        }]
    });
}