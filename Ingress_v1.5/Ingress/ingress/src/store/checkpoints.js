// 打卡点状态管理
export const checkpointStore = {
  state: {
    checkpoints: new Map(), // 存储打卡点状态
  },

  // 检查打卡点是否可以被占领
  canCaptureCheckpoint(checkpointId) {
    const checkpoint = this.state.checkpoints.get(checkpointId) || {
      adminChecked: false,
      userChecked: false,
      guestChecked: false,
      owner: null
    };
    return checkpoint.adminChecked && checkpoint.userChecked && checkpoint.guestChecked;
  },

  // 用户打卡
  checkIn(checkpointId, userType) {
    const checkpoint = this.state.checkpoints.get(checkpointId) || {
      adminChecked: false,
      userChecked: false,
      guestChecked: false,
      owner: null
    };

    switch (userType) {
      case 'admin':
        checkpoint.adminChecked = true;
        break;
      case 'user':
        checkpoint.userChecked = true;
        break;
      case 'guest':
        checkpoint.guestChecked = true;
        break;
    }

    this.state.checkpoints.set(checkpointId, checkpoint);

    // 如果三种用户都打卡了，返回true
    return this.canCaptureCheckpoint(checkpointId);
  },

  // 占领打卡点
  captureCheckpoint(checkpointId, username) {
    if (this.canCaptureCheckpoint(checkpointId)) {
      const checkpoint = this.state.checkpoints.get(checkpointId);
      checkpoint.owner = username;
      // 重置打卡状态
      checkpoint.adminChecked = false;
      checkpoint.userChecked = false;
      checkpoint.guestChecked = false;
      this.state.checkpoints.set(checkpointId, checkpoint);
      return true;
    }
    return false;
  }
}; 