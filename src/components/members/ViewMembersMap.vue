<template>
	<v-card class="pa-1">
		<MglMap 
			:accessToken="accessToken" 
			:mapStyle="mapStyle" 
			:zoom="zommLevel"
			:center="centerCords"
			class="map" >
		</MglMap>
	</v-card>
</template>

<script>
// @ is an alias to /src
import Mapbox from "mapbox-gl";
import { MglMap } from "vue-mapbox";


export default {
  name: 'booking',
  components: {
    MglMap
  },
  data(){
		return {
			accessToken: 'pk.eyJ1IjoidGluZ2VsIiwiYSI6ImNrNTQyN2t0eTBkbmQzdGs2bjhmdjR1NGQifQ.pKlnpvTXEhmBP5LSQdQEAQ', 
			mapStyle: "mapbox://styles/mapbox/light-v10",
			zommLevel: 5,
			centerCords:[9, 50.2],
			popupCoordinates: [9, 50.2],
		
		geoJsonSource: {
			type: "FeatureCollection",
			id: "thisIsMySource",
			features: [
				{
				type: "Feature",
				geometry: {
					type: "Point",
					coordinates: [102.0, 0.5]
					},
				properties: {
				id: "value0"
					}		
				}
			]
		},
		geoJsonLayer: {
			type: "circle",
			paint: {
				"circle-color": "red"
			}
		}
	};
  },
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  }
 
}
</script>
<style>
.map {
	width: 100%;
	height: 500px;
}
</style>