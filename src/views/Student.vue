<template>
  <div>
    <div class="search">
      <el-input v-model="input" placeholder="请输入学生姓名"></el-input>
      <el-button type="primary" @click="search(input)">搜索</el-button>
      <el-button @click="reset">重置</el-button>

      <el-button type="text" @click="add1" size="mini">添加学生</el-button>
      <el-dialog id="1" :visible.sync="dialogFormVisible" title="添加学生">
        <el-form :model="addData">
          <el-form-item :label-width="formLabelWidth" label="学号">
            <el-input v-model="addData.stuId" autocomplete="off" placeholder="仅支持数值类型"></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="姓名">
            <el-input v-model="addData.stuName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="账号">
            <el-input v-model="addData.stuUserId" autocomplete="off" placeholder="仅支持数值类型"></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="密码">
            <el-input v-model="addData.stuPas" autocomplete="off" placeholder="仅支持数值类型"></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="所属宿舍">

            <div>
              <el-select v-model="addData.stuDormId" >
                <!--                      <el-option label="请选择..." value=""></el-option>-->
                <el-option v-for="item in data1" :key="item.id" :label="item.dormId" :value="item.id"></el-option>
              </el-select>

            </div>

          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
      <div v-show="isShow">
        <el-table
            :data="data2"
            border
            style="width: 100%">
          <el-table-column
              prop="stuId"
              label="学号"
              width="180">
          </el-table-column>
          <el-table-column
              prop="stuName"
              label="姓名"
              width="180">
          </el-table-column>
          <el-table-column
              prop="stuUserId"
              label="账号">
          </el-table-column>
          <el-table-column
              prop="dormId"
              label="所属宿舍">
          </el-table-column>
          <el-table-column
              prop="balance"
              label="宿舍水电费余额（元）">
          </el-table-column>
          <el-table-column
              prop="type"
              label="宿舍状态">
          </el-table-column>
          <el-table-column
              label="操作">
          </el-table-column>


        </el-table>
      </div>

      <div>
        <el-table
            :cell-style="cellStyleFun"
            :data="tableData"
            :header-cell-style="thStyleFun"
            border
            style="width: 100%"


        >
          <el-table-column
              label="学号"
              prop="stuId"
          >
          </el-table-column>
          <el-table-column
              label="姓名"
              prop="stuName"
          >
          </el-table-column>

          <el-table-column
              label="账号"
              prop="stuPas"
          >
          </el-table-column>
          <el-table-column
              label="所属宿舍"
              prop="dormId"
          >
          </el-table-column>
          <el-table-column
              label="宿舍水电费余额（元）"
              prop="balance"
          >
          </el-table-column>
          <!--        <el-table-column -->
          <!--            prop="type"-->
          <!--            label="类型">-->
          <!--        </el-table-column>-->
          <el-table-column
              label="宿舍状态"
          >
            <!--          自定义转换数据-->
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.type == '1' ? '正常' : "催款中" }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           width="300">
            <template slot-scope="scope"
            >
              <!--            <el-button-->
              <!--                size="mini"-->
              <!--                @click="handleEdit(scope.$index, scope.row)">编辑-->
              <!--            </el-button>-->
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-dialog id="2" :visible.sync="dialogFormVisible1" title="修改学生信息">
                <el-form :model="changeData">
                  <el-form-item :label-width="formLabelWidth" label="学号">
                    <el-input v-model="changeData.stuId" :disabled="true" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item :label-width="formLabelWidth" label="姓名">
                    <el-input v-model="changeData.stuName" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item :label-width="formLabelWidth" label="账号">
                    <el-input v-model="changeData.stuUserId" :disabled="true" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item :label-width="formLabelWidth" label="密码">
                    <el-input v-model="changeData.stuPas" autocomplete="off"></el-input>
                  </el-form-item>
<!--                  <el-form-item :label-width="formLabelWidth" label="所属宿舍">-->
<!--                    <el-select v-model="changeData.stuDormId">-->
<!--                      &lt;!&ndash;                      <el-option label="请选择..." value=""></el-option>&ndash;&gt;-->
<!--                      <el-option v-for="item in scope.row" :key="item.id" :label="item" :value="item.stuDormId"></el-option>-->
<!--                    </el-select>-->
<!--                  </el-form-item>-->
                  <el-form-item :label-width="formLabelWidth" label="所属宿舍">

                      <div>
                        <el-select v-model="changeData.stuDormId" >
                          <!--                      <el-option label="请选择..." value=""></el-option>-->
                          <el-option v-for="item in data1" :key="item.id" :label="item.dormId" :value="item.id"></el-option>
                        </el-select>

                      </div>

                  </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                  <el-button type="primary" @click="change()">确 定</el-button>
                </div>
              </el-dialog>
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
              <el-button
                  size="mini"

                  @click="changepage(scope)">

               查看缴费记录

              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            :current-page="page"
            :page-size="pageSize"
            :total="pageNum" background layout="prev, pager, next" @current-change="pageChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      pageNum: 50,
      pageSize: 5,
      page: 1,
      isShow:false,
      data: [],
      data1:[],
      data2:[],
      addData: {
        stuName: '',
        stuPas: '',
        stuUserId: '',
        stuDormId: '',
        stuId: '',



      },
      changeData: {
        id: '1',
        stuId: '',
        stuName: '',
        stuUserId: '',
        stuDormId: '',
        stuPas: '',
        dormId: ''
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      dialogFormVisible1: false,
    }
  },
  methods: {
    reset(){
      this.input = ''
    },
    search(input){

      this.$axios({
        url: '/student/getsinglestudent',
        params: {
          stuName: input
        }
      }).then((res) => {
        console.log(res.data.data);
        this.data = res.data.data
        this.pageNum = res.data.data.length


      })

    },
    add1(){
      this.dialogFormVisible = true
    },
    thStyleFun() {
      return 'text-align:center'
    },
    cellStyleFun() {
      return 'text-align:center'
    },
    changepage(scope) {
      this.isShow = !this.isShow
      this.$axios({
        url:'/student/getstudentpayment',
        params: {
          stuId:scope.row.stuId,
          id:scope.row.id
        }
      }).then((res)=>{
        console.log(res);
        this.data = res.data.data
        this.pageNum = res.data.data.length
      })
      // this.$axios({
      //   url:'/dorm/getdorm',
      //   params: {
      //     stuId:scope.row.stuId
      //   }
      // }).then((res)=>{
      //   this.data2 = scope.row
      //   this.pageNum = res.data.data.length
      //
      // })
    },
    handleEdit(index, row) {
      this.dialogFormVisible1 = true;
      this.changeData.id = row.id
      this.changeData.stuId = row.stuId
      this.changeData.stuUserId = row.stuUserId
      this.changeData.dormId = row.dormId

        console.log(row);

    },


    change() {
      this.$axios({
        url: '/student/updatestudent',
        data: this.changeData,
        method: "post"
      }).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {

          this.$axios({
            url: '/student/getstudent'
          }).then((res) => {
            console.log(res);
            this.data = res.data.data
            this.pageNum = res.data.data.length

          })
          this.dialogFormVisible1 = false

        }
      })

    },
    add() {
      this.dialogFormVisible = false
      console.log(this.addData);
      this.$axios({
        url: '/student/addstudent',
        data: this.addData,
        method: "post"
      }).then((res) => {
        console.log(res);
        //最后一个数据删除完跳转页面
        if (res.data.code === 200) {
          this.data.push(this.addData)
          this.pageNum = this.data.length
          // console.log(this.pageNum);
          let currentPage = Math.ceil(this.pageNum / this.pageSize)
          this.page = this.page < currentPage ? currentPage : this.page
        }
      })
    },


    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$axios({
          url: '/student/delstudent',
          data: {
            id: row.id
          },
          method: 'post'
        }).then((res) => {
          console.log(res);

          if (res.data.code === 200) {
            this.data = this.data.filter((v) => {
              return v.id != row.id
            })
            //最后一个数据删除完跳转页面
            this.pageNum = this.data.length
            let currentPage = Math.ceil(this.pageNum / this.pageSize)
            this.page = this.page > currentPage ? currentPage : this.page
            this.$message({
              type: 'success',
              message: '删除成功!'
            });

          }

        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    pageChange(e) {
      console.log(e);
      this.page = e
    }
  },
  mounted() {
    this.$axios({
      url: '/student/getstudent'
    }).then((res) => {
      console.log(res);
      this.data = res.data.data
      this.pageNum = res.data.data.length

    })
    this.$axios({
    url: '/dorm/getdorm'
  }
).then((res) => {
  this.data1 = res.data.data
})


},
computed: {
  tableData: function () {
    //  1   0-4   (page-1)*pageSize  page*pageSize-1
    //  2   5-9
    //  3   10-14
    //
    return (this.data.slice((this.page - 1) * this.pageSize, this.page * this.pageSize))
  }

}
}
</script>
<style>
.search .el-input {
  width: 300px;
  margin-right: 20px;
}

.search {
  border-bottom: 1px solid #999;
  padding-bottom: 20px;
}

.el-table {

  margin-top: 20px;
  text-align: center;
}


.el-pagination {
  margin: 30px;
  float: right;
}

.search .el-dialog {
  width: 500px;
}

/*#alert{*/
/*  position: absolute;*/
/*  text-align: center;*/
/*}*/
#alert input {
  width: 200px;
  outline: none;
  border: 1px solid #DCDFE6;
  border-radius: 5px;
  padding: 8px 10px;
  margin: 5px 0;
}

#alert label {
  font-size: medium;
}

#alert input:hover {
  border-color: #C0C4CC;
}

input::-webkit-input-placeholder {
  color: #DCDFE6;
}

#alert select {
  position: relative;
  outline: none;
  border: 1px solid #DCDFE6;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px 0;
  font-weight: lighter;

}
</style>