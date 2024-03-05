function displayTable(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear previous data
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.popularity}</td>
        `;
        productList.appendChild(row);
    });
    document.getElementById('product-table').style.display = 'table';
    document.getElementById('product-chart').style.display = 'none';
}


function displayChart(products) {
    const productTitles = products.map(product => product.title);
    const productPopularity = products.map(product => product.popularity);
    const ctx = document.getElementById('product-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productTitles,
            datasets: [{
                label: 'Popularity',
                data: productPopularity,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    document.getElementById('product-table').style.display = 'none';
    document.getElementById('product-chart').style.display = 'block';
}


fetch('https://s3.amazonaws.com/open-to-cors/assignment.json')
    .then(response => response.json())
    .then(data => {
        const products = Object.values(data.products);
        
        
        products.sort((a, b) => b.popularity - a.popularity);
        
     
        displayTable(products);

        document.getElementById('presentation-select').addEventListener('change', function() {
            const selectedPresentation = this.value;
            if (selectedPresentation === 'table') {
                displayTable(products);
            } else if (selectedPresentation === 'chart') {
                displayChart(products);
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));
