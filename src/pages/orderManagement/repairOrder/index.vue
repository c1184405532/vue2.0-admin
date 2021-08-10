<template>
  <div class="base-list-layout">
    订单订单
    <BaseFilter
      @onChange="filterChange"
      :items="createFilterItems()"
    />
  </div>
</template>
<script>
import BaseFilter from "@/components/baseFilter/index.vue";
export default {
  components: {
    BaseFilter
  },
  props: {},
  data() {
    return {

    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    filterChange(item) {
      console.log("item", item);
    },
    createFilterItems() {
      return {
        name: {
          type: "input",
          label: "订单号"
        },
        orderStatus: {
          type: "select",
          label: "订单状态",
          selectOptions: [{ label: "已完成", value: "finished" }, { label: "未完成", value: "progress" }]
        }
      }
    }
  }
};
</script>
<style scoped lang="less"></style>
