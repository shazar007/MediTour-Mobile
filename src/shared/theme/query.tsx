import {
  ambulanceAuth,
  BGLogin,
  BGNutritionist,
  doc,
  doctorsDrawerBack,
  drawerBack,
  hospitalAuth,
  hotelsAuth,
  insuranceAuth,
  labAuth,
  ParamedicAuth,
  paramedicDrawerBack,
  pharmAuth,
  physiotherapistAuth,
  physiotherapisttDrawerBack,
  psycAuth,
  rentAcarAuth,
  travelAuth,
  User,
} from '@assets';
import {ENDPOINTS} from '@services';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';

export const getColorCode = () => {
  const {changeStack} = useSelector((state: any) => state?.root?.shiftStack);
  const theme: any = useTheme();
  const colors = theme?.colors;
  const {B2B} = useSelector((state: any) => state?.root?.b2b);
  const {user} = useSelector((state: any) => state?.root?.user);
  let colorCode = '#000000'; // default color code
  let image = null; // default image
  let placeHolder = null;
  let endPoints = null;
  let key = null;
  let id_noti: any = '';
  let sendCode: any = '';
  let logOutAllSight: any = '';
  let signUpDetails: any = '';
  let deleteType: any = '';
  let signUpCompletion: any = '';
  let confirmEmail: any = null;
  let B2Blogin: any = '';
  let qualification: any = null;
  let speciality: any = null;
  let docType: any = null;
  let bgColor: any = '';
  let colorStack: any = '';
  let dashboard: any = null;
  let doctortype: any = null;
  let ALL_Treatments: any = null;
  let Treatment_Docs: any = null;
  let homeGraph: any = null;
  let main_Category: any = null;
  let doctorDrawerbackground: any = '';
  let drawerTextColor: any = '';
  let Availability: any = null;
  let add_Doc_Availability: any = null;
  let hospitalAvailability: any = null;
  let appointment: any = null;
  let single_Appointment: any = null;
  let searching_Product: any = null;
  let close_AllAppointment: any = null;
  let payment_AllDoctor: any = null;
  let getAll_HosVendor: any = null;
  let get_allDoctorSpecialities: any = null;
  let history_Doctor: any = null;
  let addDoctor_Desc: any = null;
  let availability_Price: any = null;
  let getDoc_Presc: any = null;
  let search_Doctor: any = null;
  let select_UpdateProfile: any = null;
  let search_Test: any = null;
  let pateintEhistory: any = null;
  let headerTextColor: any = '';
  let historyDetail: any = null;
  let updateProfile: any = null;
  let addTreatMents: any = null;
  let docKind: any = '';
  let allMed: any = '';

  switch (changeStack) {
    // /.......................................User................../

    case 'User':
      colorCode = '#1A3D7C';
      image = User;
      logOutAllSight = ENDPOINTS.USER_LOGOUT;
      id_noti = user?._id;
      break;

    // /.......................................Doctors................../;

    case 'Doctors':
      colorCode = '#0D47A1';

      image = doc;
      bgColor = 'rgba(0, 39, 109, 0.1)';
      qualification = [
        'MBBS',
        'MD',
        'Bachelor of Dental Surgery',
        'Nursing',
        'Anesthesiology',
        'Psychiatry',
        'BSMS',
        'Psychiatry',
        'BS Microbiology',
      ];
      speciality = [
        'Gynecologists',
        'Cosmetic Surgery',
        'Bariatric Surgery',
        'Transplants',
        'Ophthalmology',
        'Cancer',
        'Orthopedics',
        'Stem Cell',
        'Pediatrics',
        'Dental',
        'Aesthetic Treatments',
        'Psychiatry',
        'Lungs',
        'Urology',
        'Gastroenterology',
        'Neurology',
        'Fertility',
        'Nephrology',
        'E.N.T',
        'Cardiovascular & Metabolic',
      ];
      docType = ['consultant', 'generalPhysician'];
      docKind = 'doctor';
      // /.....Main Stack (Dashboard)........../;
      doctorDrawerbackground = doctorsDrawerBack;
      drawerTextColor = colors?.primary;

      doctortype = 'doctor';
      colorStack = '#0D47A1';
      homeGraph = ENDPOINTS.GET_GRAPH;
      id_noti = B2B?.doctor?._id;
      dashboard = ENDPOINTS.GET_DASH_BOARD;
      Availability = ENDPOINTS.DOC_AVAILABILITY;
      Treatment_Docs = ENDPOINTS.GET_TRREATMENT_DOCTOR;
      add_Doc_Availability = ENDPOINTS.ADD_Availability_Doc;
      hospitalAvailability = ENDPOINTS.HOSPITAL_AVAILABILITY;
      appointment = ENDPOINTS.GET_APPOINTMENT_DOCTOR_VENDOR;
      logOutAllSight = ENDPOINTS.LOGOUT_USER;
      single_Appointment = ENDPOINTS.GET_SINGLE_APPOINTMENT;
      search_Test = ENDPOINTS.SEARCH_TEST_DOCTOR;
      searching_Product = ENDPOINTS.SEARCHDOCTOR_KEYWORD;
      close_AllAppointment = ENDPOINTS.CLOSE_APPOINTMENT;
      getAll_HosVendor = ENDPOINTS.GET_ALL_HOSPITAL;
      select_UpdateProfile = ENDPOINTS.UPDAT_PROFILE;
      payment_AllDoctor = ENDPOINTS.PAYMENT_LISTING_VENDOR;
      get_allDoctorSpecialities = ENDPOINTS.GET_ALL_SPECIALITIES;
      history_Doctor = ENDPOINTS.ADD_HISTORY_DOCTOR;
      addDoctor_Desc = ENDPOINTS.ADD_PRESCRIPTION_DOCTOR;
      main_Category = ENDPOINTS.GET_ALL_MAIN_CATEGORY;
      availability_Price = ENDPOINTS.ADD_PRICE;
      addTreatMents = ENDPOINTS.ADD_TREATMENT_DOCTOR;
      ALL_Treatments = ENDPOINTS.ALL_TREATMENTS_GET;
      getDoc_Presc = ENDPOINTS.GET_DOCTOR_PRESCRIPTION;
      search_Doctor = ENDPOINTS.SEARCH_DOCTOR_REFER;
      pateintEhistory = ENDPOINTS.DOC_GETALLPATIENTS;
      historyDetail = ENDPOINTS.DOC_PATEINTDETAILS;
      updateProfile = ENDPOINTS.DOC_UPDATE_PROFILE;
      // /.....Auth........../;
      key = {
        cnicImage: 'cnicImage',
        speciality: true,
      };
      B2Blogin = ENDPOINTS.DOC_LOGIN;
      signUpDetails = ENDPOINTS.DOC_SIGNUP;
      sendCode = ENDPOINTS.DOC_SEND_CODE_TO_EMAIL;
      confirmEmail = ENDPOINTS.DOC_CONFIRM_EMAIL;
      signUpCompletion = ENDPOINTS.DOC_COMPLET_SIGNUP;
      endPoints = ENDPOINTS.DOC_UPLOAD_FILE;
      break;

    // /.......................................Physiotherapist................../

    case 'Physiotherapist':
      colorCode = '#009BBC';
      headerTextColor = '#fff';
      image = physiotherapistAuth;
      qualification = [
        "Bachelor's Degree",
        "Master's or Doctoral Degree in Physiotherapy",
        'Licensing',
      ];
      speciality = [
        'Orthopedic physiotherapy',
        'cardio-respiratory physiotherapy',
        'Pediatric physiotherapy',
        'Neuro physiotherapy',
        'Hand  physiotherapy',
      ];
      docKind = 'physiotherapist';
      key = {
        cnicImage: 'cnicImage',
        speciality: true,
      };

      // /.....Main Stack (Dashboard)........../;
      drawerTextColor = '#fff';
      doctorDrawerbackground = physiotherapisttDrawerBack;
      colorStack = '#FF8532';
      doctortype = 'physiotherapist';
      dashboard = ENDPOINTS.GET_PHYSIOTHERAPIST_DASHBOARD_DETAILS;
      homeGraph = ENDPOINTS.PHYSIOTHERAPIST_GRAPH;
      id_noti = B2B?.doctor?._id;
      Availability = ENDPOINTS.DOC_AVAILABILITY;
      add_Doc_Availability = ENDPOINTS.ADD_Availability_Doc;
      search_Test = ENDPOINTS.SEARCH_TEST_DOCTOR;
      ALL_Treatments = ENDPOINTS.ALL_TREATMENTS_GET;
      hospitalAvailability = ENDPOINTS.HOSPITAL_AVAILABILITY;
      appointment = ENDPOINTS.GET_APPOINTMENT_DOCTOR_VENDOR;
      select_UpdateProfile = ENDPOINTS.UPDAT_PROFILE;
      single_Appointment = ENDPOINTS.PHYSIOTHERAPIST_SINGLE_APPOINTMENT;
      Treatment_Docs = ENDPOINTS.GET_TRREATMENT_DOCTOR;
      searching_Product = ENDPOINTS.SEARCHDOCTOR_KEYWORD;
      close_AllAppointment = ENDPOINTS.CLOSE_APPOINTMENT;
      main_Category = ENDPOINTS.GET_ALL_MAIN_CATEGORY;
      logOutAllSight = ENDPOINTS.LOGOUT_USER;
      getAll_HosVendor = ENDPOINTS.GET_ALL_HOSPITAL;
      payment_AllDoctor = ENDPOINTS.PAYMENT_LISTING_VENDOR;
      get_allDoctorSpecialities = ENDPOINTS.GET_ALL_SPECIALITIES;
      history_Doctor = ENDPOINTS.PHYSIOTHERAPIST_HISTORY_DOCTOR;
      addDoctor_Desc = ENDPOINTS.PHYSIOTHERAPIST_PRESCRIPTION_DOCTOR;
      availability_Price = ENDPOINTS.ADD_PRICE;
      addTreatMents = ENDPOINTS.ADD_TREATMENT_DOCTOR;
      getDoc_Presc = ENDPOINTS.PHYSIOTHERAPIST_DOCTOR_PRESCRIPTION;
      search_Doctor = ENDPOINTS.PHYSIOTHERAPIST_SEARCH_DOCTOR_REFER;
      pateintEhistory = ENDPOINTS.PHYSIOTHERAPIST_GETALLPATIENTS;
      historyDetail = ENDPOINTS.DOC_PATEINTDETAILS;
      updateProfile = ENDPOINTS.PHYSIOTHERAPIST_UPDATE_PROFILE;

      docType = ['consultant'];
      B2Blogin = ENDPOINTS.DOC_LOGIN;
      signUpDetails = ENDPOINTS.DOC_SIGNUP;
      sendCode = ENDPOINTS.PHYSIOTHERAPIST_SEND_CODE_TO_EMAIL;
      confirmEmail = ENDPOINTS.PHYSIOTHERAPIST_CONFIRM_EMAIL;
      signUpCompletion = ENDPOINTS.DOC_COMPLET_SIGNUP;
      endPoints = ENDPOINTS.DOC_UPLOAD_FILE;
      break;

    // /.......................................Paramedic staff................../

    case 'Paramedic staff':
      colorCode = '#008AAC';
      colorStack = '#008AAC';
      headerTextColor = '#fff';
      image = ParamedicAuth;
      doctortype = 'paramedic';
      qualification = [
        'Associate Degree in Paramedic Science',
        'Bachelor of Science in Paramedicine',
        'Master of Paramedicine',
      ];
      speciality = [
        'Critical Care Paramedic (CCP):',
        'Flight Paramedic',
        'Tactical Paramedic',
        'Community Paramedic',
        'Advanced Practice Paramedic',
        'Wilderness Paramedic',
        'Pediatric Paramedic',
        'Neonatal Paramedic',
        'Industrial/Remote Paramedic',
      ];
      docKind = 'paramedic';

      key = {
        cnicImage: 'cnicImage',
        speciality: true,
      };

      // /.....Main Stack (Dashboard)........../;
      drawerTextColor = '#fff';
      doctorDrawerbackground = paramedicDrawerBack;
      doctortype = 'paramedic';
      dashboard = ENDPOINTS.GET_PARAMEDIC_DASHBOARD_DETAILS;
      homeGraph = ENDPOINTS.PARAMEDIC_GRAPH;
      Availability = ENDPOINTS.DOC_AVAILABILITY;
      add_Doc_Availability = ENDPOINTS.ADD_Availability_Doc;
      Treatment_Docs = ENDPOINTS.GET_TRREATMENT_DOCTOR;
      id_noti = B2B?.doctor?._id;
      hospitalAvailability = ENDPOINTS.HOSPITAL_AVAILABILITY;
      search_Test = ENDPOINTS.SEARCH_TEST_DOCTOR;
      addTreatMents = ENDPOINTS.ADD_TREATMENT_DOCTOR;
      appointment = ENDPOINTS.GET_APPOINTMENT_DOCTOR_VENDOR;
      single_Appointment = ENDPOINTS.PARAMEDIC_SINGLE_APPOINTMENT;
      main_Category = ENDPOINTS.GET_ALL_MAIN_CATEGORY;
      searching_Product = ENDPOINTS.SEARCHDOCTOR_KEYWORD;
      close_AllAppointment = ENDPOINTS.CLOSE_APPOINTMENT;
      logOutAllSight = ENDPOINTS.LOGOUT_USER;
      getAll_HosVendor = ENDPOINTS.GET_ALL_HOSPITAL;
      ALL_Treatments = ENDPOINTS.ALL_TREATMENTS_GET;
      payment_AllDoctor = ENDPOINTS.PAYMENT_LISTING_VENDOR;
      get_allDoctorSpecialities = ENDPOINTS.GET_ALL_SPECIALITIES;
      history_Doctor = ENDPOINTS.PARAMEDIC_HISTORY_DOCTOR;
      addDoctor_Desc = ENDPOINTS.PARAMEDIC_PRESCRIPTION_DOCTOR;
      select_UpdateProfile = ENDPOINTS.UPDAT_PROFILE;
      availability_Price = ENDPOINTS.ADD_PRICE;
      getDoc_Presc = ENDPOINTS.PARAMEDIC_DOCTOR_PRESCRIPTION;
      search_Doctor = ENDPOINTS.PARAMEDIC_SEARCH_DOCTOR_REFER;
      pateintEhistory = ENDPOINTS.PARAMEDIC_GETALLPATIENTS;
      historyDetail = ENDPOINTS.DOC_PATEINTDETAILS;
      updateProfile = ENDPOINTS.PARAMEDIC_UPDATE_PROFILE;

      B2Blogin = ENDPOINTS.DOC_LOGIN;
      signUpDetails = ENDPOINTS.DOC_SIGNUP;
      sendCode = ENDPOINTS.PARAMEDIC_SEND_CODE_TO_EMAIL;
      confirmEmail = ENDPOINTS.PARAMEDIC_CONFIRM_EMAIL;
      signUpCompletion = ENDPOINTS.DOC_COMPLET_SIGNUP;
      endPoints = ENDPOINTS.DOC_UPLOAD_FILE;
      break;

    // /.......................................Psychologist................../

    case 'Psychologist':
      colorCode = '#008AAC';
      headerTextColor = '#fff';
      doctortype = 'psychologist';
      image = psycAuth;
      qualification = [
        'Associate Degree in Paramedic Science',
        'Bachelor of Science in Paramedicine',
        'Master of Paramedicine',
      ];
      speciality = [
        'Critical Care Paramedic (CCP):',
        'Flight Paramedic',
        'Tactical Paramedic',
        'Community Paramedic',
        'Advanced Practice Paramedic',
        'Wilderness Paramedic',
        'Pediatric Paramedic',
        'Neonatal Paramedic',
        'Industrial/Remote Paramedic',
      ];
      docKind = 'psychologist';

      key = {
        cnicImage: 'cnicImage',
        speciality: true,
      };

      // /.....Main Stack (Dashboard)........../;
      drawerTextColor = '#fff';
      doctorDrawerbackground = paramedicDrawerBack;
      colorStack = '#FF8532';
      doctortype = 'psychologist';
      dashboard = ENDPOINTS.GET_PSYCHOLOGIST_DASHBOARD_DETAILS;
      homeGraph = ENDPOINTS.PSYCHOLOGIST_GRAPH;
      Availability = ENDPOINTS.DOC_AVAILABILITY;
      add_Doc_Availability = ENDPOINTS.ADD_Availability_Doc;
      hospitalAvailability = ENDPOINTS.HOSPITAL_AVAILABILITY;
      appointment = ENDPOINTS.GET_APPOINTMENT_DOCTOR_VENDOR;
      id_noti = B2B?.doctor?._id;
      Treatment_Docs = ENDPOINTS.GET_TRREATMENT_DOCTOR;
      single_Appointment = ENDPOINTS.PSYCHOLOGIST_SINGLE_APPOINTMENT;
      search_Test = ENDPOINTS.SEARCH_TEST_DOCTOR;
      searching_Product = ENDPOINTS.SEARCHDOCTOR_KEYWORD;
      close_AllAppointment = ENDPOINTS.CLOSE_APPOINTMENT;
      logOutAllSight = ENDPOINTS.LOGOUT_USER;
      main_Category = ENDPOINTS.GET_ALL_MAIN_CATEGORY;
      getAll_HosVendor = ENDPOINTS.GET_ALL_HOSPITAL;
      payment_AllDoctor = ENDPOINTS.PAYMENT_LISTING_VENDOR;
      get_allDoctorSpecialities = ENDPOINTS.GET_ALL_SPECIALITIES;
      select_UpdateProfile = ENDPOINTS.UPDAT_PROFILE;
      history_Doctor = ENDPOINTS.PSYCHOLOGIST_HISTORY_DOCTOR;
      addDoctor_Desc = ENDPOINTS.PSYCHOLOGIST_PRESCRIPTION_DOCTOR;
      availability_Price = ENDPOINTS.ADD_PRICE;
      getDoc_Presc = ENDPOINTS.PSYCHOLOGIST_DOCTOR_PRESCRIPTION;
      addTreatMents = ENDPOINTS.ADD_TREATMENT_DOCTOR;
      search_Doctor = ENDPOINTS.PSYCHOLOGIST_SEARCH_DOCTOR_REFER;
      ALL_Treatments = ENDPOINTS.ALL_TREATMENTS_GET;
      pateintEhistory = ENDPOINTS.PSYCHOLOGIST_GETALLPATIENTS;
      historyDetail = ENDPOINTS.DOC_PATEINTDETAILS;
      updateProfile = ENDPOINTS.PSYCHOLOGIST_UPDATE_PROFILE;

      // /.....Auth Stack (Login/SignUp)........../;

      B2Blogin = ENDPOINTS.DOC_LOGIN;
      signUpDetails = ENDPOINTS.DOC_SIGNUP;
      sendCode = ENDPOINTS.PSYCHOLOGIST_SEND_CODE_TO_EMAIL;
      confirmEmail = ENDPOINTS.PSYCHOLOGIST_CONFIRM_EMAIL;
      signUpCompletion = ENDPOINTS.DOC_COMPLET_SIGNUP;
      endPoints = ENDPOINTS.DOC_UPLOAD_FILE;
      break;

    // /.......................................Hospital................../;

    case 'Hospital':
      colorCode = colors?.Hospital;
      headerTextColor = colors?.bluE;
      image = hospitalAuth;
      key = {
        licenseImg: 'registrationImage',
        licenseNo: 'hospitalRegNo',
        description: 'description',
        emergency: 'emergencyNo',
        licenseExpiry: 'registrationExpiry',
        cnicImage: 'cnicImage',
      };
      id_noti = B2B?.hospital?._id;
      placeHolder = {
        name: 'Hospital Name',
        logo: 'Hospital Logo',
        licenseNo: 'Hospital Registration Number',
        licenseExpiry: 'Hospital Registration Expiry',
        description: 'Hospital Description',
        openTime: 'Hospital Open Time',
        closeTime: 'Hospital Close Time',
        address: 'Hospital Address',
        licenseImage: 'Hospital Registration Image',
      };
      pateintEhistory = ENDPOINTS.HOS_GETALLPATIENTS;
      historyDetail = ENDPOINTS.DOC_PATEINTDETAILS;
      B2Blogin = ENDPOINTS.HOSPITAL_LOGIN;
      signUpDetails = ENDPOINTS.HOSPITAL_SIGNUP;
      sendCode = ENDPOINTS.HOSPITAL_SEND_CODE_TO_EMAIL;
      logOutAllSight = ENDPOINTS.HOSPITAL_LOGOUT;
      (deleteType = 'Hospital'),
        (confirmEmail = ENDPOINTS.HOSPITAL_CONFIRM_EMAIL);
      payment_AllDoctor = ENDPOINTS.PAYMENT_LISTING_VENDOR;
      signUpCompletion = ENDPOINTS.HOSPITAL_COMPLET_SIGNUP;
      endPoints = ENDPOINTS.HOSPITAL_UPLOAD_FILE;

      break;

    // /.......................................Laboratory................../;
    case 'Laboratory':
      colorCode = '#EE7E37';
      image = labAuth;
      key = {
        licenseImg: 'labLicenseImage',
        licenseNo: 'labLicenseNumber',
        description: 'description',
        emergency: 'emergencyNo',
        licenseExpiry: 'licenseExpiry',
        cnicImage: 'cnicImage',
      };

      placeHolder = {
        name: 'Lab Name',
        logo: 'Lab Logo',
        licenseNo: 'Lab License Number',
        licenseExpiry: 'Lab License Expiry',
        description: 'Laboratory Description',
        openTime: 'Lab Open Time',
        closeTime: 'Lab Close Time',
        address: 'Address',
      };
      B2Blogin = ENDPOINTS._LOGIN;
      id_noti = B2B?.lab?._id;
      (deleteType = 'Laboratory'), (signUpDetails = ENDPOINTS.LAB_SIGNUP);
      sendCode = ENDPOINTS._SEND_CODE_TO_EMAIL;
      payment_AllDoctor = ENDPOINTS.PAYMENT_LISTING_VENDOR;
      confirmEmail = ENDPOINTS.CONFIRM_EMAIL;
      signUpCompletion = ENDPOINTS.COMPLETE_SIGNUP;
      logOutAllSight = ENDPOINTS.LABOUTERY_LOGOUT;
      endPoints = ENDPOINTS.UPLOAD_FILE;
      break;

    // /.......................................Pharmacy................../

    case 'Pharmacy':
      colorCode = '#6ED0F5';
      image = pharmAuth;
      key = {
        licenseImg: 'pharmacyLicenseImage',
        licenseNo: 'pharmacyLicenseNumber',
        description: 'description',
        emergency: 'emergencyNo',
        cnicImage: 'cnicImage',
        licenseExpiry: 'licenseExpiry',
      };
      placeHolder = {
        name: 'Pharmacy Name',
        logo: 'Pharmacy Logo',
        licenseNo: 'Pharmacy License Number',
        licenseExpiry: 'Pharmacy License Expiry',
        description: 'Pharmacy Description',
        openTime: 'Pharmacy Open Time',
        closeTime: 'Pharmacy Close Time',
        address: 'Pharmacy Address',
      };
      signUpDetails = ENDPOINTS.PHARM_SIGNUP;
      (allMed = ENDPOINTS.GET_ALL_MED),
        (endPoints = ENDPOINTS.PHARM_UPLOAD_FILE);
      sendCode = ENDPOINTS.PHARM_SEND_CODE_TO_EMAIL;
      confirmEmail = ENDPOINTS.PHARM_CONFIRM_EMAIL;
      id_noti = B2B?.pharm?._id;
      signUpCompletion = ENDPOINTS.PHARM_COMPLET_SIGNUP;
      logOutAllSight = ENDPOINTS.PHARMACY_LOGOUT;
      payment_AllDoctor = ENDPOINTS.PAYMENT_LISTING_VENDOR;
      B2Blogin = ENDPOINTS.PHARM_LOGIN;
      deleteType = 'Pharmacy';
      break;

    // /....................................Pharmecutical................./
    case 'Pharmaceutical':
      colorCode = '#6ED0F5';
      image = pharmAuth;
      key = {
        emergency: 'emergencyNo',
      };
      placeHolder = {
        name: 'Name',
        logo: 'Logo',
        address: 'Address',
      };
      signUpDetails = ENDPOINTS.PHARMACEU_REGISTER;
      allMed = ENDPOINTS.PHARMACEUTICAL_GET_ALL_MEDS;
      endPoints = ENDPOINTS.PHARM_UPLOAD_FILE;
      id_noti = B2B?.pharmacuetical?._id;
      deleteType = 'Pharmacy';
      sendCode = ENDPOINTS.PHARMACEU_SEND_CODE_TO_EMAIL;
      confirmEmail = ENDPOINTS.PHARM_CONFIRM_EMAIL;
      logOutAllSight = ENDPOINTS.PHARMACITICAL_LOGOUT;
      signUpCompletion = ENDPOINTS.PHARMACEU_COMPLET_SIGNUP;
      payment_AllDoctor = ENDPOINTS.PAYMENT_LISTING_VENDOR;
      B2Blogin = ENDPOINTS.PHARMACEU_LOGIN;
      break;

    // /.......................................Ambulance................../

    case 'Ambulance':
      colorCode = '#009BBC';
      image = ambulanceAuth;
      key = {
        licenseImg: 'registrationImage',
        licenseNo: 'registrationNumber',
        emergency: 'emergencyNo',
        licenseExpiry: 'registrationExpiry',
        cnicImage: 'cnicOrPassportImage',
      };

      placeHolder = {
        name: 'Company Name',
        logo: 'Company Logo',
        licenseNo: 'Company Registration Number',
        licenseExpiry: 'Company Registration Expiry',
        description: 'Company Description',
        address: 'Company Address',
        licenseImage: 'Company Registration Image',
      };
      B2Blogin = ENDPOINTS.AMBULANCE_LOGIN;
      deleteType = 'Ambulance';
      signUpDetails = ENDPOINTS.AMBULANCE_SIGNUP;
      sendCode = ENDPOINTS.AMBULANCE_SEND_CODE_TO_EMAIL;
      id_noti = B2B?.ambulance?._id;
      payment_AllDoctor = ENDPOINTS.PAYMENT_LISTING_VENDOR;
      confirmEmail = ENDPOINTS.AMBULANCE_CONFIRM_EMAIL;
      logOutAllSight = ENDPOINTS.AMBULANCE_LOGOUT;
      signUpCompletion = ENDPOINTS.AMBULANCE_COMPLET_SIGNUP;
      endPoints = ENDPOINTS.AMBULANCE_UPLOAD_FILE;

      break;

    // /.......................................Insurance................../

    case 'Insurance':
      colorCode = '#00276D';
      image = insuranceAuth;
      key = {
        licenseImg: 'licenseImage',
        licenseNo: 'companyLicenseNo',
        description: 'companyDescription',
        emergency: 'emergencyNo',
        licenseExpiry: 'licenseExpiry',
        cnicImage: 'cnicImage',
      };

      placeHolder = {
        name: 'Company Name',
        logo: 'Company Logo',
        licenseNo: 'Company License Number',
        licenseExpiry: 'License Expiry',
        description: 'Company Description',
        address: 'Company Address',
      };
      B2Blogin = ENDPOINTS.INSURANCE_LOGIN;
      signUpDetails = ENDPOINTS.INSURANCE_SIGNUP;
      id_noti = B2B?.insurance?._id;
      deleteType = 'Insurance';
      sendCode = ENDPOINTS.INSURANCE_SEND_CODE_TO_EMAIL;
      logOutAllSight = ENDPOINTS.INSURANCE_LOGOUT;
      confirmEmail = ENDPOINTS.INSURANCE_CONFIRM_EMAIL;
      signUpCompletion = ENDPOINTS.INSURANCE_COMPLET_SIGNUP;
      endPoints = ENDPOINTS.INSURANCE_UPLOAD_FILE;
      break;

    // /.......................................Donation................../

    case 'Donation':
      colorCode = '#E25D5D';
      image = BGLogin;
      key = {
        licenseImg: 'licenseImage',
        licenseNo: 'companyLicenseNo',
        description: 'description',
        emergency: 'companyEmergencyNo',
        licenseExpiry: 'companyLicenseExpiry',
        cnicImage: 'cnicImage',
      };
      placeHolder = {
        name: 'Company Name',
        logo: 'Company Logo',
        licenseNo: 'Company License Number',
        licenseExpiry: 'License Expiry',
        description: 'Company Description',
        address: 'Company Address',
      };
      B2Blogin = ENDPOINTS.DONATION_LOGIN;
      id_noti = B2B?.donation?._id;
      deleteType = 'Donations';
      signUpDetails = ENDPOINTS.DONATION_SIGNUP;
      sendCode = ENDPOINTS.DONATION_SEND_CODE_TO_EMAIL;
      confirmEmail = ENDPOINTS.DONATION_CONFIRM_EMAIL;
      logOutAllSight = ENDPOINTS.DONATION_LOGOUT;
      signUpCompletion = ENDPOINTS.DONATION_COMPLET_SIGNUP;
      endPoints = ENDPOINTS.DONATION_UPLOAD_FILE;

      break;

    // /.......................................Rent A Car................../

    case 'Rent A car':
      colorCode = '#009BBC';
      image = rentAcarAuth;
      key = {
        licenseImg: 'licenseImage',
        licenseNo: 'companyLicenseNo',
        description: 'description',
        emergency: 'companyEmergencyNo',
        licenseExpiry: 'licenseExpiry',
        cnicImage: 'cnicImage',
      };
      placeHolder = {
        name: 'Company Name',
        logo: 'Company Logo',
        licenseNo: 'Company License Number',
        licenseExpiry: 'License Expiry',
        description: 'Company Description',
        address: 'Company Address',
      };
      B2Blogin = ENDPOINTS.RENT_A_CAR_LOGIN;
      id_noti = B2B?.rentCar?._id;
      deleteType = 'Rent A Car';
      signUpDetails = ENDPOINTS.RENT_A_CAR_SIGNUP;
      sendCode = ENDPOINTS.RENT_A_CAR_SEND_CODE_TO_EMAIL;
      confirmEmail = ENDPOINTS.RENT_A_CAR_CONFIRM_EMAIL;
      payment_AllDoctor = ENDPOINTS.PAYMENT_LISTING_VENDOR;
      signUpCompletion = ENDPOINTS.RENT_A_CAR_COMPLET_SIGNUP;
      logOutAllSight = ENDPOINTS.RENT_A_CAR;
      endPoints = ENDPOINTS.RENT_A_CAR_UPLOAD_FILE;

      break;

    // /.......................................Travel Agency................../

    case 'Travel Agency':
      colorCode = '#0D47A1';
      image = travelAuth;
      key = {
        licenseImg: 'comapnyLicenseImage',
        licenseNo: 'companyLicenseNo',
        description: 'description',
        emergency: 'emergencyNo',
        licenseExpiry: 'licenseExpiry',
        cnicImage: 'cnicImage',
      };
      placeHolder = {
        name: 'Company Name',
        logo: 'Company Logo',
        licenseNo: 'Company License Number',
        licenseExpiry: 'License Expiry',
        address: 'Company Address',
      };
      B2Blogin = ENDPOINTS.TRAVEL_AGENCY_LOGIN;
      signUpDetails = ENDPOINTS.TRAVEL_AGENCY_SIGNUP;
      sendCode = ENDPOINTS.TRAVEL_AGENCY_SEND_CODE_TO_EMAIL;
      id_noti = B2B?.travelAgency?._id;
      deleteType = 'Travel Agency';
      confirmEmail = ENDPOINTS.TRAVEL_AGENCY_CONFIRM_EMAIL;
      payment_AllDoctor = ENDPOINTS.PAYMENT_LISTING_VENDOR;
      logOutAllSight = ENDPOINTS.TRAVEL_AGENCY_LOGOUT;
      signUpCompletion = ENDPOINTS.TRAVEL_AGENCY_COMPLET_SIGNUP;
      endPoints = ENDPOINTS.TRAVEL_AGENCY_UPLOAD_FILE;

      break;

    // /.......................................Hotel................../

    case 'Hotels':
      colorCode = '#0D47A1';
      image = hotelsAuth;
      key = {
        licenseImg: 'licenseImage',
        licenseNo: 'companyLicenseNo',
        description: 'description',
        emergency: 'companyEmergencyNo',
        licenseExpiry: 'companyLicenseExpiry',
        cnicImage: 'cnicImage',
      };
      placeHolder = {
        name: 'Hotel Name',
        logo: 'Hotel Image',
        licenseNo: 'Hotel License Number',
        licenseExpiry: 'License Expiry',
        address: 'Hotel Address',
      };
      B2Blogin = ENDPOINTS.HOTEL_LOGIN;
      signUpDetails = ENDPOINTS.HOTEL_SIGNUP;
      id_noti = B2B?.hotel?._id;
      deleteType = 'Hotels';
      sendCode = ENDPOINTS.HOTEL_SEND_CODE_TO_EMAIL;
      confirmEmail = ENDPOINTS.HOTEL_CONFIRM_EMAIL;
      signUpCompletion = ENDPOINTS.HOTEL_COMPLET_SIGNUP;
      endPoints = ENDPOINTS.HOTEL_UPLOAD_FILE;
      logOutAllSight = ENDPOINTS.HOTEL_LOGOUT;
      payment_AllDoctor = ENDPOINTS.PAYMENT_LISTING_VENDOR;

      break;

    // /.......................................Nutritionist................../

    case 'Nutritionist':
      colorCode = '#00DF98';
      headerTextColor = '#fff';
      image = BGNutritionist;
      doctortype = 'nutrition';
      qualification = [
        'Nutrition and health',
        'Food and identity',
        'Global nutrition',
        'Human metabolism',
        'Nutritional biochemistry',
        'Food sanitation',
      ];
      speciality = [
        'Sports Nutritionist',
        'Childhood Nutritionist',
        'Nutritionist Research',
        'Gut Health Nutritionist',
        'Public Health Nutritionist',
      ];
      docKind = 'nutritionist';

      key = {
        cnicImage: 'cnicImage',
        speciality: true,
      };

      // /.....Main Stack (Dashboard)........../;
      drawerTextColor = '#fff';
      doctorDrawerbackground = drawerBack;
      colorStack = '#0D47A1';
      doctortype = 'nutrition';
      dashboard = ENDPOINTS.GET_NUTRIONIST_DASHBOARD_DETAILS;
      homeGraph = ENDPOINTS.NUTRIONIST_GRAPH;
      Availability = ENDPOINTS.DOC_AVAILABILITY;
      add_Doc_Availability = ENDPOINTS.ADD_Availability_Doc;
      search_Test = ENDPOINTS.SEARCH_TEST_DOCTOR;
      ALL_Treatments = ENDPOINTS.ALL_TREATMENTS_GET;
      hospitalAvailability = ENDPOINTS.HOSPITAL_AVAILABILITY;
      appointment = ENDPOINTS.GET_APPOINTMENT_DOCTOR_VENDOR;
      single_Appointment = ENDPOINTS.NUTRIONIST_SINGLE_APPOINTMENT;
      updateProfile = ENDPOINTS.DOC_UPDATE_PROFILE;
      id_noti = B2B?.doctor?._id;
      addTreatMents = ENDPOINTS.ADD_TREATMENT_DOCTOR;
      logOutAllSight = ENDPOINTS.LOGOUT_USER;
      searching_Product = ENDPOINTS.SEARCHDOCTOR_KEYWORD;
      close_AllAppointment = ENDPOINTS.CLOSE_APPOINTMENT;
      getAll_HosVendor = ENDPOINTS.GET_ALL_HOSPITAL;
      payment_AllDoctor = ENDPOINTS.PAYMENT_LISTING_VENDOR;
      main_Category = ENDPOINTS.GET_ALL_MAIN_CATEGORY;
      get_allDoctorSpecialities = ENDPOINTS.GET_ALL_SPECIALITIES;
      history_Doctor = ENDPOINTS.NUTRIONIST_HISTORY_DOCTOR;
      addDoctor_Desc = ENDPOINTS.NUTRIONIST_PRESCRIPTION_DOCTOR;
      availability_Price = ENDPOINTS.ADD_PRICE;
      getDoc_Presc = ENDPOINTS.NUTRIONIST_DOCTOR_PRESCRIPTION;
      Treatment_Docs = ENDPOINTS.GET_TRREATMENT_DOCTOR;
      search_Doctor = ENDPOINTS.NUTRIONIST_SEARCH_DOCTOR_REFER;
      pateintEhistory = ENDPOINTS.NUTRIONIST_GETALLPATIENTS;
      historyDetail = ENDPOINTS.DOC_PATEINTDETAILS;
      updateProfile = ENDPOINTS.NUTRIONIST_UPDATE_PROFILE;

      // /.....Auth Stack (Login/SignUp)........../;

      docType = ['consultant'];
      B2Blogin = ENDPOINTS.DOC_LOGIN;
      signUpDetails = ENDPOINTS.DOC_SIGNUP;
      sendCode = ENDPOINTS.NUTRITIONIST_SEND_CODE_TO_EMAIL;
      confirmEmail = ENDPOINTS.NUTRITIONIST_CONFIRM_EMAIL;
      signUpCompletion = ENDPOINTS.DOC_COMPLET_SIGNUP;
      endPoints = ENDPOINTS.DOC_UPLOAD_FILE;
      break;
    default:
      break;
  }

  return {
    allMed,
    updateProfile,
    colorCode,
    image,
    placeHolder,
    deleteType,
    endPoints,
    key,
    sendCode,
    confirmEmail,
    signUpCompletion,
    B2Blogin,
    qualification,
    speciality,
    docType,
    signUpDetails,
    bgColor,
    colorStack,
    dashboard,
    doctortype,
    Treatment_Docs,
    homeGraph,
    doctorDrawerbackground,
    main_Category,
    drawerTextColor,
    Availability,
    add_Doc_Availability,
    hospitalAvailability,
    appointment,
    single_Appointment,
    searching_Product,
    addTreatMents,
    close_AllAppointment,
    getAll_HosVendor,
    payment_AllDoctor,
    get_allDoctorSpecialities,
    search_Test,
    history_Doctor,
    addDoctor_Desc,
    select_UpdateProfile,
    availability_Price,
    getDoc_Presc,
    search_Doctor,
    ALL_Treatments,
    logOutAllSight,
    pateintEhistory,
    headerTextColor,
    historyDetail,
    docKind,
    id_noti,
  };
};
