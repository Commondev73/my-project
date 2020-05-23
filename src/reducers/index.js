import { combineReducers } from "redux";
import AnnouncesReducer from "./AnnouncesReducer";
import AnnounceReducer from "./AnnounceReducer";
import RegisterReducer from "./RegisterReducer";
import LoginReducer from "./LoginReducer";
import LogoutReducer from "./LogoutReducer";
import CurrentUserReducer from "./CurrentUserReducer";
import AnnouncesUserReducer from "./AnnouncesUserReducer";
import AnnounceUserReducer from "./AnnounceUserReducer";
import ChangePasswordReducer from "./ChangePasswordReducer";
import DataUserReducer from "./DataUserReducer";
import UpdateProfileReducer from "./UpdateProfileReducer";
import UpdateProfileImageReducer from "./UpdateProfileImageReducer";
import ProvinceReducer from "./ProvinceReducer";
import AmphoeReducer from "./AmphoeReducer";
import DistrictReducer from "./DistrictReducer";
import CountAnnouncesReducer from "./CountAnnouncesReducer";
import PostAnnouncesReducer from "./PostAnnouncesReducer";
import UpdateAnnouncesReducer from "./UpdateAnnouncesReducer";
import DeleteAnnouncesReducer from "./DeleteAnnouncesReducer";
import DraftAnnouncesUserReducer from "./DraftAnnouncesUserReducer";
import CorrectAnnouncesUserReducer from "./CorrectAnnouncesUserReducer";
import MessageReducer from "./MessageReducer";
import MailReducer from "./MailReducer";
import CountMailReducer from "./CountMailReducer";
import ReadMailReducer from "./ReadMailReducer";
import UnreadMailReducer from "./UnreadMailReducer";
import SaveMailReducer from "./SaveMailReducer";
import MessageIDReducer from "./MessageIDReducer";
import DeleteMessageReducer from "./DeleteMessageReducer";

const allReducer = combineReducers({
  announces: AnnouncesReducer,
  announce: AnnounceReducer,
  announces_user: AnnouncesUserReducer,
  announce_user :AnnounceUserReducer,
  draft_announces_user: DraftAnnouncesUserReducer,
  correct_announces_user: CorrectAnnouncesUserReducer,
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
  countAnnounces: CountAnnouncesReducer,
  postAnnounces: PostAnnouncesReducer,
  updateAnnounces: UpdateAnnouncesReducer,
  deleteAnnounces: DeleteAnnouncesReducer,
  message: MessageReducer,
  messageID: MessageIDReducer,
  deleteMessage: DeleteMessageReducer,
  mail: MailReducer,
  countMail: CountMailReducer,
  readMail: ReadMailReducer,
  unreadMail: UnreadMailReducer,
  saveMail: SaveMailReducer,
});

export default allReducer;
