<template>
    <div class="bar_chart_box">
        <h2>柱状图集合 &nbsp;
            <a href="https://github.com/apexcharts/vue-apexcharts" target="_blank">图表库git地址</a>&nbsp;&nbsp;
            <a href="https://apexcharts.com/vue-chart-demos/column-charts/column-with-data-labels/" target="_blank">图表库文档</a>
        </h2>
        <a-row>
            <a-col :xs="24" :sm="12">
                <div class="chart_box">
                    <a-button type="primary" class="chart_btn" @click="updateChart(1)">更新数据</a-button>
                    <apexchart width="100%" height="350"  type="bar" :options="chartOptions" :series="barSeries1"></apexchart>
                </div>
            </a-col>
            <a-col :xs="24" :sm="12">
                <div class="chart_box">
                    <a-button type="primary" class="chart_btn" @click="updateChart(2)">更新数据</a-button>
                    <apexchart width="100%" height="350"  type="bar" :options="chartOptions2" :series="barSeries2"></apexchart>
                </div>
            </a-col>
        </a-row>
        
    </div>
</template>

<script>

import Axios from '@/request/Axios.js'
export default {
    components: {
        
    },
    props: {

    },
    data() {
        return {
            chartOptions: {
                chart: {
                    id: 'vuechart-example'
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                }
            },
           
            
            barSeries1: [{
                name: '柱状图1',
                data: [30, 40, 35, 50, 49, 60, 70, 91]
            }],
            chartOptions2: {
                chart: {
                    type: 'bar',
                    //height: 350,
                    stacked: true,
                },
                plotOptions: {
                    // bar: {
                    //     horizontal: true,
                    // },
                },
                stroke: {
                    width: 1,
                    colors: ['#fff']
                },
                title: {
                    text: '柱状图2'
                },
                xaxis: {
                    categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
                    labels: {
                        formatter: function (val) {
                            return val + "K"
                        }
                    }
                },
                yaxis: {
                    title: {
                        text: undefined
                    },
                },
                tooltip: {
                    // y: {
                    //     formatter: function (val) {
                    //         return val + "K"
                    //     }
                    // }
                },
                fill: {
                    opacity: 1
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left',
                    offsetX: 40
                }
            },
            barSeries2: [
                {
                    name: '堆叠1',
                    data: [44, 55, 41, 37, 22, 43, 21],
                    
                },
                {
                    name: '堆叠2',
                    data:  [53, 32, 33, 52, 13, 43, 32],   
                        
                },
                
            ]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        
    },
    watch: {

    },
    methods: {
        updateChart(type){
            switch(type){
                case 1:
                    this.barSeries1 = [
                        {data:[10,20,30,40,50,60,70,80]}
                    ]
                    break; 
                case 2:
                    console.log('更新',this.barSeries2)
                    this.barSeries2.splice(0,1,{name:'堆叠1',data:[90,80,70,60,50,40,30,20]})
                    //this.barSeries2.splice(1,1, [10,20,30,40,50,60,70,80])
                    
                    break; 

            }
            
            
            
        }
    },
};
</script>

<style scoped lang="less">
    .bar_chart_box{
        .chart_box{
            min-height: 400px;
            //width: 500px;
            padding: 12px;
            margin-top: 20px;
            .chart_btn{
                margin: 20px 0;
            }
        }
    }
</style>
