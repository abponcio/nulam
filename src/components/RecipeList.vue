<template>
    <div class="grid">
        <RecipeListItem :item="recipe" v-for="(recipe, index) in recipes" :key="index"/>
        <template v-for="n in 20">
            <SkeletonRecipeListItem  :key="n" v-if="loading"/>
        </template>
    </div>
</template>
<script>

import RecipeListItem from '@/components/RecipeListItem';
import SkeletonRecipeListItem from '@/components/SkeletonRecipeListItem';
import {mapState} from 'vuex'
export default {
    name: 'RecipeList',
    props: {
        recipes: {
            type: Array,
            default: () => [],
        },
    },
    components: {
        RecipeListItem,
        SkeletonRecipeListItem,
    },
    computed: {
        ...mapState(['loading']),
    },
}
</script>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 1rem;
}
@screen sm {
    .grid {
        grid-template-columns: 1fr 1fr;
    }
}

@screen md {
    .grid {
        grid-template-columns: 1fr 1fr 1fr;
    }
}

@screen lg {
    .grid {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
}

</style>