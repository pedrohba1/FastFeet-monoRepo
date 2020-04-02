export default function genName() {
    const fstName = [
        'Ovid',
        'Zedan',
        'Bramzik',
        'Jashun',
        'Eger',
        'Bhardem',
        'Jion',
        'Qun',
        'Fomur',
        'Bravek',
    ];

    const sndName = ["O'", 'Sur', 'Von', 'Derr', 'Di'];

    const trdName = [
        'Punna',
        'Bhinan',
        'Stillroot',
        'Sharprider',
        'Khussei',
        'Netsk',
        'Jundrek',
        'Chudog',
        'Dikhe',
        'Onamera',
    ];

    const nameList = [];

    while (nameList.length < 100) {
        const name = `${fstName[Math.floor(Math.random() * 10)]} ${
            sndName[Math.floor(Math.random() * 5)]
        } ${trdName[Math.floor(Math.random() * 10)]}`;
        nameList.push(name);
    }

    return nameList;
}
