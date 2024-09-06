<template>
  <VCardTitle class="mt-10">
    주변 지도..
  </VCardTitle>
  <div class="NaverMap">
    <NaverMap 
      id="map" 
      :mapOptions="mapOptions"
      :initLayers="initLayers"
      @onLoad="onLoadMap"
    >
      <NaverMarker 
        class="marker"        
        v-bind="currentPosition.data ?? { latitude: 0, longitude: 0 }"        
        @click="isMarkerOpen = !isMarkerOpen"
      />
      
      <NaverMarker        
        class="marker" 
        v-for="{ id, latitude, longitude, title } in naverLocationSearchResult.data"
        :key="id"
        :latitude="latitude"
        :longitude="longitude"
        @click="emit('markerClick', id)"
      >
        <div id="innerMarker">
          {{ title }}
        </div>
      </NaverMarker>

      <!-- <NaverInfoWindow
        id="windowInfo"
        :marker="marker"
        :open="isMarkerOpen"
        @onLoaded="onLoadedInfoWindow($event)"
        :options="infoWindowOptions"
      >
        <div ref="infoRef" class="windowInfo">
          인포
        </div>
      </NaverInfoWindow> -->
    </NaverMap>  
  </div>
</template>
  
<script setup lang="ts">
import { onMounted, reactive, ref, computed, onUpdated } from 'vue';
import { NaverInfoWindow, NaverMap, NaverMarker } from 'vue3-naver-maps';
import useMapOptions from '../../plugins/map';
import { useStore } from '../../store';
  
type Map = naver.maps.Map
type Marker = naver.maps.Marker
type HTMLIcon = naver.maps.HtmlIcon
type MapOptions = naver.maps.MapOptions
type InfoWindowOptions = naver.maps.InfoWindowOptions
type InfoWindow = naver.maps.InfoWindow

const { 
  DEFAULT_MARKER_SIZE, 
  DEFAULT_ZOOM_OPTIONS,
  DEFAULT_WINDOWINFO_OPTIONS,
} = useMapOptions()

const { asyncStates: { currentPosition, naverLocationSearchResult }, loadLatLng } = useStore() 

const initLayers = ['']

const emit = defineEmits<{(e: 'markerClick', id: number): void}>()

// Map
const mapRef = ref<Map>()

const mapOptions = computed<MapOptions>(() => ({
  ...DEFAULT_ZOOM_OPTIONS,
  ...currentPosition.data,    
}))

const onLoadMap = (map: Map) => {
  if (!currentPosition.data) return
  const latLng = new window.naver.maps.LatLng(currentPosition.data.latitude, currentPosition.data.longitude)
  map.setCenter(latLng)  
  mapRef.value = map
}


// Marker 
const marker = ref<Marker>()
const isMarkerOpen = ref<boolean>(false)

const onLoadMarker = (markerObject: Marker) => {  
  marker.value = markerObject   
}


const htmlIconOption = computed<HTMLIcon>(() => ({
  content: (marker.value ?? {}) as HTMLElement,
  ...DEFAULT_MARKER_SIZE
}))


// WindowInfo
const infoWindow = ref<InfoWindow>()
const infoRef = ref<HTMLElement | null>(null)

const infoWindowOptions = computed<InfoWindowOptions>(() => ({
  ...DEFAULT_WINDOWINFO_OPTIONS,
  position: {
    lat: currentPosition.data!.latitude,
    lng: currentPosition.data!.longitude
  },
  content: infoRef.value ?? ''
}))

const onLoadedInfoWindow = (windowInfoObject: InfoWindow) => {
  infoWindow.value = windowInfoObject  
}

onMounted(() => {
  loadLatLng()  
})

onUpdated(() => Object.values(currentPosition).includes(0) && loadLatLng())

</script>

<style lang="scss">
.NaverMap {
  display: flex;
  justify-content: center;
  align-items: center;
}

#map {
  width: 400px;
  height: 400px;
  border-radius: 1rem;

  &:focus {
    border: none !important;  
    outline: none !important;
  }
}

#innerMarker {
  position: relative;
  transition: all .1s ease-in-out;
  font-size: 12px;
  white-space: nowrap;
  background-color: rgba(255, 255, 255);
  padding: .25rem .5rem .25rem .5rem;
  border-radius: 5px;    
  transform: translateX(-80px);
    
  .icon {
    background-color: white;
    padding: 5px;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    margin-right: .5rem;
  }

  &::after {
    position: absolute;
    content: '';
    width: 0; 
    height: 0;
    background-color: transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid transparent;
    border-top: 5px solid rgb(255, 255, 255);
    border-right: 5px solid transparent;
    margin-top: 22px;
    right: 45%;
  }

  &:hover {
    font-weight: bold;
  }

}

.windowInfo {
  width: 200px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>