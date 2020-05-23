import axios from "axios";
import { httpClient } from "../HttpClient";
import jwt from "jsonwebtoken";

export const FETCH_ANNOUNCES_REQUEST = "FETCH_ANNOUNCES_REQUEST";
export const FETCH_ANNOUNCES_SUCCESS = "FETCH_ANNOUNCES_SUCCESS";
export const FETCH_ANNOUNCES_ERROR = "FETCH_ANNOUNCES_ERROR";

export const fetchAnnounces = page => async dispatch => {
  await dispatch({ type: FETCH_ANNOUNCES_REQUEST });
  try {
    const response = await axios.get(`/api/announces?page=${page}`);
    return dispatch({
      type: FETCH_ANNOUNCES_SUCCESS,
      data: response.data
    });
  } catch (err) {
    return dispatch({ type: FETCH_ANNOUNCES_ERROR, err });
  }
};

export const FETCH_ANNOUNCES_USER_REQUEST = "FETCH_ANNOUNCES_USER_REQUEST";
export const FETCH_ANNOUNCES_USER_SUCCESS = "FETCH_ANNOUNCES_USER_SUCCESS";
export const FETCH_ANNOUNCES_USER_ERROR = "FETCH_ANNOUNCES_USER_ERROR";

export const fetchUserAnnounces = page => async dispatch => {
  await dispatch({ type: FETCH_ANNOUNCES_USER_REQUEST });
  try {
    const response = await httpClient.get(`/api/user/online/announces?page=${page}`);
    return dispatch({
      type: FETCH_ANNOUNCES_USER_SUCCESS,
      data: response.data
    });
  } catch (err) {
    return dispatch({ type: FETCH_ANNOUNCES_USER_ERROR, err });
  }
};

export const FETCH_DRAFT_ANNOUNCES_USER_REQUEST = "FETCH_DRAFT_ANNOUNCES_USER_REQUEST";
export const FETCH_DRAFT_ANNOUNCES_USER_SUCCESS = "FETCH_DRAFT_ANNOUNCES_USER_SUCCESS";
export const FETCH_DRAFT_ANNOUNCES_USER_ERROR = "FETCH_DRAFT_ANNOUNCES_USER_ERROR";

export const fetchUserAnnouncesDraft = page => async dispatch => {
  await dispatch({ type: FETCH_DRAFT_ANNOUNCES_USER_REQUEST });
  try {
    const response = await httpClient.get(`/api/user/draft/announces?page=${page}`);
    return dispatch({
      type: FETCH_DRAFT_ANNOUNCES_USER_SUCCESS,
      data: response.data
    });
  } catch (err) {
    return dispatch({ type: FETCH_DRAFT_ANNOUNCES_USER_ERROR, err });
  }
};

export const FETCH_CORRECT_ANNOUNCES_USER_REQUEST = "FETCH_CORRECT_ANNOUNCES_USER_REQUEST";
export const FETCH_CORRECT_ANNOUNCES_USER_SUCCESS = "FETCH_CORRECT_ANNOUNCES_USER_SUCCESS";
export const FETCH_CORRECT_ANNOUNCES_USER_ERROR = "FETCH_CORRECT_ANNOUNCES_USER_ERROR";

export const fetchUserAnnouncesCorrect = page => async dispatch => {
  await dispatch({ type: FETCH_CORRECT_ANNOUNCES_USER_REQUEST });
  try {
    const response = await httpClient.get(`/api/user/correct/announces?page=${page}`);
    return dispatch({
      type: FETCH_CORRECT_ANNOUNCES_USER_SUCCESS,
      data: response.data
    });
  } catch (err) {
    return dispatch({ type: FETCH_CORRECT_ANNOUNCES_USER_ERROR, err });
  }
};

export const FETCH_ANNOUNCE_USER_REQUEST = "FETCH_ANNOUNCE_USER_REQUEST";
export const FETCH_ANNOUNCE_USER_SUCCESS = "FETCH_ANNOUNCE_USER_SUCCESS";
export const FETCH_ANNOUNCE_USER_ERROR = "FETCH_ANNOUNCE_USER_ERROR";

export const fetchUserAnnounce = id => async dispatch => {
  await dispatch({ type: FETCH_ANNOUNCE_USER_REQUEST });
  try {
    const response = await httpClient.get(`/api/user/announces/${id}`);
    return dispatch({
      type: FETCH_ANNOUNCE_USER_SUCCESS,
      data: response.data
    });
  } catch (err) {
    return dispatch({ type: FETCH_ANNOUNCE_USER_ERROR, err });
  }
};

export const FETCH_ANNOUNCE_REQUEST = "FETCH_ANNOUNCE_REQUEST";
export const FETCH_ANNOUNCE_SUCCESS = "FETCH_ANNOUNCE_SUCCESS";
export const FETCH_ANNOUNCE_ERROR = "FETCH_ANNOUNCES_ERROR";

export const fetchAnnounce = id => async dispatch => {
  await dispatch({ type: FETCH_ANNOUNCE_REQUEST, id });
  try {
    const response = await axios.get(`/api/announces/${id}`);
    return dispatch({
      type: FETCH_ANNOUNCE_SUCCESS,
      data: response.data,
      id
    });
  } catch (err) {
    return dispatch({ type: FETCH_ANNOUNCE_ERROR, err, id });
  }
};

export const POST_REGISTER_REQUEST = "POST_REGISTER_REQUEST";
export const POST_REGISTER_SUCCESS = "POST_REGISTER_SUCCESS";
export const POST_REGISTER_ERROR = "POST_REGISTER_ERROR";

export const postRegister = data => async dispatch => {
  await dispatch({ type: POST_REGISTER_REQUEST });
  try {
    const formdata = new FormData();
    formdata.append("first_name", data.first_name);
    formdata.append("last_name", data.last_name);
    formdata.append("phone", data.phone);
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    formdata.append("password_confirm", data.password_confirm);
    const response = await axios.post("/api/register", formdata);
    return dispatch({
      type: POST_REGISTER_SUCCESS,
      data: response.data
    });
  } catch (err) {
    return dispatch({ type: POST_REGISTER_ERROR, err });
  }
};

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const login = data => async dispatch => {
  await dispatch({ type: LOGIN_REQUEST });
  try {
    const formdata = new FormData();
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    const response = await axios.post("/api/login", formdata);
    const token = response.data.access_token;
    localStorage.setItem("token", token);
    dispatch(setCurrentUser(jwt.decode(token)));
    return dispatch({ type: LOGIN_SUCCESS });
  } catch (err) {
    return dispatch({ type: LOGIN_ERROR, err });
  }
};

export const setCurrentUser = user => dispatch => {
  return dispatch({ type: SET_CURRENT_USER, user });
};

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const logout = () => async dispatch => {
  await dispatch({ type: LOGOUT_REQUEST });
  try {
    await httpClient.post("/api/logout");
    localStorage.removeItem("token");
    dispatch(setCurrentUser({}));
    return dispatch({ type: LOGOUT_SUCCESS });
  } catch (err) {
    return dispatch({ type: LOGOUT_ERROR, err });
  }
};

export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_ERROR = "CHANGE_PASSWORD_ERROR";

export const changePassword = data => async dispatch => {
  await dispatch({ type: CHANGE_PASSWORD_REQUEST });
  try {
    const formdata = new FormData();
    formdata.append("old_password", data.password);
    formdata.append("new_password", data.new_password);
    formdata.append("new_password_confirm", data.Cnew_password);
    const response = await httpClient.post("/api/resetpassword", formdata);
    // dispatch(logout());
    return dispatch({ type: CHANGE_PASSWORD_SUCCESS });
  } catch (err) {
    return dispatch({ type: CHANGE_PASSWORD_ERROR, err });
  }
};

export const FETCH_DATA_USER_REQUEST = "FETCH_DATA_USER_REQUEST";
export const FETCH_DATA_USER_SUCCESS = "FETCH_DATA_USER_SUCCESS";
export const FETCH_DATA_USER_ERROR = "FETCH_DATA_USER_ERROR";

export const fetchDataUser = () => async dispatch => {
  await dispatch({ type: FETCH_DATA_USER_REQUEST });
  try {
    const response = await httpClient.post("/api/user/data");
    return dispatch({
      type: FETCH_DATA_USER_SUCCESS,
      data: response.data
    });
  } catch (err) {
    return dispatch({ type: FETCH_DATA_USER_ERROR, err });
  }
};

export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_ERROR = "UPDATE_PROFILE_ERROR";

export const UpdateProfile = data => async dispatch => {
  await dispatch({ type: UPDATE_PROFILE_REQUEST });
  try {
    const formdata = new FormData();
    formdata.append("first_name", data.first_name);
    formdata.append("last_name", data.last_name);
    formdata.append("phone", data.phone);
    formdata.append("email", data.email);
    formdata.append("line", data.line);
    const response = await httpClient.post(
      "/api/user/update/profile",
      formdata
    );
    return dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      data: response.data
    });
  } catch (err) {
    return dispatch({ type: UPDATE_PROFILE_ERROR, err });
  }
};

export const UPDATE_PROFILE_IMAGE_REQUEST = "UPDATE_PROFILE_IMAGE_REQUEST";
export const UPDATE_PROFILE_IMAGE_SUCCESS = "UPDATE_PROFILE_IMAGE_SUCCESS";
export const UPDATE_PROFILE_IMAGE_ERROR = "UPDATE_PROFILE_IMAGE_ERROR";

export const UpdateProfileImage = file => async dispatch => {
  await dispatch({ type: UPDATE_PROFILE_IMAGE_REQUEST });
  try {
    const formdata = new FormData();
    formdata.append("imageprofile", file);
    const response = await httpClient.post("/api/user/imageprofile", formdata);
    return dispatch({
      type: UPDATE_PROFILE_IMAGE_SUCCESS,
      data: response.data
    });
  } catch (err) {
    return dispatch({ type: UPDATE_PROFILE_IMAGE_ERROR, err });
  }
};

export const FETCH_PROVINCE_REQUEST = "FETCH_PROVINCE_REQUEST";
export const FETCH_PROVINCE_SUCCESS = "FETCH_PROVINCE_SUCCESS";
export const FETCH_PROVINCE_ERROR = "FETCH_PROVINCE_ERROR";

export const fetchProvince = () => async dispatch => {
  await dispatch({ type: FETCH_PROVINCE_REQUEST });
  try {
    const response = await axios.get("/api/province");
    return dispatch({
      type: FETCH_PROVINCE_SUCCESS,
      data: response.data
    });
  } catch (err) {
    return dispatch({ type: FETCH_PROVINCE_ERROR, err });
  }
};

export const FETCH_AMPHOE_REQUEST = "FETCH_AMPHOE_REQUEST";
export const FETCH_AMPHOE_SUCCESS = "FETCH_AMPHOE_SUCCESS";
export const FETCH_AMPHOE_ERROR = "FETCH_AMPHOE_ERROR";

export const fetchAmphoe = code => async dispatch => {
  await dispatch({ type: FETCH_AMPHOE_REQUEST });
  try {
    const response = await axios.get(`/api/amphoe/${code}`);
    return dispatch({
      type: FETCH_AMPHOE_SUCCESS,
      data: response.data
    });
  } catch (err) {
    return dispatch({ type: FETCH_AMPHOE_ERROR, err });
  }
};

export const FETCH_DISTRICET_REQUEST = "FETCH_DISTRICET_REQUEST";
export const FETCH_DISTRICET_SUCCESS = "FETCH_DISTRICET_SUCCESS";
export const FETCH_DISTRICET_ERROR = "FETCH_DISTRICET_ERROR";

export const fetchDistrict = code => async dispatch => {
  await dispatch({ type: FETCH_DISTRICET_REQUEST });
  try {
    const response = await axios.get(`/api/district/${code}`);
    return dispatch({
      type: FETCH_DISTRICET_SUCCESS,
      data: response.data
    });
  } catch (err) {
    return dispatch({ type: FETCH_DISTRICET_ERROR, err });
  }
};

export const FETCH_COUNT_ANNOUNCES_REQUEST = "FETCH_COUNT_ANNOUNCES_REQUEST";
export const FETCH_COUNT_ANNOUNCES_SUCCESS = "FETCH_COUNT_ANNOUNCES_SUCCESS";
export const FETCH_COUNT_ANNOUNCES_ERROR = "FETCH_COUNT_ANNOUNCES_ERROR";

export const fetchCountAnnounces = () => async dispatch => {
  await dispatch({ type: FETCH_COUNT_ANNOUNCES_REQUEST });
  try {
    const response = await httpClient.get('/api/user/count/announces');
    return dispatch({
      type: FETCH_COUNT_ANNOUNCES_SUCCESS,
      data: response.data
    });
  } catch (err) {
    return dispatch({ type: FETCH_COUNT_ANNOUNCES_ERROR, err });
  }
};

export const POST_ANNOUNCES_REQUEST = "POST_ANNOUNCES_REQUEST";
export const POST_ANNOUNCES_SUCCESS = "POST_ANNOUNCES_SUCCESS";
export const POST_ANNOUNCES_ERROR = "POST_ANNOUNCES_ERROR";

export const postAnnounces = data => async dispatch => {
  await dispatch({ type: POST_ANNOUNCES_REQUEST });
  try {
    const formdata = new FormData();
    formdata.append("announcer_status", data.announceStatus);
    formdata.append("announcement_type", data.announceType);
    formdata.append("Property_type", data.propertyType.value);
    formdata.append("province_name", data.province.label);
    formdata.append("amphoe_name", data.amphoe.label);
    formdata.append("district_name", data.district.label);
    formdata.append("province_code", data.province.value);
    formdata.append("amphoe_code", data.amphoe.value);
    formdata.append("district_code", data.district.value);
    formdata.append("topic", data.topic);
    formdata.append("detail", data.detail);
    formdata.append("bedroom", data.bedroom);
    formdata.append("toilet", data.toilet);
    formdata.append("floor", data.floor);
    formdata.append("area", data.area);
    formdata.append("price", data.price);
    formdata.append("status", data.status);
    for (let i = 0; i < data.image.file.length; i++) {
      formdata.append("image[]", data.image.file[i], data.image.file[i].name);
    }
    const response = await httpClient.post("/api/user/announces", formdata);
    return dispatch({
      type: POST_ANNOUNCES_SUCCESS,
      data: response.data
    });
  } catch (err) {
    return dispatch({ type: POST_ANNOUNCES_ERROR, err });
  }
};

export const UPDATE_ANNOUNCES_REQUEST = "UPDATE_ANNOUNCES_REQUEST";
export const UPDATE_ANNOUNCES_SUCCESS = "UPDATE_ANNOUNCES_SUCCESS";
export const UPDATE_ANNOUNCES_ERROR = "UPDATE_ANNOUNCES_ERROR";

export const updateAnnounces = (id, data) => async dispatch => {
  await dispatch({ type: UPDATE_ANNOUNCES_REQUEST });
  try {
    const formdata = new FormData();
    formdata.append("announcer_status", data.announceStatus);
    formdata.append("announcement_type", data.announceType);
    formdata.append("Property_type", data.propertyType.value);
    formdata.append("province_name", data.province.label);
    formdata.append("amphoe_name", data.amphoe.label);
    formdata.append("district_name", data.district.label);
    formdata.append("province_code", data.province.value);
    formdata.append("amphoe_code", data.amphoe.value);
    formdata.append("district_code", data.district.value);
    formdata.append("topic", data.topic);
    formdata.append("detail", data.detail);
    formdata.append("bedroom", data.bedroom);
    formdata.append("toilet", data.toilet);
    formdata.append("floor", data.floor);
    formdata.append("area", data.area);
    formdata.append("price", data.price);
    formdata.append("status", data.status);
    if (data.imageDelete) {
      formdata.append("delete_image[]", data.imageDelete);
    }
    for (let i = 0; i < data.image.file.length; i++) {
      formdata.append("image[]", data.image.file[i], data.image.file[i].name);
    }
    formdata.append('_method', 'PUT')
    const response = await httpClient.post(`/api/user/announces/${id}`, formdata);
    return dispatch({
      type: UPDATE_ANNOUNCES_SUCCESS,
      data: response.data
    });
  } catch (err) {
    return dispatch({ type: UPDATE_ANNOUNCES_ERROR, err });
  }
};

export const DELETE_ANNOUNCES_REQUEST = "DELETE_ANNOUNCES_REQUEST";
export const DELETE_ANNOUNCES_SUCCESS = "DELETE_ANNOUNCES_SUCCESS";
export const DELETE_ANNOUNCES_ERROR = "DELETE_ANNOUNCES_ERROR";

export const deleteAnnounces = id => async dispatch => {
  await dispatch({ type: DELETE_ANNOUNCES_REQUEST });
  try {
    const response = await httpClient.delete(`/api/user/announces/${id}`);
    console.log('response', response)
    return dispatch({
      type: DELETE_ANNOUNCES_SUCCESS,
    });
  } catch (err) {
    return dispatch({ type: DELETE_ANNOUNCES_ERROR, err });
  }
};

export const FETCH_MAIL_REQUEST = "FETCH_MAIL_REQUEST";
export const FETCH_MAIL_SUCCESS = "FETCH_MAIL_SUCCESS";
export const FETCH_MAIL_ERROR = "FETCH_MAIL_ERROR";

export const fetchMail = page => async dispatch => {
  await dispatch({ type: FETCH_MAIL_REQUEST });
  try {
    const response = await httpClient.get(`/api/mail?page=${page}`);
    return dispatch({
      type: FETCH_MAIL_SUCCESS,
      data: response.data
    });
  } catch (err) {
    return dispatch({ type: FETCH_MAIL_ERROR, err });
  }
}

export const FETCH_MESSAGE_REQUEST = "FETCH_MESSAGE_REQUEST";
export const FETCH_MESSAGE_SUCCESS = "FETCH_MESSAGE_SUCCESS";
export const FETCH_MESSAGE_ERROR = "FETCH_MESSAGE_ERROR";

export const fetchMessage = id => async dispatch => {
  await dispatch({ type: FETCH_MESSAGE_REQUEST });
  try {
    const response = await httpClient.get(`/api/mail/${id}`);
    return dispatch({
      type: FETCH_MESSAGE_SUCCESS,
      data: response.data
    });
  } catch (err) {
    return dispatch({ type: FETCH_MESSAGE_ERROR, err });
  }
}

export const DELETE_MESSAGE_REQUEST = "DELETE_MESSAGE_REQUEST";
export const DELETE_MESSAGE_SUCCESS = "DELETE_MESSAGE_SUCCESS";
export const DELETE_MESSAGE_ERROR = "DELETE_MESSAGE_ERROR";

export const deleteMessage = id => async dispatch => {
  await dispatch({ type: DELETE_MESSAGE_REQUEST });
  try {
    const response = await httpClient.delete(`/api/mail/${id}`);
    return dispatch({
      type: DELETE_MESSAGE_SUCCESS,
      data: response.data
    });
  } catch (err) {
    return dispatch({ type: DELETE_MESSAGE_ERROR, err });
  }
}

export const POST_MAIL_MESSAGE_REQUEST = "POST_MAIL_MESSAGE_REQUEST";
export const POST_MAIL_MESSAGE_SUCCESS = "POST_MAIL_MESSAGE_SUCCESS";
export const POST_MAIL_MESSAGE_ERROR = "POST_MAIL_MESSAGE_ERROR";

export const message = data => async dispatch => {
  await dispatch({ type: POST_MAIL_MESSAGE_REQUEST });
  try {
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("phone", data.phone);
    formdata.append("email", data.email);
    formdata.append("message", data.message);
    formdata.append("id_user", data.idUser);
    const response = await axios.post("/api/mail/message", formdata);
    return dispatch({
      type: POST_MAIL_MESSAGE_SUCCESS,
      data: response.data
    });
  } catch (err) {
    return dispatch({ type: POST_MAIL_MESSAGE_ERROR, err });
  }
}

export const COUNT_MAIL_MESSAGE_REQUEST = "COUNT_MAIL_MESSAGE_REQUEST";
export const COUNT_MAIL_MESSAGE_SUCCESS = "COUNT_MAIL_MESSAGE_SUCCESS";
export const COUNT_MAIL_MESSAGE_ERROR = "COUNT_MAIL_MESSAGE_ERROR";

export const countMail = () => async dispatch => {
  await dispatch({ type: COUNT_MAIL_MESSAGE_REQUEST });
  try {
    const response = await httpClient.get('/api/count/mail');
    return dispatch({
      type: COUNT_MAIL_MESSAGE_SUCCESS,
      data: response.data
    });
  } catch (err) {
    return dispatch({ type: COUNT_MAIL_MESSAGE_ERROR, err });
  }
}

export const READ_MAIL_MESSAGE_REQUEST = "READ_MAIL_MESSAGE_REQUEST";
export const READ_MAIL_MESSAGE_SUCCESS = "READ_MAIL_MESSAGE_SUCCESS";
export const READ_MAIL_MESSAGE_ERROR = "READ_MAIL_MESSAGE_ERROR";

export const readMail = id => async dispatch => {
  await dispatch({ type: READ_MAIL_MESSAGE_REQUEST });
  try {
    const formdata = new FormData();
    formdata.append('_method', 'PATCH')
    const response = await httpClient.post(`/api/mail/read/${id}`, formdata);
    return dispatch({
      type: READ_MAIL_MESSAGE_SUCCESS,
      data: "success"
    });
  } catch (err) {
    return dispatch({ type: READ_MAIL_MESSAGE_ERROR, err });
  }
}

export const UNREAD_MAIL_MESSAGE_REQUEST = "UNREAD_MAIL_MESSAGE_REQUEST";
export const UNREAD_MAIL_MESSAGE_SUCCESS = "UNREAD_MAIL_MESSAGE_SUCCESS";
export const UNREAD_MAIL_MESSAGE_ERROR = "UNREAD_MAIL_MESSAGE_ERROR";

export const unreadMail = id => async dispatch => {
  await dispatch({ type: UNREAD_MAIL_MESSAGE_REQUEST });
  try {
    const formdata = new FormData();
    formdata.append('_method', 'PATCH')
    const response = await httpClient.post(`/api/mail/unread/${id}`, formdata);
    return dispatch({
      type: UNREAD_MAIL_MESSAGE_SUCCESS,
      data: true
    });
  } catch (err) {
    return dispatch({ type: UNREAD_MAIL_MESSAGE_ERROR, err });
  }
}

export const SAVE_MAIL_MESSAGE_REQUEST = "SAVE_MAIL_MESSAGE_REQUEST";
export const SAVE_MAIL_MESSAGE_SUCCESS = "SAVE_MAIL_MESSAGE_SUCCESS";
export const SAVE_MAIL_MESSAGE_ERROR = "SAVE_MAIL_MESSAGE_ERROR";

export const saveMail = id => async dispatch => {
  await dispatch({ type: SAVE_MAIL_MESSAGE_REQUEST });
  try {
    const formdata = new FormData();
    formdata.append('_method', 'PATCH')
    const response = await httpClient.post(`/api/mail/save/${id}`, formdata);
    return dispatch({
      type: SAVE_MAIL_MESSAGE_SUCCESS,
      data: true
    });
  } catch (err) {
    return dispatch({ type: SAVE_MAIL_MESSAGE_ERROR, err });
  }
}