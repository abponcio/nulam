<template>
    <div class="rounded-14 overflow-hidden shadow-md" :class="{ 'loading': recipeLoading }">
        <div @click="openDialog" @close="closeDialog">
            <div class="relative group text-primary-500 rounded-t-14" style="padding-top: 70%" v-if="!imageLink">
                <div class="absolute top-0 left-0 h-full w-full rounded-t-14">
                    <span
                        class="skeleton-box group-hover:scale-110 transition-transform transform-center block h-full rounded-t-14"></span>
                </div>
            </div>
            <div v-else>
                <img :src="imageLink" :alt="item.title" loading="lazy"
                    class="rounded rounded-b-none object-cover custom-image w-full h-auto">
            </div>
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
        <dialog ref="stepsDialog" class="rounded-14">
            <form method="dialog">
                <div>
                    <h1 class="text-left text-24 mb-20 underline">Steps:</h1>
                    <ol class="list-decimal list-inside">
                        <li v-for="(step, index) in item.steps" :key="index" class="text-left">{{ step }}</li>
                    </ol>
                    <button type="submit" class="border-1 p-8 rounded-14 mt-8" autofocus>close</button>
                </div>
            </form>
        </dialog>
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
        imageLink: '',
        numeral,
    }),
    computed: {
        ...mapState(['recipeLoading']),
    },
    created() {
        this.getLink();
    },
    methods: {
        ...mapActions(['getRecipeImage']),
        async getLink() {
            this.imageLink = (await this.getRecipeImage(this.item.title)).results;
        },
        openDialog() {
            this.$refs.stepsDialog.showModal();
        },
        closeDialog() {
            this.$refs.stepsDialog.close();
        }
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

.step-list {
    list-style-type: decimal;
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