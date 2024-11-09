import * as shape from 'd3-shape';
//Bar Chart

export const barChartView: any[] = [550, 400];

// options
export const barChartShowXAxis = true;
export const barChartShowYAxis = true;
export const barChartGradient = false;
export const barChartShowLegend = false;
export const barChartShowXAxisLabel = true;
export const barChartXAxisLabel = 'Country';
export const barChartShowYAxisLabel = true;
export const barChartYAxisLabel = 'Population';

export const barChartColorScheme = {
    domain: ['#009DA0', '#FF8D60', '#FF586B', '#AAAAAA'],
};

//Pie CHart

export const pieChartView: any[] = [550, 400];

// options
export const pieChartShowLegend = false;

export const pieChartColorScheme = {
    domain: ['#009DA0', '#FF8D60', '#FF586B', '#AAAAAA'],
};

// pie
export const pieChartShowLabels = true;
export const pieChartExplodeSlices = false;
export const pieChartDoughnut = true;
export const pieChartGradient = false;

export const pieChart1ExplodeSlices = true;
export const pieChart1Doughnut = false;

//Line Charts

export const lineChartView: any[] = [550, 400];

// options
export const lineChartShowXAxis = true;
export const lineChartShowYAxis = true;
export const lineChartGradient = false;
export const lineChartShowLegend = false;
export const lineChartShowXAxisLabel = true;
export const lineChartXAxisLabel = 'Country';
export const lineChartShowYAxisLabel = true;
export const lineChartYAxisLabel = 'Population';

export const lineChartColorScheme = {
    domain: ['#009DA0', '#FF8D60', '#FF586B', '#AAAAAA'],
};

// line, area
export const lineChartAutoScale = true;
export const lineChartLineInterpolation = shape.curveBasis;

//Area Charts
export const areaChartView: any[] = [550, 400];

// options
export const areaChartShowXAxis = true;
export const areaChartShowYAxis = true;
export const areaChartGradient = false;
export const areaChartShowLegend = false;
export const areaChartShowXAxisLabel = true;
export const areaChartXAxisLabel = 'Country';
export const areaChartShowYAxisLabel = true;
export const areaChartYAxisLabel = 'Population';

export const areaChartColorScheme = {
    domain: ['#FF8D60', '#FF586B', '#1CBCD8', '#AAAAAA'],
};

// line, area
export const areaChartAutoScale = true;
export const areaChartLineInterpolation = shape.curveBasis;
