import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MenuComponent from './MenuComponent';
import escapeRegExp from 'escape-string-regexp';
import Header from './Header';
import ErrorBoundary from './ErrorBoundary';
import SearchBar from './SearchBar';


class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      venues: [],
      markers: [],
      showVenues: [],
      query: '',
      notVisibleMarkers: []
  }}

  componentDidMount() {
    this.getVenues()
  }
    
  /* 
  * renderMap will do two things: 
  * - loads the script
  * - initializes the map
  */

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBN4qiukFmBTFwy_OjtlvnKGiAjU8hUp4g&callback=initMap")
    window.initMap = this.initMap;
  }

  
  /*
  * endPoint & parameters will set the guidelines on the page:
  */

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "KOTAN5ZH2UOCF1CEKFBKHL3XAUCK10AIHZHO5A3U5JGHJ0YZ",
      client_secret: "V31CMHFW5YXKRGJOYELPTXN1D3WZBZYT4BZXFZM4KQNIQ5G3",
      query: "sights",
      ll: "26.119261, -80.104329",
      v: "20181808",
      limit: 6
    }

    /* 
    * This is axios (FETCH API). I put this.renderMap() here instead of inside componentDidMount(), 
    * because the call is asynchronous and if put inside componentDidMount(),
    * the venues array is empty until the response is fetched. The renderMap() MUST be called 
    * AFTER getting the response, NOT before => This is CRUCIAL. 
    */

    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        venues: response.data.response.groups[0].items,
        showVenues: response.data.response.groups[0].items
      }, this.renderMap())
    })
    .catch(error => {
      alert(`Sorry, we were unable to fetch data from Foursquare!`)
      console.log("Foursquare error occured! " + error)
    })
  }


  initMap = () => {

    /* 
    * This will create the map.
    * Center coordinates point to Fort Lauderdale FL.
    * Zoom level set to 15.
    */
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 26.119261, lng: -80.104329},
      zoom: 15
    })

    // Create an InfoWindow with 180px width
    const infowindow = new window.google.maps.InfoWindow({ 
      maxWidth: 180
    })

    this.infowindow = infowindow

    // eslint-disable-next-line
    this.state.venues.map(myVenue => {

      /* 
      * Content of the InfoWindow 
      */
      const contentString = `<b>${myVenue.venue.name}</b> <br><i>${myVenue.venue.location.address}</i> 
      <br><br><i>Data provided by Foursquare.</i>`
    
      /* 
      * This will create a marker
      */
      const marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
        map: map,
        animation: window.google.maps.Animation.DROP,
        title: myVenue.venue.name
        })
      
        this.state.markers.push(marker)
         
      
      /* 
      * This creates the bounce of the icons
      */

      function animationEffect() {
        marker.setAnimation(window.google.maps.Animation.BOUNCE)
        setTimeout(function(){ marker.setAnimation(null) }, 550)
      }

      function openMarker() {
        // Setting the content of the InfoWindow
        infowindow.setContent(contentString)
        animationEffect()
        
      // Opens an InfoWindow after clicking on its marker
        infowindow.open(map, marker)
      }


      // Click on a marker
      marker.addListener('click', function() {
        openMarker()
        })
    }
  )
  }

  /*
   * This Handles the query update when the user uses the filter option 
  */
  updateQuery = query => {
    this.setState({ query })
    this.state.markers.map(marker => marker.setVisible(true))
    let filterVenues
    let notVisibleMarkers

    if (query) {
      const match = new RegExp(escapeRegExp(query), "i")
      filterVenues = this.state.venues.filter(myVenue =>
        match.test(myVenue.venue.name)
      )
      this.setState({ venues: filterVenues })
      notVisibleMarkers = this.state.markers.filter(marker =>
        filterVenues.every(myVenue => myVenue.venue.name !== marker.title)
      )

      /* 
       * This will hide the markers for venues not included in the filtered venues
      */
      notVisibleMarkers.forEach(marker => marker.setVisible(false))

      this.setState({ notVisibleMarkers })
    } else {
      this.setState({ venues: this.state.showVenues })
      this.state.markers.forEach(marker => marker.setVisible(true))
    }
  }


  render() {
    if (this.state.hasError) {
      return <div id="Error-message" aria-label="Error message">Sorry, there was an error!</div>
    } else {
      return (
      <main>
        <ErrorBoundary>
        
        <div id="header" aria-label="Header">
          <Header />
        
        <div id="SearchBar" aria-label="Search Bar">
          <SearchBar
            venues={ this.state.showVenues } 
            markers={ this.state.markers } 
            filteredVenues={ this.filteredVenues }
  	      	query={this.state.query}
            clearQuery={this.clearQuery}	      	
	        	updateQuery={b => this.updateQuery(b)}
	        	clickLocation={this.clickLocation}
          />
        </div>
        
        <div id="container" aria-label="Menu Container">
          <MenuComponent 
            venues={ this.state.venues }
            markers={ this.state.markers }
          />
        </div>

        <div id="map" aria-label="Map" role="application">
        </div>
        </div>
        </ErrorBoundary>
      </main>
    );
  }
  }
}

/*
* The function loadScript gets the url and gives the first selected 
* script tag. With the let "script" we create our next script tag.
* With "index" we select the first script tag, with "parentNode" 
* we select the parent node, with "insertBefore" we put our script
* at the very beginning, to the top of the lists.
*/


function loadScript(url) {
  let index  = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
  script.onerror = function() {
    alert("Error loading map! Check the URL!");
  };
}


export default App;

var element = document.documentElement;
  
if(element.scrollHeight > element.clientHeight) {
  // Overflow detected; force scroll bar
  element.style.overflow = 'scrollbar';
} else {
  // No overflow detected; prevent scroll bar
  element.style.overflow = 'hidden';
}