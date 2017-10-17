Ext.application({
    name: 'WK',
    extend: 'WK.Application',
    user: {
        email: 'test@test.ru',
        passwd: '123456'
    },
    requires: [
        'WK.*'
    ]
});
