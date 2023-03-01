let calend = function (par) {

    let jsonfile = `https://opensheet.elk.sh/1tjmcRwo4mLUYKrlitWA1c41T8iWebQcpBjEw77Y5LpU/CALENDARIO`; // Change the URL here (imperative)
    let code = "";

    const dataemjs = function (str) {
        let datestring = str.replace("Z", "");
        let dia = new Date(datestring);
        return dia;
    }
    
    fetch(jsonfile)
        .then((response) => response.json())
        .then((jsondata) => {

            let arr = select(jsondata, multipatterncheck_exclude, par);
            console.table(arr);

            code = `
            <style>

                .complistacalendario {
                display: grid; 
                grid-template-columns: 120px 180px 1fr 150px;
                }

                .grid2col {
                display: grid;
                grid-template-columns: 300px 1fr;
                gap: 8px 20px;
                }

                .gridhead {
                font-size: 12px;
                }

                .atividadeferiado {
                background-color: blue;
                padding: 5px; margin-bottom: 2px;
                background-color: #b2ccf3;
                }

                .atividadefacultativo {
                padding: 5px;
                margin-bottom: 2px;
                background-color: #b9b2f3;
                }

                .atividadematricula {
                padding: 5px;
                margin-bottom: 2px;
                background-color: #eefad8;
                }

                .atividadeletiva {
                padding: 5px;
                margin-bottom: 2px;
                background-color: #c0f55e;
                }

                .atividadedocumentacao {
                padding: 5px;
                margin-bottom: 2px;
                background-color: #f5af5e;
                }

                .atividaderecesso {
                padding: 5px;
                margin-bottom: 2px;
                background-color: #6eabf1;
                }

                .datasletivas {
                display: grid;
                grid-template-columns: 45px 1fr 1fr 1fr 1fr 1fr;
                gap: 5px 5px;
                }

            </style>
            <div class='complistacalendario'>`;

            let cor = "";
            let complemento = "";
            let passou = "";
            let aulainicio = new Date("2100-01-01");
            let aulafim = new Date("2100-01-02");
            let diaespecifico = new Date();
            let hoje = new Date();
            let periodo = hoje.getFullYear().toString() + ".1"
            console.log(periodo);
            let pattstart = new RegExp(/Início das aulas/i);
            let pattend = new RegExp(/Último dia de aulas/i);
            let diassemana = [0, 0, 0, 0, 0, 0, 0];
            let estrangulamento = [0, 0, 0, 0, 0, 0, 0];
            let pontofacult = [0, 0, 0, 0, 0, 0, 0];

            let segundas = [];
            let tercas = [];
            let quartas = [];
            let quintas = [];
            let sextas = [];

            for (let i = 0; i < arr.length; i++) {
                if (arr[i].periodo.replace(/\.\d/i) == periodo.replace(/\.\d/i)) {
                    cor = "";
                    complemento = "";
                    passou = "";

                    // marca eventos já do passado
                    if (hoje > dataemjs(arr[i].terminasql)) {
                        passou = " opacity: 0.4;";
                    }

                    // localiza inicio e fim das aulas
                    if (pattstart.test(arr[i].nome)) {
                        aulainicio = dataemjs(arr[i].terminasql);
                    }

                    if (pattend.test(arr[i].nome)) {
                        aulafim = dataemjs(arr[i].terminasql);
                    }

                    if (arr[i].tipoevento == "Feriado") {
                        cor =
                            "padding: 5px; margin-bottom: 2px; background-color: #b2ccf3;" +
                            passou;
                        complemento = "FERIADO";

                        if (
                            aulainicio <= dataemjs(arr[i].iniciasql) &&
                            aulafim >= dataemjs(arr[i].terminasql)
                        ) {
                            // adiciona estrangulamentos possíveis
                            if (
                                dataemjs(arr[i].iniciasql).getDay == 2 &&
                                arr[i - 1].tipoevento != "Feriado"
                            ) {
                                estrangulamento[1]++;
                            }

                            if (
                                dataemjs(arr[i].terminasql).getDay == 4 &&
                                arr[i + 1].tipoevento != "Feriado"
                            ) {
                                estrangulamento[5]++;
                            }
                        }
                    }

                    if (arr[i].tipoevento == "Ponto facultativo") {
                        cor =
                            "padding: 5px; margin-bottom: 2px; background-color: #b9b2f3;" +
                            passou;
                        complemento = "PONTO FACULTATIVO";

                        if (
                            aulainicio <= dataemjs(arr[i].iniciasql) &&
                            aulafim >= dataemjs(arr[i].terminasql)
                        ) {
                        }
                    }

                    if (arr[i].tipoevento == "Matrícula") {
                        cor =
                            "padding: 5px; margin-bottom: 2px; background-color: #eefad8;" +
                            passou;
                    }

                    if (arr[i].tipoevento == "Recesso") {
                        cor =
                            "padding: 5px; margin-bottom: 2px; background-color: #6eabf1;" +
                            passou;
                    }

                    if (arr[i].tipoevento == "Atividades letivas") {
                        cor =
                            "padding: 5px; margin-bottom: 2px; background-color: #c0f55e;" +
                            passou;
                    }

                    if (arr[i].tipoevento == "Documentação") {
                        cor =
                            "padding: 5px; margin-bottom: 2px; background-color: #f5af5e;" +
                            passou;
                    }

                    code +=
                        `<div style='` +
                        cor +
                        ` font-size: 16px;'>` +
                        formatadatascalendacad(arr[i].iniciasql, arr[i].terminasql) +
                        `</div>` +
                        `<div class='botcalendario' style='` +
                        cor +
                        `'><a href='` +
                        googleagendaurl(arr[i]) +
                        `' target='_blank'>Adiciona na agenda</a></div>` +
                        `<div style='` +
                        cor +
                        `'>` +
                        arr[i].nome +
                        `</div>` +
                        `<div style='` +
                        cor +
                        `font-family: Helvetica, Arial, sans-serif; font-weight: bolder; font-size: 10px; line-height: 25px; text-align: right;'>` +
                        complemento +
                        `</div>`;
                }
            }

            code += "</div>";

            if (arr.length == 0) {
                code += ``;
            }
            present(code);
            
        });

}