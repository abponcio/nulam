<template>
    <div class="rounded-14 shadow-md">
        <div class="relative group text-primary-500 rounded-t-14" style="padding-top: 70%">
            <div class="absolute top-0 left-0 h-full w-full rounded-t-14">
                <span class="skeleton-box group-hover:scale-110 transition-transform transform-center block h-full rounded-t-14"></span>
            </div>
        </div>
        <div class="text-left p-15">
            <div class="pb-4 border-b-1 border-dashed">
                <div class="text-lg font-bold text-gray-darkest skeleton-box h-7 w-3/4 mb-2 rounded-14"></div>
            </div>
            <div class="pt-4">
                <div class="skeleton-box my-4 h-5 w-1/3 rounded-14"></div>
                <div class="skeleton-box my-4 h-5 w-1/2 rounded-14"></div>
                <div class="skeleton-box my-4 h-5 w-1/4 rounded-14"></div>
                <div class="skeleton-box my-4 h-5 w-1/2 rounded-14"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SkeletonRecipeListItem'
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
    background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.2) 20%,
        rgba(255, 255, 255, 0.5) 60%,
        rgba(255, 255, 255, 0)
    );
    animation: shimmer 3s infinite;
    content: '';
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>