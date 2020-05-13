import { combineReducers } from "redux";
import AnnouncesReducer from "./AnnouncesReducer";
import AnnounceReducer from "./AnnounceReducer";
import RegisterReducer from "./RegisterReducer";
import LoginReducer from "./LoginReducer";
import LogoutReducer from "./LogoutReducer";
import CurrentUserReducer from "./CurrentUserReducer";
import AnnouncesUserReducer from "./AnnouncesUserReducer";
import ChangePasswordReducer from "./ChangePasswordReducer";
import DataUserReducer from "./DataUserReducer";
import UpdateProfileReducer from "./UpdateProfileReducer";
import UpdateProfileImageReducer from "./UpdateProfileImageReducer";
import ProvinceReducer from "./ProvinceReducer";
import AmphoeReducer from "./AmphoeReducer";
import DistrictReducer from "./DistrictReducer";
import PostAnnouncesReducer from "./PostAnnouncesReducer";
import UpdateAnnouncesReducer from "./UpdateAnnouncesReducer"
import DeleteAnnouncesReducer from "./DeleteAnnouncesReducer";
import DraftAnnouncesUserReducer from "./DraftAnnouncesUserReducer";
import CorrectAnnouncesUserReducer from "./CorrectAnnouncesUserReducer";
import MessageReducer from "./MessageReducer";
import MailReducer from './MailReducer';
import MessageIDReducer from './MessageIDReducer';

const allReducer = combineReducers({
  announces: AnnouncesReducer,
  announces_user: AnnouncesUserReducer,
  draft_announces_user: DraftAnnouncesUserReducer,
  correct_announces_user: CorrectAnnouncesUserReducer,
  announce: AnnounceReducer,
  register: RegisterReducer,
  login: LoginReducer,
  user: CurrentUserReducer,
  data_user: DataUserReducer,
  update_profile: UpdateProfileReducer,
  update_profile_image: UpdateProfileImageReducer,
  logout: LogoutReducer,
  change_password: ChangePasswordReducer,
  province: ProvinceReducer,
  amphoe: AmphoeReducer,
  district: DistrictReducer,
  postAnnounces: PostAnnouncesReducer,
  updateAnnounces: UpdateAnnouncesReducer,
  deleteAnnounces: DeleteAnnouncesReducer,
  message: MessageReducer,
  messageID: MessageIDReducer,
  mail: MailReducer
});

export default allReducer;
