# JavaScript Project: [iiBi](https://alexdoes.github.io/iiBi/)

## Overview

iiBi is a simple visualization of stock growth. iiBi allows the user to select from a series of stocks to display
the respective stock's performance.

The user will be able to smoothly transition between stocks to display and the user will be able to follow along the path
of the data. The data will display the appropriate data relative to the position of the cursor over the graph.

## Functionality & MVPs

In iiBi, users will be able to :
<li> Select a stock to generate a graph of it's performance</li>
<li> Track the change in stock price with a marker </li>
<li> View data as an overlay on the graph </li>
<li> Toggle to display different stock graphs </li>

 ## Technologies, Libraries, APIs
This project will be implemented with the following technologies: 
<li> D3.js to render the data 
<li> Webpack to bundle the source JavaScript code
<li> Babel to transpile JavaScript for older browsers
<li> Alpha Vantage API to retrieve stock history
<li> Clearbit API to retrieve company logos
</li>


## Preview & Snippets

### Preview without hover ###
![noHover](https://github.com/AlexDoes/iiBi/blob/main/assets/projectSnippets/Screen%20Shot%202021-12-09%20at%2011.19.32%20AM.png)

### Preview with hover ###
![hover](https://github.com/AlexDoes/iiBi/blob/main/assets/projectSnippets/Screen%20Shot%202021-12-09%20at%2011.20.12%20AM.png)

### Snippet for switching display data from left to right(gains/losses as well) according to data point ### 
One of the issues I faced while displaying the charts is having the text overlap the line, one way to resolve this was by determining if the associated data has a history of downward trends. This also adjusts the daily change to show corresponding colors in relation to gains/losses since the previous data point.

![swap](https://github.com/AlexDoes/iiBi/blob/main/assets/projectSnippets/Screen%20Shot%202021-12-09%20at%2011.26.00%20AM.png)

### Snippet for removing the center image for the graphs ###

This was just a simple jquery to remove the image in the center before rendering the chart. 

![remove](https://github.com/AlexDoes/iiBi/blob/main/assets/projectSnippets/Screen%20Shot%202021-12-09%20at%2011.27.47%20AM.png)

Disclaimer: I am not a financial advisor, everything here is used for entertainment purposes only!
