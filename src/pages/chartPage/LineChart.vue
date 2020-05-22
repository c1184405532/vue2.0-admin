<template>
    <div class="bar_chart_box">
        <h2>柱状图集合</h2>
        <a-row>
            <a-col :xs="24" :sm="12">
                <div class="chart_box">              
                    <apexchart width="100%" height="350"  type="line" :options="chartOptions" :series="series1"></apexchart>
                </div>
            </a-col>
            <a-col :xs="24" :sm="12">
                <div class="chart_box">
                    <apexchart width="100%" height="350" type="line" :options="chartOptions" :series="series2"></apexchart>
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
            
            series1: [{
                name: "单折线图",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
            }],
            series2: [
                {
                    name: "双折线图1",
                    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
                },
                {
                    name: "双折线图2",
                    data: [30, 48, 10, 80, 60, 66, 20, 30, 120]
                },
            ],
            chartOptions: {
                chart: {
                    //height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: 'Product Trends by Month',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
                }
            },      
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
