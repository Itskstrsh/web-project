import { Box } from '@mui/material';
import FooterColumn from './FooterColumn';
import { addressesData } from './addressesData';
import AddressItem from "./AddressItem";

const FooterColumns = () => {
    return (
        <Box sx={{
            display: 'flex',
            gap: 25,
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            width: '100%',
        }}>

            <FooterColumn
                items={[
                    { text: 'ЧАСТО ПОКУПАЮТ', href: '#about' },
                    { text: 'О НАС', href: '#services' },
                    { text: 'АССОРТИМЕНТ', href: '#contacts' },
                    { text: 'ОТЗЫВЫ', href: '#faq' },
                    { text: 'ДОСТАВКА', href: '#contacts' },
                    { text: 'ЧАСТО ЗАДАВАЕМЫЕ\nВОПРОСЫ', href: '#faq' },
                ]}
                textAlign="left"
                width={180}
                fontWeight={700}
            />

                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', gap: 2 }}>
                    {addressesData.map((address, index) => (
                        <AddressItem
                            key={index}
                            address={address.address}
                            addressHref={address.addressHref}
                            workingHours={address.workingHours}
                            image={address.image}
                            imageSize={25}
                            addressFontSize="16px"
                            hoursFontSize="14px"
                            addressFontWeight={500}
                            hoursFontWeight={400}
                            gap={1.3}
                        />
                    ))}
                </Box>

            <FooterColumn
                width={200}
                itemGap={1}
            >
                <FooterColumn
                    items={[
                        {
                            text: 'Политика обработки персональных данных',
                            href: '/privacy',
                        },
                        {
                            text: 'Договор публичной оферты',
                            href: '/terms',
                        },
                    ]}
                    itemGap={1}
                    textAlign="right"
                    fontSize={14}
                    fontWeight={500}
                />
            </FooterColumn>
        </Box>
    );
};

export default FooterColumns;