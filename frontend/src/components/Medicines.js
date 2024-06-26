import React, { useState } from 'react';

const Medicines = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderQuantities, setOrderQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const medicines = [
    { name: 'Paracetamol', description: 'Pain reliever', dosage: '500mg', sideEffects: 'Nausea', instructions: 'Take with water', image: 'paracetamol.jpg', price: 5000 },
    { name: 'Vitamin C', description: 'Boosts immunity', dosage: '1000mg', sideEffects: 'None', instructions: 'Take after meal', image: 'vitamin_c.jpg', price: 10000 },
    { name: 'Panadol', description: 'Pain reliever', dosage: '500mg', sideEffects: 'Nausea', instructions: 'Take with water', image: 'paracetamol.jpg', price: 5000 },
    { name: 'Oskadon', description: 'Boosts immunity', dosage: '1000mg', sideEffects: 'None', instructions: 'Take after meal', image: 'vitamin_c.jpg', price: 10000 },
    { name: 'Decolgen', description: 'Boosts immunity', dosage: '1000mg', sideEffects: 'None', instructions: 'Take after meal', image: 'vitamin_c.jpg', price: 10000 },
  ];

  const filteredMedicines = medicines.filter(medicine => medicine.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleQuantityChange = (medicineName, quantity) => {
    const updatedQuantities = { ...orderQuantities, [medicineName]: quantity };
    setOrderQuantities(updatedQuantities);

    // Hitung total harga setiap kali jumlah pesanan berubah
    let total = 0;
    for (const [name, qty] of Object.entries(updatedQuantities)) {
      total += qty * findMedicineByName(name).price;
    }
    setTotalPrice(total);
  };

  const findMedicineByName = (name) => {
    return medicines.find(medicine => medicine.name === name);
  };

  const generateOrderMessage = () => {
    let message = "Order: ";
    for (const [medicineName, quantity] of Object.entries(orderQuantities)) {
      if (quantity > 0) {
        message += `${quantity} unit(s) of ${medicineName}`;
      }
    }
    message += `Total Harga: Rp ${totalPrice.toLocaleString('id-ID')}`;
    return encodeURIComponent(message);
  };

  const handleOrderClick = () => {
    const orderMessage = generateOrderMessage();
    const whatsappURL = `https://wa.me/6287709230971?text=${orderMessage}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <section id="medicines" className="medicines-section">
      <div>
        <h2 style={{ color: 'white', paddingTop: '5%' }}>Medicines</h2>
        <input
          type="text"
          placeholder="Search medicine"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="medicine-list" style={{ paddingTop: '5%', marginLeft: '1px' }}>
          {filteredMedicines.map((medicine, index) => (
            <div key={index} className="medicine-item">
              <h3>{medicine.name}</h3>
              <img src={medicine.image} alt={medicine.name} />
              <p>{medicine.description}</p>
              <p>Dosage: {medicine.dosage}</p>
              <p>Side Effects: {medicine.sideEffects}</p>
              <p>Instructions: {medicine.instructions}</p>
              <p>Price: Rp {medicine.price.toLocaleString('id-ID')}</p> {/* Ubah tampilan harga */}
              <input
                type="number"
                min="0"
                value={orderQuantities[medicine.name] || 0}
                onChange={(e) => handleQuantityChange(medicine.name, parseInt(e.target.value))}
              />
              <button onClick={() => handleOrderClick(medicine.name)}>Order</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Medicines;
