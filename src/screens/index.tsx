import OnBoarding from './OnBoarding';
import PortalSelection from './PortalSelection';

//..................User.....................//
import UserLogin from './User/Login';
import UserSignup from './User/Signup';
import ForgotPassword from './User/ForgotPassword';
import UserHome from './User/Home';
import EmergencyScreen from './User/Home/EmergencyScreen';
import UserDoctor from './User/Home/Doctors/Home';
import UserLaboratory from './User/Home/Laboratory';
import UserPharmacy from './User/Home/Pharmacy';
import UserTravelAndTourism from './User/Home/TravelAndTourism';
import UserOPD from './User/Home/OPD';
import UserHomeService from './User/Home/HomeService';
import UserInsurance from './User/Home/Insurance';
import UserDonation from './User/Home/Donation';
import MyBookings from './User/MyBookings';
import HistoryDetailsScreen from './User/MyBookings/HistoryDetails';
import StripeAlFalah from './User/StripeAlFalah';
import Stripe_Details from './User/StripeAlFalah/details';
import BankAlFalah from './BankAlFalah';
import BlinqPayment from './BlinqPayment';
// import History from './User/History';
import OrderDetails from './User/History/OrderDetails';
import Messages from './User/Messages';
import UserDoctorDetails from './User/Home/Doctors/DoctorDetails';
import BookAppointment from './User/Home/Doctors/BookAppointment';
import DetailsScreen from './User/DetailsScreen';
import ProductDetail from './User/ProductDetail';
import SearchScreen from './User/Home/ExtraScreens/SearchScreen';
import UserForgotPassword from './User/Forgot';
import ItemDetail from './User/ItemDetailScreen';
import FilterFileds from './User/Home/HotelScreen/FilterFileds';
import HotelMapScreen from './User/Home/HotelScreen/HotelMapScreen';
import PackagesDetails from './User/Home/DonationFlow/PackagesDetails';
import UserDonationPak from './User/Home/DonationFlow/UserDonationPak';
import HospitalDoctor from './User/Home/Hospital/HospitalDoctors';
// import UserDonationPayment from './User/Home/DonationFlow/UserDonationPayment';
import SearchScreenTravelAgency from './User/Home/UserTravelAgency/SearchScreen';
// import TravelPackagesDetailsScreen from './User/Home/UserTravelAgency/TravelPackagesDetails';
import TicketBookingDetail from './User/Home/UserTravelAgency/TicketBookingDetail';
import AddPaymentScreen from './User/Home/UserTravelAgency/AddPaymentScreen';
import TravelPackageMultiWayDetail from './User/Home/UserTravelAgency/TravelPackageMultiWay';
import TravelPackageDetailsMultiWay from './User/Home/UserTravelAgency/TravelPackageDetailsMultiWay';
////////////////userHospital///////////////////////
import UserHospital from './User/Home/Hospital/HospitalDoctors';
import HospitalDetails from './User/Home/Hospital/HospitalDetails';
import ViewMoreDepart from './User/Home/Hospital/ViewMoeDepart';

//..................Hsopital.....................//

import HospitalSignup from './Hospital/Signup';
import HospitalHome from './Hospital/Home';
import HospitalAppointments from './Hospital/Appointment';
import HospitalDepartments from './Hospital/Departments';
import HospitalPayments from './Hospital/Payments';
//..................Laboratory.....................//

import LaboratoryLogin from './Laboratory/Login';
import LaboratorySignup from './Laboratory/Signup';
import LaboratoryHome from './Laboratory/Home';
import LaboratoryForgot from './Laboratory/Forgot';
import LaboratoryTest from './Laboratory/Test';
import LaboratoryOrder from './Laboratory/Order';
import LaboratoryResult from './Laboratory/Result';
//..................Pharmacy.....................//

import PharmacyHome from './Pharmacy/Home';
import PharmacyTest from './Pharmacy/Test';
import PharmacyOrder from './Pharmacy/Order';
import PharmacyResult from './Pharmacy/Result';
import PharmacyPaymentDetails from './Pharmacy/PaymentDetails';

//..................Ambulance.....................//

import AmbulanceHome from './Ambulance/Home';
import AmbulanceScreen from './Ambulance/AmbulanceScreen';
import AmbulanceRequest from './Ambulance/Request';
import AmbulancePayment from './Ambulance/Payment';
import AmbulanceDetail from './Ambulance/AmbulanceDetail';
import AvailAmbulance from './Ambulance/AvailAmbulance';
//..................Physiotherapist.....................//

import PhysiotherapistHome from './Physiotherapist/Home';

//..................Nutritionist.....................//
import NutritionistHome from './Nutritionist/Home';
import NutritionistRequest from './Nutritionist/Request';
import NutritionistAppointment from './Nutritionist/Appointment';
import NutritionistPayment from './Nutritionist/Payment';
import NutritionistPaymentDetails from './Nutritionist/PaymentDetails';
//..................Paramedic-Staff.....................//
import ParamedicStaff_Home from './Paramedic_Staff/Home';
import ParamedicStaffAppointment from './Paramedic_Staff/Appointment';
import ParamedicStaffPayment from './Paramedic_Staff/Payment';
import ParamedicStaffRequest from './Paramedic_Staff/Request';
//..................Psychologist.....................//
import PsychologistHome from './Psychologist/Home';
import PsycologistAppointment from './Psychologist/Appointment';
import PsycologistPayment from './Psychologist/Payment';
import PsycologistRequest from './Psychologist/Request';
//..................Physiotherapist.....................//
import PhysiotherapistAppointment from './Physiotherapist/Appointment';
import PhysiotherapistPayment from './Physiotherapist/Payment';
import PhysiotherapistRequest from './Physiotherapist/Request';
//..................TravelAgency.....................//
import TravelAgencyHome from './TravelAgency/Home';
import TravelAgencyBooking from './TravelAgency/Booking';
import TravelAgencyBookingDetails from './TravelAgency/Booking/BookingDetails';
import TravelAgencyRequests from './TravelAgency/Requests';
import TravelAgencyRequestDetail from './TravelAgency/Requests/details';
import AddTicket from './TravelAgency/AddTicket';
import Payments from './Payment';
import PaymentsDetails from './Payment/PaymentDetails';
//..................Hotel.....................//
import HotelHome from './Hotels/Home';
import HotelBooking from './Hotels/Booking';
import HotelPayment from './Hotels/Payment';
import HotelReservation from './Hotels/Reservation';
import HotelPaymentDetails from './Hotels/PaymentDetails';
import HotelServices from './Hotels/HotelServices';
import ApartmentServices from './Hotels/ApartmentServices';
import HomeServices from './Hotels/HomeServices';
import HotelInfo from './Hotels/HotelScreens/HotelInfo';
import BookingDetails from './Hotels/Booking/BookingDetails';
//..................RentACar.....................//
import RentACar_Home from './RentACar/Home';
//..................Donation.....................//
import DonationSignup from './Donation/Signup';
import DonationHome from './Donation/Home';
import DonationDonors from './Donation/Donors';
import DonationPackages from './Donation/Packages';
import DonationPayment from './Donation/Payment';
import DonorDetails from './Donation/DonorDetails';
import DonationPaymentDetails from './Donation/PaymentDetails';
//..................Insurance.....................//
import InsuranceHome from './Insurance/Home';
import InsuredPerson from './Insurance/InsuredPerson';
import InsurancePayment from './Insurance/Payment';
import InsurancePaymentDetails from './Insurance/PaymentDetails';
import InsuranceRequest from './Insurance/Request';
import InsuredDetail from './Insurance/InsuredDetail';
import InsurancePlan from './Insurance/InsurancePlan';
import InsurancePackage from './Insurance/InsurancePackage';
import MyselfPackage from './Insurance/MyselfPackage';
import TravelPackage from './Insurance/_TravelPackage_Old';
import HospitalPackage from './Insurance/Hospital';
//..................Doctors.....................//
import DoctorsSignup from './Doctors/Signup';
import DoctorsHome from './Doctors/Home';
import DoctorsAppointment from './Doctors/Appointment';
import DoctorsPayment from './Doctors/Payment';
import DoctorsRequest from './Doctors/Request';
import HotelDetails from './User/Home/HotelTourism/HotelDetails.tsx';
import BookingHotel from './User/Home/HotelTourism/BookingHotel';
import DonationDetails from './User/Home/DonationFlow/DonationDetails';
import Payment from './User/Home/DonationFlow/Payment';
import UserServices from './User/Home/HomeService/Services/Home';
import All_Patient_History from './Doctors/PharmHistory/AllHistory';
import DOC_HistoryDetails from './Doctors/PharmHistory/HistoryDetails';
////////////////////UseInsuranceFlow////////////////////////////
import InsuranceServices from './User/Home/Insurance/InsuranceServices';
import CompanyDetails from './User/Home/Insurance/CompanyDetails';
import InsurancePlain from './User/Home/Insurance/InsurancePlain';
////////////////////DiseasesList/////////////////////

// ..............SymptomsFlow......................//
import SymptomsAll from './User/Home/SymptomsFlow/SymptomsAll';
import EmailVerification from './User/EmailVerification';
import ReviewAppointment from './User/Home/Doctors/ReviewAppointment';
import BookNowTest from './User/Home/BookNowTest';
// .....................Rent a Car Flow........................//
import UserRentCarHome from './User/Home/RentCarFlow/Home';
import CarList from './User/Home/RentCarFlow/CarList';
import AllCars from './User/Home/RentCarFlow/ExpandedCars/AllCars';
import ExpandedCars from './User/Home/RentCarFlow/ExpandedCars';
import Reviews from './User/Home/RentCarFlow/ExpandedCars/Reviews';
import MainHTR from './User/Home/MainHTR';
import UserTravelAgency from './User/Home/UserTravelAgency';
import TourHome from './User/Home/TravelAndTourism/TravelTour/TourHome';
import TourDetails from './User/Home/TravelAndTourism/TravelTour/TourDetails';
import CarDetails from './User/Home/RentCarFlow/CarDetails';
import UserInformation from './User/Home/RentCarFlow/UserInformation';
import PaymentCar from './User/Home/RentCarFlow/PaymentCar';
import RentalCar from './User/Home/RentCarFlow/RentalCar';
import PaymentDetails from './User/Home/RentCarFlow/PaymentDetails';
import AnotherCardPayment from './User/Home/RentCarFlow/AnotherCardPayment';
import Notifications from './Notification';
import MapLocation from './User/Home/MapLocation';
import ViewCart from './DrawerScreens/ViewCart';
import OrderNoWPharmacy from './DrawerScreens/OrderNowPharmacy';
import OverView from './DrawerScreens/Orders';
import UserProfile from './DrawerScreens/UserProfile';
import EditProfile from './DrawerScreens/EditProfile';
import ChangePassword from './User/Profile/ChangePassword';
import PrivacyPolicies from './DrawerScreens/PrivacyPolicies';
import Favorite from './DrawerScreens/Favorite';
import HelpCenter from './DrawerScreens/HelpCenter';
import OrderHistory from './DrawerScreens/OrderHistory';
import RoomInformation from './User/Home/HotelTourism/RoomInformation';
import QuestionHotel from './User/Home/HotelTourism/QuestionHotel';
import HotelFillForm from './User/Home/HotelTourism/HotelFillForm';
import HotelBookingReview from './User/Home/HotelTourism/HotelBookingReview';

// ..................... Top tabs........................//

import Multicity from './User/Home/TopTabs/Multicity';
import PreceptionDetails from './User/AppointmentUpcoming/PreceptionDetails';
import AppointmentUpcoming from './User/AppointmentUpcoming';
import BuyInsurance from './User/Home/Insurance/BuyInsurance';
import AppointmentDetails from './User/AppointmentUpcoming/AppointmentDetails';
import SeeGuestReview from './User/Home/TravelAndTourism/TravelTour/SeeGuestReview';
import InsuranceCompanyDet from './User/Home/Insurance/InsuranceCompanyDet';
import SymptomsDoctor from './User/Home/SymptomsFlow/SymptomsDoctor';
import Request from './DrawerScreens/Request';

import OrderDetail_Lab_B2B from './Laboratory/Order/orderDetail';
import Lab_Settings_B2B from './Laboratory/Settings';
import Payment_Lab_B2B from './Laboratory/Payment';
import PrivacyPolicy_B2B from './Laboratory/PrivacyPolicy';
import HospitalAppointments_Patient_Details from './Hospital/Appointment/detail';
import Hospital_Documents from './Hospital/Documents';
import Hospital_Doctors from './Hospital/Doctors';
import Hospital_Patient_History from './Hospital/PatientHistory';
import Hospital_Patient_History_Detail from './Hospital/PatientHistory/details';
import Hosp_Prescription_Detail from './Hospital/PatientHistory/patientDetail';
import Donation_Donors_Detail from './Donation/Donors/details';
import Donation_Criteria from './Donation/Criteria';
import Donation_Add_Packages from './Donation/Packages/addPackages';
import Donation_Add_Criteria from './Donation/Criteria/addCriteria';
import Donation_Package_Detail from './Donation/Packages/details';
import PrivacyPolicy_B2B_Donation from './Donation/PrivacyPolicy';
import Donation_Settings_B2B from './Donation/Settings';
import Hospital_Settings_B2B from './Hospital/Settings';
import PrivacyPolicy_B2B_Hospital from './Hospital/PrivacyPolicy';
import HelpCenter_Donation from './Donation/HelpCenter';
// ..................... Generic B2B Screeens........................//
import B2BDetailScreen from './B2BDetailScreen';

// ..................... Settings B2B Screeens........................//
import PharmacySettings from './Pharmacy/Settings';

import AddAvailability from './Doctors/AddAvailability';
import AvailabilityDetails from './Doctors/AvailabilityDetails';
import Availability from './Doctors/Availability';
import AppointmentPrescription from './Doctors/AppointmentPrescription';
import Orders from './DrawerScreens/Orders';
import HospitalAvailable from './Doctors/HospitalAvailable';
import PropertyBnb from './Hotels/PropertyBnb';
import HotelInfoFom from './Hotels/HotelInfoFom';
import PropertyRooms from './Hotels/PropertyRooms';
import RoomDetail from './Hotels/RoomDetail';
import Facilities from './Hotels/Facilities';
import Amenities from './Hotels/Amenities';
import PropertyPhotos from './Hotels/PropertyPhotos';
import PoliciesScreen from './Hotels/PoliciesScreen';
import AllHotelProperty from './Hotels/AllHotelProperty';
import RegistrationSuccessScreen from './Hotels/RegistrationSuccessScreen';
import SinglePropertyDetails from './Hotels/SinglePropertyDetails';
import ApartmentFields from './Hotels/ApartmentFields';
import EntirePlaceHome from './Hotels/EntirePlaceHome';
import HomeRoomDetails from './Hotels/HomeRoomDetails';
import HomeFacilities from './Hotels/HomeFacilities';
import HotelRoomDetails from './Hotels/HotelRoomDetails';

import Category from './Insurance/Category';
import Vehicles from './RentACar/Vehicles';
import RentCarPayment from './RentACar/Payment';
import VehicleDetail from './RentACar/Vehicles/VehicleDetail';
import Category_Basic from './Insurance/Category/basic';
import Haelth_Category_Hos_Lab from './Insurance/Category/hospitalLab';
import Category_Benefits from './Insurance/Category/benefits';
import Category_Price from './Insurance/Category/price';
import Package_Detail from './Insurance/MyselfPackage/detail';
import Insurance_Travel_Package from './Insurance/TravelPackage';
import Medical_Benefits from './Insurance/TravelPackage/medicalBenefits';
import Travel_Benefits from './Insurance/TravelPackage/travelBenefits';
import Insurance_Settings_B2B from './Insurance/Settings';
import PrivacyPolicy_B2B_Insurance from './Insurance/PrivacyPolicy';
import RentCarCustomerDetails from './RentACar/DrawerScreens/CustomerDetails';
import RentCarCustomerList from './RentACar/DrawerScreens/HistoryRentACar';
import Pharmacy_Settings_B2B from './Pharmacy/Settings';
import PrivacyPolicy_B2B_Pharmacy from './Pharmacy/PrivacyPolicy';
import Doc_Settings_B2B from './Doctors/Settings';
import PrivacyPolicy_B2B_Doc from './Doctors/PrivacyPolicy';
import PrivacyPolicy_B2B_RentACar from './RentACar/PrivacyPolicy';
import RentACar_Settings_B2B from './RentACar/Settings';
import TravelAgency_Add_Edit_Booking from './TravelAgency/Booking/add';
import TravelAgency_Settings_B2B from './TravelAgency/Settings';
import PrivacyPolicy_B2B_TravelAgency from './TravelAgency/PrivacyPolicy';
import PrivacyPolicy_B2B_Hotel from './Hotels/PrivacyPolicy';
import Hotel_Settings_B2B from './Hotels/Settings';
import Psychologist_Settings_B2B from './Psychologist/Settings';
import PrivacyPolicy_B2B_Physiologist from './Psychologist/PrivacyPolicy';
//....................Home Services........................//
import HomeServices_Home from './HomeServices/Home';
import HomeServices_Appointment from './HomeServices/Appointment';
import HomeServices_Request from './HomeServices/Request';
import HomeServices_Payment from './HomeServices/Payment';
import TicketAdd from './TravelAgency/TicketAdd';
import AppDetails from './TravelAgency/AppDetails';
import TravelerForm from './TravelAgency/TravelerForm';

//  ///////,,,,..................b2bAmbulance .///
import BidAmbulance from './Ambulance/BidAmbulance';
import RequestDetails from './DrawerScreens/RequestDetails';
import PaymentRequest from './DrawerScreens/PaymentRequest';
import AmbulanceSetting from './Ambulance/AmbulanceSetting';
import AmbulancePrivacy from './Ambulance/AmbulancePrivacy';
import BookingTour from './User/Home/TravelAndTourism/TravelTour/BookingTour';
import FlightsDetails from './DrawerScreens/FlightsDetails';
import BidDetails from './DrawerScreens/BidDetails';
import TravelerIdentity from './DrawerScreens/TravelerIdentity';
import TravelerInfo from './DrawerScreens/TravelerInfo';
import BookingFlightsTour from './TravelAgency/BookingFlightsTour';
import BookingToursDetails from './TravelAgency/BookingToursDetails';
import VecailOrderDetails from './RentACar/VecailOrderDetails';
import VecailOrderRequest from './RentACar/VecailOrderRequest';
import HistoryRentACar from './RentACar/DrawerScreens/HistoryRentACar';
import BidRequest from './Pharmacy/BidRequest';
import PharmacyRequest from './Pharmacy/PharmacyRequest';
import FormatDesign from './User/Home/FormatDesign';
import DoctorProfile from './Doctors/DoctorProfile';
import PresecriptionDesign from './Hospital/PatientHistory/PresecriptionDesign';
import DoctorProfileInformation from './Doctors/DoctorProfileInformation';
import AddTreatments from './Doctors/AddTreatments';
import AddUpdateTreatment from './Doctors/AddUpdateTreatment';
import TreatmentDetails from './User/Home/SymptomsFlow/TreatmentDetails';
import TreatmentsSubcategory from './User/Home/Doctors/TreatmentsSubcategory';
import ShowAllTreatment from './User/Home/SymptomsFlow/ShowAllTreatment';
import SubCategoryTreatment from './User/Home/SymptomsFlow/SubCategoryTreatment';
import RequestInsurance from './Insurance/RequestInsurance';
import PatientHistoryDetails from './Insurance/PatientHistoryDetails';
import MedOrderDetails from './DrawerScreens/Orders/MedOrderDetails';
import JoinAsProvider from './JoinAsProvider';
import User_Profile from './User/Profile';

//................New Login.........

import New_Login from './User/NewLogin';
import ParamedicRequest from './User/Home/HomeService/Services/ParamedicRequest';
import ResultDetails from './Laboratory/Result/ResultDetails';

export {
  User_Profile,
  ResultDetails,
  ParamedicRequest,
  JoinAsProvider,
  PatientHistoryDetails,
  RequestInsurance,
  MedOrderDetails,
  OrderHistory,
  SubCategoryTreatment,
  ShowAllTreatment,
  TreatmentsSubcategory,
  TreatmentDetails,
  BlinqPayment,
  AddUpdateTreatment,
  DoctorProfileInformation,
  PresecriptionDesign,
  FormatDesign,
  PharmacyRequest,
  BidRequest,
  BankAlFalah,
  HistoryRentACar,
  VecailOrderRequest,
  VecailOrderDetails,
  StripeAlFalah,
  Stripe_Details,
  BookingToursDetails,
  TravelerInfo,
  BookingFlightsTour,
  TravelerIdentity,
  BidDetails,
  FlightsDetails,
  BookingTour,
  AmbulancePrivacy,
  AmbulanceSetting,
  PaymentRequest,
  BidAmbulance,
  RequestDetails,
  DoctorProfile,
  TravelerForm,
  AppDetails,
  PrivacyPolicy_B2B_Physiologist,
  Psychologist_Settings_B2B,
  Hotel_Settings_B2B,
  PrivacyPolicy_B2B_Hotel,
  PrivacyPolicy_B2B_TravelAgency,
  TravelAgency_Settings_B2B,
  TravelAgency_Add_Edit_Booking,
  TicketAdd,
  HotelRoomDetails,
  HomeFacilities,
  HomeRoomDetails,
  EntirePlaceHome,
  ApartmentFields,
  SinglePropertyDetails,
  RegistrationSuccessScreen,
  AllHotelProperty,
  PoliciesScreen,
  PropertyPhotos,
  Amenities,
  Facilities,
  RentACar_Settings_B2B,
  PrivacyPolicy_B2B_RentACar,
  Doc_Settings_B2B,
  PrivacyPolicy_B2B_Doc,
  PrivacyPolicy_B2B_Pharmacy,
  Pharmacy_Settings_B2B,
  PrivacyPolicy_B2B_Insurance,
  Insurance_Settings_B2B,
  Travel_Benefits,
  Medical_Benefits,
  Insurance_Travel_Package,
  Package_Detail,
  Category_Price,
  Category_Benefits,
  Haelth_Category_Hos_Lab,
  Category_Basic,
  Category,
  HomeServices_Home,
  HomeServices_Appointment,
  HomeServices_Request,
  HomeServices_Payment,
  RentCarCustomerList,
  RentCarCustomerDetails,
  Vehicles,
  VehicleDetail,
  RentCarPayment,
  HelpCenter_Donation,
  Hospital_Settings_B2B,
  PrivacyPolicy_B2B_Hospital,
  Donation_Settings_B2B,
  PrivacyPolicy_B2B_Donation,
  Donation_Package_Detail,
  Donation_Add_Criteria,
  Donation_Add_Packages,
  Donation_Criteria,
  Donation_Donors_Detail,
  RoomDetail,
  PropertyRooms,
  HotelInfoFom,
  PropertyBnb,
  HospitalAvailable,
  AppointmentPrescription,
  Availability,
  AvailabilityDetails,
  AddAvailability,
  Request,
  Orders,
  Hosp_Prescription_Detail,
  Hospital_Patient_History_Detail,
  Hospital_Patient_History,
  Hospital_Doctors,
  AddTreatments,
  Hospital_Documents,
  HospitalAppointments_Patient_Details,
  PrivacyPolicy_B2B,
  Payment_Lab_B2B,
  Lab_Settings_B2B,
  OrderDetail_Lab_B2B,
  SymptomsDoctor,
  InsuranceCompanyDet,
  SeeGuestReview,
  AppointmentDetails,
  BuyInsurance,
  AppointmentUpcoming,
  PreceptionDetails,
  HotelBookingReview,
  HotelFillForm,
  QuestionHotel,
  RoomInformation,
  HelpCenter,
  Favorite,
  PrivacyPolicies,
  EditProfile,
  UserProfile,
  ChangePassword,
  OrderNoWPharmacy,
  ViewCart,
  MapLocation,
  Notifications,
  AnotherCardPayment,
  PaymentDetails,
  RentalCar,
  PaymentCar,
  UserInformation,
  CarDetails,
  UserTravelAgency,
  TravelPackageMultiWayDetail,
  TravelPackageDetailsMultiWay,
  MainHTR,
  TourHome,
  TourDetails,
  CarList,
  Reviews,
  AllCars,
  BookNowTest,
  ReviewAppointment,
  SymptomsAll,
  InsurancePlain,
  UserDonationPak,
  CompanyDetails,
  InsuranceServices,
  UserServices,
  Payment,
  // DonationPayment,
  // Details,
  OnBoarding,
  PortalSelection,
  DonationDetails,
  //..........User...........//
  ExpandedCars,
  PackagesDetails,
  HospitalDoctor,
  UserLogin,
  New_Login,
  UserSignup,
  ForgotPassword,
  EmailVerification,
  UserHome,
  EmergencyScreen,
  UserDoctor,
  UserLaboratory,
  UserPharmacy,
  UserTravelAndTourism,
  UserOPD,
  UserHomeService,
  UserInsurance,
  UserDonation,
  OverView,
  // AppointmentDetails,
  MyBookings,
  HistoryDetailsScreen,
  // History,
  OrderDetails,
  FilterFileds,
  HotelMapScreen,
  Messages,
  UserDoctorDetails,
  BookAppointment,
  DetailsScreen,
  ProductDetail,
  HospitalDetails,
  HotelDetails,
  SearchScreen,
  // TravelPackagesDetailsScreen,
  TicketBookingDetail,
  UserForgotPassword,
  ItemDetail,
  BookingHotel,
  // UserDonationPayment,
  SearchScreenTravelAgency,
  AddPaymentScreen,
  //.......Hospital........//
  HospitalSignup,
  HospitalHome,
  HospitalAppointments,
  HospitalDepartments,
  HospitalPayments,
  ViewMoreDepart,

  //.......Laboratory........//
  LaboratoryLogin,
  LaboratorySignup,
  LaboratoryHome,
  LaboratoryForgot,
  LaboratoryTest,
  LaboratoryOrder,
  LaboratoryResult,

  //........Pharmacy.........//
  PharmacyHome,
  PharmacyTest,
  PharmacyOrder,
  PharmacyResult,
  PharmacyPaymentDetails,
  All_Patient_History,
  DOC_HistoryDetails,
  //........Ambulance.........//
  AmbulanceHome,
  AmbulanceScreen,
  AmbulanceRequest,
  AmbulancePayment,
  AmbulanceDetail,
  AvailAmbulance,
  //........Physiotherapist.........//
  PhysiotherapistHome,
  PhysiotherapistAppointment,
  PhysiotherapistPayment,
  PhysiotherapistRequest,
  //........Nutritionist.........//
  NutritionistHome,
  NutritionistAppointment,
  NutritionistPayment,
  NutritionistRequest,
  NutritionistPaymentDetails,
  //........Paramedic-Staff.........//
  ParamedicStaff_Home,
  ParamedicStaffAppointment,
  ParamedicStaffPayment,
  ParamedicStaffRequest,
  //........Psychologist.........//
  PsychologistHome,
  PsycologistAppointment,
  PsycologistPayment,
  PsycologistRequest,
  //........TravelAgency.........//
  TravelAgencyHome,
  TravelAgencyBooking,
  TravelAgencyBookingDetails,
  TravelAgencyRequests,
  TravelAgencyRequestDetail,
  Payments,
  PaymentsDetails,
  AddTicket,
  //........Hotels.........//
  HotelHome,
  HotelBooking,
  HotelPayment,
  HotelReservation,
  HotelPaymentDetails,
  HomeServices,
  ApartmentServices,
  HotelServices,
  HotelInfo,
  BookingDetails,
  //........Hotel.........//
  RentACar_Home,
  UserRentCarHome,
  //........Donation.........//
  DonationSignup,
  DonationHome,
  DonationDonors,
  DonationPackages,
  DonationPayment,
  DonorDetails,
  DonationPaymentDetails,
  //........Insurance.........//
  InsuranceHome,
  InsurancePayment,
  InsurancePaymentDetails,
  InsuranceRequest,
  InsuredPerson,
  InsuredDetail,
  InsurancePlan,
  InsurancePackage,
  MyselfPackage,
  TravelPackage,
  HospitalPackage,
  //........Doctors.........//
  DoctorsSignup,
  DoctorsHome,
  DoctorsAppointment,
  DoctorsPayment,
  DoctorsRequest,
  /////////userHospital////////////
  UserHospital,

  //........TopTabs........
  Multicity,

  // ..................... Generic B2B Screeens........................//
  B2BDetailScreen,

  // ..................... Pharmacy B2B Screeens........................//
  PharmacySettings,
};
