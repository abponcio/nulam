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
                    <ul class="checklist ml-15">
                        <li class="text-left px-0.5 py-1 text-12 leading-multiline" v-for="(ingredient, key) in item.usedIngredients" :key="key">
                            <div class="line-clamp-3">
                                {{ingredient.name}} - {{ingredient.amount}} {{ingredient.unitShort}}
                            </div>
                        </li>
                    </ul>
                    <ul class="closelist ml-15">
                        <li class="text-left px-0.5 py-1 text-12 leading-multiline" v-for="(ingredient, key) in item.missedIngredients" :key="key">
                            <div class="line-clamp-3 text-red">
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
.checklist {
    list-style: initial;
}
.checklist li {
    @apply pl-4;
}
.checklist li::marker {
    content: '\ea5b';
    @apply font-icon text-green-600;
}
.closelist li {
    @apply pl-4;
}
.closelist li::marker {
    content: '\ea6a';
    @apply font-icon text-red-800;
}
</style>