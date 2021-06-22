<template>
<div id="app">

    <router-view />
</div>
</template>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  html,body,#app{
    height: 100%;
    width: 100%;
  }
  body .el-table th.gutter{
    display: table-cell!important;
  }
</style>
