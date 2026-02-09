// Unique Unsplash image collections for different hotel types
// Each hotel will get 5 unique images

const hotelImageSets = {
  luxury: [
    ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800', 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800'],
    ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'],
    ['https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=800', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'],
    ['https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=800', 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800', 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800', 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800'],
    ['https://images.unsplash.com/photo-1549294413-26f195200c16?w=800', 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800', 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800', 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800', 'https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=800'],
  ],
  boutique: [
    ['https://images.unsplash.com/photo-1455587734955-081b22074882?w=800', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'],
    ['https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800', 'https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?w=800', 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800', 'https://images.unsplash.com/photo-1559508551-44bff1de756b?w=800', 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800'],
    ['https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800', 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=800', 'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=800', 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800', 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=800'],
    ['https://images.unsplash.com/photo-1587985064135-0366536eab42?w=800', 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800', 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800', 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800', 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800'],
    ['https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'],
  ],
  budget: [
    ['https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800', 'https://images.unsplash.com/photo-1594563703937-fdc30878e8d4?w=800', 'https://images.unsplash.com/photo-1587984831118-aaa0c8b34905?w=800', 'https://images.unsplash.com/photo-1596178060810-235f8c7b6f40?w=800', 'https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?w=800'],
    ['https://images.unsplash.com/photo-1611180106-eeee13e0e4b0?w=800', 'https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?w=800', 'https://images.unsplash.com/photo-1599619351208-3e6906d29c87?w=800', 'https://images.unsplash.com/photo-1570213489059-0aac6626cade?w=800', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800'],
    ['https://images.unsplash.com/photo-1586611292717-f828b167408c?w=800', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', 'https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=800', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800'],
    ['https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800', 'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=800', 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=800', 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800', 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800'],
    ['https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800', 'https://images.unsplash.com/photo-1597218868981-1b68e15f0065?w=800', 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=800', 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800'],
  ],
  business: [
    ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=800', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'],
    ['https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800', 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800'],
    ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'],
    ['https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=800', 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800', 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800', 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800'],
    ['https://images.unsplash.com/photo-1549294413-26f195200c16?w=800', 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800', 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800', 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800', 'https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=800'],
  ],
  beach: [
    ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800', 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800', 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800'],
    ['https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=800', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800', 'https://images.unsplash.com/photo-1584132905271-512c958d674a?w=800', 'https://images.unsplash.com/photo-1605346434674-a440ca4dc4c0?w=800', 'https://images.unsplash.com/photo-1565031491910-e57fac031c41?w=800'],
    ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', 'https://images.unsplash.com/photo-1602391833977-358a52198938?w=800', 'https://images.unsplash.com/photo-1601574968106-b312ac309953?w=800', 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'],
    ['https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800', 'https://images.unsplash.com/photo-1602391833977-358a52198938?w=800', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=800'],
    ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800', 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'],
  ]
};

// Function to get unique image set for a hotel
function getHotelImages(hotelIndex) {
  const types = ['luxury', 'boutique', 'budget', 'business', 'beach'];
  const typeIndex = Math.floor(hotelIndex / 25) % types.length;
  const setIndex = hotelIndex % 5;
  return hotelImageSets[types[typeIndex]][setIndex];
}

module.exports = { getHotelImages };
