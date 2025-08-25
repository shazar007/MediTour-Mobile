import AsyncStorage from '@react-native-async-storage/async-storage';
import {setExchangeRate, store} from '@redux';
import axios from 'axios';

export const checkAndFetchExchangeRate = async () => {
  try {
    const lastFetched = await AsyncStorage.getItem('lastFetched');
    const currentDate = new Date();
    let fetchNewRate = true;

    if (lastFetched) {
      const lastFetchedDate = new Date(lastFetched);
      const timeDifference = currentDate.getTime() - lastFetchedDate.getTime();
      const hoursDifference = timeDifference / (1000 * 60 * 60);

      // Check if the last fetch was more than 24 hours ago
      if (hoursDifference < 24) {
        fetchNewRate = false;
      }
    }

    if (fetchNewRate) {
      await fetchAndStoreExchangeRate();
    }
  } catch (err) {}
};

export const fetchAndStoreExchangeRate = async () => {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/437c285364c166fcafc883c0/pair/PKR/USD`,
    );
    const rate = response.data.conversion_rate;

    await AsyncStorage.setItem('exchangeRate', JSON.stringify(rate));
    await AsyncStorage.setItem('lastFetched', new Date().toISOString());
    store?.dispatch(setExchangeRate(JSON.stringify(rate)));
  } catch (err: any) {}
};
