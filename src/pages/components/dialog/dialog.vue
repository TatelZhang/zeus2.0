<template>
    <Modal
        :title="title"
        :visible.sync="visible"
    >
    </Modal>
</template>
<script>
export default {
    data () {
        return {

        }
    },
    props: {
        title: String,
        visible: Boolean,
    },
    name: 'ZDialog'
}
</script>
