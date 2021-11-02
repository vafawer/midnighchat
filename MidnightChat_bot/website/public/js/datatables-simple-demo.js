window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple);
    }

    const datatablesSimpleHirer = document.querySelectorAll('.findtable');
    console.log(datatablesSimpleHirer);
    datatablesSimpleHirer.forEach(element => {
        if (element) {
            new simpleDatatables.DataTable(element);
        }
    });

});
