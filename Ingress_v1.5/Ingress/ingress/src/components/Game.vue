<template>
  <div id="app">
    <h1 style="text-align: center;">INGRESS</h1>
    <div id="map" style="width: 100%; height: 600px;"></div>
    
    <div v-if="selectedTargetPoint" class="overlay">
      <div class="modal">
        <div class="modal-content">
          <span class="close-button" @click="closeModal">&times;</span>
          <div>
            <span>目标点名称: </span>
            <strong>{{ selectedTargetPoint.name }}</strong>
          </div>
          <div>
            <span>状态: </span>
            <strong>{{ selectedTargetPoint.status }}</strong>
          </div>
          <button class="claim-button" @click="claimPoint">占领</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global AMap */
export default {
  name: 'GameView', // 更改组件名称为 GameView
  data() {
    return {
      map: null,
      userLocation: { lat: null, lng: null },
      selectedTargetPoint: null,
      claimRadius: 1500,
      targetPoints: [
        { name: '目标点 1', lat: 30.312171, lng: 120.381504 },
        { name: '目标点 2', lat: 30.312271, lng: 120.381604 },
        { name: '目标点 3', lat: 30.312371, lng: 120.381704 },
        { name: '目标点 4', lat: 30.312471, lng: 120.381804 },
        { name: '目标点 5', lat: 30.312571, lng: 120.381904 },
        // 添加其他目标点...
      ].map((point, index) => ({ ...point, status: '未占领', id: index + 1 })),
    };
  },
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://webapi.amap.com/maps?v=1.4.15&key=fc0a3a62cdefaca76e839ad81bec293a'; 
    script.onload = () => {
      console.log('高德地图 API 加载成功');
      this.getUserLocation();
    };
    script.onerror = () => {
      console.error('高德地图 API 加载失败');
    };
    document.head.appendChild(script);
  },
  methods: {
    async getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.userLocation = { lat: latitude, lng: longitude };
            this.initMap();
          },
          (error) => {
            console.error('获取用户位置失败:', error.message);
          }
        );
      } else {
        console.error('此浏览器不支持地理定位');
      }
    },
    initMap() {
      this.map = new AMap.Map('map', {
        center: [this.userLocation.lng, this.userLocation.lat],
        zoom: 14,
        resizeEnable: true,
      });

      this.addUserMarker();
      this.addTargetMarkers();
    },
    addUserMarker() {
      const marker = new AMap.Marker({
        position: [this.userLocation.lng, this.userLocation.lat],
        icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        title: '我的位置',
      });
      marker.setMap(this.map);

      const circle = new AMap.Circle({
        center: new AMap.LngLat(this.userLocation.lng, this.userLocation.lat),
        radius: this.claimRadius,
        strokeColor: '#0091FF',
        strokeOpacity: 0.5,
        fillColor: '#0091FF',
        fillOpacity: 0.3,
      });
      circle.setMap(this.map);
    },
    addTargetMarkers() {
      this.targetPoints.forEach(point => {
        const marker = new AMap.Marker({
          position: [point.lng, point.lat],
          title: point.name,
        });
        marker.setMap(this.map);
        marker.on('click', () => {
          this.selectedTargetPoint = point;
        });
      });
    },
    closeModal() {
      this.selectedTargetPoint = null;
    },
    claimPoint() {
      const targetPoint = this.selectedTargetPoint;
      const distance = this.calculateDistance(
        this.userLocation.lat,
        this.userLocation.lng,
        targetPoint.lat,
        targetPoint.lng
      );

      if (distance <= this.claimRadius) {
        targetPoint.status = '已占领';
        this.selectedTargetPoint = null;
        alert(`成功占领 ${targetPoint.name}!`);
      } else {
        alert('您距离目标点过远，无法占领。');
      }
    },
    calculateDistance(lat1, lng1, lat2, lng2) {
      const radLat1 = this.toRad(lat1);
      const radLat2 = this.toRad(lat2);
      const a = radLat1 - radLat2;
      const b = this.toRad(lng1) - this.toRad(lng2);
      const distance = 2 * Math.asin(Math.sqrt(Math.sin(a / 2) ** 2 + Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(b / 2) ** 2));
      const EARTH_RADIUS = 6378137;
      return distance * EARTH_RADIUS;
    },
    toRad(value) {
      return (value * Math.PI) / 180;
    }
  }
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.close-button {
  float: right;
  cursor: pointer;
}

.claim-button {
  margin-top: 10px;
}
</style>
