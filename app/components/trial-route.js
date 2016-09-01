import Ember from 'ember';

export default Ember.Component.extend({
  map: Ember.inject.service('google-map'),
  selectedItems: [],
  sortBy: ['category:asc'],
  sortedLocations: Ember.computed.sort('model', 'sortBy'),
  showFilteredLocations: false,
  filterByBar: Ember.computed.filterBy('model', 'category', 'Bar'),
  showFilteredBars: false,
  filterByStore: Ember.computed.filterBy('model', 'category', 'Store'),
  showFilteredStores: false,
  filterByMuseum: Ember.computed.filterBy('model', 'category', 'Museum'),
  showFilteredMuseums: false,
  filterByLandmark: Ember.computed.filterBy('model', 'category', 'Landmark'),
  showFilteredLandmarks: false,
  filterByHotel: Ember.computed.filterBy('model', 'category', 'Hotel'),
  showFilteredHotels: false,
  filterByFood: Ember.computed.filterBy('model', 'category', 'Food'),
  showFilteredFood: false,
  filterByEntertainment: Ember.computed.filterBy('model', 'category', 'Entertainment'),
  showFilteredEntertainment: false,
  filterByOther: Ember.computed.filterBy('model', 'category', 'Other'),
  showFilteredOther: false,
  filterByPark: Ember.computed.filterBy('model', 'category', 'Park'),
  showFilteredPark: false,
  actions: {
    hideAllOptions() {
      this.set('showFilteredLocations', false);
      this.set('showFilteredBars', false);
      this.set('showFilteredStores', false);
      this.set('showFilteredMuseums', false);
      this.set('showFilteredLandmarks', false);
      this.set('showFilteredHotels', false);
      this.set('showFilteredFood', false);
      this.set('showFilteredEntertainment', false);
      this.set('showFilteredOther', false);
      this.set('showFilteredPark', false);
    },
    showFilteredLocations() {
      this.toggleProperty('showFilteredLocations');
    },
    showFilteredBars() {
      this.toggleProperty('showFilteredBars');
    },
    showFilteredStores() {
      this.toggleProperty('showFilteredStores');
    },
    showFilteredMuseums() {
      this.toggleProperty('showFilteredMuseums');
    },
    showFilteredLandmarks() {
      this.toggleProperty('showFilteredLandmarks');
    },
    showFilteredHotels() {
      this.toggleProperty('showFilteredHotels');
    },
    showFilteredFood() {
      this.toggleProperty('showFilteredFood');
    },
    showFilteredEntertainment() {
      this.toggleProperty('showFilteredEntertainment');
    },
    showFilteredOther() {
      this.toggleProperty('showFilteredOther');
    },
    showFilteredPark() {
      this.toggleProperty('showFilteredPark');
    },
    showRouteMap() {
      var lengthCoordinates = this.get('selectedItems').length - 1
      var firstLat = this.get('selectedItems')[0].get('latitude');
      var firstLng = this.get('selectedItems')[0].get('longitude');
      var lastLat = this.get('selectedItems')[lengthCoordinates].get('latitude');
      var lastLng = this.get('selectedItems')[lengthCoordinates].get('longitude');
      var container = this.$('.map-display')[0];
      var directionsService = this.get('map').directionsService();
      var directionsDisplay = this.get('map').directionsDisplay();
      var options = {
        center: this.get('map').center(45.522462, -122.665674),
        zoom: 15
      };
      var fullMap = this.get('map').findMap(container, options);
      directionsDisplay.setMap(fullMap);
      var stops; var secondLat; var secondLng; var thirdLat; var thirdLng; var fourthLat; var fourthLng;
      if (this.get('selectedItems').length === 5) {
        secondLat = this.get('selectedItems')[1].get('latitude');
        secondLng = this.get('selectedItems')[1].get('longitude');
        thirdLat = this.get('selectedItems')[2].get('latitude');
        thirdLng = this.get('selectedItems')[2].get('longitude');
        fourthLat = this.get('selectedItems')[3].get('latitude');
        fourthLng = this.get('selectedItems')[3].get('longitude');
        stops = [{location: {lat: secondLat, lng: secondLng},
        stopover: true}, {location: {lat: thirdLat, lng: thirdLng},
        stopover: true}, {location: {lat: fourthLat, lng: fourthLng},
        stopover: true}];
      } else if (this.get('selectedItems').length === 4) {
        secondLat = this.get('selectedItems')[1].get('latitude');
        secondLng = this.get('selectedItems')[1].get('longitude');
        thirdLat = this.get('selectedItems')[2].get('latitude');
        thirdLng = this.get('selectedItems')[2].get('longitude');
        stops = [{location: {lat: secondLat, lng: secondLng},
        stopover: true}, {location: {lat: thirdLat, lng: thirdLng},
        stopover: true}];
      } else if (this.get('selectedItems').length === 3) {
        secondLat = this.get('selectedItems')[1].get('latitude');
        secondLng = this.get('selectedItems')[1].get('longitude');
        stops = [{location: {lat: secondLat, lng: secondLng},
        stopover: true}];
      } else {
        stops = [];
      }
      console.log(stops.length);
      var request = {
        origin: {lat: firstLat, lng: firstLng},
        destination: {lat: lastLat, lng: lastLng},
        travelMode: 'BICYCLING',
        waypoints: stops
      };
      directionsService.route(request, function(result, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(result);
        }
      });
    },
    valueHasChanged(location, isChecked){
      if(isChecked) {
        this.get('selectedItems').addObject(location);
      }
      else {
        this.get('selectedItems').removeObject(location);
      }
    }
  }
});
