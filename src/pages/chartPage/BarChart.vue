<template>
    <div class="bar_chart_box">
        <h2>柱状图集合</h2>
        <a-row>
            <a-col :xs="24" :sm="12">
                <div class="chart_box">
                    <a-button type="primary" class="chart_btn">更新数据</a-button>
                    <apexchart width="100%" type="bar" :options="chartOptions" :series="series"></apexchart>
                </div>
            </a-col>
            <a-col :xs="24" :sm="12">
                <div class="chart_box">
                    <a-button type="primary" class="chart_btn">更新数据</a-button>
                    <apexchart width="100%" type="bar" :options="chartOptions2" :series="series"></apexchart>
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
            chartOptions2: {
                chart: {
                    id: 'vuechart-example2'
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                }
            },
            series: [{
                name: 'series-1',
                data: [30, 40, 35, 50, 49, 60, 70, 91]
            }]
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
            //height: 600px;
            //width: 500px;
            padding: 24px;
            margin-top: 20px;
            .chart_btn{
                margin: 20px 0;
            }
        }
    }
</style>
