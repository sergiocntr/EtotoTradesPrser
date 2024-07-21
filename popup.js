document.getElementById('extractData').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: extractData,
    }, (results) => {
      let data = results[0].result;
      generateTable(data);
    });
  });

  function getData(row, selector) {
    try {
      return row.querySelector(selector).innerText.trim();
    } catch (e) {
      return '';
    }
  }
  
  function extractData() {
    let rows = document.querySelectorAll('.et-table-row.btn-swiper-2.clickable-row');
    let data = Array.from(rows).map(row => {
      let action, symbol, type, date, time, dailyProfit, currentRate, openRate, stopLoss, takeProfit, totalProfit;
      
      try {
        action = row.querySelector('.position-action.top-line .action').innerText.trim();
      } catch (e) {
        action = '';
      }
      
      try {
        symbol = row.querySelector('.position-action.top-line .symbol').innerText.trim();
      } catch (e) {
        symbol = '';
      }
      
      try {
        type = row.querySelector('.position-action.top-line .tag').innerText.trim();
      } catch (e) {
        type = '';
      }
      
      try {
        date = row.querySelector('.position-date .open-date').innerText.trim();
      } catch (e) {
        date = '';
      }
      
      try {
        time = row.querySelector('.position-date .open-time').innerText.trim();
      } catch (e) {
        time = '';
      }
      
      try {
        dailyProfit = row.querySelector('[automation-id="portfolio-position-list-row-profit-amount-daily"]').innerText.trim();
      } catch (e) {
        dailyProfit = '';
      }
      
      try {
        currentRate = row.querySelector('[automation-id="portfolio-position-list-row-current-rate"]').innerText.trim();
      } catch (e) {
        currentRate = '';
      }
      
      try {
        openRate = row.querySelector('[automation-id="portfolio-position-list-row-open-rate"]').innerText.trim();
      } catch (e) {
        openRate = '';
      }
      
      try {
        stopLoss = row.querySelector('[automation-id="portfolio-position-list-row-stop-loss"]').innerText.trim();
      } catch (e) {
        stopLoss = '';
      }
      
      try {
        takeProfit = row.querySelector('[automation-id="portfolio-position-list-row-take-profit"]').innerText.trim();
      } catch (e) {
        takeProfit = '';
      }
      
      try {
        totalProfit = row.querySelector('[automation-id="portfolio-position-list-row-profit"]').innerText.trim();
      } catch (e) {
        totalProfit = '';
      }
      
      return { action, symbol, type, date, time, dailyProfit, currentRate, openRate, stopLoss, takeProfit, totalProfit };
    });
    return data;
  }
  
  

  
  function generateTable(data) {
    let table = `<table>
      <thead>
        <tr>
          <th>Azione</th>
          <th>Simbolo</th>
          <th>Tipo</th>
          <th>Data e Ora</th>
          <th>Profitto Giornaliero</th>
          <th>Tasso Corrente</th>
          <th>Tasso di Apertura</th>
          <th>Stop Loss</th>
          <th>Take Profit</th>
          <th>Profitto Totale</th>
        </tr>
      </thead>
      <tbody>`;
  
    data.forEach(row => {
      table += `<tr>
        <td>${row.action}</td>
        <td>${row.symbol}</td>
        <td>${row.type}</td>
        <td>${row.date} ${row.time}</td>
        <td>${row.dailyProfit}</td>
        <td>${row.currentRate}</td>
        <td>${row.openRate}</td>
        <td>${row.stopLoss}</td>
        <td>${row.takeProfit}</td>
        <td>${row.totalProfit}</td>
      </tr>`;
    });
  
    table += `</tbody></table>`;
  
    document.getElementById('output').innerHTML = table;
  }
  