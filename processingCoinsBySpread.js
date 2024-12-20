const fs = require('fs');

module.exports = () => {
    fs.readFile('exchange coins.txt', 'utf8', (err, data) => {
        var arr = data.split('\r\n')
        var arrBin = ''
        var arrByt = ''
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            fs.readFile('prBinanceCoin.txt', 'utf8', (err, dataBin) => {
                fs.readFile('prBybitCoin.txt', 'utf8', (err, dataByb) => {
                    arrBin = dataBin.split('\r\n')
                    arrByt = dataByb.split('\r\n')
                    var prbincn = ''
                    var prbybcn = ''
                    for (let i = 0; i < arrBin.length; i++) {
                        const elementArrBin = arrBin[i].split(',')[0];
                        if (elementArrBin == element) {
                            prbincn = arrBin[i]
                        }
                    }
                    for (let i = 0; i < arrByt.length; i++) {
                        const elementArrByb = arrByt[i].split(',')[0];
                        if (elementArrByb == element) {
                            prbybcn = arrByt[i]
                        }
                    }
                    // console.log(prbincn);
                    // console.log(prbybcn);
                    var coinName1 = prbincn.split(',')[0]
                    var coinName2 = prbybcn.split(',')[0]
                    if (coinName1 === coinName2) {
                        
                        const spred = 100
                        const comis = 0.1
                        const capital = 100

                        // формула процент (бинанс / байбит)

                        var pocupcaOne = prbincn.split(',')[4]
                        var prodajaOne = prbybcn.split(',')[2]

                        var formula_bin_byb = (capital / pocupcaOne) * prodajaOne - comis - comis - comis
                        var formula_bin_byb_exit = Math.trunc(formula_bin_byb);
                        if (formula_bin_byb_exit > spred) {
                            fs.appendFileSync(`./5 minutes result coin/бинанс -> байбит/${coinName1}.txt`, `${formula_bin_byb}\r\n`, 'utf-8', 'a');
                        }

                        // формула процент (байбит / бинанс)
                        var pocupcaTwo = prbincn.split(',')[2]
                        var prodajaTwo = prbybcn.split(',')[4]

                        var formula_byb_bin = (capital / pocupcaTwo) * prodajaTwo - comis - comis - comis
                        var formula_byb_bin_exit = Math.trunc(formula_byb_bin);
                        if (formula_byb_bin_exit > spred) {
                            fs.appendFileSync(`./5 minutes result coin/байбит -> бинанс/${coinName2}.txt`, `${formula_byb_bin}\r\n`, 'utf-8', 'a');
                        }
                    }
                })
            })
        }
    })
}
