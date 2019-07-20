<template>
    <div id="test">
        <input type="text" v-model="firstName">
        <br><input type="text" v-model="lastName">
        <br><input type="text" v-model="fullName">
    </div>
</template>
<style scoped>

</style>
<script>
export default {
    name:'test',
    data () {
        return {
            firstName:'',
            lastName:''
        }
    },
    computed: {
        fullName(){
            return this.firstName +"--"+this.lastName
        }
    }
}
</script>

