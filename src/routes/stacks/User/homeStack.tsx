import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  UserDoctorDetails,
  BookAppointment,
  DetailsScreen,
  ProductDetail,
  UserDoctor,
  UserHomeService,
  UserInsurance,
  UserLaboratory,
  UserOPD,
  UserPharmacy,
  UserTravelAndTourism,
  UserHome,
  UserDonation,
  UserHospital,
  HospitalDetails,
  SearchScreen,
  ItemDetail,
  FilterFileds,
  HotelDetails,
  BookingHotel,
  PackagesDetails,
  DonationDetails,
  Payment,
  UserServices,
  InsuranceServices,
  CompanyDetails,
  UserDonationPak,
  InsurancePlain,
  HospitalDoctor,
  SymptomsAll,
  ReviewAppointment,
  BookNowTest,
  CarList,
  MainHTR,
  UserTravelAgency,
  CarDetails,
  UserInformation,
  PaymentCar,
  RentalCar,
  PaymentDetails,
  AnotherCardPayment,
  SearchScreenTravelAgency,
  EmergencyScreen,
  TicketBookingDetail,
  AddPaymentScreen,
  Notifications,
  MapLocation,
  RoomInformation,
  QuestionHotel,
  HotelFillForm,
  HotelBookingReview,
  UserRentCarHome,
  TourHome,
  TourDetails,
  HotelMapScreen,
  TravelPackageMultiWayDetail,
  TravelPackageDetailsMultiWay,
  ExpandedCars,
  Reviews,
  AllCars,
  BuyInsurance,
  SeeGuestReview,
  InsuranceCompanyDet,
  ViewMoreDepart,
  SymptomsDoctor,
  BookingTour,
  StripeAlFalah,
  Stripe_Details,
  BankAlFalah,
  TreatmentDetails,
  TreatmentsSubcategory,
  ShowAllTreatment,
  SubCategoryTreatment,
  BlinqPayment,
  ParamedicRequest,
  ViewCart,
  ChangePassword,
} from '@screens';
const Stack = createStackNavigator();

const UserHomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,

        cardStyleInterpolator: ({current, layouts}) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}>
      <Stack.Screen name="UserHome" component={UserHome} />
      <Stack.Screen name="EmergencyScreen" component={EmergencyScreen} />
      <Stack.Screen name="UserLaboratory" component={UserLaboratory} />
      <Stack.Screen name="UserDoctorDetails" component={UserDoctorDetails} />
      <Stack.Screen name="BookAppointment" component={BookAppointment} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="StripeAlFalah" component={StripeAlFalah} />
      <Stack.Screen name="Stripe_Details" component={Stripe_Details} />
      <Stack.Screen name="BlinqPayment" component={BlinqPayment} />
      <Stack.Screen name="ViewCart" component={ViewCart} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />

      <Stack.Screen name="BankAlFalah" component={BankAlFalah} />

      <Stack.Screen
        name="TicketBookingDetail"
        component={TicketBookingDetail}
      />
      <Stack.Screen name="AddPaymentScreen" component={AddPaymentScreen} />
      <Stack.Screen name="ItemDetail" component={ItemDetail} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="FilterFileds" component={FilterFileds} />
      <Stack.Screen name="HotelMapScreen" component={HotelMapScreen} />
      <Stack.Screen name="HotelDetails" component={HotelDetails} />
      <Stack.Screen name="HospitalDetails" component={HospitalDetails} />
      <Stack.Screen name="HospitalDoctor" component={HospitalDoctor} />
      <Stack.Screen name="BookingHotel" component={BookingHotel} />
      <Stack.Screen name="PackagesDetails" component={PackagesDetails} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="UserServices" component={UserServices} />
      <Stack.Screen name="ReviewAppointment" component={ReviewAppointment} />
      <Stack.Screen name="UserDonationPak" component={UserDonationPak} />
      <Stack.Screen name="HotelBookingReview" component={HotelBookingReview} />
      <Stack.Screen name="SeeGuestReview" component={SeeGuestReview} />
      <Stack.Screen name="TreatmentDetails" component={TreatmentDetails} />
      {/* ...................health Insurance ....................*/}
      <Stack.Screen name="InsuranceServices" component={InsuranceServices} />
      <Stack.Screen name="CompanyDetails" component={CompanyDetails} />
      <Stack.Screen name="InsurancePlain" component={InsurancePlain} />
      <Stack.Screen name="BuyInsurance" component={BuyInsurance} />
      <Stack.Screen
        name="SubCategoryTreatment"
        component={SubCategoryTreatment}
      />
      <Stack.Screen name="ParamedicRequest" component={ParamedicRequest} />
      <Stack.Screen
        name="TreatmentsSubcategory"
        component={TreatmentsSubcategory}
      />
      <Stack.Screen name="ShowAllTreatment" component={ShowAllTreatment} />
      <Stack.Screen
        name="InsuranceCompanyDet"
        component={InsuranceCompanyDet}
      />
      {/* .........................SymptomsFlow........................... */}
      <Stack.Screen name="SymptomsAll" component={SymptomsAll} />
      <Stack.Screen name="SymptomsDoctor" component={SymptomsDoctor} />
      {/* .........UserPharmacyScreen........ */}
      <Stack.Screen name="UserPharmacy" component={UserPharmacy} />
      <Stack.Screen name="RoomInformation" component={RoomInformation} />
      <Stack.Screen name="HotelFillForm" component={HotelFillForm} />
      <Stack.Screen name="BookingTour" component={BookingTour} />
      {/* .........UserTravel And Torism........ */}
      <Stack.Screen
        name="UserTravelAndTourism"
        component={UserTravelAndTourism}
      />
      <Stack.Screen name="QuestionHotel" component={QuestionHotel} />

      {/* ,,,,,......UserRentCar....................... */}
      <Stack.Screen name="UserRentCarHome" component={UserRentCarHome} />
      <Stack.Screen name="CarList" component={CarList} />
      <Stack.Screen name="ExpandedCars" component={ExpandedCars} />
      <Stack.Screen name="Reviews" component={Reviews} />
      <Stack.Screen name="AllCars" component={AllCars} />
      <Stack.Screen name="MainHTR" component={MainHTR} />
      <Stack.Screen name="CarDetails" component={CarDetails} />
      <Stack.Screen name="UserTravelAgency" component={UserTravelAgency} />
      <Stack.Screen
        name="TravelPackageMultiWayDetail"
        component={TravelPackageMultiWayDetail}
      />
      <Stack.Screen
        name="SearchScreenTravelAgency"
        component={SearchScreenTravelAgency}
      />
      <Stack.Screen name="UserInformation" component={UserInformation} />
      <Stack.Screen
        name="TravelPackageDetailsMultiWay"
        component={TravelPackageDetailsMultiWay}
      />
      <Stack.Screen name="PaymentCar" component={PaymentCar} />
      <Stack.Screen name="RentalCar" component={RentalCar} />
      <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
      <Stack.Screen name="AnotherCardPayment" component={AnotherCardPayment} />
      <Stack.Screen name="TourHome" component={TourHome} />
      <Stack.Screen name="TourDetails" component={TourDetails} />
      {/* .........UserOPD........ */}
      <Stack.Screen name="UserOPD" component={UserOPD} />
      {/* .........UserHomeService........ */}
      <Stack.Screen name="UserHomeService" component={UserHomeService} />
      {/* <Stack.Screen name="Booking" component={Booking} /> */}
      {/* .........UserInsurance........ */}
      <Stack.Screen name="UserInsurance" component={UserInsurance} />
      {/* .........UserDonation........ */}
      <Stack.Screen name="UserDonation" component={UserDonation} />
      {/* .........UserDoctor........ */}
      <Stack.Screen name="UserDoctor" component={UserDoctor} />
      {/* .........UsersHospitals........ */}
      <Stack.Screen name="UserHospital" component={UserHospital} />
      <Stack.Screen name="BookNowTest" component={BookNowTest} />
      <Stack.Screen name="ViewMoreDepart" component={ViewMoreDepart} />

      {/* .........UsersDonation........ */}
      {/* <Stack.Screen
        name="UserDonationPayment"
        component={UserDonationPayment}
      /> */}
      <Stack.Screen name="DonationDetails" component={DonationDetails} />
      <Stack.Screen name="MapLocation" component={MapLocation} />
    </Stack.Navigator>
  );
};
export default UserHomeStack;
