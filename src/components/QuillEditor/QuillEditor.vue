<template>
    <div ref="editor" v-html="value"></div>
</template>

<script>
    export default {
        props: {
            value: {
                type: String,
                default: ''
            }
        },
 
        data() {
            return {
                editor: null
            };
        }
    }
</script>
