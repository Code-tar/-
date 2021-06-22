<template>
  <div class="box">

    <hr noshade="noshade"/>
    <span style="display: block; margin-top: 10px"><b>欢迎进入</b></span>
  <el-table
      :data="Data"

      style="width: 100%"
  >
    <el-table-column
        label='公告'
        width="650"

    >
      <template slot-scope="scope">
        <div>
          <span v-for="item in scope.row.title" :key="item.id" style=" font-weight:bold">{{item}}</span><br>

          <span v-for="item in scope.row.content" :key="item.id" style="color:#A0A2B4;">{{item}}</span>
        </div>
      </template>


    </el-table-column>



    <el-table-column
        prop="time"
        width="250"
        fixed="right"

    >
    </el-table-column>


  </el-table>
    <el-pagination
        :current-page="page"
        :page-size="pageSize"
        :total="pageNum" background layout="prev, pager, next" @current-change="pageChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData:[],
      pageNum: 50,
      pageSize: 5,
      page: 1,
    }
  },
  methods:{
    pageChange(e) {
      this.page = e
      console.log(e);

    }
  },
  mounted() {
      this.$axios({
        url: '/notice/getnotice'
      }).then((res) => {
        console.log(res);
        this.tableData = res.data.data
        this.pageNum = res.data.data.length

      })
    },
  computed: {
    Data: function () {
      //  1   0-4   (page-1)*pageSize  page*pageSize-1
      //  2   5-9
      //  3   10-14
      //
      return (this.tableData.slice((this.page - 1) * this.pageSize, this.page * this.pageSize))
    }

  }
}
</script>
<style scoped>


/*.el-table__row .el-table_1_column_3{*/
/* float: right;*/
/*}*/


</style>