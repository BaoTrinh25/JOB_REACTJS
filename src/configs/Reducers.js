const MyUserReducer = (current, action) => {
    switch (action.type) {
        case "login":
            return action.payload;

        case "logout":
            return null;

        case "update_user":
            // Cập nhật thông tin user với dữ liệu mới
            return {
                ...current,
                ...action.payload, // Cập nhật các trường cần thiết
            };
        case "update_company":
            // Cập nhật thông tin user với dữ liệu mới
            return {
                ...current.company,
                ...action.payload, // Cập nhật các trường cần thiết
            };
        default:
            return current;
    }
};

export default MyUserReducer;
