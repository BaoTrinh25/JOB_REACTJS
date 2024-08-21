import { useEffect, useState } from 'react';
import APIs, { endpoints} from './APIs';

const useFetchOptions = () => {
  const [locations, setLocations] = useState([]);
  const [careers, setCareers] = useState([]);
  const [companies, setCompanies] = useState([]);
  

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await APIs.get(endpoints['areas']);
        setLocations(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCareers = async () => {
      try {
        const res = await APIs.get(endpoints['careers']);
        setCareers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchEmploymenttype = async () => {
      try {
        const res = await APIs.get(endpoints['employmenttypes']);
        setLocations(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCompanies = async () => {
      try {
        const res = await APIs.get(endpoints['companies']);
        setCompanies(res.data);
      } catch (err) {
        console.error(err);
      }
    };


    fetchLocation();
    fetchCareers();
    fetchEmploymenttype();    
    fetchCompanies();
  }, []);

  return { locations, careers, companies };
};

export default useFetchOptions;
