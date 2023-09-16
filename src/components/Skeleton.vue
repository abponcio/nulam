<template>
  <div class="rounded-14 shadow-md overflow-hidden">
    <div class="skeleton-box" :style="typeClass"></div>
  </div>
</template>

<script>
export default {
  name: 'Skeleton',
  props: {
    type: {
      type: String,
      default: 'recipe'
    },
    size: {
      type: String,
      default: '15'
    }
  },
  computed: {
    typeClass() {
      if (this.type === 'square') {
        return {
          width: `${this.size}px`,
          height: `${this.size}px`,
        };
      }

      return {
        width: '100%',
        height: `${this.size}px`,
      };
    },
  },
}
</script>

<style scoped>
.skeleton-box {
  position: relative;
  overflow: hidden;
  background-color: #FF9F0E;
  opacity: 0.4;
}

.skeleton-box::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0));
  animation: shimmer 3s infinite;
  content: '';
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>