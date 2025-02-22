
import React, { createContext, useEffect, useState } from 'react';
import axios from '../auth/axiosConfig'

export const AppContext = createContext();


export const AppProvider = ({ children }) => {
  const [mentors, setMentors] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [isUser, setUser] = useState(false)

  //FETCH ALL PROJECTS USING COURSE ID
  async function fetchProjects() {
    try {
      
      const res = await axios.get('/api/v1/courses/allCourses');
      setCourses(res.data.allCourses);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  

  //FETCH MENTOR PROFILE
  async function fetchProfile() {
    try {
      const response = await axios.get("/projectMentoring/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data.additional?.length > 0) {
        setProfile(response.data.additional[0]);
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  }


  const contextValue = {
    courses,
    loading,
    setLoading,
    isUser,
    setUser,
    mentors,
    fetchProfile,
  
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
