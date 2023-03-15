let montalista = function (arr, crit) {
    
    let code = `<div>`;

    if (typeof arr["Líder " + crit] != "undefined" && arr["Líder " + crit] != "") {
              code += `<b>${arr["Líder " + crit]}</b><br>`;
    }

    if (typeof arr[crit] != "undefined" && arr[crit] != "") {

            let listas = arr[crit].split(",");
            for (let i = 0; i < listas.length; i++) {
                code += listas[i].trim() + "<br>";
            }
        
    } else  {
        code += "<br>";
    }
    code += `</div>`;
    return code;
    
}



let comiss = function (par) {

  fetch(
    `https://opensheet.elk.sh/1tjmcRwo4mLUYKrlitWA1c41T8iWebQcpBjEw77Y5LpU/Comissoes`
  )
    .then((response) => response.json())
    .then((dados) => {
        let newarr = select(dados, multipatterncheck_exclude, par);
        let crit = "";
        let listas = [];
        let xpto = `
      
        <style>
            .gradecomis {
                display: grid;
                gap: 8px 16px;
                grid-template-columns: [init] 0.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr [fim];
            }

            .tablehead {
                font-size: 10px;
                text-transform: uppercase;
                color: #aaaaaa;
            }

            .tablelinha {
                background-color: #999999;
                height: 1px;
                grid-column: init / fim;
            }
        </style>
      
        <div class="outputgrid gradecomis">
        <div></div>
        <div class='tablehead'>Coordenação</div><div class='tablehead'>Processo Seletivo</div><div class='tablehead'>Auto-Avaliação</div><div class='tablehead'>Credenciamento</div><div class='tablehead'>Editorial Fronteiras do Design</div><div class='tablehead'>Organização do Seminário PPGDesign</div><div class='tablehead'>Coleta Capes</div><div class='tablehead'>Bolsas</div><div class='tablelinha'></div>`;

      for (let i = 0; i < newarr.length; i++) {
          
          xpto += `<div>${newarr[i].ano}</div>`;

          // Coordenação

          xpto += montalista(newarr[i], "Coordenação");
          xpto += montalista(newarr[i], "Seleção");
          xpto += montalista(newarr[i], "Auto Avaliação");
          xpto += montalista(newarr[i], "Credenciamento");
          xpto += montalista(newarr[i], "Editorial Fronteiras");
          xpto += montalista(newarr[i], "Oranização Seminários");
          xpto += montalista(newarr[i], "Coleta Capes");
          xpto += montalista(newarr[i], "Bolsas");

          xpto += `<div class='tablelinha'></div>`;
          
      }

      xpto += `</div>`;
      present(xpto);
    });
};