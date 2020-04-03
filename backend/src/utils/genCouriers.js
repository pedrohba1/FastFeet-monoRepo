const { genEmails } = require('./genEmails');
const { genNames } = require('./genNames');

function genCouriers(size) {
    const names = genNames(size);
    const emails = genEmails(size);

    const courierList = [];
    let i = 0;

    while (i < size) {
        courierList.push({
            name: names[i],
            email: emails[i],
            created_at: new Date(),
            updated_at: new Date(),
        });
        i += 1;
    }

    return courierList;
}

exports.genCouriers = genCouriers;
