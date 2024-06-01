document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var formData = new FormData(this);
    
    fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Display JSON data as a table
        var tableHtml = '<table>';
        tableHtml += '<thead><tr>';
        for (var key in data[0]) {
            tableHtml += '<th>' + key + '</th>';
        }
        tableHtml += '</tr></thead><tbody>';
        data.forEach(function(row) {
            tableHtml += '<tr>';
            for (var key in row) {
                tableHtml += '<td>' + row[key] + '</td>';
            }
            tableHtml += '</tr>';
        });
        tableHtml += '</tbody></table>';
        document.getElementById('tableContainer').innerHTML = tableHtml;
    })
    .catch(error => console.error('Error:', error));
});