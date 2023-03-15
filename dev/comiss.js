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
        
        if (par == "último") {
              par = dados[0].Ano;
        }
          
        let newarr = select(dados, multipatterncheck_exclude, par);
        let crit = "";
        let listas = [];
          let xpto = `

        
      
        <style>
            .gradecomis {
                display: grid;
                gap: 16px 16px;
                grid-template-columns: [init] 0.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr [fim];
                font-size: 14px;
                min-width: 1400px;
                overflow-x: scroll;
                width: 100%;
            }

            .gradecomis div b {
                color: var(--color-hover, #34f8d1);
            }

            .tablehead {
                font-size: 10px;
                text-transform: uppercase;
                color: #aaaaaa;
                align-self: end;
                line-height: 12px;
            }

            .tablelinha {
                background-color: #999999;
                height: 1px;
                grid-column: init / fim;
            }

            .tabelanos {
                font-size: 10px;
                text-transform: uppercase;
                color: #aaaaaa;
                line-height: 12px;
                font-weight: bolder;
            }

            .linksmod {
                text-decoration: none;
                font-size: 12px;
                line-height: 20px;
                color: var(--text-color, #a7caca);
                padding: 4px 10px 4px 10px;
                margin: -4px 0 -4px -10px;
            }
            .linksmod:hover {
                background-color: var(--text-color, #a7caca);
                color: var(--bg-color, #4a4a4a);
            }
        </style>
      
        <div class="outputgrid"><div style='width: 100%; margin-bottom: 24px;'><a class='linksmod'href='javascript:setinput("/comiss ")'>TODOS OS ANOS</a>`;
        
          let todosanos = unique(dados, "ano");
          
          for (let k = 0; k < todosanos.length; k++) {
              xpto += `<a class='linksmod' href='javascript:setinput("/comiss ${todosanos[k]} ")'>${todosanos[k]}</a>`;
          }

          xpto += '</div>';
          
          
        xpto += `
        <div class="gradecomis">
        <div></div>
        <div class='tablehead'>Coordenação</div><div class='tablehead'>Processo Seletivo</div><div class='tablehead'>Auto-Avaliação</div><div class='tablehead'>Credenciamento</div><div class='tablehead'>Editorial Fronteiras do Design</div><div class='tablehead'>Organização dos Seminários</div><div class='tablehead'>Coleta Capes</div><div class='tablehead'>Bolsas</div><div class='tablelinha'></div>`;

      for (let i = 0; i < newarr.length; i++) {
          
          xpto += `<div class='tabelanos'>${newarr[i].ano}</div>`;

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

      xpto += `</div></div>`;
      present(xpto);
    });
};