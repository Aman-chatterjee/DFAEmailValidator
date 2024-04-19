function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Get the email parameter value from the URL
const email = getUrlParameter('email');
const emailID = document.getElementById('emailID');
emailID.innerText = email;

function isAlphanumeric(c) {
    return (c >= 'a' && c <= 'z') ||
           (c >= 'A' && c <= 'Z') ||
           (c >= '0' && c <= '9');
}

function isAlpha(c) {
    return (c >= 'a' && c <= 'z') ||
           (c >= 'A' && c <= 'Z');
}

function isDigit(c) {
    return c >= '0' && c <= '9';
}

function isSpecialChar(c) {
    const validSpecialChars = "!#$%&'*+-/=?^_{}|";
    return validSpecialChars.includes(c);
}



function isValidEmail(email) {
    const State = {
        START: 'START',
        LOCAL: 'LOCAL',
        AT: 'AT',
        DOMAIN_NAME: 'DOMAIN_NAME',
        TOP_DOMAIN: 'TOP_DOMAIN',
        FINAL: 'FINAL'
    };

    const colors = ["red", "blue", "green", "orange", "purple", "yellow", "brown", "pink", "maroon", "navy", "darkgreen", "darkorange", "darkviolet", "darkgoldenrod", "darkslategray"];

    let state = State.START;
    let j = 0;


    for (let i = 0; i < email.length; i++) {
        const c = email[i];

        setTimeout(() => {
        switch (state) {
            case State.START:
                if (isAlphanumeric(c) || isSpecialChar(c)) {
                    state = State.LOCAL;
                    d3.selectAll("line")
                    .filter(function(d, i) { return i === 0; })
                    .style("stroke-width", 2.25)
                    .attr("stroke", colors[j]);
                } else {
                    return false;
                }
                break;

            case State.LOCAL:
                if (isAlphanumeric(c) || isSpecialChar(c)) {
                     svg.selectAll(".self-loop")
                    .filter(function(d, i) { return i === 0; })
                    .style("stroke-width", 2.25)
                    .attr("stroke", colors[j]);
                } else if (c === '.') {
                    state = State.START;
                    d3.selectAll("line")
                    .filter(function(d, i) { return i === 5; })
                    .style("stroke-width", 2.25)
                    .attr("stroke", colors[j]);
                } else if (c === '@') {
                    state = State.AT;
                    d3.selectAll("line")
                    .filter(function(d, i) { return i === 1; })
                    .style("stroke-width", 2.25)
                    .attr("stroke", colors[j]);
             
                } else {
                    return false;
                }
                break;

            case State.AT:
                if (isAlphanumeric(c)) {
                    state = State.DOMAIN_NAME;
                    d3.selectAll("line")
                    .filter(function(d, i) { return i === 2; })
                    .style("stroke-width", 2.25)
                    .attr("stroke", colors[j]);
                } else {
                    return false;
                }
                break;

            case State.DOMAIN_NAME:
                console.log("DOMAIN_NAME =", c);
                if (isAlphanumeric(c) || isSpecialChar(c)) {
                    // Self Loop
                    svg.selectAll(".self-loop")
                    .filter(function(d, i) { return i === 1; })
                    .style("stroke-width", 2.25)
                    .attr("stroke", colors[j]);
                } else if (c === '.') {
                    state = State.TOP_DOMAIN;
                    d3.selectAll("line")
                    .filter(function(d, i) { return i === 3; })
                    .style("stroke-width", 2.25)
                    .attr("stroke", colors[j]);
                } else {
                    return false;
                }
                break;

            case State.TOP_DOMAIN:
             
                if (isAlpha(c)) {
                    state = State.FINAL;
                    d3.selectAll("line")
                    .filter(function(d, i) { return i === 4; })
                    .style("stroke-width", 2.25)
                    .attr("stroke", colors[j]);
                } 
                else if (isDigit(c) || isSpecialChar(c)) {
                    state = State.DOMAIN_NAME;
                    d3.selectAll("line")
                    .filter(function(d, i) { return i === 6; })
                    .style("stroke-width", 2.25)
                    .attr("stroke", colors[j]);
     
                } else {
                    return false;
                }
                break;

            case State.FINAL:
            
                if (c === '.') {
                    state = State.TOP_DOMAIN;
                    d3.selectAll("line")
                    .filter(function(d, i) { return i === 7; })
                    .style("stroke-width", 2.25)
                    .attr("stroke", colors[j]);
                }
                else if (isAlpha(c)) {
                    // Self loop
                    svg.selectAll(".self-loop")
                    .filter(function(d, i) { return i === 2; })
                    .style("stroke-width", 2.25)
                    .attr("stroke", colors[j]);

                }else {
                    return false;
                }
                break;

            default:
                return false;
        }
        if(j < colors.length-1) j++;
        else j = 0;
        
    }, i * 1500);
}

}



















const d3Window = document.getElementById('visualization');
d3Window.style.width = screen.width;
d3Window.style.height = screen.height;

// Select the SVG container
var svg = d3.select("#visualization");

// Data for circle positions
var circleData = [
    { cx: 200, cy: 100, r: 40, fill: "#fff", stroke: "black", strokeWidth: 2, text: "Start" },
    { cx: 450, cy: 100, r: 40, fill: "#fff", stroke: "black", strokeWidth: 2, text: "Local" },
    { cx: 650, cy: 100, r: 40, fill: "#fff", stroke: "black", strokeWidth: 2, text: "AT" },
    { cx: 900, cy: 100, r: 40, fill: "#fff", stroke: "black", strokeWidth: 2, text: "Domain" },
    { cx: 1150, cy: 100, r: 45, fill: "#fff", stroke: "black", strokeWidth: 2, text: "Top Domain" },

    { cx: 1200, cy: 300, r: 35, fill: "#fff", stroke: "black", strokeWidth: 2, text: "" },
    { cx: 1200, cy: 300, r: 45, fill: "#ffffff86", stroke: "black", strokeWidth: 2, text: "Final" },
    
    { cx: 700, cy: 400, r: 40, fill: "#fff", stroke: "black", strokeWidth: 2, text: "Dead" }
];

// Create the circle
var circles = svg.selectAll("circle")
                .data(circleData)
                .enter()
                .append("circle")
                .attr("cx", function(d) { return d.cx; })
                .attr("cy", function(d) { return d.cy; })
                .attr("r", function(d) { return d.r; })
                .style("fill", function(d) { return d.fill; })
                .style("stroke", function(d) { return d.stroke; }) // Set the stroke color
                .style("stroke-width", function(d) { return d.strokeWidth; }); // Set the stroke width

// Add text to each circle
var texts = svg.selectAll("text")
            .data(circleData)
            .enter()
            .append("text")
            .attr("x", function(d) { return d.cx; }) // Position text at circle's center
            .attr("y", function(d) { return d.cy; }) // Position text at circle's center
            .attr("text-anchor", "middle") // Center the text horizontally
            .attr("dy", ".35em") // Center the text vertically
            .text(function(d) { return d.text; }); // Set the text content  
            
// Arrow transition lines
var transitionData = [
    { x1: circleData[0].cx + circleData[0].r, y1: circleData[0].cy+15, x2: circleData[1].cx - circleData[1].r -5, y2: circleData[1].cy +15, label: "char/digit/symbol" },
    { x1: circleData[1].cx + circleData[1].r, y1: circleData[1].cy, x2: circleData[2].cx - circleData[2].r -5, y2: circleData[2].cy, label: "@" },
    { x1: circleData[2].cx + circleData[2].r, y1: circleData[2].cy, x2: circleData[3].cx - circleData[3].r -5, y2: circleData[3].cy, label: "char/digit/symbol" },
    { x1: circleData[3].cx + circleData[3].r, y1: circleData[3].cy+15, x2: circleData[4].cx - circleData[4].r -5, y2: circleData[4].cy+15, label: "dot" },
    { x1: circleData[4].cx + circleData[4].r, y1: circleData[4].cy, x2: circleData[5].cx+15, y2: circleData[5].cy - circleData[5].r -10, label: "char" },

    { x1: circleData[1].cx - circleData[1].r, y1: circleData[1].cy-15, x2: circleData[0].cx + circleData[0].r + 5, y2: circleData[0].cy-15, label: "dot" },
    { x1: circleData[4].cx - circleData[4].r, y1: circleData[4].cy-15, x2: circleData[3].cx + circleData[3].r + 5, y2: circleData[3].cy-15, label: "digit/symbol" },
    { x1: circleData[6].cx -30, y1: circleData[6].cy - circleData[6].r+10, x2: circleData[4].cx -25, y2: circleData[4].cy + circleData[4].r - 5, label: "dot" }
];

// Add transitions to dead state
var deadTransitions = [];
circleData.forEach(function(circle, index) {
    if (circle.text !== "Dead" && index !== 5) { // Exclude transitions from circle 6
        var transition = {
            x1: circle.cx,
            y1: circle.cy + circle.r,
            x2: circleData[7].cx - circleData[7].r+40,
            y2: circleData[7].cy - circleData[7].r,
            label: "other"
        };
        deadTransitions.push(transition);
    }
});

// Extend the transition data array
transitionData = transitionData.concat(deadTransitions);

// Create the transition lines
var transitions = svg.selectAll("line")
    .data(transitionData)
    .enter()
    .append("line")
    .attr("x1", function(d) { return d.x1; })
    .attr("y1", function(d) { return d.y1; })
    .attr("x2", function(d) { return d.x2; })
    .attr("y2", function(d) { return d.y2; })
    .attr("stroke", "black")
    .attr("marker-end", "url(#arrow)");

// Add labels to transitions
var transitionLabels = svg.selectAll(".transition-label")
    .data(transitionData)
    .enter()
    .append("text")
    .attr("class", "transition-label")
    .attr("x", function(d, i) {
    if(i === 7){
        return (d.x1 + d.x2 - 50) / 2; // Move the last label to the left
    }
    else if (i === 4) {
        return (d.x1 + d.x2 + 60) / 2; // Move the last label to the right
    } else {
        return (d.x1 + d.x2) / 2;
    }
    })
    .attr("y", function(d, i) { 
        if(i === 6 || i === 7){
        return (d.y1 + d.y2 -30) / 2; // Move the last label to the left
        }else{
             return (d.y1 + d.y2 + 30) / 2;    
        }        
     })
    .attr("text-anchor", "middle")
    .attr("dy", ".35em")
    .text(function(d) { return d.label; });

// Create arrowhead marker
svg.append("defs").append("marker")
    .attr("id", "arrow")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 5)
    .attr("markerWidth", 10)
    .attr("markerHeight", 10)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5");


// Add arrowhead marker for self-loops
svg.append("defs").append("marker")
    .attr("id", "self-loop-arrow")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5");


// Add self-loops
var selfLoops = svg.selectAll(".self-loop")
    .data([1, 3, 5]) // Indices of circles 2, 4, and 6
    .enter()
    .append("path")
    .attr("class", "self-loop")
    .attr("d", function(d) {
        var circle = circleData[d];
        var x = circle.cx;
        var y = circle.cy + circle.r-60; // Adjust the y-coordinate to position the loop below the circle
        var r = circle.r-5; // Adjust the radius of the loop
        if (d === 5) {
        y += 60; // Adjust the y-coordinate for the final state loop
        return `M${x - r},${y} Q${x - r},${y + 2 * r} ${x},${y + 2 * r} Q${x + r},${y + 2 * r} ${x + r},${y}`;
        }   
        return `M${x - r},${y} Q${x - r},${y - 2 * r} ${x},${y - 2 * r} Q${x + r},${y - 2 * r} ${x + r},${y}`;
    })
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("fill", "none")
    .attr("marker-end", "url(#self-loop-arrow)");


var selfLoopLabelData = [
    { label: "char/digit/symbol" },
    { label: "char/symbol" },
    { label: "char" }
];

// Add self-loop labels
var selfLoopLabels = svg.selectAll(".self-loop-label")
.data(selfLoopLabelData)
.enter()
.append("text")
.attr("class", "self-loop-label")
.attr("x", function(d, i) { return circleData[i * 2 + 1].cx; }) // Position the label at the center of the circle
.attr("y", function(d, i) { 
    if(i == selfLoopLabelData.length-1)
    return circleData[i * 2 + 1].cy -  circleData[i * 2 + 1].r +145;
    else
    return circleData[i * 2 + 1].cy -  circleData[i * 2 + 1].r - 75;
 }) // Adjust the y-coordinate to position the label above the circle
.attr("text-anchor", "middle")
.attr("dy", ".35em")
.text(function(d) { return d.label; }); // Set the text content to the label provided in the data array



isValidEmail(email);