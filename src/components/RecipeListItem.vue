<template>
    <div class="rounded-14 overflow-hidden shadow-md" :class="{'loading': recipeLoading}">
        <div @click="getLink" class="cursor-pointer">
            <div>
                <img :src="item.image" :alt="item.title" loading="lazy" class="rounded rounded-b-none object-cover custom-image w-full h-auto">
            </div>
            <div class="text-left py-20 px-15">
                <div class="pb-2 border-b-1 border-dashed">
                    <h2 class="text-18 leading-multiline font-semibold">{{item.title}}</h2>
                </div>
                <div class="mt-2">
                    <ul class="checklist">
                        <li class="text-left px-0.5 py-1 text-12 leading-multiline flex gap-4 items-center" v-for="(ingredient, key) in item.usedIngredients" :key="key">
                            <i class="lni lni-checkmark text-green-500"/>
                            <div class="line-clamp-3 font-bold">
                                {{ingredient.name}} - {{ingredient.amount}} {{ingredient.unitShort}}
                            </div>
                        </li>
                    </ul>
                    <ul class="closelist">
                        <li class="text-left px-0.5 py-1 text-12 leading-multiline flex gap-4 items-center" v-for="(ingredient, key) in item.missedIngredients" :key="key">
                            <id class="lni lni-line-dotted text-gray-500"/>
                            <div class="line-clamp-3 text-gray-500">
                                {{ingredient.name}} - {{ingredient.amount}} {{ingredient.unitShort}}
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
import {mapState, mapActions} from 'vuex';
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
.checklist, .closelist {
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
</style>