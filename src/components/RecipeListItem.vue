<template>
    <div class="rounded-xl overflow-hidden shadow-md">
        <a :href="recipe.url" target="_blank">
            <div>
                <img :src="recipe.image" :alt="recipe.label" loading="lazy" class="rounded rounded-b-none object-cover w-full h-auto">
            </div>
            <div class="text-left py-6 px-5">
                <div class="pb-2 border-b-1 border-dashed">
                    <h2 class="text-base font-semibold">{{recipe.label}}</h2>
                    <small class="text-gray-400">Good for {{recipe.yield}} | Calories: {{numeral(recipe.calories).format('0,0[.]00')}}</small>
                </div>
                <ul class="checklist ml-4 mt-2">
                    <li class="text-left px-0.5 py-1 text-xs" v-for="(ingredient, key) in recipe.ingredientLines" :key="key">
                        <div class="line-clamp-3">
                            {{ingredient}}
                        </div>
                    </li>
                </ul>
            </div>
        </a>
    </div>
</template>

<script>
import numeral from 'numeral';
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
        recipe() {
            return this.item.recipe;
        },
    },
}
</script>

<style scoped>
.checklist {
    list-style: initial;
}
.checklist li {
    @apply pl-2;
}
.checklist li::marker {
    content: '\ea5b';
    @apply font-icon text-green-600;
}
</style>