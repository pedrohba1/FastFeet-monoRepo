export default function genEMail() {
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
        'Lalek',
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

    const provedor = [
        '@hotmail.com',
        '@gmail.com',
        '@yahoo.com',
        '@outlook.com',
        '@openmailbox.org',
    ];
    const emailList = [];
    while (emailList.length < 100) {
        const email = `${fstName[Math.floor(Math.random() * 10)]}_${
            sndName[Math.floor(Math.random() * 5)]
        }_${trdName[Math.floor(Math.random() * 10)]}${
            provedor[Math.floor(Math.random() * 5)]
        }`;
        if (!emailList.includes(email)) emailList.push(email);
    }

    return emailList;
}
