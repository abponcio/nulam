<template>
    <div class="rounded-14 overflow-hidden shadow-md" :class="{ 'loading': recipeLoading }">
        <div @click="getLink" class="cursor-pointer">
            <div class="relative group text-primary-500 rounded-t-14" style="padding-top: 70%">
                <div class="absolute top-0 left-0 h-full w-full rounded-t-14">
                    <span
                        class="skeleton-box group-hover:scale-110 transition-transform transform-center block h-full rounded-t-14"></span>
                </div>
            </div>
            <!-- <div>
                <img :src="item.image" :alt="item.title" loading="lazy" class="rounded rounded-b-none object-cover custom-image w-full h-auto">
            </div> -->
            <div class="text-left py-20 px-15">
                <div class="pb-2 border-b-1 border-dashed">
                    <h2 class="text-18 leading-multiline font-semibold">{{ item.title }}</h2>
                </div>
                <div class="mt-2">
                    <ul class="checklist">
                        <li class="text-left px-0.5 py-1 text-12 leading-multiline flex gap-4 items-center"
                            v-for="(ingredient, key) in item.ingredients" :key="key">
                            <i class="lni lni-checkmark text-green-500" />
                            <div class="line-clamp-3 font-bold">
                                {{ ingredient }}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import numeral from 'numeral';
import { mapState, mapActions } from 'vuex';
export default {
    name: 'RecipeListItem',
    props: {
        item: {
            type: Object,
            default: null,
        },
    },
    data: () => ({
        numeral,
    }),
    computed: {
        ...mapState(['recipeLoading']),
    },
    methods: {
        ...mapActions(['getRecipeInformation']),
        async getLink() {
            if (!this.item.spoonacularSourceUrl) {
                await this.getRecipeInformation(this.item.id);
            }

            window.open(this.item.spoonacularSourceUrl, '_blank');
        },
    },
}
</script>

<style scoped>
.custom-image {
    aspect-ratio: 1;
}

.loading {
    opacity: 0.5;
    pointer-events: none;
}

.checklist,
.closelist {
    list-style: none;
}

.closelist i {
    @apply text-red-500;
}

.checklist i {
    @apply text-green-500;
}

.checklist li {
    @apply pl-4;
}

.closelist li {
    @apply pl-4;
}

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