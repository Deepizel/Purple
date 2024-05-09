import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-mapper',
  templateUrl: './location-mapper.component.html',
  styleUrls: ['./location-mapper.component.css'],
})
export class LocationMapperComponent implements OnInit {
  userLocation: string | null = null;
  
  ngOnInit(): void {
    this.getUserLocation();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Handle successful location retrieval
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.userLocation = `Latitude: ${latitude}, Longitude: ${longitude}`;
        },
        (error) => {
          // Handle location retrieval error
          console.error('Error getting location:', error);
          this.userLocation = 'Location not available';
        }
      );
    } else {
      // Browser doesn't support geolocation
      console.error('Geolocation is not supported by this browser.');
      this.userLocation = 'Geolocation not supported';
    }
  }
}
