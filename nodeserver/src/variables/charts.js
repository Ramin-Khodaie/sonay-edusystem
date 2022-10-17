export const barChartData = [
  {
    name: "Sales",
    data: [15, 25, 28, 10, 25, 20],
  },
];

export const workbookChartData = [
  {
    name: "performance",
    data: [80, 90, 100, 75, 80, 95, 90]
  }
]
export const workbookChartOptions = {
  xaxis: {
    categories: ["class activity", "speaking", "listening", "writing", "reading", "homework", "final status"],
    labels: {
      style: {
        colors: "#8c98a8",
        fontSize: "16px",
      },
    },
    show: true,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: true,
      borderType: 'solid',
      color: '#78909C',
      height: 6,
      padding: 20,
      offsetX: 0,
      offsetY: 0
    },
  },

  yaxis: {
    show: true,
    color: "#A0AEC0",
    labels: {
      show: true,
      style: {
        colors: "#A0AEC0",
        fontSize: "14px",
      },
    },
  },
  fill: {
    colors: "#ED8936",
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    strokeDashArray: 5,
  },
  plotOptions: {
    bar: {
      borderRadius: 15,
      columnWidth: "15px",
      horizantal: true,
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
          },
        },
      },
    },
  ],
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
}
export const barChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  xaxis: {
    categories: [],
    labels: {
      style: {
        colors: "#A0AEC0",
        fontSize: "12px",
      },
    },
    show: true,
    axisBorder: {
      show: false,
    },

  },
  yaxis: {
    show: true,
    color: "#A0AEC0",
    labels: {
      show: true,
      style: {
        colors: "#A0AEC0",
        fontSize: "14px",
      },
    },
  },
  fill: {
    colors: "#ED8936",
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    strokeDashArray: 5,
  },
  plotOptions: {
    bar: {
      borderRadius: 15,
      columnWidth: "15px",
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
          },
        },
      },
    },
  ],
};

export const PieChartData = {
  series:{
    name:"Total",
    data:[100]
  }
}


export const PieChartOprtions = {
  pie: {
    startAngle: 0,
    endAngle: 360,
    expandOnClick: true,
    offsetX: 0,
    offsetY: 0,
    customScale: 1,
    labels:["Total"],
    dataLabels: {
      offset: 0,
      minAngleToShowLabel: 10
    },
    donut: {
      size: '65%',
      background: 'transparent',
      labels: {
        show: false,
        name: {
          show: true,
          fontSize: '30px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 700,
          color: "#999",
          offsetY: -10,
          formatter: function (val) {
            return val
          }
        },
        value: {
          show: true,
          fontSize: '16px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          color: undefined,
          offsetY: 16,
          formatter: function (val) {
            return val
          }
        },
        
        total: {
          show: false,
          showAlways: false,
          label: 'Total',
          fontSize: '22px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 600,
          color: '#373d3f',
          formatter: function (w) {
            return w.globals.seriesTotals.reduce((a, b) => {
              return a + b
            }, 0)
          }
        }
      }
    },
  }
}
export const lineChartData = [
  {
    name: "Mobile apps",
    data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
  },
  {
    name: "Websites",
    data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
  },
];

export const lineChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
      ],
    axisTicks: {
      show: false
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: "#fff",
        fontSize: "12px",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#fff",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    strokeDashArray: 5,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#fff", "#3182CE"],
  },
  colors: ["#fff", "#3182CE"],
};
