document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var formData = new FormData();
    var fileInput = document.querySelector('input[type="file"]');
    formData.append('file', fileInput.files[0]);

    fetch('https://saurabh5699.pythonanywhere.com/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Received data:', data);  // Log the received data

        if (!data.shift_schedule || !Array.isArray(data.shift_schedule)) {
            throw new Error('Expected an array under key "shift_schedule" but got: ' + JSON.stringify(data));
        }

        // Display JSON data as a table
        var tableHtml = '<table>';
        tableHtml += '<thead><tr>';
        for (var key in data.shift_schedule[0]) {
            tableHtml += '<th>' + key + '</th>';
        }
        tableHtml += '</tr></thead><tbody>';
        data.shift_schedule.forEach(function(row) {
            tableHtml += '<tr>';
            for (var key in row) {
                tableHtml += '<td>' + row[key] + '</td>';
            }
            tableHtml += '</tr>';
        });
        tableHtml += '</tbody></table>';
        document.getElementById('tableContainer').innerHTML = tableHtml;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error with the fetch operation: ' + error.message);
    });
});
