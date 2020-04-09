<template>
  <div class="hello">
    <!-- <h1>{{ posts.data }}</h1> -->
      <h2>Confirmed cases of Covid-19 in Australia</h2>
       <h5>3-25</h5>
    <!-- <table align="center">
      <thead>
        <tr>
          <th v-for="(item,index) in confirmedCases.data" v-bind:key="index">{{item.state_name}}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            v-for="(item,index) in confirmedCases.data"
            v-bind:key="index"
          >{{item.confirmed_cases}}</td>
        </tr>
      </tbody>
    </table> -->


    <table align="center">
      <thead>
        <tr>
          <th v-for="(item,index) in currentStatus.data" v-bind:key="index">{{item.location}}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            v-for="(item,index) in currentStatus.data"
            v-bind:key="index"
          >{{item.confirmed_cases}}</td>
        </tr>
      </tbody>
    </table>


    <barChart></barChart>
 



  </div>
</template>

<script>
import DataResource from '../connectFB';
import barChart from './barChart'
//import Vue from 'vue'

export default {
  name: 'HelloWorld',
  data(){
    
    return{
      test:[1,2,3],
      confirmedCases:Promise,
      currentStatus:Promise,
      error:'',
      text:''
    }
  },
  components:{
      barChart
  },
  async created(){
      try{
        this.confirmedCases = await DataResource.getConfirmedCases();
         console.log('created  confirmedCases')      

        this.currentStatus = await DataResource.getCurrentStatus();

      }catch(error){
        this.error  = error.message;
      }
    },
    methods:{
        
    },
    mounted(){
        
    },
    computed:{
      
    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

table {
  border: 1px solid #e9e9e9;
  border-collapse: collapse;
  border-spacing: 0;
}
th,
td {
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
  text-align: left;
}

th {
  background-color: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
}

caption {
  display: table-caption;
  text-align: center;
}
h2,
h5,h6{
  
  text-align: center;
}
h2{
  padding-top: 15px;
}
</style>
