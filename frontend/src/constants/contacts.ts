export interface ContactInfo {
    phone: string;
    email: string;
    addresses: Array<{
        address: string;
        hours: string;
    }>;
    socialLinks: {
        whatsapp: string;
        instagram: string;
        telegram: string;
    };
}


export const contacts: ContactInfo = {
    phone: '+7 (988) 130-45-76',
    email: 'order@vinegret.ru',
    addresses: [
        {
            address: 'г. Новороссийск ул. Мысхакское Шоссе 71А',
            hours: 'ПТ - ПН с 9:00 до 19:30'
        },
        {
            address: 'г. Новороссийск, ул. Хворостянского, 4',
            hours: 'Ежедневно с 9:00 до 20:00'
        }
    ],
    socialLinks: {
        whatsapp: 'https://wa.me/79881304576',
        instagram: 'https://instagram.com/vinegret',
        telegram: 'https://t.me/vinegret'
    }
};


export const workingHours = {
    phone: 'Ежедневно с 9:00 до 21:00'

};