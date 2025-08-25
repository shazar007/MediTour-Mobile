import {LabCalender, location} from '@assets';

export const genericData_props = (props?: any) => {
  return [
    {
      id: 0,
      editable: false,
      value: props?.pickupLocation,
      placeholder: 'Pickup Location',
      startIcon: location,
      AllPress: () => props?.openLocation('PickupLocation'),
    },
    {
      id: 1,
      editable: false,
      value: props?.pickupDate?.toLocaleString(),
      placeholder: 'Pickup Date & Time',
      startIcon: LabCalender,
      AllPress: () => props?.openDateTimePicker('pickUpDateTime'),
    },
    {
      id: 2,
      editable: false,
      value: props?.dropoffLocation,
      placeholder: 'Drop-off Location',
      startIcon: location,
      AllPress: () => props?.openLocation('DropLocation'),
    },
    {
      id: 3,
      editable: false,
      value: props?.dropOffDate.toLocaleString(),
      placeholder: 'Drop-off Date & Time',
      startIcon: LabCalender,
      AllPress: () => props?.openDateTimePicker('dropOffDateTime'),
    },
  ];
};
