<template>
  <div class="checkpoint-card">
    <h3>打卡点: {{ checkpointId }}</h3>
    <div class="status">
      <p>当前状态:</p>
      <ul>
        <li>管理员打卡: {{ checkpoint.adminChecked ? '已打卡' : '未打卡' }}</li>
        <li>普通用户打卡: {{ checkpoint.userChecked ? '已打卡' : '未打卡' }}</li>
        <li>访客打卡: {{ checkpoint.guestChecked ? '已打卡' : '未打卡' }}</li>
      </ul>
      <p v-if="checkpoint.owner">
        所有者: {{ checkpoint.owner }}
      </p>
    </div>
    <div class="actions">
      <button 
        @click="handleCheckIn" 
        :disabled="hasCheckedIn"
      >
        打卡
      </button>
      <button 
        v-if="canCapture" 
        @click="handleCapture"
        :disabled="!canCapture"
      >
        占领打卡点
      </button>
    </div>
  </div>
</template>

<script>
import { checkpointStore } from '../store/checkpoints';

export default {
  name: 'CheckpointCard',
  props: {
    checkpointId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      userType: localStorage.getItem('userType'),
      username: localStorage.getItem('username')
    }
  },
  computed: {
    checkpoint() {
      return checkpointStore.state.checkpoints.get(this.checkpointId) || {
        adminChecked: false,
        userChecked: false,
        guestChecked: false,
        owner: null
      };
    },
    hasCheckedIn() {
      switch (this.userType) {
        case 'admin':
          return this.checkpoint.adminChecked;
        case 'user':
          return this.checkpoint.userChecked;
        case 'guest':
          return this.checkpoint.guestChecked;
        default:
          return false;
      }
    },
    canCapture() {
      return checkpointStore.canCaptureCheckpoint(this.checkpointId);
    }
  },
  methods: {
    handleCheckIn() {
      const result = checkpointStore.checkIn(this.checkpointId, this.userType);
      if (result) {
        this.$emit('ready-to-capture');
      }
    },
    handleCapture() {
      if (checkpointStore.captureCheckpoint(this.checkpointId, this.username)) {
        this.$emit('captured', this.username);
      }
    }
  }
}
</script>

<style scoped>
.checkpoint-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin: 10px;
  max-width: 300px;
}

.status {
  margin: 10px 0;
}

.actions {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

ul {
  list-style: none;
  padding-left: 0;
}

li {
  margin: 5px 0;
}
</style> 