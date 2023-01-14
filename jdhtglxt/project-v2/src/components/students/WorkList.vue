<template>
  <div class="workList">
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column align="center" label="用户ID" prop="id">
      </el-table-column>
      <el-table-column align="center" label="所属班级" prop="userId">
      </el-table-column>
      <el-table-column align="center" label="作业名称" prop="title">
      </el-table-column>
      <el-table-column align="center" label="完成情况" prop="completed_text">
      </el-table-column>
    </el-table>
    <Page :url="url" :total="total"></Page>
  </div>
</template>

<script>
import Page from '../common/Paging.vue'
export default {
  components: {
    Page
  },
  data() {
    return {
      tableData: [],
      total: 0,
      url: '/works',
      loading: true,
    };
  },
}
</script>

<style lang="less">
.workList {
  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
