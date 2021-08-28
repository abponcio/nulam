<template>
    <div class="rounded shadow-md flex flex-col justify-between items-start">
        <div>
            <div>
                <img :src="recipe.image" :alt="recipe.label" loading="lazy" class="rounded rounded-b-none object-cover w-full h-auto">
            </div>
            <div class="text-left p-1.5">
                <div class="pb-2 border-b-1 border-dashed">
                    <h2 class="text-base font-semibold"><a :href="recipe.url" target="_blank">{{recipe.label}}</a></h2>
                    <small class="text-gray-400">Good for {{recipe.yield}}</small>
                </div>
                <ul class="list-none pl-1.5">
                    <li class="text-left px-0.5 py-1 line-clamp-3" v-for="(ingredient, key) in recipe.ingredientLines" :key="key">{{ingredient}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RecipeListItem',
    props: {
        item: {
            type: Object,
            default: null,
        },
    },
    computed: {
        recipe() {
            return this.item.recipe;
        },
    },
}
</script>