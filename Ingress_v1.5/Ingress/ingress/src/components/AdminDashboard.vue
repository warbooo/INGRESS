<template>
  <div class="dashboard">
    <h2>管理员仪表板</h2>
    <div class="checkpoints-grid">
      <CheckpointCard
        v-for="id in checkpointIds"
        :key="id"
        :checkpointId="id"
        @ready-to-capture="handleReadyToCapture"
        @captured="handleCaptured"
      />
    </div>
  </div>
</template>

<script>
import CheckpointCard from './CheckpointCard.vue'

export default {
  name: 'AdminDashboard',
  components: {
    CheckpointCard
  },
  data() {
    return {
      checkpointIds: ['CP001', 'CP002', 'CP003'] // 示例打卡点ID
    }
  },
  methods: {
    handleReadyToCapture() {
      // 当所有用户类型都已打卡时触发
      console.log('打卡点可以被占领了！');
    },
    handleCaptured(username) {
      // 当打卡点被占领时触发
      console.log(`${username} 占领了打卡点！`);
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.checkpoints-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}
</style> 