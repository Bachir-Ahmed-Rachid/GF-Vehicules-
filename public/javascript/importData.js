let selectedFile;
    let data_list = {}
    let Fleet=[]
    document.getElementById('input').addEventListener("change", (event) => {
        selectedFile = event.target.files[0];
    })

    let data = [{
            "name": "jayanth",
            "data": "scd",
            "abc": "sdef"
        }]
    document.getElementById('button').addEventListener("click", () => {
        XLSX.utils.json_to_sheet(data, 'out.xlsx');
        if (selectedFile) {
            let fileReader = new FileReader();
            fileReader.readAsBinaryString(selectedFile);
            fileReader.onload = (event) => {
                let data = event.target.result;
                let workbook = XLSX.read(data, {type: "binary"});
                // for (let sheetName of workbook.SheetNames) {
                //     let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                //     data_list[`${sheetName}`] = rowObject
                // }
                workbook.SheetNames.forEach(sheet => {
                    let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                    data_list[`${sheet}`] = rowObject

                });
                for (let option of document.getElementById('multiple-checkboxes').options)
                {
                    if (option.selected) {
                        Fleet.push({Vehicules:`Type_${option.value.split('t')[0]}t`});
                    }
                }
                 data_list['Fleet'] = Fleet
                let dataSend = JSON.stringify(data_list);
                let form = document.getElementById('inputXlsx');
                form.action = "/expidtions/confirme/" + dataSend

            }
        }
    });
    $("#button").on("click", function() {
        $(this).prop("disabled", true);
    });
   