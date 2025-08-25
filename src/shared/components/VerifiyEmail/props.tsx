export const checkDoctor = (changeStack: any) => {
  let arrange =
    changeStack === 'Doctors'
      ? 'Doctor'
      : changeStack === 'Paramedic staff'
      ? 'Paramedic'
      : changeStack === 'Travel Agency'
      ? 'travelagency'
      : changeStack === 'Hotels'
      ? 'hotel'
      : changeStack === 'Rent A car'
      ? 'rentacar'
      : changeStack;

  if (
    arrange === 'Doctor' ||
    arrange === 'Physiotherapist' ||
    arrange === 'Nutritionist' ||
    arrange === 'Paramedic' ||
    arrange === 'Psychologist'
  ) {
    return {
      type: 'doctor',
      doctorKind: arrange?.toLowerCase(),
    };
  } else {
    return {
      type: arrange?.toLowerCase(),
    };
  }
};
