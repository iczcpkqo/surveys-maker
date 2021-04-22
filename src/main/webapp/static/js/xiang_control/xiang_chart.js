loadJS('/surveys/src/main/webapp/static/js/xiang_control/chart.lib.js');

window.onload = function(){
}

class ChartBase{
    constructor(boxId = '') {
        this.box = '';
        this.chart = '';
        this.option = '';
        this.green;
        this.amber;
        this.red;
        if (boxId)
            this.boxId = boxId
    }
    set boxId(boxId){
        this._boxId = boxId;
        this.box = $('#' + this.boxId);
        this.chart = echarts.init(this.box);
        if (this.option && typeof this.option === 'object')
            this.chart.setOption(this.option);
        return this._boxId;
    }
    get boxId(){
        return this._boxId;
    }

    set green(green){
        this._green = green;
        this.setValue(green, 2);
    }
    get green(){
        return this._green;
    }

    set amber(amber){
        this._amber = amber;
        this.setValue(amber, 1);
    }
    get amber(){
        return this._amber;
    }

    set red(red){
        this._red = red;
        this.setValue(red, 0);
    }
    get red(){
        return this._red;
    }

    setValue(value, index){
        this.option.series[0].data[index].value = value;
        this.option.series[0].data[index].label.show =this.isBiggestPie(value);
        this.chart.setOption(this.option);

    }

    isBiggestPie(data){
        return !(data < (this.green || this.amber || this.red)) && this.constructor.name === 'PieChart';
    }
}

class BarChart extends ChartBase{
    constructor(boxId = '') {
        super(boxId);
        this.option = {
            xAxis: {
                type: 'value',
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                data: [],
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            series: [{
                radius: '100%',
                data: [{
                    value: 150,
                    label: {
                        show: false
                    },
                    itemStyle: {
                        color: '#FF3366',
                        borderWidth: 23
                    }
                }, {
                    value: 250,
                    label: {
                        show: false
                    },
                    itemStyle: {
                        color: '#FF9966',
                        borderWidth: 23

                    }
                }, {
                    value: 350,
                    label: {
                        show: false
                    },
                    itemStyle: {
                        color: '#00CC99',
                        borderWidth: 23
                    }
                }],
                type: 'bar'
            }]
        };
    }
}

class PieChart extends ChartBase{
    constructor(boxId = '') {
        super(boxId);
        this.option = {
            color:['#FF3366','#FF9966','#00CC99'],
            series: [
                {
                    show:false,
                    type: 'pie',
                    radius: ['69%', '100%'],
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 8
                    },
                    label: {
                        fontSize: '96',
                        position: 'center',
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: false
                        }
                    },
                    data: [
                        {
                            value: 735,
                            name: 'R',
                            label: {
                                backgroundColor: '#fff',
                                color: '#FF3366',
                                show: false
                            }
                        },
                        {
                            value: 580,
                            name: 'A',
                            label: {
                                backgroundColor: '#fff',
                                color: '#FF9966'
                            }

                        },
                        {
                            value: 484,
                            name: 'G',
                            label: {
                                backgroundColor: '#fff',
                                color: '#00CC99'
                            }
                        },
                    ]
                }
            ]
        };

    }
}

