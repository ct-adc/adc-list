<script>
    export default {
        render(h){
            return h('div', [
                this.$scopedSlots.default({
                    index: 1
                })
            ]);
        }
    };
</script>
