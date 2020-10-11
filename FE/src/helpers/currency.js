export function ConvertToRupiah(bilangan) {
    var number_string = bilangan.toString(),
        sisa = number_string.length % 3,
        rupiah = number_string.substr(0, sisa),
        ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
        var separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }
    return rupiah;
}

export function ConvertToAngka(bilangan) {
    console.warn('curr 1, bil :' + bilangan);
    bilangan = bilangan.toString().replace('.', '');
    console.warn('curr 2, bil :' + Number(bilangan));
    return Number(bilangan);
}