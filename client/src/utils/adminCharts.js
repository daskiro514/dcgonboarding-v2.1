export const monthLength = 8

export const getMonths = () => {
  var today = new Date()
  var thisMonth = today.getMonth()
  var thisYear = today.getFullYear()
  var months = []
  for (var index = 0; index < monthLength; index++) {
    var month = {
      month: (thisMonth - index) < 0 ? thisMonth - index + 12 : thisMonth - index,
      year: (thisMonth - index) < 0 ? thisYear - 1 : thisYear
    }
    months.unshift(month)
  }
  return months
}

export const getTotalIncome = transactions => {
  var totalIncome = 0
  transactions.forEach(transaction => {
    totalIncome += transaction.amount
  })
  return (totalIncome / 100)
}

export const getAdminChartOptions = () => {
  var categories = []
  var months = getMonths()

  for (var index = 0; index < months.length; index++) {
    categories.push(`${months[index].year}-${months[index].month + 1}`)
  }

  return {
    dataLabels: {
      enabled: true
    },
    xaxis: {
      type: 'date',
      categories: categories
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy'
      },
    },
  }
}

export const getAdminChartSeries = (transactions) => {
  var months = getMonths()
  var monthlyTransactions = []

  for (var index = 0; index < monthLength; index++) {
    var newArray = []
    monthlyTransactions.push(newArray)
  }

  var monthlyTotalSales = []

  for (index = 0; index < transactions.length; index++) {
    for (var monthIndex = 0; monthIndex < months.length; monthIndex++) {
      if (months[monthIndex].month === new Date(transactions[index].date).getMonth()) {
        monthlyTransactions[monthIndex].push(transactions[index])
      }
    }
  }

  monthlyTransactions.forEach(transactions => {
    monthlyTotalSales.push(getTotalIncome(transactions))
  })

  return [
    {
      name: 'Monthly Sales',
      data: monthlyTotalSales
    }
  ]
}