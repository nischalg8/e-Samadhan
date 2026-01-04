export const translations = {
  en: {
    appName: 'e-Samadhan',
    appSubtitle: 'Citizen Issue Reporting',
    loading: 'Loading...',
    login: {
      citizen: 'Citizen',
      agency: 'Agency',
      nid: 'NID Number',
      dob: 'Date of Birth',
      agencyName: 'Select Agency',  // ADD
      staffId: 'Staff ID',          // ADD
      username: 'Username',
      password: 'Password',
      loginBtn: 'Login',
      loggingIn: 'Logging in...',
    },

    forum: {
      title: "Forum",
      placeholder: "Forum feature is yet to be available",
         upvote: 'Upvote',
      comment: 'Comment',
    },
    chat: {
      "title": "Chat with Agency",
      "placeholder": "Chat feature is yet to be implemented"
    },
    issue: {
      raise: 'Raise an Issue',
      description: 'Description',
      category: 'Category',
      priority: 'Priority',
      submit: 'Submit Issue',
      submitting: 'Submitting...',
      success: 'Issue raised successfully!',
      uploadImage: 'Upload Image',
      latitude: 'Latitude',
      longitude: 'Longitude',
      error: 'Failed to submit issue. Please try again.',
      instruction: 'Go to map to reselect the location if needed.',
      cannotChangeStatus: 'Cannot Change Status',
      cannotChangeStatusMessage: 'Cannot change status of a resolved issue. Once an issue is marked as resolved, it cannot be reverted.',
      confirmInProgress: 'Mark as In Progress?',
      confirmInProgressMessage: 'Are you sure you want to mark this issue as IN PROGRESS?\n\nThis indicates that your agency has started working on resolving this issue.',
      confirmResolve: 'Mark as Resolved?',
      confirmResolveMessage: 'ARE YOU SURE YOU WANT TO MARK THIS ISSUE AS RESOLVED?\n\nThis action indicates that:\n• The issue has been completely fixed\n• The project/work is completed\n• Points will be awarded to your agency and the citizen\n• This status CANNOT be changed back\n\nPlease confirm that the issue is fully resolved.',
      resolvedMessage: 'Issue has been successfully marked as RESOLVED!\n\nPoints have been awarded to your agency and the citizen reporter.',
      // ADD THESE:
      categories: {
        road: 'Road',
        water: 'Water Supply',
        electricity: 'Electricity',
        waste: 'Waste Management',
      },
      priorities: {
        low: 'Low Priority',
        medium: 'Medium Priority',
        high: 'High Priority',
      },
      assignedIssues: 'Assigned Issues',
      status: 'Status',
      reporter: 'Reporter',
      reported: 'Reported',
      updateStatus: 'Update Status',
      submitted: 'Submitted',
      inProgress: 'In Progress',
      resolved: 'Resolved',
      noIssuesAssigned: 'No issues assigned to your agency yet.',
      location: 'Location',
    },



    map: {
      yourLocation: 'Your Current Location',
      instruction: 'Go to map to reselect the location if needed.',
    },

    nav: {
      map: 'Map',
      raise: 'Raise',
      issues: 'Issues',
      profile: 'Profile',
      forum: 'Forum',
    },

    profile: {
      myProfile: 'My Profile',
      role: 'Role',
      points: 'Points',
      username: 'Username',
      email: 'Email',
      nid: 'NID',
      dob: 'Date of Birth',
      phone: 'Phone',
      agency: 'Agency',
      staffId: 'Staff ID',
    },

    general: {
      logout: 'Logout',
      noIssues: 'No issues raised yet',
    },
  },

  ne: {
    appName: 'ई-समाधान',
    appSubtitle: 'नागरिक समस्या रिपोर्टिङ्ग',
    loading: 'लोड हुँदैछ...',
    login: {
      citizen: 'नागरिक',
      agency: 'निकाय',
      nid: 'नागरिकता नम्बर',
      dob: 'जन्म मिति',
      agencyName: 'निकाय छान्नुहोस्',  // ADD
      staffId: 'कर्मचारी आईडी',        // ADD
      username: 'प्रयोगकर्ता नाम',
      password: 'पासवर्ड',
      loginBtn: 'लगइन',
      loggingIn: 'लग इन हुँदैछ...',
    },

    forum: {
      title: "फोरम",
      placeholder: "फोरम सुविधा अहिले उपलब्ध छैन",
        upvote: 'अपभोट',
      comment: 'टिप्पणी',
    },
    chat: {
      title: "निकायसँग च्याट",
      placeholder: "च्याट सुविधा अझै लागू गरिएको छैन"
    },
    issue: {
      raise: 'समस्या रिपोर्ट गर्नुहोस्',
      description: 'विवरण',
      category: 'वर्ग',
      priority: 'प्राथमिकता',
      submit: 'जमा गर्नुहोस्',
      submitting: 'जमा गर्दै...',
      success: 'समस्या सफलतापूर्वक रिपोर्ट गरियो!',
      uploadImage: 'तस्बिर अपलोड गर्नुहोस्',
      latitude: 'अक्षांश',
      longitude: 'देशान्तर',
      error: 'समस्या रिपोर्ट गर्न असफल। कृपया पुन: प्रयास गर्नुहोस्।',
      instruction: 'स्थान पुन: चयन गर्न नक्सामा जानुहोस्।',
      cannotChangeStatus: 'स्थिति परिवर्तन गर्न सकिँदैन',
      cannotChangeStatusMessage: 'समाधान गरिएको समस्याको स्थिति परिवर्तन गर्न सकिँदैन। एक पटक समस्या समाधान गरिएको मार्क गरिएपछि, यसलाई फिर्ता गर्न सकिँदैन।',
      confirmInProgress: 'प्रगतिमा मार्क गर्ने?',
      confirmInProgressMessage: 'के तपाईं यो समस्या प्रगतिमा मार्क गर्न निश्चित हुनुहुन्छ?\n\nयसले जनाउँछ कि तपाईंको निकायले यस समस्यालाई समाधान गर्न काम सुरु गरेको छ।',
      confirmResolve: 'समाधान गरिएको मार्क गर्ने?',
      confirmResolveMessage: 'के तपाईं यो समस्या समाधान गरिएको मार्क गर्न निश्चित हुनुहुन्छ?\n\nयस क्रियाले जनाउँछ कि:\n• समस्या पूर्ण रूपमा समाधान गरिएको छ\n• परियोजना/काम पूरा भएको छ\n• तपाईंको निकाय र नागरिकलाई अंकहरू प्रदान गरिनेछ\n• यो स्थिति फिर्ता गर्न सकिँदैन\n\nकृपया पुष्टि गर्नुहोस् कि समस्या पूर्ण रूपमा समाधान गरिएको छ।',
      resolvedMessage: 'समस्या सफलतापूर्वक समाधान गरिएको मार्क गरियो!\n\nतपाईंको निकाय र नागरिक रिपोर्टरलाई अंकहरू प्रदान गरिएका छन्।',
      // ADD THESE:

      categories: {
        road: 'सडक',
        water: 'पानी आपूर्ति',
        electricity: 'बिजुली',
        waste: 'फोहोर व्यवस्थापन',
      },
      priorities: {
        low: 'कम प्राथमिकता',
        medium: 'मध्यम प्राथमिकता',
        high: 'उच्च प्राथमिकता',
      },
      assignedIssues: 'समस्याहरू',
      status: 'स्थिति',
      reporter: 'रिपोर्टर',
      reported: 'रिपोर्ट गरिएको',
      updateStatus: 'स्थिति अपडेट गर्नुहोस्',
      submitted: 'जमा गरिएको',
      inProgress: 'प्रगतिमा',
      resolved: 'समाधान गरिएको',
      noIssuesAssigned: 'तपाईंको निकायमा कुनै समस्या सौंपिएको छैन।',
      location: 'स्थान',
    },

    map: {
      yourLocation: 'तपाईंको स्थान',
      instruction: 'स्थान पुन: चयन गर्न नक्सामा जानुहोस्',
    },

    nav: {
      map: 'नक्सा',
      raise: 'रिपोर्ट',
      issues: 'समस्याहरू',
      profile: 'प्रोफाइल',
       forum: 'फोरम',
    },

    profile: {
      myProfile: 'मेरो प्रोफाइल',
      role: 'भूमिका',
      points: 'अंकहरू',
      username: 'प्रयोगकर्ता नाम',
      email: 'इमेल',
      nid: 'नागरिकता नम्बर',
      dob: 'जन्म मिति',
      phone: 'फोन',
      agency: 'निकाय',
      staffId: 'कर्मचारी आईडी',
    },

    general: {
      logout: 'लगआउट',
      noIssues: 'कुनै समस्या छैन',
    },
  },

}
