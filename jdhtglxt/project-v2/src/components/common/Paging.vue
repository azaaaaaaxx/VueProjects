<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :url="url"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getTableData } from "@/utils/table";

export default {
  props:{
    "total":Number,
    "url":String
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
    };
  },
  created() {
    getTableData(
        this.$parent,
        this.url,
        { page: this.currentPage, size: this.pageSize },
        ["completed"]
    );
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      getTableData(this.$parent, this.url, { page: this.currentPage, size: val }, [
        "completed",
      ]);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      getTableData(this.$parent, this.url, { page: val, size: this.pageSize }, [
        "completed",
      ]);
    },
  },
};
</script>

<style lang="less" scoped></style>
