// Mock API call to Yahoo Finance API for demo purposes
const getPrice = async (asset) => {
    // Replace with actual API call as needed
    return new Promise((resolve) => {
      const mockPrices = { Bitcoin: 30000, Ethereum: 2000, Apple: 150 };
      resolve(mockPrices[asset] || 100);
    });
  };
  
  // Initialize asset data and chart variables
  let assets = [];
  let assetChart;
  
  async function addAsset() {
    const accountName = document.getElementById('accountName').value;
    const assetName = document.getElementById('assetName').value;
    const assetAmount = parseFloat(document.getElementById('assetAmount').value);
  
    if (!accountName || !assetName || isNaN(assetAmount)) {
      alert("Please fill in all fields with valid data.");
      return;
    }
  
    const price = await getPrice(assetName);
    const assetValue = assetAmount * price;
  
    // Add asset to list and reset input fields
    assets.push({ account: accountName, asset: assetName, amount: assetAmount, value: assetValue });
    document.getElementById('accountName').value = '';
    document.getElementById('assetName').value = '';
    document.getElementById('assetAmount').value = '';
  
    updateChart();
  }
  
  function updateChart() {
    const labels = assets.map(a => `${a.account} - ${a.asset}`);
    const data = assets.map(a => a.value);
  
    if (assetChart) assetChart.destroy();
  
    const ctx = document.getElementById('assetChart').getContext('2d');
    assetChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Asset Value',
          data: data,
          backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: $${context.raw.toFixed(2)}`;
              }
            }
          }
        }
      }
    });
  }
  