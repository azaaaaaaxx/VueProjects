<template>
  <div class="infoList">
    <el-form :inline="true" class="demo-form-inline" align="left" size="small">
    </el-form>
    <el-table :data="compData" border style="width: 100%">
      <el-table-column align="center" label="姓名" prop="name">
      </el-table-column>
      <el-table-column align="center" label="性别" prop="sex_text">
      </el-table-column>
      <el-table-column align="center" label="年龄" prop="age">
      </el-table-column>
      <el-table-column align="center" label="父亲" prop="father">
      </el-table-column>
      <el-table-column align="center" label="母亲" prop="mather">
      </el-table-column>
      <el-table-column align="center" label="家庭住址" prop="address">
      </el-table-column>
      <el-table-column align="center" label="入校时间" prop="time">
      </el-table-column>
      <el-table-column align="center" label="联系方式" prop="phone">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getData } from "@/utils/table";

export default {
  data() {
    return {
      tableData: [],
      form: {
        name: "",
        sex: "1",
        age: "",
        father: "",
        mather: "",
        address: "",
        time: "",
        phone: "",
      },
      pageSize: 10,
      currentPage: 1,
      total: 0,
      formLabelWidth: "80px",



    };
  },
  created() {
    getData(this, "/info");
  },
  computed: {
    compData() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  methods: {


    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getData() {
      getData(this, "/info");
    },


  },
};
</script>

<style lang="less" scoped>
.infoList {
  .el-form-item {
    text-align: left;
  }
  .el-pagination {
    margin-top: 25px;
  }
}
</style>
