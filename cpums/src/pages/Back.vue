<template>
    <div>
        <van-nav-bar
            left-arrow
            @click-left="$router.back()"
        >
            <template #title>
                {{title}}
            </template>
        </van-nav-bar>
    </div>
</template>

<script>
export default {
    name:'Back',
    props:['title']
}
</script>

<style>

</style>