function makeChart(ticker) {
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  d3.select("svg").remove();
  
  const centerIMG = document.getElementById("centerimg");
  
  function closeCenerImg() {
    centerIMG.style.display = "none";
  }
  closeCenerImg();

  const margin = {top: 10, right: 30, bottom: 50, left: 60},
  width = document.documentElement.clientWidth * .65 - margin.left - margin.right,
  height = document.documentElement.clientHeight * .8 - margin.top - margin.bottom;

  const svg = d3.select("#container")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

  d3.csv(`./sampleData/monthly_${ticker}.csv`,
    function(d){
        return { date : d3.timeParse("%Y-%m-%d")(d.timestamp), open : d.open, high : d.high, low : d.low, close : d.close};
    }).then(
      function(data) {
        data = data.reverse();
        
        const x = d3.scaleTime()
          .domain(d3.extent(data, function(d) { return d.date; }))
          .range([ 0, width ]);
        
        const y = d3.scaleLinear()
          .domain([0, d3.max(data, function(d) { return +d.high; })])
          .range([ height, 0 ]);
        
        svg.append("g") 
          .attr("transform", `translate(0, ${height})`)
          .attr("class", "x-axis")
          .transition() 
          .duration(2500)
          // .attr("transform", "rotate(-70)")
          .call(d3.axisBottom(x))
          // .attr("transform", "rotate(-70)");
        
        svg.append("g") 
          .transition() 
          .duration(2500)
          .call(d3.axisLeft(y));

        svg
          .append("text")
          .attr("transform", "rotate(-90)")
          // .attr("transform", "rotate(-70)")
          .attr("y", 0 - margin.left)
          .attr("x", 0 - height / 2)
          .attr("dy", ".75em")
          .text("USD");
          
        const linePath = svg
          .append("path")
          .datum(data)
          .attr("class","line")
          .transition()
          .duration(2500)

        linePath
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
              .x(function (d) { return x(d.date) })
              .y(function (d) { return y(d.close)})
            );
        
        svg
            .append("text")
            .attr("class", "title2")
            .attr("x", width / 2)
            .attr("y", 20 - margin.top / 2)
            .attr("text-anchor", "middle")
            .text(ticker + ' stock performance');

        const overlay = svg
          .append("g")
          .attr("class", "overlay")
          .style("display", "none");

        overlay
          .append("line")
          .attr("class", "x")
          .style("stroke-dasharray", "3,3")
          .attr("y2", height);

        overlay
          .append("line")
          .attr("class", "y")
          .style("stroke-dasharray", "3,3")
          // .style("background", "rgba(0,0,0,.3)")
          .attr("x2", width);
          
        overlay
          .append("circle")
          .attr("class", "y")
          .attr("r", 5);

        overlay
          .append("text")
          .attr("class", "date")
          .attr("x", width / 25)
          .attr("y", 50 - margin.top / 2)
          .style("opacity", "0.6");

        overlay
          .append("text")
          .attr("class", "open")
          .attr("x", width / 25)
          .attr("y", 70 - margin.top / 2)
          .style("background", "rgba(0,0,0,.3)")
          .style("opacity", "0.6");

        overlay
          .append("text")
          .attr("class", "high")
          .attr("x", width / 25 )
          .attr("y", 90 - margin.top / 2)
          .style("opacity", "0.6")
          // .attr("background", "rgba(0,0,0,.3)")

        overlay
          .append("text")
          .attr("class", "low")
          .attr("x", width / 25)
          .attr("y", 110 - margin.top / 2)
          .style("opacity", "0.6");

        overlay
          .append("text")
          .attr("class", "close")
          .attr("x", width / 25)
          .attr("y", 130 - margin.top / 2)
          .style("opacity", "0.6");

        overlay
          .append("text")
          .attr("class", "change")
          .attr("x", width / 25)
          .attr("y", (150 - margin.top / 2))
          .style("opacity", "0.6");

        overlay
          .append("text")
          .attr("class", "oChange")
          .attr("x", width / 25)
          .attr("y", 170 - margin.top / 2)
          .style("opacity","0.6");
          
        const losses = ['DIDI','GPRO','KHC','UAA', 'CTXR']

        function mouseMove(e) {
          const bsec = d3.bisector((d) => d.date).left,
            x0 = x.invert(d3.pointer(e, this)[0]),
            i = bsec(data, x0, 1),
            z1 = data[0],
            d0 = data[i],
            d1 = data[i-1],
            d = x0 - d0.date < d1.date - x0 ? d0 : d1;

          overlay
            .select("circle.y")
            .attr("transform", `translate(${x(d.date)},${y(d.close)})`)
            .style("fill","red")

          overlay
            .select("text.date")
            .text(`Date: ${d.date.toLocaleDateString("en-US", dateOptions)}`)
            .attr("x", () => {
              if (losses.includes(ticker)) {
                return ((width / 6) * 4)
              } else {
                return (width / 25)
              }
            });

          overlay
            .select("text.high")
            .text(`High: $${d.high}`)
            .attr("x", () => {
              if (losses.includes(ticker)) {
                return ((width / 6) * 4)
              } else {
                return (width / 25)
              }
            });
          overlay
            .select("text.open")
            .text(`Open: $${d.open}`)
            .attr("x", () => {
              if (losses.includes(ticker)) {
                return ((width/6) * 4)
              }else {
                return (width / 25)
              }
              });
          overlay
            .select("text.close")
            .text(`Close: $${d.close}`)
            .attr("x", () => {
              if (losses.includes(ticker)) {
                return ((width/6) * 4)
              }else {
                return (width / 25)
              }
              });
          overlay
            .select("text.low")
            .text(`Low: $${d.low}`)
            .attr("x", () => {
              if (losses.includes(ticker)) {
                return ((width / 6) * 4)
              } else {
                return (width / 25)
              }
            });
          overlay
            .select("text.change")
            .text(`Daily % Change: ${((d1.close-d0.close)/d0.close * 100).toFixed(2)}%`)
            .style('fill', (color) => {
              if (`${((d1.close - d0.close) / d0.close * 100).toFixed(2)}` > 0) {
                return 'green'
              } else {
                return 'red'
              }
            })
            .attr("x", () => {
              if (losses.includes(ticker)) {
                return ((width / 6) * 4)
              } else {
                return (width / 25)
              }
            });
          overlay
            .select("text.oChange")
            .text(`All-time % Change: ${((d.close - z1.open) / z1.open * 100).toFixed(2)}%`)
            .style('fill',(color) => {
              if (`${((d.close - z1.open) / z1.open * 100).toFixed(2)}` > 0) {
                return 'green'
              } else {
                return 'red'
              }
            }).attr("x", () => {
              if (losses.includes(ticker)) {
                return ((width / 6) * 4)
              } else {
                return (width / 25)
              }
            });
            
          overlay
            .select(".x")
            .attr("transform", `translate(${x(d.date)},${y(d.close)})`)
            .attr("yDash", height - y(d.close));

          overlay
            .select(".y")
            .attr("transform", `translate(${-(width)},${y(d.close)})`)
            .attr("x2", width + x(d.date));
        }
        svg
          .append("rect")
          .attr("width", width)
          .attr("height", height)
          .style("fill", "none")
          .style("cursor","pointer")
          .style("pointer-events", "all")
          .on("mouseover", () => {
            overlay.style("display", "block");
          })
          .on("mouseout", () => {
            overlay.style("display", "none");
          })
          .on("touchmove mousemove", mouseMove);
      })
      
}