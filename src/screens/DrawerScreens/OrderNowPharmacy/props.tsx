export const detailProps = (item: any) => ({
  MedicineName: item?.generic,
  MedicineBrand: item?.medicineBrand,
  MedicinePrice: item?.potency,
  MG: item?.actualPrice,
  confirmation: true,
  selectedQuantity: item?.quantity,
  MedicineImage: item?.medicineImage,
});
