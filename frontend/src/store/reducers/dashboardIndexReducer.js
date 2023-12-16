const indexState = {
    dashboard_data: {},
    articleCount: 0,
    categoryCount: 0,
    tagCount: 0,
    subAdminCount: 0,
    notifications: [],
    successMessage: '',
    subAdmins: [],
}
export const dashboardReducer = (state = indexState, action) => {
    const { type, payload } = action;
    if (type === 'DASHBOARD_INDEX_DATA_GET') {
        return {
            ...state,
            dashboard_data: payload.userView,
            articleCount: payload.articleCount,
            categoryCount: payload.categoryCount,
            tagCount: payload.tagCount,
            subAdminCount: payload.subAdminCount
        }
    }
    if (type === 'NOTIFICATION_GET_SUCCESS') {
        return {
            ...state,
            notifications: payload
        }
    }
    if (type === 'NOTIFICATION_DELETE_SUCCESS') {
        console.log(payload)
        return {
            ...state,
            successMessage: payload.message
        }
    }
    if (type === 'N_SUCCESS_MESSAGE_CLEAR') {
        return {
            ...state,
            successMessage: ''
        }
    }
    // if (type === 'GET_SUB_ADMINS_SUCCESS') {
    //     return {
    //       ...state,
    //       subAdmins: payload,
    //     };
    // }
    if (type === 'GET_SUB_ADMINS_SUCCESS') {
        return {
          ...state,
          subAdmins: payload,
          subAdminCount: payload.length,
        };
      }
    if(type==='BLOCK_UNBLOCK_SUB_ADMIN'){
        console.log("Reducer "+ action.payload.accessStatus," ",state, " check" );
        return {
            ...state,
            subAdmins: state.subAdmins.map((subAdmin) =>
              subAdmin._id === action.payload.subAdminId ? { ...subAdmin, accessStatus: action.payload.accessStatus } : subAdmin
            ),
          };
    }

      
    return state;
}