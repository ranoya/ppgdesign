let jsonfile = `https://docs.google.com/spreadsheets/d/1tjmcRwo4mLUYKrlitWA1c41T8iWebQcpBjEw77Y5LpU/edit#gid=1411182170`;

let db = function (par) {

  let linkkey = `link`;
  let namekey = `titulo`;

  getcsvdata(GoogleSheetCsvURL(jsonfile), function (dados) {
    
      let newarr = select(dados, multipatterncheck_exclude, par);
      let xpto = `<div class="outputgrid">`;

      for (let i = 0; i < newarr.length; i++) {
        xpto += `<a target='_self' href='${newarr[i][linkkey]}'>${newarr[i][namekey]}`;
      }

      xpto += `</div>`;
      present(xpto);
    });
};